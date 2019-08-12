import { Repository } from '../core/repository';
export declare class ConsentRepository extends Repository {
    auto(): Promise<any>;
    existingUserFlowIntro(): Promise<any>;
    existingUserFlowDob(year: string | number, month: string | number, day: string | number): Promise<any>;
    existingUserFlowTosAndTwoAgeButton(): Promise<any>;
    existingUserFlow(data?: {
        [x: string]: any;
    }): Promise<any>;
}
