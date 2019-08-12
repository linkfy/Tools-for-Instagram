"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("./repository");
const entities_1 = require("../entities");
class EntityFactory extends repository_1.Repository {
    directThread(id) {
        const thread = new entities_1.DirectThreadEntity(this.client);
        if (id instanceof Array) {
            thread.userIds = id;
        }
        else {
            thread.threadId = id;
        }
        return thread;
    }
    profile(pk) {
        const thread = new entities_1.ProfileEntity(this.client);
        thread.pk = pk;
        return thread;
    }
}
exports.EntityFactory = EntityFactory;
//# sourceMappingURL=entity.factory.js.map