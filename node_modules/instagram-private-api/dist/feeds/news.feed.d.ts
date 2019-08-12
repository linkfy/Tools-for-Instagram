import { Feed } from '../core/feed';
import { NewsFeedResponseRootObject, NewsFeedResponseStoriesItem } from '../responses';
export declare class NewsFeed extends Feed<NewsFeedResponseRootObject, NewsFeedResponseStoriesItem> {
    private nextMaxId;
    state: NewsFeedResponseRootObject;
    request(): Promise<NewsFeedResponseRootObject>;
    items(): Promise<NewsFeedResponseStoriesItem[]>;
}
