import { Repository } from '../core/repository';
export declare class SearchService extends Repository {
    blended(query: string): Promise<import("../responses").FbsearchRepositoryTopsearchFlatResponseListItem[]>;
    blendedItems(query: string): Promise<(import("../responses").FbsearchRepositoryTopsearchFlatResponsePlace | import("../responses").FbsearchRepositoryTopsearchFlatResponseHashtag | import("../responses").FbsearchRepositoryTopsearchFlatResponseUser)[]>;
    users(query: string): Promise<import("../responses").UserRepositorySearchResponseUsersItem[]>;
    tags(query: string): Promise<import("../responses").TagRepositorySearchResponseResultsItem[]>;
    places(query: string): Promise<import("../responses").FbsearchRepositoryPlacesResponseItemsItem[]>;
    location(latitude: number, longitude: number, query?: string): Promise<import("../responses").LocationRepositorySearchResponseVenuesItem[]>;
}
