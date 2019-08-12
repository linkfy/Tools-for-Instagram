import { Repository } from '../core/repository';
export declare class QeRepository extends Repository {
    syncExperiments(): Promise<any>;
    syncLoginExperiments(): Promise<any>;
    sync(experiments: any): Promise<any>;
}
