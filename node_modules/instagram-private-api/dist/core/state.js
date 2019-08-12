"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const Bluebird = require("bluebird");
const Chance = require("chance");
const request_1 = require("request");
const tough_cookie_1 = require("tough-cookie");
const devices = require("../samples/devices.json");
const builds = require("../samples/builds.json");
const supportedCapabilities = require("../samples/supported-capabilities.json");
const constants_1 = require("./constants");
const errors_1 = require("../errors");
class State {
    constructor() {
        this.signatureKey = constants_1.SIGNATURE_KEY;
        this.signatureVersion = constants_1.SIGNATURE_VERSION;
        this.userBreadcrumbKey = constants_1.BREADCRUMB_KEY;
        this.appVersion = constants_1.APP_VERSION;
        this.appVersionCode = constants_1.APP_VERSION_CODE;
        this.fbAnalyticsApplicationId = constants_1.FACEBOOK_ANALYTICS_APPLICATION_ID;
        this.fbOtaFields = constants_1.FACEBOOK_OTA_FIELDS;
        this.fbOrcaApplicationId = constants_1.FACEBOOK_ORCA_APPLICATION_ID;
        this.loginExperiments = constants_1.LOGIN_EXPERIMENTS;
        this.experiments = constants_1.EXPERIMENTS;
        this.supportedCapabilities = supportedCapabilities;
        this.language = 'en_US';
        this.timezoneOffset = String(new Date().getTimezoneOffset() * -60);
        this.radioType = 'wifi-none';
        this.capabilitiesHeader = '3brTvw==';
        this.connectionTypeHeader = 'WIFI';
        this.cookieStore = new tough_cookie_1.MemoryCookieStore();
        this.cookieJar = request_1.jar(this.cookieStore);
        this.checkpoint = null;
        this.challenge = null;
        this.clientSessionIdLifetime = 1200000;
        this.pigeonSessionIdLifetime = 1200000;
    }
    get clientSessionId() {
        return this.generateTemporaryGuid('clientSessionId', this.clientSessionIdLifetime);
    }
    get pigeonSessionId() {
        return this.generateTemporaryGuid('pigeonSessionId', this.pigeonSessionIdLifetime);
    }
    get appUserAgent() {
        return `Instagram ${this.appVersion} Android (${this.deviceString}; ${this.language}; ${this.appVersionCode})`;
    }
    get webUserAgent() {
        return `Mozilla/5.0 (Linux; Android ${this.devicePayload.android_release}; ${this.devicePayload.model} Build/${this.build}; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.110 Mobile Safari/537.36 ${this.appUserAgent}`;
    }
    get devicePayload() {
        const deviceParts = this.deviceString.split(';');
        const [android_version, android_release] = deviceParts[0].split('/');
        const [manufacturer] = deviceParts[3].split('/');
        const model = deviceParts[4];
        return {
            android_version,
            android_release,
            manufacturer,
            model,
        };
    }
    get batteryLevel() {
        const chance = new Chance(this.deviceId);
        const percentTime = chance.integer({ min: 200, max: 600 });
        return 100 - (Math.round(Date.now() / 1000 / percentTime) % 100);
    }
    get isCharging() {
        const chance = new Chance(`${this.deviceId}${Math.round(Date.now() / 10800000)}`);
        return chance.bool();
    }
    get challengeUrl() {
        if (!this.checkpoint) {
            throw new errors_1.IgNoCheckpointError();
        }
        return `/api/v1${this.checkpoint.challenge.api_path}`;
    }
    get cookieCsrfToken() {
        try {
            return this.extractCookieValue('csrftoken');
        }
        catch (_a) {
            return 'missing';
        }
    }
    get cookieUserId() {
        return this.extractCookieValue('ds_user_id');
    }
    get cookieUsername() {
        return this.extractCookieValue('ds_user');
    }
    isExperimentEnabled(experiment) {
        return this.experiments.includes(experiment);
    }
    extractCookie(key) {
        const cookies = this.cookieJar.getCookies(constants_1.HOST);
        return _.find(cookies, { key }) || null;
    }
    extractCookieValue(key) {
        const cookie = this.extractCookie(key);
        if (cookie === null) {
            throw new errors_1.IgCookieNotFoundError(key);
        }
        return cookie.value;
    }
    extractUserId() {
        try {
            return this.cookieUserId;
        }
        catch (e) {
            if (this.challenge === null || !this.challenge.user_id) {
                throw new errors_1.IgUserIdNotFoundError();
            }
            return String(this.challenge.user_id);
        }
    }
    async deserializeCookieJar(cookies) {
        this.cookieJar['_jar'] = await Bluebird.fromCallback(cb => tough_cookie_1.CookieJar.deserialize(cookies, this.cookieStore, cb));
    }
    async serializeCookieJar() {
        return Bluebird.fromCallback(cb => this.cookieJar['_jar'].serialize(cb));
    }
    generateDevice(seed) {
        const chance = new Chance(seed);
        this.deviceString = chance.pickone(devices);
        const id = chance.string({
            pool: 'abcdef0123456789',
            length: 16,
        });
        this.deviceId = `android-${id}`;
        this.uuid = chance.guid();
        this.phoneId = chance.guid();
        this.adid = chance.guid();
        this.build = chance.pickone(builds);
    }
    generateTemporaryGuid(seed, lifetime) {
        return new Chance(`${seed}${this.deviceId}${Math.round(Date.now() / lifetime)}`).guid();
    }
}
exports.State = State;
//# sourceMappingURL=state.js.map