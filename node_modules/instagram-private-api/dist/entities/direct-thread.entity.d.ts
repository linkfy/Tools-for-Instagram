/// <reference types="node" />
import { Entity } from '../core/entity';
import { DirectThreadBroadcastPhotoOptions } from '../types/direct-thread.broadcast-photo.options';
export declare class DirectThreadEntity extends Entity {
    threadId: string;
    userIds: string[];
    broadcastText(text: string): Promise<import("../responses").DirectThreadRepositoryBroadcastResponsePayload>;
    broadcastLink(link_text: string, link_urls: string[]): Promise<import("../responses").DirectThreadRepositoryBroadcastResponsePayload>;
    broadcastPhoto(options: DirectThreadBroadcastPhotoOptions): Promise<import("../responses").DirectThreadRepositoryBroadcastResponsePayload>;
    broadcastStory(file: Buffer): Promise<any>;
    updateTitle(title: string): Promise<import("../responses").DirectThreadRepositoryUpdateTitleResponseRootObject>;
    mute(): Promise<import("../responses").StatusResponse>;
    unmute(): Promise<import("../responses").StatusResponse>;
    hide(): Promise<import("../responses").StatusResponse>;
    leave(): Promise<import("../responses").StatusResponse>;
    addUser(userIds: string[] | number[]): Promise<import("../responses").DirectThreadRepositoryAddUserResponseRootObject>;
    markItemSeen(threadItemId: string): Promise<import("../responses").StatusResponse>;
    private broadcast;
}
