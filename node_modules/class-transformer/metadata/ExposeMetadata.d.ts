import { ExposeOptions } from "./ExposeExcludeOptions";
export declare class ExposeMetadata {
    target: Function;
    propertyName: string;
    options: ExposeOptions;
    constructor(target: Function, propertyName: string, options: ExposeOptions);
}
