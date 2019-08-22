export declare abstract class NestedError extends Error {
    readonly inner?: Error;
    readonly id: Number;
    constructor(message: string, id: Number, inner?: Error);
    toString(): string;
}
export declare class DatabaseError extends NestedError {
}
export declare class DataError extends NestedError {
}
