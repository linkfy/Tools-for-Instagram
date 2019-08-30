"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class TagRepository extends repository_1.Repository {
    async search(q) {
        const { body } = await this.client.request.send({
            url: '/api/v1/tags/search/',
            qs: {
                timezone_offset: this.client.state.timezoneOffset,
                q,
                count: 30,
            },
        });
        return body;
    }
    async section(q, tab) {
        const { body } = await this.client.request.send({
            url: `/api/v1/tags/${encodeURI(q)}/sections/`,
            qs: {
                timezone_offset: this.client.state.timezoneOffset,
                tab: tab,
                count: 30,
            },
        });
        return body;
    }
}
exports.TagRepository = TagRepository;
//# sourceMappingURL=tag.repository.js.map