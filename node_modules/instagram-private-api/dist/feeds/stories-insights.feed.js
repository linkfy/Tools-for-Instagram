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
class StoriesInsightsFeed extends feed_1.Feed {
    constructor() {
        super(...arguments);
        this.nextCursor = null;
    }
    async items() {
        const body = await this.request();
        return body.data.user.business_manager.stories_unit.stories.edges;
    }
    async request() {
        const body = await this.client.ads.graphQL({
            surface: { friendlyName: 'IgInsightsStoryGridSurfaceQuery' },
            documentId: '1995528257207653',
            variables: {
                count: 15,
                cursor: this.nextCursor,
                IgInsightsGridMediaImage_SIZE: 256,
                queryParams: {
                    access_token: '',
                    id: this.client.state.cookieUserId,
                },
                timeframe: this.timeframe,
            },
        });
        this.state = body;
        return body;
    }
    set state(response) {
        const { end_cursor, has_next_page } = response.data.user.business_manager.stories_unit.stories.page_info;
        this.nextCursor = end_cursor;
        this.moreAvailable = has_next_page;
    }
}
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], StoriesInsightsFeed.prototype, "timeframe", void 0);
__decorate([
    class_transformer_1.Expose(),
    __metadata("design:type", String)
], StoriesInsightsFeed.prototype, "nextCursor", void 0);
exports.StoriesInsightsFeed = StoriesInsightsFeed;
//# sourceMappingURL=stories-insights.feed.js.map