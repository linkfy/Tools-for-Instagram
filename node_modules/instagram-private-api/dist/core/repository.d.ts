import { IgApiClient } from './client';
export declare abstract class Repository {
    protected client: IgApiClient;
    constructor(client: IgApiClient);
}
