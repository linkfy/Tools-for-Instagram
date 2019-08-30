export interface GraphQLRequestOptions {
    surface: {
        name?: InsightsSurface;
        friendlyName: InsightsFriendlyName;
    };
    accessToken?: string;
    documentId: string;
    variables: any;
}
export declare type InsightsFriendlyName = 'IgInsightsAccountInsightsSurfaceQuery' | 'IgInsightsAccountInsightsWithTabsQuery' | 'IgInsightsPostGridSurfaceQuery' | 'IgInsightsPostInsightsQuery' | 'IgInsightsStoryInsightsAppQuery' | string;
export declare type InsightsSurface = 'account' | 'post' | 'story' | string;
