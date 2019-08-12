import { Repository } from '../core/repository';
export declare class LauncherRepository extends Repository {
    preLoginSync(): Promise<any>;
    postLoginSync(): Promise<any>;
    sync(data: Object): Promise<any>;
}
