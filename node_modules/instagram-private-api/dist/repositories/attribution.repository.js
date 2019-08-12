"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class AttributionRepository extends repository_1.Repository {
    async logAttribution() {
        const { body } = await this.client.request.send({
            method: 'POST',
            url: '/api/v1/attribution/log_attribution/',
            form: this.client.request.sign({
                adid: this.client.state.adid,
            }),
        });
        return body;
    }
    async logResurrectAttribution() {
        try {
            const { body } = await this.client.request.send({
                method: 'POST',
                url: '/api/v1/attribution/log_resurrect_attribution/',
                form: this.client.request.sign({
                    _csrftoken: this.client.state.cookieCsrfToken,
                    _uid: this.client.state.cookieUserId,
                    adid: this.client.state.adid,
                    _uuid: this.client.state.uuid,
                }),
            });
            return body;
        }
        catch (e) {
            return e;
        }
    }
}
exports.AttributionRepository = AttributionRepository;
//# sourceMappingURL=attribution.repository.js.map