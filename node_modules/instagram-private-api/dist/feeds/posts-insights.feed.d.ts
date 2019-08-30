import { Feed } from '../core/feed';
import { PostsInsightsFeedResponseEdgesItem, PostsInsightsFeedResponseRootObject } from '../responses';
export declare class PostsInsightsFeed extends Feed<PostsInsightsFeedResponseRootObject, PostsInsightsFeedResponseEdgesItem> {
    private options;
    private nextCursor;
    items(): Promise<PostsInsightsFeedResponseEdgesItem[]>;
    request(): Promise<PostsInsightsFeedResponseRootObject>;
    protected state: PostsInsightsFeedResponseRootObject;
}
