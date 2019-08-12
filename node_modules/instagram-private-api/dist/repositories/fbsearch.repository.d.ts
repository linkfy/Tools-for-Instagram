import { Repository } from '../core/repository';
import { FbsearchRepositoryPlacesResponseRootObject, FbsearchRepositoryTopsearchFlatResponseRootObject } from '../responses';
export declare class FbsearchRepository extends Repository {
    suggestedSearches(type: 'blended' | 'users' | 'hashtags' | 'places'): Promise<any>;
    recentSearches(): Promise<any>;
    topsearchFlat(query: string): Promise<FbsearchRepositoryTopsearchFlatResponseRootObject>;
    places(query: string): Promise<FbsearchRepositoryPlacesResponseRootObject>;
}
