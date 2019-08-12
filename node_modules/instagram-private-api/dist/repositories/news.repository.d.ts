import { Repository } from '../core/repository';
import { NewsRepositoryInboxResponseRootObject } from '../responses';
export declare class NewsRepository extends Repository {
    inbox(): Promise<NewsRepositoryInboxResponseRootObject>;
}
