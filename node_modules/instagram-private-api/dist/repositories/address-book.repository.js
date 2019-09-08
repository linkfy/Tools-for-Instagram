"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../core/repository");
class AddressBookRepository extends repository_1.Repository {
    async link(contacts, module) {
        const { body } = await this.client.request.send({
            url: '/api/v1/address_book/link/',
            method: 'POST',
            form: {
                phone_id: this.client.state.phoneId,
                module: module || 'find_friends_contacts',
                contacts: JSON.stringify(contacts),
                _csrftoken: this.client.state.cookieCsrfToken,
                device_id: this.client.state.deviceId,
                _uuid: this.client.state.uuid,
            },
        });
        return body;
    }
    async acquireOwnerContacts(me) {
        const { body } = await this.client.request.send({
            url: '/api/v1/address_book/acquire_owner_contacts/',
            method: 'POST',
            form: {
                phone_id: this.client.state.phoneId,
                _csrftoken: this.client.state.cookieCsrfToken,
                me: JSON.stringify(me),
                _uuid: this.client.state.uuid,
            },
        });
        return body;
    }
}
exports.AddressBookRepository = AddressBookRepository;
//# sourceMappingURL=address-book.repository.js.map