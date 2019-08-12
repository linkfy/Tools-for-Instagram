"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class SearchService extends repository_1.Repository {
    async blended(query) {
        const result = await this.client.fbsearch.topsearchFlat(query);
        return result.list;
    }
    async blendedItems(query) {
        const list = await this.blended(query);
        return list.map(item => item.user || item.hashtag || item.place);
    }
    async users(query) {
        const result = await this.client.user.search(query);
        return result.users;
    }
    async tags(query) {
        const result = await this.client.tag.search(query);
        return result.results;
    }
    async places(query) {
        const result = await this.client.fbsearch.places(query);
        return result.items;
    }
    async location(latitude, longitude, query) {
        const result = await this.client.locationSearch.index(latitude, longitude, query);
        return result.venues;
    }
}
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map