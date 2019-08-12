import { Repository } from '../core/repository';
import { StoryServiceInput } from '../types';
export declare class StoryService extends Repository {
    seen(input: StoryServiceInput, sourceId?: string): Promise<import("../responses").StatusResponse>;
}
