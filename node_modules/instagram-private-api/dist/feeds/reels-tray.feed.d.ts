import { Feed } from '../core/feed';
import { ReelsTrayFeedResponseRootObject, ReelsTrayFeedResponseTrayItem } from '../responses';
export declare class ReelsTrayFeed extends Feed<ReelsTrayFeedResponseRootObject, ReelsTrayFeedResponseTrayItem> {
    reason: 'cold_start' | 'pull_to_refresh';
    protected state: ReelsTrayFeedResponseRootObject;
    items(): Promise<ReelsTrayFeedResponseTrayItem[]>;
    request(): Promise<ReelsTrayFeedResponseRootObject>;
}
