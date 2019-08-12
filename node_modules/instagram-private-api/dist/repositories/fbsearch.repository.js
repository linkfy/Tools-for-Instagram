"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class FbsearchRepository extends repository_1.Repository {
    async suggestedSearches(type) {
        const { body } = await this.client.request.send({
            url: '/api/v1/fbsearch/suggested_searches/',
            qs: {
                type,
            },
        });
        return body;
    }
    async recentSearches() {
        const { body } = await this.client.request.send({
            url: '/api/v1/fbsearch/recent_searches/',
        });
        return body;
    }
    async topsearchFlat(query) {
        const { body } = await this.client.request.send({
            url: '/api/v1/fbsearch/topsearch_flat/',
            qs: {
                timezone_offset: this.client.state.timezoneOffset,
                count: 30,
                query,
                context: 'blended',
            },
        });
        return body;
    }
    async places(query) {
        const { body } = await this.client.request.send({
            url: '/api/v1/fbsearch/places/',
            qs: {
                timezone_offset: this.client.state.timezoneOffset,
                count: 30,
                query,
            },
        });
        return body;
    }
}
exports.FbsearchRepository = FbsearchRepository;
//# sourceMappingURL=fbsearch.repository.js.map