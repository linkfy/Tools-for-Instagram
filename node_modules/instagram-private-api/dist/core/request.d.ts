import { Subject } from 'rxjs';
import { AttemptOptions } from '@lifeomic/attempt';
import { Options } from 'request';
import { IgApiClient } from './client';
import { IgClientError } from '../errors';
import { IgResponse } from '../types/common.types';
declare type Payload = {
    [key: string]: any;
} | string;
interface SignedPost {
    signed_body: string;
    ig_sig_key_version: string;
}
export declare class Request {
    private client;
    end$: Subject<{}>;
    error$: Subject<IgClientError>;
    attemptOptions: Partial<AttemptOptions<any>>;
    defaults: Partial<Options>;
    constructor(client: IgApiClient);
    private static requestTransform;
    send<T = any>(userOptions: Options, onlyCheckHttpStatus?: boolean): Promise<IgResponse<T>>;
    signature(data: string): string;
    sign(payload: Payload): SignedPost;
    userBreadcrumb(size: number): string;
    private handleResponseError;
    private faultTolerantRequest;
    private getDefaultHeaders;
}
export {};
