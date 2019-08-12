"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class CreativesRepository extends repository_1.Repository {
    async writeSupportedCapabilities() {
        const { body } = await this.client.request.send({
            url: '/api/v1/creatives/write_supported_capabilities/',
            method: 'POST',
            form: this.client.request.sign({
                supported_capabilities_new: JSON.stringify(this.client.state.supportedCapabilities),
                _csrftoken: this.client.state.cookieCsrfToken,
                _uid: this.client.state.cookieUserId,
                _uuid: this.client.state.uuid,
            }),
        });
        return body;
    }
}
exports.CreativesRepository = CreativesRepository;
//# sourceMappingURL=creatives.repository.js.map