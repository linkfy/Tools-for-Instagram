import { Entity } from '../core/entity';
export declare class ProfileEntity extends Entity {
    pk: string | number;
    checkFollow(): Promise<import("../responses").FriendshipRepositoryChangeResponseFriendship_status>;
    checkUnfollow(): Promise<import("../responses").FriendshipRepositoryChangeResponseFriendship_status>;
}
