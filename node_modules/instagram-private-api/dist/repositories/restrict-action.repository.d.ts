import { Repository } from '../core/repository';
import { RestrictActionRepositoryRestrictResponseRootObject } from '../responses';
export declare class RestrictActionRepository extends Repository {
    restrict(targetUserId: number | string): Promise<RestrictActionRepositoryRestrictResponseRootObject>;
    unrestrict(targetUserId: number | string): Promise<RestrictActionRepositoryRestrictResponseRootObject>;
}
