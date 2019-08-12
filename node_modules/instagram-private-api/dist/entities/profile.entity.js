"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("../core/entity");
class ProfileEntity extends entity_1.Entity {
    async checkFollow() {
        const friendshipStatus = await this.client.friendship.show(this.pk);
        if (friendshipStatus.following === true)
            return friendshipStatus;
        return await this.client.friendship.create(this.pk);
    }
    async checkUnfollow() {
        const friendshipStatus = await this.client.friendship.show(this.pk);
        if (friendshipStatus.following === false)
            return friendshipStatus;
        return await this.client.friendship.destroy(this.pk);
    }
}
exports.ProfileEntity = ProfileEntity;
//# sourceMappingURL=profile.entity.js.map