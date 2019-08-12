import { Repository } from '../core/repository';
export declare class QpRepository extends Repository {
    getCooldowns(): Promise<import("..").IgResponse<any>>;
    batchFetch(): Promise<import("..").IgResponse<any>>;
    surfacesToQueries: string;
    surfacesToTriggers: string;
}
