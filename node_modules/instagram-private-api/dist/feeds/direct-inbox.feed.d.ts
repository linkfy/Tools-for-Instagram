import { Feed } from '../core/feed';
import { DirectInboxFeedResponse, DirectInboxFeedResponseThreadsItem } from '../responses';
import { DirectThreadEntity } from '../entities';
export declare class DirectInboxFeed extends Feed<DirectInboxFeedResponse, DirectInboxFeedResponseThreadsItem> {
    private cursor;
    private seqId;
    state: DirectInboxFeedResponse;
    request(): Promise<DirectInboxFeedResponse>;
    items(): Promise<DirectInboxFeedResponseThreadsItem[]>;
    records(): Promise<DirectThreadEntity[]>;
}
