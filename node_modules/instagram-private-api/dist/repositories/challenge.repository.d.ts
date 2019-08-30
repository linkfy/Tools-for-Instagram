import { Repository } from '../core/repository';
import { ChallengeStateResponse } from '../responses';
export declare class ChallengeRepository extends Repository {
    state(): Promise<ChallengeStateResponse>;
    selectVerifyMethod(choice: string, isReplay?: boolean): Promise<ChallengeStateResponse>;
    replay(choice: string): Promise<ChallengeStateResponse>;
    deltaLoginReview(choice: '1' | '0'): Promise<ChallengeStateResponse>;
    sendPhoneNumber(phoneNumber: string): Promise<ChallengeStateResponse>;
    auto(reset?: boolean): Promise<ChallengeStateResponse>;
    reset(): Promise<ChallengeStateResponse>;
    sendSecurityCode(code: string | number): Promise<ChallengeStateResponse>;
    private middleware;
}
