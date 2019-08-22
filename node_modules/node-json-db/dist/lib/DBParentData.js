"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayInfo_1 = require("./ArrayInfo");
const Errors_1 = require("./Errors");
class DBParentData {
    constructor(data, db, dataPath, parent) {
        this.parent = parent;
        this.data = data;
        this.db = db;
        this.dataPath = dataPath;
    }
    /**
     * Check if it's an array
     * @param deletion
     */
    checkArray(deletion = false) {
        const arrayInfo = ArrayInfo_1.ArrayInfo.processArray(this.parent);
        if (arrayInfo && (!arrayInfo.append || deletion) && !arrayInfo.isValid(this.data)) {
            throw new Errors_1.DataError("DataPath: /" + this.dataPath + ". Can't find index " + arrayInfo.index + " in array " + arrayInfo.property, 10);
        }
        return arrayInfo;
    }
    /**
     * Get the data linked to this path
     */
    getData() {
        if (this.parent === undefined) {
            return this.data;
        }
        const arrayInfo = this.checkArray();
        if (arrayInfo) {
            return arrayInfo.getData(this.data);
        }
        else {
            return this.data[this.parent];
        }
    }
    /**
     * Set the data to the wanted path
     * @param toSet
     */
    setData(toSet) {
        if (this.parent === undefined) {
            this.db.resetData(toSet);
            return;
        }
        const arrayInfo = ArrayInfo_1.ArrayInfo.processArray(this.parent);
        if (arrayInfo) {
            if (!this.data.hasOwnProperty(arrayInfo.property)) {
                this.data[arrayInfo.property] = [];
            }
            else if (!Array.isArray(this.data[arrayInfo.property])) {
                throw new Errors_1.DataError("DataPath: /" + this.dataPath + ". " + arrayInfo.property + " is not an array.", 11);
            }
            arrayInfo.setData(this.data, toSet);
        }
        else {
            this.data[this.parent] = toSet;
        }
    }
    /**
     * Delete the data of the current path
     */
    delete() {
        if (this.parent === undefined) {
            this.db.resetData({});
            return;
        }
        const arrayInfo = this.checkArray(true);
        if (arrayInfo) {
            arrayInfo.delete(this.data);
        }
        else {
            delete this.data[this.parent];
        }
    }
}
exports.DBParentData = DBParentData;
//# sourceMappingURL=DBParentData.js.map