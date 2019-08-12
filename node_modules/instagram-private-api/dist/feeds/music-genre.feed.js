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
const feed_1 = require("../core/feed");
const class_transformer_1 = require("class-transformer");
class MusicGenreFeed extends feed_1.Feed {
    async items() {
        const response = await this.request();
        return response.items;
    }
    async request() {
        const { body } = await this.client.request.send({
            url: `/api/v1/music/genres/${this.id}/`,
            method: 'POST',
            form: {
                cursor: this.nextCursor || '0',
                _csrftoken: this.client.state.cookieCsrfToken,
                product: this.product,
                _uuid: this.client.state.uuid,
                browse_session_id: this.client.state.clientSessionId,
            },
        });
        this.state = body;
        return body;
    }
    set state(response) {
        this.nextCursor = response.page_info.next_max_id;
        this.moreAvailable = response.page_info.more_available;
    }
    isMoreAvailable() {
        return this.moreAvailable;
    }
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], MusicGenreFeed.prototype, "nextCursor", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], MusicGenreFeed.prototype, "product", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Object)
], MusicGenreFeed.prototype, "id", void 0);
exports.MusicGenreFeed = MusicGenreFeed;
//# sourceMappingURL=music-genre.feed.js.map