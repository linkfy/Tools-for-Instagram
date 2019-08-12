"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ig_client_error_1 = require("./ig-client.error");
class IgParseError extends ig_client_error_1.IgClientError {
    constructor(body) {
        super('Not possible to parse API response');
        this.body = body;
    }
}
exports.IgParseError = IgParseError;
//# sourceMappingURL=ig-parse.error.js.map