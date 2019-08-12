"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class LocationSearch extends repository_1.Repository {
    async index(latitude, longitude, searchQuery) {
        const queryOrTimestamp = typeof searchQuery === 'undefined' ? { timestamp: Date.now() } : { search_query: searchQuery };
        const { body } = await this.client.request.send({
            url: '/api/v1/location_search/',
            method: 'GET',
            qs: Object.assign({ _uuid: this.client.state.uuid, _uid: this.client.state.cookieUserId, _csrftoken: this.client.state.cookieCsrfToken, rank_token: '', latitude,
                longitude }, queryOrTimestamp),
        });
        return body;
    }
}
exports.LocationSearch = LocationSearch;
//# sourceMappingURL=location-search.repository.js.map