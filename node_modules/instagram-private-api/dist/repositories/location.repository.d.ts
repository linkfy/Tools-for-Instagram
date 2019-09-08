import { Repository } from '../core/repository';
import { LocationRepositoryInfoResponseRootObject } from '../responses';
import { LocationRepositoryStoryResponseRootObject } from '../responses/location.repository.story.response';
export declare class LocationRepository extends Repository {
    info(id: number | string): Promise<LocationRepositoryInfoResponseRootObject>;
    story(id: number | string): Promise<LocationRepositoryStoryResponseRootObject>;
}
