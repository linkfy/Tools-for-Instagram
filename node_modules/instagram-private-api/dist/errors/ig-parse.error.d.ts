import { IgClientError } from './ig-client.error';
export declare class IgParseError extends IgClientError {
    body: string;
    constructor(body: string);
}
