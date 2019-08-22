"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Config {
    constructor(filename, saveOnPush = true, humanReadable = false, separator = '/') {
        this.filename = filename;
        if (!filename.endsWith(".json")) {
            this.filename += ".json";
        }
        this.humanReadable = humanReadable;
        this.saveOnPush = saveOnPush;
        this.separator = separator;
    }
}
exports.Config = Config;
//# sourceMappingURL=JsonDBConfig.js.map