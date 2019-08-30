"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class HighlightsRepository extends repository_1.Repository {
    async highlightsTray(userId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/highlights/${userId}/highlights_tray/`,
            method: 'GET',
            qs: {
                supported_capabilities_new: JSON.stringify(this.client.state.supportedCapabilities),
                phone_id: this.client.state.phoneId,
                battery_level: this.client.state.batteryLevel,
                is_charging: Number(this.client.state.isCharging),
                will_sound_on: 0,
            },
        });
        return body;
    }
    async createReel(options) {
        const { body } = await this.client.request.send({
            url: '/api/v1/highlights/create_reel/',
            method: 'POST',
            form: this.client.request.sign({
                supported_capabilities_new: JSON.stringify(this.client.state.supportedCapabilities),
                source: options.source || 'story_viewer_profile',
                creation_id: Date.now().toString(),
                _csrftoken: this.client.state.cookieCsrfToken,
                _uid: this.client.state.cookieUserId,
                _uuid: this.client.state.uuid,
                cover: JSON.stringify({
                    media_id: options.coverId || options.mediaIds[0],
                }),
                title: options.title,
                media_ids: JSON.stringify(options.mediaIds),
            }),
        });
        return body;
    }
    async editReel(options) {
        const { body } = await this.client.request.send({
            url: `/api/v1/highlights/${options.highlightId}/edit_reel/`,
            method: 'POST',
            form: this.client.request.sign({
                supported_capabilities_new: JSON.stringify(this.client.state.supportedCapabilities),
                source: options.source || 'story_viewer_default',
                added_media_ids: JSON.stringify(options.added || []),
                _csrftoken: this.client.state.cookieCsrfToken,
                _uid: this.client.state.cookieUserId,
                _uuid: this.client.state.uuid,
                cover: JSON.stringify({
                    media_id: options.coverId,
                }),
                title: options.title,
                removed_media_ids: JSON.stringify(options.removed || []),
            }),
        });
        return body;
    }
    async deleteReel(highlightId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/highlights/${highlightId}/delete_reel/`,
            method: 'POST',
            form: this.client.request.sign({
                _csrftoken: this.client.state.cookieCsrfToken,
                _uid: this.client.state.cookieUserId,
                _uuid: this.client.state.uuid,
            }),
        });
        return body;
    }
}
exports.HighlightsRepository = HighlightsRepository;
//# sourceMappingURL=highlights.repository.js.map