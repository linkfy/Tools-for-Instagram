"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
const errors_1 = require("../errors");
class ChallengeRepository extends repository_1.Repository {
    async state() {
        const { body } = await this.client.request.send({
            url: this.client.state.challengeUrl,
            qs: {
                guid: this.client.state.uuid,
                device_id: this.client.state.deviceId,
            },
        });
        this.middleware(body);
        return body;
    }
    async selectVerifyMethod(choice, isReplay = false) {
        let url = this.client.state.challengeUrl;
        if (isReplay) {
            url = url.replace('/challenge/', '/challenge/replay/');
        }
        const { body } = await this.client.request.send({
            url,
            method: 'POST',
            form: this.client.request.sign({
                choice,
                _csrftoken: this.client.state.cookieCsrfToken,
                guid: this.client.state.uuid,
                device_id: this.client.state.deviceId,
            }),
        });
        this.middleware(body);
        return body;
    }
    replay(choice) {
        return this.selectVerifyMethod(choice, true);
    }
    async deltaLoginReview(choice) {
        return await this.selectVerifyMethod(choice);
    }
    async sendPhoneNumber(phoneNumber) {
        const { body } = await this.client.request.send({
            url: this.client.state.challengeUrl,
            method: 'POST',
            form: this.client.request.sign({
                phone_number: String(phoneNumber),
                _csrftoken: this.client.state.cookieCsrfToken,
                guid: this.client.state.uuid,
                device_id: this.client.state.deviceId,
            }),
        });
        this.middleware(body);
        return body;
    }
    async auto(reset = false) {
        if (!this.client.state.checkpoint) {
            throw new errors_1.IgNoCheckpointError();
        }
        if (reset) {
            await this.reset();
        }
        if (!this.client.state.challenge) {
            await this.state();
        }
        const challenge = this.client.state.challenge;
        switch (challenge.step_name) {
            case 'select_verify_method': {
                return await this.selectVerifyMethod(challenge.step_data.choice);
            }
            case 'delta_login_review': {
                return await this.deltaLoginReview('0');
            }
            default: {
                return challenge;
            }
        }
    }
    async reset() {
        const { body } = await this.client.request.send({
            url: this.client.state.challengeUrl.replace('/challenge/', '/challenge/reset/'),
            method: 'POST',
            form: this.client.request.sign({
                _csrftoken: this.client.state.cookieCsrfToken,
                guid: this.client.state.uuid,
                device_id: this.client.state.deviceId,
            }),
        });
        this.middleware(body);
        return body;
    }
    async sendSecurityCode(code) {
        const { body } = await this.client.request
            .send({
            url: this.client.state.challengeUrl,
            method: 'POST',
            form: this.client.request.sign({
                security_code: code,
                _csrftoken: this.client.state.cookieCsrfToken,
                guid: this.client.state.uuid,
                device_id: this.client.state.deviceId,
            }),
        })
            .catch((error) => {
            if (error.response.statusCode === 400 && error.response.body.status === 'fail') {
                throw new errors_1.IgChallengeWrongCodeError(error.response.body.message);
            }
            throw error;
        });
        this.middleware(body);
        return body;
    }
    middleware(body) {
        if (body.action === 'close') {
            this.client.state.checkpoint = null;
            this.client.state.challenge = null;
        }
        else {
            this.client.state.challenge = body;
        }
    }
}
exports.ChallengeRepository = ChallengeRepository;
//# sourceMappingURL=challenge.repository.js.map