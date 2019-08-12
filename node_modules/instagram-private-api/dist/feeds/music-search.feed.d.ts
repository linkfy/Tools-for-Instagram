import { Feed } from '../core/feed';
import { IgAppModule } from '../types/common.types';
import { MusicSearchFeedResponseItemsItem, MusicSearchFeedResponseRootObject } from '../responses';
export declare class MusicSearchFeed extends Feed<MusicSearchFeedResponseRootObject, MusicSearchFeedResponseItemsItem> {
    protected nextCursor?: string;
    product: IgAppModule;
    query: string;
    searchSessionId: string;
    items(): Promise<MusicSearchFeedResponseItemsItem[]>;
    request(): Promise<MusicSearchFeedResponseRootObject>;
    protected state: any;
    isMoreAvailable(): boolean;
}
