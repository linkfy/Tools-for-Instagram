"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ig_client_error_1 = require("./ig-client.error");
class IgRequestsLimitError extends ig_client_error_1.IgClientError {
    constructor() {
        super('You just made too many request to instagram API');
    }
}
exports.IgRequestsLimitError = IgRequestsLimitError;
//# sourceMappingURL=ig-requests-limit.error.js.map