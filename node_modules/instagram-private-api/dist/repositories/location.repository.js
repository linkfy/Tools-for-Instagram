"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class LocationRepository extends repository_1.Repository {
    async info(id) {
        const { body } = await this.client.request.send({
            url: `/api/v1/locations/${id}/info/`,
            method: 'GET',
        });
        return body;
    }
    async story(id) {
        const { body } = await this.client.request.send({
            url: `/api/v1/locations/${id}/story/`,
            method: 'GET',
        });
        return body;
    }
}
exports.LocationRepository = LocationRepository;
//# sourceMappingURL=location.repository.js.map