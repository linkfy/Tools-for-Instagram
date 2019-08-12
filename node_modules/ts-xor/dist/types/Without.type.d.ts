/**
 * Get the keys of T without any keys of U.
 */
export declare type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
//# sourceMappingURL=Without.type.d.ts.map