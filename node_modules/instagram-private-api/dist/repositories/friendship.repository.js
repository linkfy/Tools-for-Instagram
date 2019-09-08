"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class FriendshipRepository extends repository_1.Repository {
    async show(id) {
        const { body } = await this.client.request.send({
            url: `/api/v1/friendships/show/${id}/`,
        });
        return body;
    }
    async showMany(userIds) {
        const { body } = await this.client.request.send({
            url: `/api/v1/friendships/show_many/`,
            method: 'POST',
            form: {
                _csrftoken: this.client.state.cookieCsrfToken,
                user_ids: userIds.join(),
                _uuid: this.client.state.uuid,
            },
        });
        return body.friendship_statuses;
    }
    async block(id, mediaIdAttribution) {
        return this.change('block', id, mediaIdAttribution);
    }
    async unblock(id, mediaIdAttribution) {
        return this.change('unblock', id, mediaIdAttribution);
    }
    async create(id, mediaIdAttribution) {
        return this.change('create', id, mediaIdAttribution);
    }
    async destroy(id, mediaIdAttribution) {
        return this.change('destroy', id, mediaIdAttribution);
    }
    async approve(id, mediaIdAttribution) {
        return this.change('approve', id, mediaIdAttribution);
    }
    async deny(id, mediaIdAttribution) {
        return this.change('ignore', id, mediaIdAttribution);
    }
    async removeFollower(id) {
        return this.change('remove_follower', id);
    }
    async change(action, id, mediaIdAttribution) {
        const { body } = await this.client.request.send({
            url: `/api/v1/friendships/${action}/${id}/`,
            method: 'POST',
            form: this.client.request.sign({
                _csrftoken: this.client.state.cookieCsrfToken,
                user_id: id,
                radio_type: this.client.state.radioType,
                _uid: this.client.state.cookieUserId,
                device_id: this.client.state.deviceId,
                _uuid: this.client.state.uuid,
                media_id_attribution: mediaIdAttribution,
            }),
        });
        return body.friendship_status;
    }
}
exports.FriendshipRepository = FriendshipRepository;
//# sourceMappingURL=friendship.repository.js.map