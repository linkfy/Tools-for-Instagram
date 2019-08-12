import { Repository } from '../core/repository';
import { LiveSwitchCommentsResponseRootObject, LiveCreateBroadcastResponseRootObject, LiveStartBroadcastResponseRootObject, LiveCommentsResponseRootObject, LiveHeartbeatViewerCountResponseRootObject, LiveInfoResponseRootObject, LiveFinalViewersResponseRootObject, LiveViewerListResponseRootObject, LiveGetQuestionsResponseRootObject, LiveLikeResponseRootObject, LiveLikeCountResponseRootObject, LiveJoinRequestCountsResponseRootObject } from '../responses';
export declare class LiveRepository extends Repository {
    muteComment(broadcastId: string): Promise<LiveSwitchCommentsResponseRootObject>;
    getComment({ broadcastId, commentsRequested, lastCommentTs, }: {
        broadcastId: string;
        commentsRequested?: number;
        lastCommentTs?: string | number;
    }): Promise<LiveCommentsResponseRootObject>;
    heartbeatAndGetViewerCount(broadcastId: string): Promise<LiveHeartbeatViewerCountResponseRootObject>;
    info(broadcastId: string): Promise<LiveInfoResponseRootObject>;
    getFinalViewerList(broadcastId: string): Promise<LiveFinalViewersResponseRootObject>;
    unmuteComment(broadcastId: string): Promise<LiveSwitchCommentsResponseRootObject>;
    create({ previewHeight, previewWidth, message, }: {
        previewHeight?: number | string;
        previewWidth?: number | string;
        message?: string;
    }): Promise<LiveCreateBroadcastResponseRootObject>;
    getViewerList(broadcastId: string): Promise<LiveViewerListResponseRootObject>;
    createQuestion(broadcastId: string, question: string): Promise<any>;
    activateQuestion(broadcastId: string, questionId: string): Promise<any>;
    deactivateQuestion(broadcastId: string, questionId: string): Promise<any>;
    getQuestions(): Promise<LiveGetQuestionsResponseRootObject>;
    wave(broadcastId: string, viewerId: string): Promise<any>;
    like(broadcastId: string, likeCount?: number): Promise<LiveLikeResponseRootObject>;
    getLikeCount(broadcastId: string, likeTs?: string | number): Promise<LiveLikeCountResponseRootObject>;
    resumeBroadcastAfterContentMatch(broadcastId: string): Promise<any>;
    getJoinRequestCounts({ broadcastId, lastTotalCount, lastSeenTs, lastFetchTs, }: {
        broadcastId: string;
        lastTotalCount: number | string;
        lastSeenTs: number | string;
        lastFetchTs: number | string;
    }): Promise<LiveJoinRequestCountsResponseRootObject>;
    start(broadcastId: string, sendNotifications?: boolean): Promise<LiveStartBroadcastResponseRootObject>;
    endBroadcast(broadcastId: string, endAfterCopyrightWarning?: boolean): Promise<any>;
    comment(broadcastId: string, message: string): Promise<any>;
    pinComment(broadcastId: string, commentId: string): Promise<any>;
    unpinComment(broadcastId: string, commentId: string): Promise<any>;
    getLiveQuestions(broadcastId: string): Promise<any>;
}
