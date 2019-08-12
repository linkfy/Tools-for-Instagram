"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const feed_1 = require("../core/feed");
const SUPPORTED_CAPABILITIES = require("../samples/supported-capabilities.json");
class ReelsMediaFeed extends feed_1.Feed {
    constructor() {
        super(...arguments);
        this.source = 'feed_timeline';
    }
    set state(body) { }
    async request() {
        const { body } = await this.client.request.send({
            url: `/api/v1/feed/reels_media/`,
            method: 'POST',
            form: this.client.request.sign({
                user_ids: this.userIds,
                source: this.source,
                _uuid: this.client.state.uuid,
                _uid: this.client.state.cookieUserId,
                _csrftoken: this.client.state.cookieCsrfToken,
                device_id: this.client.state.deviceId,
                supported_capabilities_new: JSON.stringify(SUPPORTED_CAPABILITIES),
            }),
        });
        return body;
    }
    async items() {
        const body = await this.request();
        return Object.values(body.reels).reduce((accumulator, current) => accumulator.concat(current.items), []);
    }
}
exports.ReelsMediaFeed = ReelsMediaFeed;
//# sourceMappingURL=reels-media.feed.js.map