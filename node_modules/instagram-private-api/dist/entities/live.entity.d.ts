import { Entity } from '../core/entity';
import { LiveRtmpSettings } from '../types/live.obs-settings';
export declare class LiveEntity extends Entity {
    static getUrlAndKey(info: {
        upload_url: string;
        broadcast_id: string;
    }): LiveRtmpSettings;
}
