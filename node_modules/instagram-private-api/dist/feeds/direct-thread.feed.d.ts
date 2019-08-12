import { Feed } from '../core/feed';
import { DirectThreadFeedResponse, DirectThreadFeedResponseItemsItem } from '../responses';
export declare class DirectThreadFeed extends Feed<DirectThreadFeedResponse, DirectThreadFeedResponseItemsItem> {
    id: string;
    seqId: number;
    cursor: string;
    state: DirectThreadFeedResponse;
    request(): Promise<DirectThreadFeedResponse>;
    items(): Promise<DirectThreadFeedResponseItemsItem[]>;
}
