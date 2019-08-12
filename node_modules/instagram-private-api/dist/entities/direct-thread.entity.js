"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const urlRegex = require("url-regex");
const entity_1 = require("../core/entity");
class DirectThreadEntity extends entity_1.Entity {
    constructor() {
        super(...arguments);
        this.threadId = null;
        this.userIds = null;
    }
    async broadcastText(text) {
        const urls = text.match(urlRegex({ strict: false }));
        if (urls instanceof Array) {
            return this.broadcastLink(text, urls);
        }
        return await this.broadcast({
            item: 'text',
            form: {
                text,
            },
        });
    }
    async broadcastLink(link_text, link_urls) {
        return await this.broadcast({
            item: 'link',
            form: {
                link_text,
                link_urls: JSON.stringify(link_urls),
            },
        });
    }
    async broadcastPhoto(options) {
        const { upload_id } = await this.client.upload.photo({
            uploadId: options.uploadId,
            file: options.file,
        });
        return await this.broadcast({
            item: 'configure_photo',
            form: {
                allow_full_aspect_ratio: options.allowFullAspectRatio || true,
                upload_id,
            },
        });
    }
    async broadcastStory(file) {
        if (this.threadId === null) {
            return await this.client.publish.story({
                file,
                threadIds: [this.threadId],
            });
        }
        if (this.userIds === null) {
            return await this.client.publish.story({
                file,
                recipientUsers: this.userIds,
            });
        }
        throw new Error('DirectThread: No recipients set');
    }
    async updateTitle(title) {
        return await this.client.directThread.updateTitle(this.threadId, title);
    }
    async mute() {
        return await this.client.directThread.mute(this.threadId);
    }
    async unmute() {
        return await this.client.directThread.unmute(this.threadId);
    }
    async hide() {
        return await this.client.directThread.hide(this.threadId);
    }
    async leave() {
        return await this.client.directThread.leave(this.threadId);
    }
    async addUser(userIds) {
        return await this.client.directThread.addUser(this.threadId, userIds);
    }
    async markItemSeen(threadItemId) {
        return await this.client.directThread.markItemSeen(this.threadId, threadItemId);
    }
    async broadcast(options) {
        if (this.threadId === null && this.userIds === null) {
            throw new Error('DirectThread: No recipients set');
        }
        const baseParams = {
            item: options.item,
            form: options.form,
        };
        let params;
        if (this.threadId) {
            params = Object.assign(baseParams, { threadIds: this.threadId });
        }
        else {
            params = Object.assign(baseParams, { userIds: this.userIds });
        }
        const response = await this.client.directThread.broadcast(params);
        this.threadId = response.payload.thread_id;
        this.userIds = null;
        return response.payload;
    }
}
exports.DirectThreadEntity = DirectThreadEntity;
//# sourceMappingURL=direct-thread.entity.js.map