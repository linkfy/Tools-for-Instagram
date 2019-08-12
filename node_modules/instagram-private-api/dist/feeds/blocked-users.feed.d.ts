import { Feed } from '../core/feed';
import { BlockedUsersFeedResponseRootObject, BlockedUsersFeedResponseBlockedListItem } from '../responses';
export declare class BlockedUsersFeed extends Feed<BlockedUsersFeedResponseRootObject, BlockedUsersFeedResponseBlockedListItem> {
    private nextMaxId;
    state: BlockedUsersFeedResponseRootObject;
    request(): Promise<BlockedUsersFeedResponseRootObject>;
    items(): Promise<BlockedUsersFeedResponseBlockedListItem[]>;
}
