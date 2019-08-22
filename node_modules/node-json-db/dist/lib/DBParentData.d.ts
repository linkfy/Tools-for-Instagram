import { KeyValue } from "./Utils";
import { JsonDB } from "../JsonDB";
export declare class DBParentData {
    readonly parent?: string;
    readonly data: KeyValue;
    readonly db: JsonDB;
    readonly dataPath: string;
    constructor(data: any, db: JsonDB, dataPath: string, parent?: string);
    /**
     * Check if it's an array
     * @param deletion
     */
    private checkArray;
    /**
     * Get the data linked to this path
     */
    getData(): any;
    /**
     * Set the data to the wanted path
     * @param toSet
     */
    setData(toSet: any): void;
    /**
     * Delete the data of the current path
     */
    delete(): void;
}
