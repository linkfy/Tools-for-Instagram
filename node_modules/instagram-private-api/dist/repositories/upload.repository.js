"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const repository_1 = require("../core/repository");
const Chance = require("chance");
class UploadRepository extends repository_1.Repository {
    constructor() {
        super(...arguments);
        this.chance = new Chance();
    }
    async photo(options) {
        const uploadId = options.uploadId || Date.now();
        const ruploadParams = {
            retry_context: JSON.stringify({ num_step_auto_retry: 0, num_reupload: 0, num_step_manual_retry: 0 }),
            media_type: '1',
            upload_id: uploadId.toString(),
            xsharing_user_ids: JSON.stringify([]),
            image_compression: JSON.stringify({ lib_name: 'moz', lib_version: '3.1.m', quality: '80' }),
        };
        if (options.isSidecar) {
            ruploadParams.is_sidecar = '1';
        }
        const name = `${uploadId}_0_-${lodash_1.random(1000000000, 9999999999)}`;
        const contentLength = options.file.byteLength;
        const { body } = await this.client.request.send({
            url: `/rupload_igphoto/${name}`,
            method: 'POST',
            headers: {
                X_FB_PHOTO_WATERFALL_ID: this.chance.guid(),
                'X-Entity-Type': 'image/jpeg',
                Offset: 0,
                'X-Instagram-Rupload-Params': JSON.stringify(ruploadParams),
                'X-Entity-Name': name,
                'X-Entity-Length': contentLength,
                'Content-Type': 'application/octet-stream',
                'Content-Length': contentLength,
                'Accept-Encoding': 'gzip',
            },
            body: options.file,
        });
        return body;
    }
    async video(options) {
        const { duration, width, height, video } = options;
        const uploadId = options.uploadId || Date.now();
        const name = `${uploadId}_0_-${lodash_1.random(1000000000, 9999999999)}`;
        const contentLength = video.byteLength;
        const ruploadParams = {
            retry_context: JSON.stringify({ num_step_auto_retry: 0, num_reupload: 0, num_step_manual_retry: 0 }),
            media_type: '2',
            xsharing_user_ids: JSON.stringify([]),
            upload_id: uploadId.toString(),
            upload_media_height: height.toString(),
            upload_media_width: width.toString(),
            upload_media_duration_ms: duration.toString(),
        };
        if (options.isSidecar) {
            ruploadParams.is_sidecar = '1';
        }
        if (options.forAlbum) {
            ruploadParams.for_album = '1';
        }
        const { body } = await this.client.request.send({
            url: `/rupload_igvideo/${name}/`,
            method: 'POST',
            qs: {
                target: this.client.state.extractCookieValue('rur'),
            },
            headers: {
                X_FB_VIDEO_WATERFALL_ID: this.chance.guid(),
                'X-Entity-Type': 'video/mp4',
                Offset: 0,
                'X-Instagram-Rupload-Params': JSON.stringify(ruploadParams),
                'X-Entity-Name': name,
                'X-Entity-Length': contentLength,
                'Content-Type': 'application/octet-stream',
                'Content-Length': contentLength,
                'Accept-Encoding': 'gzip',
            },
            body: video,
        });
        return body;
    }
}
exports.UploadRepository = UploadRepository;
//# sourceMappingURL=upload.repository.js.map