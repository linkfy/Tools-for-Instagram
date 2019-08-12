"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ig_response_error_1 = require("./ig-response.error");
class IgActionSpamError extends ig_response_error_1.IgResponseError {
    get expirationDate() {
        const date = this.response.body.feedback_message.match(/(\d{4}-\d{2}-\d{2})/);
        if (date === null) {
            return null;
        }
        return date[0];
    }
}
exports.IgActionSpamError = IgActionSpamError;
//# sourceMappingURL=ig-action-spam.error.js.map