import { IgResponseError } from './ig-response.error';
import { IgResponse } from '../types';
import { UploadRepositoryVideoResponseRootObject } from '../responses';
export declare class IgUploadVideoError extends IgResponseError {
    videoInfo: any;
    constructor(response: IgResponse<UploadRepositoryVideoResponseRootObject>, videoInfo: any);
}
