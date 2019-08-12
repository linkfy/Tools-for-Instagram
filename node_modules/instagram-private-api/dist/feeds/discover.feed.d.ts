import { Feed } from '../core/feed';
import { DiscoverFeedResponseRootObject, DiscoverFeedResponseUser } from '../responses';
export declare class DiscoverFeed extends Feed<DiscoverFeedResponseRootObject, DiscoverFeedResponseUser> {
    private nextMaxId;
    state: DiscoverFeedResponseRootObject;
    request(): Promise<DiscoverFeedResponseRootObject>;
    items(): Promise<DiscoverFeedResponseUser[]>;
}
