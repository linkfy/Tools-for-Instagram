import { Repository } from '../core/repository';
import { HighlightsRepositoryCreateReelResponseRootObject, HighlightsRepositoryEditReelResponseRootObject, HighlightsRepositoryHighlightsTrayResponseRootObject, StatusResponse } from '../responses';
import { CreateHighlightsReelOptions, EditHighlightsReelOptions } from '../types';
export declare class HighlightsRepository extends Repository {
    highlightsTray(userId: string | number): Promise<HighlightsRepositoryHighlightsTrayResponseRootObject>;
    createReel(options: CreateHighlightsReelOptions): Promise<HighlightsRepositoryCreateReelResponseRootObject>;
    editReel(options: EditHighlightsReelOptions): Promise<HighlightsRepositoryEditReelResponseRootObject>;
    deleteReel(highlightId: string): Promise<StatusResponse>;
}
