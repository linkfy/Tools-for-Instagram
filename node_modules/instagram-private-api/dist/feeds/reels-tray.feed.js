"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const feed_1 = require("../core/feed");
class ReelsTrayFeed extends feed_1.Feed {
    set state(response) { }
    async items() {
        const response = await this.request();
        return response.tray;
    }
    async request() {
        const { body } = await this.client.request.send({
            url: '/api/v1/feed/reels_tray/',
            method: 'POST',
            form: {
                supported_capabilities_new: this.client.state.supportedCapabilities,
                reason: this.reason,
                _csrftoken: this.client.state.cookieCsrfToken,
                _uuid: this.client.state.uuid,
            },
        });
        this.state = body;
        return body;
    }
}
exports.ReelsTrayFeed = ReelsTrayFeed;
//# sourceMappingURL=reels-tray.feed.js.map