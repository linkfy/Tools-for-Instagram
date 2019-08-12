"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class LinkedAccountRepository extends repository_1.Repository {
    async getLinkageStatus() {
        const { body } = await this.client.request.send({
            url: `/api/v1/linked_accounts/get_linkage_status/`,
        });
        return body;
    }
}
exports.LinkedAccountRepository = LinkedAccountRepository;
//# sourceMappingURL=linked-account.repository.js.map