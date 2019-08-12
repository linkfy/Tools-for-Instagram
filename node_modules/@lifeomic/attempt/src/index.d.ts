export interface AttemptContext {
    attemptNum: number;
    attemptsRemaining: number;
    aborted: boolean;
    abort: () => void;
}
export declare type AttemptFunction<T> = (context: AttemptContext, options: AttemptOptions<T>) => Promise<T>;
export declare type BeforeAttempt<T> = (context: AttemptContext, options: AttemptOptions<T>) => void;
export declare type CalculateDelay<T> = (context: AttemptContext, options: AttemptOptions<T>) => number;
export declare type HandleError<T> = (err: any, context: AttemptContext, options: AttemptOptions<T>) => void;
export declare type HandleTimeout<T> = (context: AttemptContext, options: AttemptOptions<T>) => Promise<T>;
export interface AttemptOptions<T> {
    readonly delay: number;
    readonly initialDelay: number;
    readonly minDelay: number;
    readonly maxDelay: number;
    readonly factor: number;
    readonly maxAttempts: number;
    readonly timeout: number;
    readonly jitter: boolean;
    readonly handleError: HandleError<T> | null;
    readonly handleTimeout: HandleTimeout<T> | null;
    readonly beforeAttempt: BeforeAttempt<T> | null;
    readonly calculateDelay: CalculateDelay<T> | null;
}
export declare type PartialAttemptOptions<T> = {
    readonly [P in keyof AttemptOptions<T>]?: AttemptOptions<T>[P];
};
export declare function sleep(delay: number): Promise<{}>;
export declare function defaultCalculateDelay<T>(context: AttemptContext, options: AttemptOptions<T>): number;
export declare function retry<T>(attemptFunc: AttemptFunction<T>, attemptOptions?: PartialAttemptOptions<T>): Promise<T>;
