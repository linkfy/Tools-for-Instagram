"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class NewsRepository extends repository_1.Repository {
    async inbox() {
        const { body } = await this.client.request.send({
            url: '/api/v1/news/inbox',
            method: 'GET',
        });
        return body;
    }
}
exports.NewsRepository = NewsRepository;
//# sourceMappingURL=news.repository.js.map