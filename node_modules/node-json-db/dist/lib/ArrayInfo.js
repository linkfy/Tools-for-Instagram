"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Errors_1 = require("./Errors");
function isInt(value) {
    return !isNaN(value) &&
        Number(value) == value && !isNaN(parseInt(value, 10));
}
exports.arrayRegex = () => /^([a-zA-Z_$][0-9a-zA-Z_$]*)\[((?!(\]|\[)).*|)\]$/gm;
const regexCache = {};
class ArrayInfo {
    constructor(property, index) {
        this.index = 0;
        this.append = false;
        this.property = property;
        this.append = index === "";
        if (isInt(index)) {
            this.index = parseInt(index);
        }
        else if (!this.append) {
            throw new Errors_1.DataError("Only numerical values accepted for array index", 200);
        }
    }
    /**
     * Check if the property want to access an Array
     * @param property
     */
    static processArray(property) {
        if (typeof property === 'undefined') {
            return null;
        }
        if (regexCache[property]) {
            return regexCache[property];
        }
        const arrayIndexRegex = exports.arrayRegex();
        const match = arrayIndexRegex.exec(property.trim());
        if (match != null) {
            return (regexCache[property] = new ArrayInfo(match[1], match[2]));
        }
        return null;
    }
    /**
     * Get the index for the array
     * @param data
     * @param avoidProperty
     */
    getIndex(data, avoidProperty) {
        if (avoidProperty === undefined) {
            avoidProperty = false;
        }
        if (this.append) {
            return -1;
        }
        const index = this.index;
        if (index == -1) {
            const dataIterable = avoidProperty ? data : data[this.property];
            if (dataIterable.length === 0) {
                return 0;
            }
            return dataIterable.length - 1;
        }
        return index;
    }
    /**
     * Get the Data
     * @param data
     */
    getData(data) {
        if (this.append) {
            throw new Errors_1.DataError("Can't get data when appending", 100);
        }
        const index = this.getIndex(data);
        return data[this.property][index];
    }
    /**
     * Set the data for the array
     * @param data
     * @param value
     */
    setData(data, value) {
        if (this.append) {
            data[this.property].push(value);
        }
        else {
            const index = this.getIndex(data);
            data[this.property][index] = value;
        }
    }
    /**
     * Delete the index from the array
     * @param data
     */
    delete(data) {
        if (this.append) {
            throw new Errors_1.DataError("Can't delete an appended data", 10);
        }
        const index = this.getIndex(data);
        data[this.property].splice(index, 1);
    }
    /**
     * Check if the ArrayInfo is valid for the given data
     * @param data
     */
    isValid(data) {
        const index = this.getIndex(data);
        return data[this.property].hasOwnProperty(index);
    }
}
exports.ArrayInfo = ArrayInfo;
//# sourceMappingURL=ArrayInfo.js.map