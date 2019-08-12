import { Repository } from '../core/repository';
import { LocationRepositorySearchResponseRootObject } from '../responses';
export declare class LocationSearch extends Repository {
    index(latitude: number, longitude: number, searchQuery?: string): Promise<LocationRepositorySearchResponseRootObject>;
}
