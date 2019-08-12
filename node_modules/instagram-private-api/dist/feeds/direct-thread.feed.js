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
class DirectThreadFeed extends feed_1.Feed {
    set state(body) {
        this.cursor = body.thread.oldest_cursor;
        this.moreAvailable = body.thread.has_older;
    }
    async request() {
        const { body } = await this.client.request.send({
            url: `/api/v1/direct_v2/threads/${this.id}/`,
            qs: {
                visual_message_return_type: 'unseen',
                cursor: this.cursor,
                direction: 'older',
                seq_id: this.seqId,
                limit: 10,
            },
        });
        this.state = body;
        return body;
    }
    async items() {
        const response = await this.request();
        return response.thread.items;
    }
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], DirectThreadFeed.prototype, "cursor", void 0);
exports.DirectThreadFeed = DirectThreadFeed;
//# sourceMappingURL=direct-thread.feed.js.map