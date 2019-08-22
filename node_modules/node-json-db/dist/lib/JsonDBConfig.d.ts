export interface JsonDBConfig {
    filename: string;
    saveOnPush: boolean;
    humanReadable: boolean;
    separator: string;
}
export declare class Config implements JsonDBConfig {
    filename: string;
    humanReadable: boolean;
    saveOnPush: boolean;
    separator: string;
    constructor(filename: string, saveOnPush?: boolean, humanReadable?: boolean, separator?: string);
}
