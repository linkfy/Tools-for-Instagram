export interface KeyValue {
    [key: string]: any;
}
export declare const merge: (...arrays: KeyValue[]) => KeyValue;
export declare const removeTrailingChar: (dataPath: string, trailing: string) => string;
