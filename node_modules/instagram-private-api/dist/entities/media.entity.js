"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise");
const entity_1 = require("../core/entity");
class MediaEntity extends entity_1.Entity {
    static async oembed(url) {
        return request({
            url: 'https://api.instagram.com/oembed/',
            json: true,
            qs: {
                url,
            },
        });
    }
}
exports.MediaEntity = MediaEntity;
//# sourceMappingURL=media.entity.js.map