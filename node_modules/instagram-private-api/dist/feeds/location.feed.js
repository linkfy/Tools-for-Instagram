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
const lodash_1 = require("lodash");
const class_transformer_1 = require("class-transformer");
const feed_1 = require("../core/feed");
class LocationFeed extends feed_1.Feed {
    constructor() {
        super(...arguments);
        this.nextMediaIds = [];
    }
    set state(body) {
        this.moreAvailable = body.more_available;
        this.nextMaxId = body.next_max_id;
        this.nextPage = body.next_page;
        this.nextMediaIds = body.next_media_ids;
    }
    async request() {
        const { body } = await this.client.request.send({
            url: `/api/v1/locations/${this.id}/sections/`,
            method: 'POST',
            form: {
                _csrftoken: this.client.state.cookieCsrfToken,
                tab: this.tab,
                _uuid: this.client.state.uuid,
                session_id: this.client.state.clientSessionId,
                page: this.nextPage,
                next_media_ids: this.nextPage ? JSON.stringify(this.nextMediaIds) : void 0,
                max_id: this.nextMaxId,
            },
        });
        this.state = body;
        return body;
    }
    async items() {
        const response = await this.request();
        return lodash_1.flatten(response.sections.map(section => section.layout_content.medias.map(medias => medias.media)));
    }
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], LocationFeed.prototype, "nextMaxId", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Number)
], LocationFeed.prototype, "nextPage", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", Array)
], LocationFeed.prototype, "nextMediaIds", void 0);
exports.LocationFeed = LocationFeed;
//# sourceMappingURL=location.feed.js.map