import { Repository } from '../core/repository';
import { UploadPhotoOptions } from '../types/upload.photo.options';
import { UploadRepositoryPhotoResponseRootObject } from '../responses';
import { UploadVideoOptions } from '../types/upload.video.options';
export declare class UploadRepository extends Repository {
    private chance;
    photo(options: UploadPhotoOptions): Promise<UploadRepositoryPhotoResponseRootObject>;
    video(options: UploadVideoOptions): Promise<any>;
}
