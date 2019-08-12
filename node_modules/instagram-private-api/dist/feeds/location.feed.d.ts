import { Feed } from '../core/feed';
import { LocationFeedResponse, LocationFeedResponseMedia } from '../responses';
export declare class LocationFeed extends Feed<LocationFeedResponse, LocationFeedResponseMedia> {
    id: string | number;
    tab: 'recent' | 'ranked';
    private nextMaxId;
    private nextPage;
    private nextMediaIds;
    protected state: LocationFeedResponse;
    request(): Promise<LocationFeedResponse>;
    items(): Promise<LocationFeedResponseMedia[]>;
}
