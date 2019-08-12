"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class LoomRepository extends repository_1.Repository {
    async fetchConfig() {
        const { body } = await this.client.request.send({
            url: '/api/v1/loom/fetch_config/',
        });
        return body;
    }
}
exports.LoomRepository = LoomRepository;
//# sourceMappingURL=loom.repository.js.map