"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const feed_1 = require("../core/feed");
const responses_1 = require("../responses");
class BlockedUsersFeed extends feed_1.Feed {
    set state(body) {
        this.moreAvailable = !!body.next_max_id;
        this.nextMaxId = body.next_max_id;
    }
    async request() {
        const { body } = await this.client.request.send({
            url: `/api/v1/users/blocked_list/`,
            qs: {
                max_id: this.nextMaxId,
            },
        });
        this.state = body;
        return body;
    }
    async items() {
        const body = await this.request();
        return body.blocked_list.map(user => class_transformer_1.plainToClassFromExist(new responses_1.BlockedUsersFeedResponseBlockedListItem(this.client), user));
    }
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], BlockedUsersFeed.prototype, "nextMaxId", void 0);
exports.BlockedUsersFeed = BlockedUsersFeed;
//# sourceMappingURL=blocked-users.feed.js.map