import { KeyValue } from "./Utils";
export declare const arrayRegex: () => RegExp;
export declare class ArrayInfo {
    readonly property: string;
    readonly index: number;
    readonly append: boolean;
    constructor(property: string, index: any);
    /**
     * Check if the property want to access an Array
     * @param property
     */
    static processArray(property?: string): ArrayInfo | null;
    /**
     * Get the index for the array
     * @param data
     * @param avoidProperty
     */
    getIndex(data: KeyValue, avoidProperty?: boolean): number;
    /**
     * Get the Data
     * @param data
     */
    getData(data: KeyValue): any;
    /**
     * Set the data for the array
     * @param data
     * @param value
     */
    setData(data: KeyValue, value: any): void;
    /**
     * Delete the index from the array
     * @param data
     */
    delete(data: KeyValue): void;
    /**
     * Check if the ArrayInfo is valid for the given data
     * @param data
     */
    isValid(data: KeyValue): boolean;
}
