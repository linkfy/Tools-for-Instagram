"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ig_client_error_1 = require("./ig-client.error");
class IgUserIdNotFoundError extends ig_client_error_1.IgClientError {
    constructor() {
        super(`Could not extract userid (pk)`);
    }
}
exports.IgUserIdNotFoundError = IgUserIdNotFoundError;
//# sourceMappingURL=ig-user-id-not-found.error.js.map