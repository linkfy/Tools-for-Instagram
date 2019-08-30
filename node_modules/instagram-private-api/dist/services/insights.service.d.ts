import { Repository } from '../core/repository';
import { AccountInsightsOptions } from '../types';
import { InsightsServiceAccountResponseRootObject } from '../responses/insights.service.account.response';
import { InsightsServicePostResponseRootObject, StoriesInsightsFeedResponseRootObject } from '../responses';
export declare class InsightsService extends Repository {
    account(options: AccountInsightsOptions): Promise<InsightsServiceAccountResponseRootObject>;
    post(mediaId: string): Promise<InsightsServicePostResponseRootObject>;
    story(storyId: string): Promise<StoriesInsightsFeedResponseRootObject>;
}
