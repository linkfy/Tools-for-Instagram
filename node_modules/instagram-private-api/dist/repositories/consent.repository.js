"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
const Chance = require("chance");
const Bluebird = require("bluebird");
class ConsentRepository extends repository_1.Repository {
    async auto() {
        const response = await this.existingUserFlow();
        if (response.screen_key === 'already_finished') {
            return response;
        }
        const dob = new Chance().birthday();
        await Bluebird.try(() => this.existingUserFlowIntro()).catch(() => { });
        await Bluebird.try(() => this.existingUserFlowTosAndTwoAgeButton()).catch(() => { });
        await Bluebird.try(() => this.existingUserFlowDob(dob.getFullYear(), dob.getMonth(), dob.getDay())).catch(() => { });
        return true;
    }
    existingUserFlowIntro() {
        return this.existingUserFlow({
            current_screen_key: 'qp_intro',
            updates: JSON.stringify({ existing_user_intro_state: '2' }),
        });
    }
    existingUserFlowDob(year, month, day) {
        return this.existingUserFlow({
            current_screen_key: 'dob',
            day: String(day),
            month: String(month),
            year: String(year),
        });
    }
    existingUserFlowTosAndTwoAgeButton() {
        return this.existingUserFlow({
            current_screen_key: 'tos_and_two_age_button',
            updates: JSON.stringify({ age_consent_state: '2', tos_data_policy_consent_state: '2' }),
        });
    }
    async existingUserFlow(data) {
        const { body } = await this.client.request.send({
            url: '/api/v1/consent/existing_user_flow/',
            method: 'POST',
            form: this.client.request.sign(Object.assign({ _csrftoken: this.client.state.cookieCsrfToken, _uid: this.client.state.cookieUserId, _uuid: this.client.state.uuid }, data)),
        });
        return body;
    }
}
exports.ConsentRepository = ConsentRepository;
//# sourceMappingURL=consent.repository.js.map