"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
const errors_1 = require("../errors");
class UserRepository extends repository_1.Repository {
    async info(id) {
        const { body } = await this.client.request.send({
            url: `/api/v1/users/${id}/info/`,
        });
        return body.user;
    }
    async arlinkDownloadInfo() {
        const { body } = await this.client.request.send({
            url: `/api/v1/users/arlink_download_info/`,
            qs: {
                version_override: '2.0.2',
            },
        });
        return body.user;
    }
    async search(username) {
        const { body } = await this.client.request.send({
            url: `/api/v1/users/search/`,
            qs: {
                timezone_offset: this.client.state.timezoneOffset,
                q: username,
                count: 30,
            },
        });
        return body;
    }
    async searchExact(username) {
        username = username.toLowerCase();
        const result = await this.search(username);
        const users = result.users;
        const account = users.find(user => user.username === username);
        if (!account) {
            throw new errors_1.IgExactUserNotFoundError();
        }
        return account;
    }
    async accountDetails(id) {
        id = id || this.client.state.cookieUserId;
        const { body } = await this.client.request.send({
            url: `/api/v1/users/${id}/account_details/`,
        });
        return body;
    }
    async formerUsernames(id) {
        id = id || this.client.state.cookieUserId;
        const { body } = await this.client.request.send({
            url: `/api/v1/users/${id}/former_usernames/`,
        });
        return body;
    }
    async sharedFollowerAccounts(id) {
        const { body } = await this.client.request.send({
            url: `/api/v1/users/${id}/shared_follower_accounts/`,
        });
        return body;
    }
    async flagUser(id) {
        const { body } = await this.client.request.send({
            url: `/api/v1/users/${id}/flag_user/`,
            method: 'POST',
            form: {
                _csrftoken: this.client.state.cookieCsrfToken,
                _uid: this.client.state.cookieUserId,
                _uuid: this.client.state.uuid,
                reason_id: 1,
                user_id: id,
                source_name: 'profile',
                is_spam: true,
            },
        });
        return body;
    }
    async getIdByUsername(username) {
        const user = await this.searchExact(username);
        return user.pk;
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map