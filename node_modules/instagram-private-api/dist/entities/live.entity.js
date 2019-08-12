"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("../core/entity");
class LiveEntity extends entity_1.Entity {
    static getUrlAndKey(info) {
        const parts = info.upload_url.split(new RegExp(info.broadcast_id));
        return { stream_url: parts[0], stream_key: info.broadcast_id + parts[1] };
    }
}
exports.LiveEntity = LiveEntity;
//# sourceMappingURL=live.entity.js.map