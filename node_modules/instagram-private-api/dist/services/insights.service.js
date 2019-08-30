"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class InsightsService extends repository_1.Repository {
    account(options) {
        return this.client.ads.graphQL({
            surface: {
                name: 'account',
                friendlyName: 'IgInsightsAccountInsightsWithTabsQuery',
            },
            documentId: '2552829571413315',
            variables: {
                IgInsightsGridMediaImage_SIZE: options.gridMediaSize || 256,
                activityTab: options.activityTab || true,
                audienceTab: options.audienceTab || true,
                contentTab: options.contentTab || true,
                query_params: {
                    access_token: options.accessToken || '',
                    id: options.userId || this.client.state.cookieUserId,
                },
                timezone: 'Environment/Local',
            },
        });
    }
    post(mediaId) {
        return this.client.ads.graphQL({
            surface: {
                name: 'post',
                friendlyName: 'IgInsightsPostInsightsQuery',
            },
            documentId: '2009845309144121',
            variables: {
                query_params: {
                    access_token: '',
                    id: mediaId,
                },
            },
        });
    }
    story(storyId) {
        return this.client.ads.graphQL({
            surface: {
                name: 'story',
                friendlyName: 'IgInsightsStoryInsightsAppQuery',
            },
            documentId: '2164420446988319',
            variables: {
                query_params: {
                    access_token: '',
                    id: storyId,
                },
            },
        });
    }
}
exports.InsightsService = InsightsService;
//# sourceMappingURL=insights.service.js.map