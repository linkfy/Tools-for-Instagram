import { Feed } from '../core/feed';
import { StoriesInsightsFeedResponseEdgesItem, StoriesInsightsFeedResponseRootObject } from '../responses';
export declare class StoriesInsightsFeed extends Feed<StoriesInsightsFeedResponseRootObject, StoriesInsightsFeedResponseEdgesItem> {
    private timeframe;
    private nextCursor;
    items(): Promise<StoriesInsightsFeedResponseEdgesItem[]>;
    request(): Promise<StoriesInsightsFeedResponseRootObject>;
    protected state: StoriesInsightsFeedResponseRootObject;
}
