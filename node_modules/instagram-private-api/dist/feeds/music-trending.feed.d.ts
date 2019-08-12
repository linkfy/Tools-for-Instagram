import { Feed } from '../core/feed';
import { MusicTrendingFeedResponseItemsItem, MusicTrendingFeedResponseRootObject } from '../responses';
import { IgAppModule } from '../types/common.types';
export declare class MusicTrendingFeed extends Feed<MusicTrendingFeedResponseRootObject, MusicTrendingFeedResponseItemsItem> {
    protected nextCursor?: string;
    product: IgAppModule;
    items(): Promise<MusicTrendingFeedResponseItemsItem[]>;
    request(): Promise<MusicTrendingFeedResponseRootObject>;
    protected state: MusicTrendingFeedResponseRootObject;
    isMoreAvailable(): boolean;
}
