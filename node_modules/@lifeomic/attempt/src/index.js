"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyDefaults(options) {
    if (!options) {
        options = {};
    }
    return {
        delay: (options.delay === undefined) ? 200 : options.delay,
        initialDelay: (options.initialDelay === undefined) ? 0 : options.initialDelay,
        minDelay: (options.minDelay === undefined) ? 0 : options.minDelay,
        maxDelay: (options.maxDelay === undefined) ? 0 : options.maxDelay,
        factor: (options.factor === undefined) ? 0 : options.factor,
        maxAttempts: (options.maxAttempts === undefined) ? 3 : options.maxAttempts,
        timeout: (options.timeout === undefined) ? 0 : options.timeout,
        jitter: (options.jitter === true),
        handleError: (options.handleError === undefined) ? null : options.handleError,
        handleTimeout: (options.handleTimeout === undefined) ? null : options.handleTimeout,
        beforeAttempt: (options.beforeAttempt === undefined) ? null : options.beforeAttempt,
        calculateDelay: (options.calculateDelay === undefined) ? null : options.calculateDelay
    };
}
async function sleep(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    });
}
exports.sleep = sleep;
function defaultCalculateDelay(context, options) {
    let delay = options.delay;
    if (delay === 0) {
        // no delay between attempts
        return 0;
    }
    if (options.factor) {
        delay *= Math.pow(options.factor, context.attemptNum - 1);
        if (options.maxDelay !== 0) {
            delay = Math.min(delay, options.maxDelay);
        }
    }
    if (options.jitter) {
        // Jitter will result in a random value between `minDelay` and
        // calculated delay for a given attempt.
        // See https://www.awsarchitectureblog.com/2015/03/backoff.html
        // We're using the "full jitter" strategy.
        const min = Math.ceil(options.minDelay);
        const max = Math.floor(delay);
        delay = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return Math.round(delay);
}
exports.defaultCalculateDelay = defaultCalculateDelay;
async function retry(attemptFunc, attemptOptions) {
    const options = applyDefaults(attemptOptions);
    for (const prop of [
        'delay',
        'initialDelay',
        'minDelay',
        'maxDelay',
        'maxAttempts',
        'timeout'
    ]) {
        const value = options[prop];
        if (!Number.isInteger(value) || (value < 0)) {
            throw new Error(`Value for ${prop} must be an integer greater than or equal to 0`);
        }
    }
    if ((options.factor.constructor !== Number) || (options.factor < 0)) {
        throw new Error(`Value for factor must be a number greater than or equal to 0`);
    }
    if (options.delay < options.minDelay) {
        throw new Error(`delay cannot be less than minDelay (delay: ${options.delay}, minDelay: ${options.minDelay}`);
    }
    const context = {
        attemptNum: 0,
        attemptsRemaining: options.maxAttempts ? options.maxAttempts : -1,
        aborted: false,
        abort() {
            context.aborted = true;
        }
    };
    const calculateDelay = options.calculateDelay || defaultCalculateDelay;
    async function makeAttempt() {
        if (options.beforeAttempt) {
            options.beforeAttempt(context, options);
        }
        if (context.aborted) {
            const err = new Error(`Attempt aborted`);
            err.code = 'ATTEMPT_ABORTED';
            throw err;
        }
        const onError = async (err) => {
            if (options.handleError) {
                options.handleError(err, context, options);
            }
            if (context.aborted || (context.attemptsRemaining === 0)) {
                throw err;
            }
            // We are about to try again so increment attempt number
            context.attemptNum++;
            const delay = calculateDelay(context, options);
            if (delay) {
                await sleep(delay);
            }
            return makeAttempt();
        };
        if (context.attemptsRemaining > 0) {
            context.attemptsRemaining--;
        }
        if (options.timeout) {
            return new Promise((resolve, reject) => {
                const timer = setTimeout(() => {
                    if (options.handleTimeout) {
                        resolve(options.handleTimeout(context, options));
                    }
                    else {
                        const err = new Error(`Retry timeout (attemptNum: ${context.attemptNum}, timeout: ${options.timeout})`);
                        err.code = 'ATTEMPT_TIMEOUT';
                        reject(err);
                    }
                }, options.timeout);
                attemptFunc(context, options).then((result) => {
                    clearTimeout(timer);
                    resolve(result);
                }).catch((err) => {
                    clearTimeout(timer);
                    resolve(onError(err));
                });
            });
        }
        else {
            // No timeout provided so wait indefinitely for the returned promise
            // to be resolved.
            return attemptFunc(context, options).catch(onError);
        }
    }
    const initialDelay = options.calculateDelay
        ? options.calculateDelay(context, options)
        : options.initialDelay;
    if (initialDelay) {
        await sleep(initialDelay);
    }
    return makeAttempt();
}
exports.retry = retry;
