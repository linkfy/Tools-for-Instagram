"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class DirectRepository extends repository_1.Repository {
    async createGroupThread(recipientUsers, threadTitle) {
        const { body } = await this.client.request.send({
            url: '/api/v1/direct_v2/create_group_thread/',
            method: 'POST',
            form: this.client.request.sign({
                _csrftoken: this.client.state.cookieCsrfToken,
                _uuid: this.client.state.uuid,
                _uid: this.client.state.cookieUserId,
                recipient_users: JSON.stringify(recipientUsers),
                thread_title: threadTitle,
            }),
        });
        return body;
    }
    async rankedRecipients(mode = 'raven', query = '') {
        const { body } = await this.client.request.send({
            url: '/api/v1/direct_v2/ranked_recipients/',
            method: 'GET',
            qs: {
                mode,
                query,
                show_threads: true,
            },
        });
        return body;
    }
    async getPresence() {
        const { body } = await this.client.request.send({
            url: '/api/v1/direct_v2/get_presence/',
            method: 'GET',
        });
        return body;
    }
}
exports.DirectRepository = DirectRepository;
//# sourceMappingURL=direct.repository.js.map