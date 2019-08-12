import { Entity } from '../core/entity';
import { MediaEntityOembedResponse } from '../responses';
export declare class MediaEntity extends Entity {
    static oembed(url: string): Promise<MediaEntityOembedResponse>;
}
