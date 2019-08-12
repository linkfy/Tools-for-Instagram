"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class MusicRepository extends repository_1.Repository {
    async moods(product) {
        product = product || 'story_camera_music_overlay_post_capture';
        const { body } = await this.client.request.send({
            url: '/api/v1/music/moods/',
            method: 'POST',
            form: {
                _csrftoken: this.client.state.cookieCsrfToken,
                product,
                _uuid: this.client.state.uuid,
                browse_session_id: this.client.state.clientSessionId,
            },
        });
        return body;
    }
    async genres(product) {
        product = product || 'story_camera_music_overlay_post_capture';
        const { body } = await this.client.request.send({
            url: '/api/v1/music/genres/',
            method: 'POST',
            form: {
                _csrftoken: this.client.state.cookieCsrfToken,
                product,
                _uuid: this.client.state.uuid,
                browse_session_id: this.client.state.clientSessionId,
            },
        });
        return body;
    }
    async lyrics(trackId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/music/track/${trackId}/lyrics/`,
            method: 'GET',
        });
        return body;
    }
}
exports.MusicRepository = MusicRepository;
//# sourceMappingURL=music.repository.js.map