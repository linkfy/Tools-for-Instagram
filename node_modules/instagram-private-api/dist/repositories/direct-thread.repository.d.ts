import { Repository } from '../core/repository';
import { DirectThreadRepositoryAddUserResponseRootObject, DirectThreadRepositoryBroadcastResponseRootObject, DirectThreadRepositoryGetByParticipantsResponseRootObject, DirectThreadRepositoryUpdateTitleResponseRootObject, StatusResponse } from '../responses';
import { DirectThreadBroadcastOptions } from '../types';
import { DirectThreadRepositoryApproveParticipantRequestResponseRootObject } from '../responses';
export declare class DirectThreadRepository extends Repository {
    approve(threadId: string | number): Promise<StatusResponse>;
    approveMultiple(threadIds: string[] | number[]): Promise<StatusResponse>;
    decline(threadId: string | number): Promise<StatusResponse>;
    declineMultiple(threadIds: string[] | number[]): Promise<StatusResponse>;
    declineAll(): Promise<StatusResponse>;
    approveParticipantRequests(threadId: string | number, userIds: string[]): Promise<DirectThreadRepositoryApproveParticipantRequestResponseRootObject>;
    getByParticipants(recipientUsers: string[] | number[]): Promise<DirectThreadRepositoryGetByParticipantsResponseRootObject>;
    updateTitle(threadId: string | number, title: string): Promise<DirectThreadRepositoryUpdateTitleResponseRootObject>;
    mute(threadId: string | number): Promise<StatusResponse>;
    unmute(threadId: string | number): Promise<StatusResponse>;
    addUser(threadId: string | number, userIds: string[] | number[]): Promise<DirectThreadRepositoryAddUserResponseRootObject>;
    leave(threadId: string): Promise<StatusResponse>;
    hide(threadId: string): Promise<StatusResponse>;
    markItemSeen(threadId: string, threadItemId: string): Promise<StatusResponse>;
    broadcast(options: DirectThreadBroadcastOptions): Promise<DirectThreadRepositoryBroadcastResponseRootObject>;
    deleteItem(threadId: string | number, itemId: string | number): Promise<StatusResponse>;
}
