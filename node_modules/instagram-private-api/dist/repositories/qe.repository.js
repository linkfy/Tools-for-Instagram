"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class QeRepository extends repository_1.Repository {
    syncExperiments() {
        return this.sync(this.client.state.experiments);
    }
    async syncLoginExperiments() {
        return this.sync(this.client.state.loginExperiments);
    }
    async sync(experiments) {
        let data;
        try {
            const uid = this.client.state.cookieUserId;
            data = {
                _csrftoken: this.client.state.cookieCsrfToken,
                id: uid,
                _uid: uid,
                _uuid: this.client.state.uuid,
            };
        }
        catch (_a) {
            data = {
                id: this.client.state.uuid,
            };
        }
        data = Object.assign(data, { experiments });
        const { body } = await this.client.request.send({
            method: 'POST',
            url: '/api/v1/qe/sync/',
            headers: {
                'X-DEVICE-ID': this.client.state.uuid,
            },
            form: this.client.request.sign(data),
        });
        return body;
    }
}
exports.QeRepository = QeRepository;
//# sourceMappingURL=qe.repository.js.map