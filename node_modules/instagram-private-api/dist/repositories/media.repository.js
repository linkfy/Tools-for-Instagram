"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const luxon_1 = require("luxon");
const repository_1 = require("../core/repository");
const Chance = require("chance");
class MediaRepository extends repository_1.Repository {
    async info(mediaId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/media/${mediaId}/info/`,
            method: 'GET',
            form: this.client.request.sign({
                igtv_feed_preview: false,
                media_id: mediaId,
                _csrftoken: this.client.state.cookieCsrfToken,
                _uid: this.client.state.cookieUserId,
                _uuid: this.client.state.uuid,
            }),
        });
        return body;
    }
    async editMedia({ mediaId, captionText, }) {
        const { body } = await this.client.request.send({
            url: `/api/v1/media/${mediaId}/edit_media/`,
            method: 'POST',
            form: this.client.request.sign({
                igtv_feed_preview: false,
                media_id: mediaId,
                _csrftoken: this.client.state.cookieCsrfToken,
                _uid: this.client.state.cookieUserId,
                _uuid: this.client.state.uuid,
                caption_text: captionText,
            }),
        });
        return body;
    }
    async delete({ mediaId, mediaType = 'PHOTO', }) {
        const { body } = await this.client.request.send({
            url: `/api/v1/media/${mediaId}/delete/`,
            method: 'POST',
            qs: {
                media_type: mediaType,
            },
            form: this.client.request.sign({
                igtv_feed_preview: false,
                media_id: mediaId,
                _csrftoken: this.client.state.cookieCsrfToken,
                _uid: this.client.state.cookieUserId,
                _uuid: this.client.state.uuid,
            }),
        });
        return body;
    }
    async likeAction(options) {
        const signedFormData = this.client.request.sign(Object.assign({ module_name: options.moduleInfo.module_name, media_id: options.mediaId, _csrftoken: this.client.state.cookieCsrfToken }, lodash_1.omit(options.moduleInfo, 'module_name'), { radio_type: this.client.state.radioType, _uid: this.client.state.cookieUserId, device_id: this.client.state.deviceId, _uuid: this.client.state.uuid }));
        const { body } = await this.client.request.send({
            url: `/api/v1/media/${options.mediaId}/${options.action}/`,
            method: 'POST',
            form: Object.assign({}, signedFormData, { d: options.d }),
        });
        return body;
    }
    async like(options) {
        return this.likeAction(Object.assign({ action: 'like' }, options));
    }
    async unlike(options) {
        return this.likeAction(Object.assign({ action: 'unlike' }, options));
    }
    async comment({ mediaId, text, module = 'self_comments_v2', }) {
        const { body } = await this.client.request.send({
            url: `/api/v1/media/${mediaId}/comment/`,
            method: 'POST',
            form: this.client.request.sign({
                user_breadcrumb: this.client.request.userBreadcrumb(text.length),
                idempotence_token: new Chance().guid(),
                _csrftoken: this.client.state.cookieCsrfToken,
                radio_type: this.client.state.radioType,
                _uid: this.client.state.cookieUserId,
                device_id: this.client.state.deviceId,
                _uuid: this.client.state.uuid,
                comment_text: text,
                containermodule: module,
            }),
        });
        return body.comment;
    }
    async likers(id) {
        const { body } = await this.client.request.send({
            url: `/api/v1/media/${id}/likers/`,
        });
        return body;
    }
    async blocked() {
        const { body } = await this.client.request.send({
            url: `/api/v1/media/blocked/`,
        });
        return body.media_ids;
    }
    async uploadFinish(options) {
        if (options.video) {
            options.video = lodash_1.defaultsDeep(options.video, {
                clips: [{ length: options.video.length, source_type: options.source_type }],
                poster_frame_index: 0,
                audio_muted: false,
            });
        }
        const { body } = await this.client.request.send({
            url: '/api/v1/media/upload_finish/',
            method: 'POST',
            headers: {
                retry_context: JSON.stringify({ num_step_auto_retry: 0, num_reupload: 0, num_step_manual_retry: 0 }),
            },
            form: this.client.request.sign(Object.assign({ timezone_offset: this.client.state.timezoneOffset, _csrftoken: this.client.state.cookieCsrfToken, source_type: options.source_type, _uid: this.client.state.cookieUserId, device_id: this.client.state.deviceId, _uuid: this.client.state.uuid, upload_id: options.upload_id, device: this.client.state.devicePayload }, options.video)),
            qs: options.video ? { video: '1' } : {},
        });
        return body;
    }
    applyConfigureDefaults(options, defaults) {
        const width = options.width || 1520;
        const height = options.height || 2048;
        const devicePayload = this.client.state.devicePayload;
        return lodash_1.defaultsDeep(options, Object.assign({ _csrftoken: this.client.state.cookieCsrfToken, _uid: this.client.state.cookieUserId, _uuid: this.client.state.uuid, device: devicePayload, extra: { source_width: width, source_height: height } }, defaults));
    }
    async configure(options) {
        const devicePayload = this.client.state.devicePayload;
        const now = luxon_1.DateTime.local().toFormat('yyyy:mm:dd HH:mm:ss');
        const width = options.width || 1520;
        const height = options.height || 2048;
        const form = this.applyConfigureDefaults(options, {
            width,
            height,
            upload_id: Date.now().toString(),
            timezone_offset: this.client.state.timezoneOffset,
            date_time_original: now,
            date_time_digitalized: now,
            caption: '',
            source_type: '4',
            media_folder: 'Camera',
            edits: {
                crop_original_size: [width, height],
                crop_center: [0.0, -0.0],
                crop_zoom: 1.0,
            },
            camera_model: devicePayload.model,
            scene_capture_type: 'standard',
            device_id: this.client.state.deviceId,
            creation_logger_session_id: this.client.state.clientSessionId,
            software: '1',
            camera_make: devicePayload.manufacturer,
        });
        if (typeof form.usertags !== 'undefined') {
            form.usertags = JSON.stringify(form.usertags);
        }
        if (typeof form.location !== 'undefined') {
            form.location = JSON.stringify(form.location);
        }
        const { body } = await this.client.request.send({
            url: '/api/v1/media/configure/',
            method: 'POST',
            form: this.client.request.sign(form),
        });
        return body;
    }
    async configureVideo(options) {
        const now = luxon_1.DateTime.local().toFormat('yyyy:mm:dd HH:mm:ss');
        const form = this.applyConfigureDefaults(options, {
            width: options.width,
            height: options.height,
            upload_id: Date.now().toString(),
            timezone_offset: this.client.state.timezoneOffset,
            date_time_original: now,
            caption: '',
            source_type: '4',
            device_id: this.client.state.deviceId,
            filter_type: '0',
            audio_muted: false,
            poster_frame_index: 0,
        });
        if (typeof form.usertags !== 'undefined') {
            form.usertags = JSON.stringify(form.usertags);
        }
        if (typeof form.location !== 'undefined') {
            form.location = JSON.stringify(form.location);
        }
        const { body } = await this.client.request.send({
            url: '/api/v1/media/configure/',
            method: 'POST',
            qs: {
                video: '1',
            },
            form: this.client.request.sign(form),
        });
        return body;
    }
    static stringifyStoryStickers(form) {
        if (typeof form.story_hashtags !== 'undefined') {
            form.story_hashtags = JSON.stringify(form.story_hashtags);
        }
        if (typeof form.story_locations !== 'undefined') {
            form.story_locations = JSON.stringify(form.story_locations);
        }
        if (typeof form.reel_mentions !== 'undefined') {
            form.reel_mentions = JSON.stringify(form.reel_mentions);
        }
        if (typeof form.story_polls !== 'undefined') {
            form.story_polls = JSON.stringify(form.story_polls);
        }
        if (typeof form.story_sliders !== 'undefined') {
            form.story_sliders = JSON.stringify(form.story_sliders);
        }
        if (typeof form.story_questions !== 'undefined') {
            form.story_questions = JSON.stringify(form.story_questions);
        }
        if (typeof form.story_countdowns !== 'undefined') {
            form.story_countdowns = JSON.stringify(form.story_countdowns);
        }
        if (typeof form.attached_media !== 'undefined') {
            form.attached_media = JSON.stringify(form.attached_media);
        }
        if (typeof form.story_cta !== 'undefined') {
            form.story_cta = JSON.stringify(form.story_cta);
        }
        if (typeof form.story_chats !== 'undefined') {
            form.story_chats = JSON.stringify(form.story_chats);
        }
    }
    async configureToStory(options) {
        const now = Date.now();
        const width = options.width || 1520;
        const height = options.height || 2048;
        const form = this.applyConfigureDefaults(options, {
            width,
            height,
            upload_id: Date.now().toString(),
            source_type: '3',
            configure_mode: '1',
            client_shared_at: now.toString(),
            edits: {
                crop_original_size: [width, height],
                crop_center: [0.0, -0.0],
                crop_zoom: 1.0,
            },
        });
        form.source_type = '3';
        if (form.configure_mode === '1') {
            MediaRepository.stringifyStoryStickers(form);
        }
        const { body } = await this.client.request.send({
            url: '/api/v1/media/configure_to_story/',
            method: 'POST',
            form: this.client.request.sign(form),
        });
        return body;
    }
    async configureToStoryVideo(options) {
        const now = Date.now();
        const devicePayload = this.client.state.devicePayload;
        const form = lodash_1.defaultsDeep(options, {
            supported_capabilities_new: JSON.stringify(this.client.state.supportedCapabilities),
            timezone_offset: '0',
            _csrftoken: this.client.state.cookieCsrfToken,
            client_shared_at: now.toString(),
            configure_mode: '1',
            source_type: '3',
            video_result: '',
            _uid: this.client.state.cookieUserId,
            date_time_original: luxon_1.DateTime.local()
                .toISO()
                .replace(/[-:]/g, '') + 'Z',
            device_id: this.client.state.deviceId,
            _uuid: this.client.state.uuid,
            device: devicePayload,
            clips: [
                {
                    length: options.length,
                    source_type: '3',
                },
            ],
            extra: {
                source_width: options.width,
                source_height: options.height,
            },
            audio_muted: false,
            poster_frame_index: 0,
        });
        form.source_type = '3';
        if (form.configure_mode === '1') {
            MediaRepository.stringifyStoryStickers(form);
        }
        const { body } = await this.client.request.send({
            url: '/api/v1/media/configure_to_story/',
            method: 'POST',
            qs: {
                video: '1',
            },
            form: this.client.request.sign(form),
        });
        return body;
    }
    async configureSidecar(options) {
        const isVideo = (arg) => arg.length !== undefined;
        const devicePayload = this.client.state.devicePayload;
        const sidecarId = options.upload_id || Date.now().toString();
        const now = luxon_1.DateTime.local().toFormat('yyyy:mm:dd HH:mm:ss');
        options = lodash_1.defaultsDeep(options, {
            _csrftoken: this.client.state.cookieCsrfToken,
            _uid: this.client.state.cookieUserId,
            _uuid: this.client.state.uuid,
            timezone_offset: '0',
            source_type: '4',
            device_id: this.client.state.deviceId,
            caption: '',
            client_sidecar_id: sidecarId,
            upload_id: sidecarId,
            device: devicePayload,
        });
        options.children_metadata = options.children_metadata.map(item => {
            const { width, height } = item;
            item = lodash_1.defaultsDeep(item, {
                timezone_offset: '0',
                caption: null,
                source_type: '4',
                extra: { source_width: width, source_height: height },
                edits: { crop_original_size: [width, height], crop_center: [0.0, -0.0], crop_zoom: 1.0 },
                device: devicePayload,
            });
            if (typeof item.extra !== 'string') {
                item.extra = JSON.stringify(item.extra);
            }
            if (typeof item.edits !== 'string') {
                item.edits = JSON.stringify(item.edits);
            }
            if (typeof item.device !== 'string') {
                item.device = JSON.stringify(item.device);
            }
            if (item.usertags && typeof item.usertags !== 'string') {
                item.usertags = JSON.stringify(item.usertags);
            }
            if (isVideo(item)) {
                item = lodash_1.defaultsDeep(item, {
                    filter_type: '0',
                    video_result: '',
                    date_time_original: now,
                    audio_muted: 'false',
                    clips: [{ length: item.length, source_type: '4' }],
                    poster_frame_index: '0',
                });
                const clips = item;
                if (typeof clips !== 'string') {
                    item.clips = JSON.stringify(clips);
                }
            }
            return item;
        });
        const { body } = await this.client.request.send({
            url: '/api/v1/media/configure_sidecar/',
            method: 'POST',
            form: this.client.request.sign(options),
        });
        return body;
    }
    async seen(reels, module = 'feed_timeline') {
        const { body } = await this.client.request.send({
            url: `/api/v2/media/seen/`,
            method: 'POST',
            qs: {
                reel: 1,
                live_vod: 0,
            },
            form: this.client.request.sign({
                reels,
                container_module: module,
                reel_media_skipped: [],
                live_vods: [],
                live_vods_skipped: [],
                nuxes: [],
                nuxes_skipped: [],
                _uuid: this.client.state.uuid,
                _uid: this.client.state.cookieUserId,
                _csrftoken: this.client.state.cookieCsrfToken,
                device_id: this.client.state.deviceId,
            }),
        });
        return body;
    }
    async listReelMediaViewer(mediaId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/media/${mediaId}/list_reel_media_viewer`,
            method: 'GET',
            qs: {
                supported_capabilities_new: this.client.state.supportedCapabilities,
            },
        });
        return body;
    }
    async save(mediaId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/media/${mediaId}/save/`,
            method: 'POST',
        });
        return body;
    }
    async unsave(mediaId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/media/${mediaId}/unsave/`,
            method: 'POST',
        });
        return body;
    }
}
exports.MediaRepository = MediaRepository;
//# sourceMappingURL=media.repository.js.map