"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
const Chance = require("chance");
class LiveRepository extends repository_1.Repository {
    async muteComment(broadcastId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/mute_comment/`,
            method: 'POST',
            form: this.client.request.sign({
                _csrftoken: this.client.state.cookieCsrfToken,
                _uid: this.client.state.cookieUserId,
                _uuid: this.client.state.uuid,
            }),
        });
        return body;
    }
    async getComment({ broadcastId, commentsRequested = 4, lastCommentTs, }) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/get_comment/`,
            method: 'GET',
            qs: {
                num_comments_requested: commentsRequested,
                last_comment_ts: lastCommentTs || 0,
            },
        });
        return body;
    }
    async heartbeatAndGetViewerCount(broadcastId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/heartbeat_and_get_viewer_count/`,
            form: {
                _csrftoken: this.client.state.cookieCsrfToken,
                offset_to_video_start: 0,
                _uuid: this.client.state.uuid,
            },
            method: 'POST',
        });
        return body;
    }
    async info(broadcastId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/info/`,
            method: 'GET',
        });
        return body;
    }
    async getFinalViewerList(broadcastId) {
        const { body } = await this.client.request.send({
            url: `api/v1/live/${broadcastId}/get_final_viewer_list/`,
            method: 'GET',
        });
        return body;
    }
    async unmuteComment(broadcastId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/unmute_comment/`,
            method: 'POST',
            form: this.client.request.sign({
                _csrftoken: this.client.state.cookieCsrfToken,
                _uid: this.client.state.cookieUserId,
                _uuid: this.client.state.uuid,
            }),
        });
        return body;
    }
    async create({ previewHeight = 1184, previewWidth = 720, message = '', }) {
        const { body } = await this.client.request.send({
            url: '/api/v1/live/create/',
            method: 'POST',
            form: this.client.request.sign({
                _csrftoken: this.client.state.cookieCsrfToken,
                _uuid: this.client.state.uuid,
                preview_width: previewWidth,
                preview_height: previewHeight,
                broadcast_message: message,
                broadcast_type: 'RTMP',
                internal_only: 0,
            }),
        });
        return body;
    }
    async getViewerList(broadcastId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/get_viewer_list/`,
            method: 'GET',
        });
        return body;
    }
    async createQuestion(broadcastId, question) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/questions/`,
            method: 'POST',
            form: {
                _csrftoken: this.client.state.cookieCsrfToken,
                _uuid: this.client.state.uuid,
                text: question,
            },
        });
        return body;
    }
    async activateQuestion(broadcastId, questionId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/question/${questionId}/activate/`,
            method: 'POST',
            form: {
                _csrftoken: this.client.state.cookieCsrfToken,
                _uuid: this.client.state.uuid,
            },
        });
        return body;
    }
    async deactivateQuestion(broadcastId, questionId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/question/${questionId}/deactivate/`,
            method: 'POST',
            form: {
                _csrftoken: this.client.state.cookieCsrfToken,
                _uuid: this.client.state.uuid,
            },
        });
        return body;
    }
    async getQuestions() {
        const { body } = await this.client.request.send({
            url: '/api/v1/live/get_questions/',
            method: 'GET',
        });
        return body;
    }
    async wave(broadcastId, viewerId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/wave/`,
            method: 'POST',
            form: this.client.request.sign({
                viewer_id: viewerId,
                _csrftoken: this.client.state.cookieCsrfToken,
                _uid: this.client.state.cookieUserId,
                _uuid: this.client.state.uuid,
            }),
        });
        return body;
    }
    async like(broadcastId, likeCount = 1) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/like/`,
            method: 'POST',
            form: this.client.request.sign({
                _csrftoken: this.client.state.cookieCsrfToken,
                _uid: this.client.state.cookieUserId,
                _uuid: this.client.state.uuid,
                user_like_count: likeCount,
            }),
        });
        return body;
    }
    async getLikeCount(broadcastId, likeTs = 0) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/get_like_count/`,
            method: 'GET',
            qs: {
                like_ts: likeTs,
            },
        });
        return body;
    }
    async resumeBroadcastAfterContentMatch(broadcastId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/resume_broadcast_after_content_match/`,
            method: 'POST',
            form: this.client.request.sign({
                _csrftoken: this.client.state.cookieCsrfToken,
                _uid: this.client.state.cookieUserId,
                _uuid: this.client.state.uuid,
            }),
        });
        return body;
    }
    async getJoinRequestCounts({ broadcastId, lastTotalCount = 0, lastSeenTs = 0, lastFetchTs = 0, }) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/get_join_request_counts/`,
            method: 'GET',
            qs: {
                last_total_count: lastTotalCount,
                last_seen_ts: lastSeenTs,
                last_fetch_ts: lastFetchTs,
            },
        });
        return body;
    }
    async start(broadcastId, sendNotifications = true) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/start/`,
            method: 'POST',
            form: this.client.request.sign({
                _csrftoken: this.client.state.cookieCsrfToken,
                _uuid: this.client.state.uuid,
                should_send_notifications: sendNotifications,
            }),
        });
        return body;
    }
    async endBroadcast(broadcastId, endAfterCopyrightWarning = false) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/end_broadcast/`,
            method: 'POST',
            form: this.client.request.sign({
                _csrftoken: this.client.state.cookieCsrfToken,
                _uid: this.client.state.cookieUserId,
                _uuid: this.client.state.uuid,
                end_after_copyright_warning: endAfterCopyrightWarning,
            }),
        });
        return body;
    }
    async comment(broadcastId, message) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/comment/`,
            method: 'POST',
            form: this.client.request.sign({
                user_breadcrumb: this.client.request.userBreadcrumb(message.length),
                idempotence_token: new Chance().guid(),
                comment_text: message,
                live_or_vod: '1',
                offset_to_video_start: '0',
                _csrftoken: this.client.state.cookieCsrfToken,
                _uid: this.client.state.cookieUserId,
                _uuid: this.client.state.uuid,
            }),
        });
        return body;
    }
    async pinComment(broadcastId, commentId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/pin_comment/`,
            method: 'POST',
            form: this.client.request.sign({
                offset_to_video_start: 0,
                comment_id: commentId,
                _csrftoken: this.client.state.cookieCsrfToken,
                _uid: this.client.state.cookieUserId,
                _uuid: this.client.state.uuid,
            }),
        });
        return body;
    }
    async unpinComment(broadcastId, commentId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/unpin_comment/`,
            method: 'POST',
            form: this.client.request.sign({
                offset_to_video_start: 0,
                comment_id: commentId,
                _csrftoken: this.client.state.cookieCsrfToken,
                _uid: this.client.state.cookieUserId,
                _uuid: this.client.state.uuid,
            }),
        });
        return body;
    }
    async getLiveQuestions(broadcastId) {
        const { body } = await this.client.request.send({
            url: `/api/v1/live/${broadcastId}/questions/`,
            method: 'POST',
            form: this.client.request.sign({
                sources: 'story_and_live',
            }),
        });
        return body;
    }
}
exports.LiveRepository = LiveRepository;
//# sourceMappingURL=live.repository.js.map