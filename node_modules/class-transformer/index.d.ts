import { ClassType } from "./ClassTransformer";
import { ClassTransformOptions } from "./ClassTransformOptions";
export { ClassTransformer } from "./ClassTransformer";
export { ClassTransformOptions } from "./ClassTransformOptions";
export * from "./metadata/ExposeExcludeOptions";
export * from "./decorators";
/**
 * Converts class (constructor) object to plain (literal) object. Also works with arrays.
 */
export declare function classToPlain<T>(object: T, options?: ClassTransformOptions): Object;
export declare function classToPlain<T>(object: T[], options?: ClassTransformOptions): Object[];
/**
 * Converts class (constructor) object to plain (literal) object.
 * Uses given plain object as source object (it means fills given plain object with data from class object).
 * Also works with arrays.
 */
export declare function classToPlainFromExist<T>(object: T, plainObject: Object, options?: ClassTransformOptions): Object;
export declare function classToPlainFromExist<T>(object: T, plainObjects: Object[], options?: ClassTransformOptions): Object[];
/**
 * Converts plain (literal) object to class (constructor) object. Also works with arrays.
 */
export declare function plainToClass<T, V>(cls: ClassType<T>, plain: V[], options?: ClassTransformOptions): T[];
export declare function plainToClass<T, V>(cls: ClassType<T>, plain: V, options?: ClassTransformOptions): T;
/**
 * Converts plain (literal) object to class (constructor) object.
 * Uses given object as source object (it means fills given object with data from plain object).
 *  Also works with arrays.
 */
export declare function plainToClassFromExist<T, V>(clsObject: T[], plain: V[], options?: ClassTransformOptions): T[];
export declare function plainToClassFromExist<T, V>(clsObject: T, plain: V, options?: ClassTransformOptions): T;
/**
 * Converts class (constructor) object to new class (constructor) object. Also works with arrays.
 */
export declare function classToClass<T>(object: T, options?: ClassTransformOptions): T;
export declare function classToClass<T>(object: T[], options?: ClassTransformOptions): T[];
/**
 * Converts class (constructor) object to plain (literal) object.
 * Uses given plain object as source object (it means fills given plain object with data from class object).
 * Also works with arrays.
 */
export declare function classToClassFromExist<T>(object: T, fromObject: T, options?: ClassTransformOptions): T;
export declare function classToClassFromExist<T>(object: T, fromObjects: T[], options?: ClassTransformOptions): T[];
/**
 * Serializes given object to a JSON string.
 */
export declare function serialize<T>(object: T, options?: ClassTransformOptions): string;
export declare function serialize<T>(object: T[], options?: ClassTransformOptions): string;
/**
 * Deserializes given JSON string to a object of the given class.
 */
export declare function deserialize<T>(cls: ClassType<T>, json: string, options?: ClassTransformOptions): T;
/**
 * Deserializes given JSON string to an array of objects of the given class.
 */
export declare function deserializeArray<T>(cls: ClassType<T>, json: string, options?: ClassTransformOptions): T[];
/**
 * Enum representing the different transformation types.
 */
export declare enum TransformationType {
    PLAIN_TO_CLASS = 0,
    CLASS_TO_PLAIN = 1,
    CLASS_TO_CLASS = 2
}
