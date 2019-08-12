"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_custom_error_1 = require("ts-custom-error");
class IgClientError extends ts_custom_error_1.CustomError {
    constructor(message = 'Instagram API error was made.') {
        super(message);
        Object.defineProperty(this, 'name', {
            value: new.target.name,
            enumerable: false,
        });
    }
}
exports.IgClientError = IgClientError;
//# sourceMappingURL=ig-client.error.js.map