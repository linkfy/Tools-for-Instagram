import { ClassTransformOptions } from "./ClassTransformOptions";
import { TypeMetadata } from "./metadata/TypeMetadata";
export declare enum TransformationType {
    PLAIN_TO_CLASS = 0,
    CLASS_TO_PLAIN = 1,
    CLASS_TO_CLASS = 2
}
export declare class TransformOperationExecutor {
    private transformationType;
    private options;
    private recursionStack;
    constructor(transformationType: TransformationType, options: ClassTransformOptions);
    transform(source: Object | Object[] | any, value: Object | Object[] | any, targetType: Function | TypeMetadata, arrayType: Function, isMap: boolean, level?: number): any;
    private applyCustomTransformations;
    private isCircular;
    private getReflectedType;
    private getKeys;
    private checkVersion;
    private checkGroups;
}
export declare function testForBuffer(): boolean;
