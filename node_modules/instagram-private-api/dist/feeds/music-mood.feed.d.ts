import { Feed } from '../core/feed';
import { IgAppModule } from '../types/common.types';
import { MusicMoodFeedResponseItemsItem, MusicMoodFeedResponseRootObject } from '../responses';
export declare class MusicMoodFeed extends Feed<MusicMoodFeedResponseRootObject, MusicMoodFeedResponseItemsItem> {
    protected nextCursor?: string;
    product: IgAppModule;
    id: number | string;
    items(): Promise<MusicMoodFeedResponseItemsItem[]>;
    request(): Promise<MusicMoodFeedResponseRootObject>;
    protected state: MusicMoodFeedResponseRootObject;
    isMoreAvailable(): boolean;
}
