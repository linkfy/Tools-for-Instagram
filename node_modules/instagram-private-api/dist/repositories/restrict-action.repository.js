"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class RestrictActionRepository extends repository_1.Repository {
    async restrict(targetUserId) {
        const { body } = await this.client.request.send({
            url: '/api/v1/restrict_action/restrict/',
            method: 'POST',
            form: {
                _csrftoken: this.client.state.cookieCsrfToken,
                _uuid: this.client.state.uuid,
                target_user_id: targetUserId,
            },
        });
        return body;
    }
    async unrestrict(targetUserId) {
        const { body } = await this.client.request.send({
            url: '/api/v1/restrict_action/unrestrict/',
            method: 'POST',
            form: {
                _csrftoken: this.client.state.cookieCsrfToken,
                _uuid: this.client.state.uuid,
                target_user_id: targetUserId,
            },
        });
        return body;
    }
}
exports.RestrictActionRepository = RestrictActionRepository;
//# sourceMappingURL=restrict-action.repository.js.map