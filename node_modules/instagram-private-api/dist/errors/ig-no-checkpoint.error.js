"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ig_client_error_1 = require("./ig-client.error");
class IgNoCheckpointError extends ig_client_error_1.IgClientError {
    constructor(message = 'No checkpoint data available') {
        super(message);
    }
}
exports.IgNoCheckpointError = IgNoCheckpointError;
//# sourceMappingURL=ig-no-checkpoint.error.js.map