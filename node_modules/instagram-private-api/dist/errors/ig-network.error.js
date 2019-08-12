"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ig_client_error_1 = require("./ig-client.error");
class IgNetworkError extends ig_client_error_1.IgClientError {
    constructor(e) {
        super();
        Object.assign(this, e);
    }
}
exports.IgNetworkError = IgNetworkError;
//# sourceMappingURL=ig-network.error.js.map