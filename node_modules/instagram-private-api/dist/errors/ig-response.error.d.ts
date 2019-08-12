import { IgClientError } from './ig-client.error';
import { IgResponse } from '../types/common.types';
export declare class IgResponseError<TBody extends {
    [x: string]: any;
} = any> extends IgClientError {
    text: string;
    response: IgResponse<TBody>;
    constructor(response: IgResponse<TBody>);
}
