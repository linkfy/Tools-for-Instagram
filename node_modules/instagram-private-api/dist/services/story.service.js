"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class StoryService extends repository_1.Repository {
    seen(input, sourceId = null) {
        let items;
        if (input instanceof Array) {
            items = input;
        }
        else {
            items = Object.values(input).reduce((accumulator, current) => accumulator.concat(current.items), []);
        }
        const reels = {};
        const maxSeenAt = Math.floor(Date.now() / 1000);
        let seenAt = maxSeenAt - items.length;
        for (const item of items) {
            const itemTakenAt = item.taken_at;
            if (seenAt < itemTakenAt) {
                seenAt = itemTakenAt + 1;
            }
            if (seenAt > maxSeenAt) {
                seenAt = maxSeenAt;
            }
            const itemSourceId = sourceId === null ? item.user.pk : sourceId;
            const reelId = `${item.id}_${itemSourceId}`;
            reels[reelId] = [`${itemTakenAt}_${seenAt}`];
            seenAt += 1;
        }
        return this.client.media.seen(reels);
    }
}
exports.StoryService = StoryService;
//# sourceMappingURL=story.service.js.map