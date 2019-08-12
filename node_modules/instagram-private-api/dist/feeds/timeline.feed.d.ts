import { Feed } from '../core/feed';
import { TimelineFeedReason, TimelineFeedsOptions } from '../types/timeline-feed.types';
import { TimelineFeedResponse, TimelineFeedResponseMedia_or_ad } from '../responses';
export declare class TimelineFeed extends Feed<TimelineFeedResponse, TimelineFeedResponseMedia_or_ad> {
    tag: string;
    private nextMaxId;
    reason: TimelineFeedReason;
    state: any;
    request(options?: TimelineFeedsOptions): Promise<TimelineFeedResponse>;
    items(): Promise<TimelineFeedResponseMedia_or_ad[]>;
}
