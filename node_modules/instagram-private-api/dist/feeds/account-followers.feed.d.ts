import { Feed } from '../core/feed';
import { AccountFollowersFeedResponse, AccountFollowersFeedResponseUsersItem } from '../responses';
export declare class AccountFollowersFeed extends Feed<AccountFollowersFeedResponse, AccountFollowersFeedResponseUsersItem> {
    id: number | string;
    private nextMaxId;
    state: AccountFollowersFeedResponse;
    request(): Promise<AccountFollowersFeedResponse>;
    items(): Promise<AccountFollowersFeedResponseUsersItem[]>;
}
