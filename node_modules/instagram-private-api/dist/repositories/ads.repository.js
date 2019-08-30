"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class AdsRepository extends repository_1.Repository {
    async graphQL(options) {
        const { body } = await this.client.request.send({
            url: '/api/v1/ads/graphql/',
            method: 'POST',
            qs: Object.assign({ locale: this.client.state.language, vc_policy: 'insights_policy' }, (options.surface.name ? { surface: options.surface.name } : {})),
            form: {
                access_token: options.accessToken,
                fb_api_caller_class: 'RelayModern',
                fb_api_req_friendly_name: options.surface.friendlyName,
                doc_id: options.documentId,
                variables: JSON.stringify(options.variables),
            },
        }, true);
        return body;
    }
}
exports.AdsRepository = AdsRepository;
//# sourceMappingURL=ads.repository.js.map