import { Repository } from '../core/repository';
import { MediaEditResponseRootObject, MediaInfoResponseRootObject, MediaRepositoryLikersResponseRootObject, StatusResponse, MediaRepositoryListReelMediaViewerResponseRootObject } from '../responses';
import { IgAppModule, LikeRequestOptions, UnlikeRequestOptions, MediaConfigureStoryPhotoOptions, MediaConfigureStoryVideoOptions, MediaConfigureTimelineOptions, MediaConfigureSidecarOptions, MediaConfigureTimelineVideoOptions } from '../types';
import { MediaRepositoryConfigureResponseRootObject } from '../responses/media.repository.configure.response';
export declare class MediaRepository extends Repository {
    info(mediaId: string): Promise<MediaInfoResponseRootObject>;
    editMedia({ mediaId, captionText, }: {
        mediaId: string;
        captionText: string;
    }): Promise<MediaEditResponseRootObject>;
    delete({ mediaId, mediaType, }: {
        mediaId: string;
        mediaType?: 'PHOTO' | 'VIDEO' | 'CAROUSEL';
    }): Promise<any>;
    private likeAction;
    like(options: LikeRequestOptions): Promise<any>;
    unlike(options: UnlikeRequestOptions): Promise<any>;
    comment({ mediaId, text, module, }: {
        mediaId: string;
        text: string;
        module?: string;
    }): Promise<import("../responses").MediaRepositoryCommentResponseComment>;
    likers(id: string): Promise<MediaRepositoryLikersResponseRootObject>;
    blocked(): Promise<string[]>;
    uploadFinish(options: {
        upload_id: string;
        source_type: string;
        video?: {
            length: number;
            clips?: Array<{
                length: number;
                source_type: string;
            }>;
            poster_frame_index?: number;
            audio_muted?: boolean;
        };
    }): Promise<any>;
    private applyConfigureDefaults;
    configure(options: MediaConfigureTimelineOptions): Promise<MediaRepositoryConfigureResponseRootObject>;
    configureVideo(options: MediaConfigureTimelineVideoOptions): Promise<MediaRepositoryConfigureResponseRootObject>;
    private static stringifyStoryStickers;
    configureToStory(options: MediaConfigureStoryPhotoOptions): Promise<any>;
    configureToStoryVideo(options: MediaConfigureStoryVideoOptions): Promise<any>;
    configureSidecar(options: MediaConfigureSidecarOptions): Promise<any>;
    seen(reels: {
        [item: string]: [string];
    }, module?: IgAppModule): Promise<StatusResponse>;
    listReelMediaViewer(mediaId: string | number): Promise<MediaRepositoryListReelMediaViewerResponseRootObject>;
    save(mediaId: string): Promise<any>;
    unsave(mediaId: string): Promise<any>;
}
