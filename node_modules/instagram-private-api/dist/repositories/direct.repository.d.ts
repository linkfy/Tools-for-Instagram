import { Repository } from '../core/repository';
import { DirectRepositoryCreateGroupThreadResponseRootObject, DirectRepositoryGetPresenceResponseRootObject, DirectRepositoryRankedRecipientsResponseRootObject } from '../responses';
export declare class DirectRepository extends Repository {
    createGroupThread(recipientUsers: string[], threadTitle: string): Promise<DirectRepositoryCreateGroupThreadResponseRootObject>;
    rankedRecipients(mode?: 'raven' | 'reshare', query?: string): Promise<DirectRepositoryRankedRecipientsResponseRootObject>;
    getPresence(): Promise<DirectRepositoryGetPresenceResponseRootObject>;
}
