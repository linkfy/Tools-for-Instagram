import { Repository } from '../core/repository';
import { LocationRepositoryInfoResponseRootObject } from '../responses';
export declare class LocationRepository extends Repository {
    info(id: number | string): Promise<LocationRepositoryInfoResponseRootObject>;
}
