"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const crypto_1 = require("crypto");
const rxjs_1 = require("rxjs");
const attempt_1 = require("@lifeomic/attempt");
const request = require("request-promise");
const errors_1 = require("../errors");
const JSONbigInt = require("json-bigint");
const JSONbigString = JSONbigInt({ storeAsString: true });
class Request {
    constructor(client) {
        this.client = client;
        this.end$ = new rxjs_1.Subject();
        this.error$ = new rxjs_1.Subject();
        this.attemptOptions = {
            maxAttempts: 1,
        };
        this.defaults = {};
    }
    static requestTransform(body, response, resolveWithFullResponse) {
        try {
            response.body = JSONbigString.parse(body);
        }
        catch (e) {
            if (lodash_1.inRange(response.statusCode, 200, 299)) {
                throw e;
            }
        }
        return resolveWithFullResponse ? response : response.body;
    }
    async send(userOptions, onlyCheckHttpStatus) {
        const options = lodash_1.defaultsDeep(userOptions, {
            baseUrl: 'https://i.instagram.com/',
            resolveWithFullResponse: true,
            proxy: this.client.state.proxyUrl,
            simple: false,
            transform: Request.requestTransform,
            jar: this.client.state.cookieJar,
            strictSSL: false,
            gzip: true,
            headers: this.getDefaultHeaders(),
        }, this.defaults);
        const response = await this.faultTolerantRequest(options);
        process.nextTick(() => this.end$.next());
        if (response.body.status === 'ok' || (onlyCheckHttpStatus && response.statusCode === 200)) {
            return response;
        }
        const error = this.handleResponseError(response);
        process.nextTick(() => this.error$.next(error));
        throw error;
    }
    signature(data) {
        return crypto_1.createHmac('sha256', this.client.state.signatureKey)
            .update(data)
            .digest('hex');
    }
    sign(payload) {
        const json = typeof payload === 'object' ? JSON.stringify(payload) : payload;
        const signature = this.signature(json);
        return {
            ig_sig_key_version: this.client.state.signatureVersion,
            signed_body: `${signature}.${json}`,
        };
    }
    userBreadcrumb(size) {
        const term = lodash_1.random(2, 3) * 1000 + size + lodash_1.random(15, 20) * 1000;
        const textChangeEventCount = Math.round(size / lodash_1.random(2, 3)) || 1;
        const data = `${size} ${term} ${textChangeEventCount} ${Date.now()}`;
        const signature = Buffer.from(crypto_1.createHmac('sha256', this.client.state.userBreadcrumbKey)
            .update(data)
            .digest('hex')).toString('base64');
        const body = Buffer.from(data).toString('base64');
        return `${signature}\n${body}\n`;
    }
    handleResponseError(response) {
        const json = response.body;
        if (json.spam) {
            return new errors_1.IgActionSpamError(response);
        }
        if (response.statusCode === 404) {
            return new errors_1.IgNotFoundError(response);
        }
        if (typeof json.message === 'string') {
            if (json.message === 'challenge_required') {
                this.client.state.checkpoint = json;
                return new errors_1.IgCheckpointError(response);
            }
            if (['user_has_logged_out', 'login_required'].includes(json.message)) {
                return new errors_1.IgLoginRequiredError(response);
            }
            if (json.message.toLowerCase() === 'not authorized to view user') {
                return new errors_1.IgPrivateUserError(response);
            }
        }
        if (json.error_type === 'sentry_block') {
            return new errors_1.IgSentryBlockError(response);
        }
        if (json.error_type === 'inactive user') {
            return new errors_1.IgInactiveUserError(response);
        }
        return new errors_1.IgResponseError(response);
    }
    async faultTolerantRequest(options) {
        try {
            return await attempt_1.retry(async () => request(options), this.attemptOptions);
        }
        catch (err) {
            throw new errors_1.IgNetworkError(err);
        }
    }
    getDefaultHeaders() {
        return {
            'User-Agent': this.client.state.appUserAgent,
            'X-Pigeon-Session-Id': this.client.state.pigeonSessionId,
            'X-Pigeon-Rawclienttime': (Date.now() / 1000).toFixed(3),
            'X-IG-Connection-Speed': `${lodash_1.random(1000, 3700)}kbps`,
            'X-IG-Bandwidth-Speed-KBPS': '-1.000',
            'X-IG-Bandwidth-TotalBytes-B': '0',
            'X-IG-Bandwidth-TotalTime-MS': '0',
            'X-IG-Connection-Type': this.client.state.connectionTypeHeader,
            'X-IG-Capabilities': this.client.state.capabilitiesHeader,
            'X-IG-App-ID': this.client.state.fbAnalyticsApplicationId,
            'X-IG-VP9-Capable': true,
            'Accept-Language': this.client.state.language.replace('_', '-'),
            Host: 'i.instagram.com',
            'Accept-Encoding': 'gzip',
            Connection: 'Keep-Alive',
        };
    }
}
exports.Request = Request;
//# sourceMappingURL=request.js.map