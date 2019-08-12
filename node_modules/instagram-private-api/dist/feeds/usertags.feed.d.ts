import { Feed } from '../core/feed';
import { UsertagsFeedResponseItemsItem, UsertagsFeedResponseRootObject } from '../responses';
export declare class UsertagsFeed extends Feed<UsertagsFeedResponseRootObject, UsertagsFeedResponseItemsItem> {
    id: number | string;
    private nextMaxId;
    protected state: UsertagsFeedResponseRootObject;
    request(): Promise<UsertagsFeedResponseRootObject>;
    items(): Promise<UsertagsFeedResponseItemsItem[]>;
}
