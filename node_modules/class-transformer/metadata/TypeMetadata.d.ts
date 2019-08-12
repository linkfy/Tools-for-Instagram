import { TypeHelpOptions, TypeOptions } from "./ExposeExcludeOptions";
export declare class TypeMetadata {
    target: Function;
    propertyName: string;
    reflectedType: any;
    typeFunction: (options?: TypeHelpOptions) => Function;
    options: TypeOptions;
    constructor(target: Function, propertyName: string, reflectedType: any, typeFunction: (options?: TypeHelpOptions) => Function, options: TypeOptions);
}
