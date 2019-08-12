"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class ZrRepository extends repository_1.Repository {
    tokenResult() {
        return this.client.request.send({
            url: '/api/v1/zr/token/result/',
            qs: {
                device_id: this.client.state.deviceId,
                token_hash: '',
                custom_device_id: this.client.state.uuid,
                fetch_reason: 'token_expired',
            },
        });
    }
}
exports.ZrRepository = ZrRepository;
//# sourceMappingURL=zr.repository.js.map