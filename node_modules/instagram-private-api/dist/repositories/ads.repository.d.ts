import { Repository } from '../core/repository';
import { GraphQLRequestOptions } from '../types';
export declare class AdsRepository extends Repository {
    graphQL<T extends {
        data: any;
    }>(options: GraphQLRequestOptions): Promise<T>;
}
