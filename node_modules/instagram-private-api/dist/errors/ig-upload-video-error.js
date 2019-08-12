"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ig_response_error_1 = require("./ig-response.error");
class IgUploadVideoError extends ig_response_error_1.IgResponseError {
    constructor(response, videoInfo) {
        super(response);
        this.videoInfo = videoInfo;
    }
}
exports.IgUploadVideoError = IgUploadVideoError;
//# sourceMappingURL=ig-upload-video-error.js.map