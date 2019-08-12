import { Feed } from '../core/feed';
import { IgAppModule } from '../types/common.types';
import { MusicGenreFeedResponseItemsItem, MusicGenreFeedResponseRootObject } from '../responses';
export declare class MusicGenreFeed extends Feed<MusicGenreFeedResponseRootObject, MusicGenreFeedResponseItemsItem> {
    protected nextCursor?: string;
    product: IgAppModule;
    id: number | string;
    items(): Promise<MusicGenreFeedResponseItemsItem[]>;
    request(): Promise<MusicGenreFeedResponseRootObject>;
    protected state: MusicGenreFeedResponseRootObject;
    isMoreAvailable(): boolean;
}
