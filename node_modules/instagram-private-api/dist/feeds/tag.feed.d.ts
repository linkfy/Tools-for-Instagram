import { Feed } from '../core/feed';
import { TagFeedResponse, TagFeedResponseItemsItem } from '../responses';
export declare class TagFeed extends Feed<TagFeedResponse, TagFeedResponseItemsItem> {
    tag: string;
    private nextMaxId;
    state: TagFeedResponse;
    request(): Promise<TagFeedResponse>;
    items(): Promise<TagFeedResponseItemsItem[]>;
}
