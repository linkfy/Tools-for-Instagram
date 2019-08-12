/// <reference types="request" />
import { Cookie, CookieJar, MemoryCookieStore } from 'tough-cookie';
import { ChallengeStateResponse, CheckpointResponse } from '../responses';
export declare class State {
    signatureKey: string;
    signatureVersion: string;
    userBreadcrumbKey: string;
    appVersion: string;
    appVersionCode: string;
    fbAnalyticsApplicationId: string;
    fbOtaFields: string;
    fbOrcaApplicationId: string;
    loginExperiments: string;
    experiments: string;
    supportedCapabilities: ({
        "name": string;
        "value": string;
    } | {
        "name": string;
        "value": number;
    })[];
    language: string;
    timezoneOffset: string;
    radioType: string;
    capabilitiesHeader: string;
    connectionTypeHeader: string;
    deviceString: string;
    build: string;
    uuid: string;
    phoneId: string;
    adid: string;
    deviceId: string;
    proxyUrl: string;
    cookieStore: MemoryCookieStore;
    cookieJar: import("request").CookieJar;
    checkpoint: CheckpointResponse | null;
    challenge: ChallengeStateResponse | null;
    clientSessionIdLifetime: number;
    pigeonSessionIdLifetime: number;
    readonly clientSessionId: string;
    readonly pigeonSessionId: string;
    readonly appUserAgent: string;
    readonly webUserAgent: string;
    readonly devicePayload: {
        android_version: string;
        android_release: string;
        manufacturer: string;
        model: string;
    };
    readonly batteryLevel: number;
    readonly isCharging: boolean;
    readonly challengeUrl: string;
    readonly cookieCsrfToken: string;
    readonly cookieUserId: string;
    readonly cookieUsername: string;
    isExperimentEnabled(experiment: any): boolean;
    extractCookie(key: string): Cookie | null;
    extractCookieValue(key: string): string;
    extractUserId(): string;
    deserializeCookieJar(cookies: string): Promise<void>;
    serializeCookieJar(): Promise<CookieJar.Serialized>;
    generateDevice(seed: string): void;
    private generateTemporaryGuid;
}
