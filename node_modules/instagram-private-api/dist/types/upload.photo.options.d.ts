/// <reference types="node" />
export interface UploadPhotoOptions {
    uploadId?: string;
    file: Buffer;
    isSidecar?: boolean;
}
