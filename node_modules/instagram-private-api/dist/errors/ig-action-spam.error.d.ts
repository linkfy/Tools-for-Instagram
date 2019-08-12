import { IgResponseError } from './ig-response.error';
import { SpamResponse } from '../responses';
export declare class IgActionSpamError extends IgResponseError<SpamResponse> {
    readonly expirationDate: string | null;
}
