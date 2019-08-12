import { Repository } from '../core/repository';
import { UserRepositoryInfoResponseUser, UserRepositorySearchResponseRootObject, UserRepositorySearchResponseUsersItem } from '../responses';
export declare class UserRepository extends Repository {
    info(id: string | number): Promise<UserRepositoryInfoResponseUser>;
    arlinkDownloadInfo(): Promise<any>;
    search(username: string): Promise<UserRepositorySearchResponseRootObject>;
    searchExact(username: string): Promise<UserRepositorySearchResponseUsersItem>;
    accountDetails(id?: string | number): Promise<any>;
    formerUsernames(id?: string | number): Promise<any>;
    sharedFollowerAccounts(id: string | number): Promise<any>;
    flagUser(id: string | number): Promise<any>;
    getIdByUsername(username: string): Promise<number>;
}
