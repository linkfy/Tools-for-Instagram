# Attempt

[![Greenkeeper badge](https://badges.greenkeeper.io/lifeomic/attempt.svg)](https://greenkeeper.io/) [![Build Status](https://travis-ci.org/lifeomic/attempt.svg?branch=master)](https://travis-ci.org/lifeomic/attempt) [![Coverage Status](https://coveralls.io/repos/github/lifeomic/attempt/badge.svg?branch=master)](https://coveralls.io/github/lifeomic/attempt?branch=master) [![npm version](https://badge.fury.io/js/%40lifeomic%2Fattempt.svg)](https://badge.fury.io/js/%40lifeomic%2Fattempt)

This library exports a `retry(...)` function that can be used to invoke
a function that returns a `Promise` multiple times until returned
`Promise` is resolved or the max number of attempts is reached.

The delay between each attempt is configurable and allows multiple
retry strategies.

The following features are supported:

- Fixed delay between attempts
- Exponential backoff
- Exponential backoff with [jitter](<https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/>)
- Abort retries early
- Abort due to timeout
- Error handler for each attempt

## Installation

**Using NPM:**
```bash
npm install @lifeomic/attempt --save
```

**Using Yarn:**
```bash
yarn add @lifeomic/attempt
```

## Usage

**Node.js / CommonJS:**

```js
const retry = require('@lifeomic/attempt').retry;
```

**ES6 / TypeScript**

```js
import { retry } from '@lifeomic/attempt';
```

```js
try {
  const result = await retry(async (context) => {
    // some code that returns a promise or resolved value
  }, options);
} catch (err) {
  // If the max number of attempts was exceeded then `err`
  // will be the last error that was thrown.
  //
  // If error is due to timeout then `err.code` will be the
  // string `ATTEMPT_TIMEOUT`.
}
```

The `options` argument is optional, and when absent the default values
are assigned. All times/durations are in milliseconds.

The following object shows the default options:

```js
{
  delay: 200,
  maxAttempts: 3,
  initialDelay: 0,
  minDelay: 0,
  maxDelay: 0,
  factor: 0,
  timeout: 0,
  jitter: false,
  handleError: null,
  handleTimeout: null,
  beforeAttempt: null,
  calculateDelay: null
}
```

**NOTE:**

If you are using a JavaScript runtime that doesn't support modern
JavaScript features such as `async`/`await` then you will need to
use a transpiler such as `babel` to transpile the JavaScript code
to your target environment.

**Supported `options`:**

- **`delay`**: `Number`

  The delay between each attempt in milliseconds.
  You can provide a `factor` to have the `delay` grow exponentially.

  (default: `200`)

- **`initialDelay`**: `Number`

  The `intialDelay` is the amount of time to
  wait before making the first attempt. This option should typically
  be `0` since you typically want the first attempt to happen immediately.

  (default: `0`)

- **`maxDelay`**: `Number`

  The `maxDelay` option is used to set an upper bound
  for the delay when `factor` is enabled. A value of `0` can be provided
  if there should be no upper bound when calculating delay.

  (default: `0`)

- **`factor`**: `Number`

  The `factor` option is used to grow the `delay`
  exponentially. For example, a value of `2` will cause the delay to
  double each time. A value of `3` will cause the delay to triple
  each time. Fractional factors (e.g. `1.5`) are also allowed.

  The following formula is used to calculate delay using the factor:

  `delay = delay * Math.pow(factor, attemptNum)`

  (default: `0`)

- **`maxAttempts`**: `Number`

  The maximum number of attempts or `0` if there
  is no limit on number of attempts.

  (default: `3`)

- **`timeout`**: `Number`

  A timeout in milliseconds. If `timeout` is non-zero then a timer is
  set using `setTimeout`. If the timeout is triggered then future attempts
  will be aborted.

  The `handleTimeout` function can be used to implement fallback
  functionality.

  (default: `0`)

- **`jitter`**: `Boolean`

  If `jitter` is `true` then the calculated delay will
   be a random integer value between `minDelay` and the calculated delay
   for the current iteration.

   The following formula is used to calculate delay using `jitter`:

   `delay = Math.random() * (delay - minDelay) + minDelay`

   (default: `false`)

- **`minDelay`**: `Number`

  `minDelay` is used to set a lower bound of delay
  when `jitter` is enabled. This property has no effect if `jitter`
  is disabled.

  (default: `0`)

- **`handleError`**: `(err, context, options) => void`

  `handleError` is a function that will be invoked when an error occurs
  for an attempt. The first argument is the error and the second
  argument is the context.

- **`handleTimeout`**: `(context, options) => Promise | void`

  `handleTimeout` is invoked if a timeout occurs when using a non-zero
  `timeout`. The `handleTimeout` function should return a `Promise`
  that will be the return value of the `retry()` function.

- **`beforeAttempt`**: `(context, options) => void`

  The `beforeAttempt` function is invoked before each attempt.
  Calling `context.abort()` will abort the attempt and stop retrying.

- **`calculateDelay`**: `(context, options) => Number`

  The `calculateDelay` function can be used to override the default
  delay calculation. Your provided function should return an integer value
  that is the calculated delay for a given attempt.

  Information in the provided `context` and `options` arguments should be
  used in the calculation.

  When `calculateDelay` is provided,
  any option that is used to calculate delay
  (`delay`, `jitter`, `maxDelay`, `factor`, etc.) will be ignored.

**The `context` has the following properties:**

- **`attemptNum`**: `Number`

  A zero-based index of the current attempt
  number (`0`, `1`, `2`, etc.).

- **`attemptsRemaining`**: `Number`

  The number of attempts remaining. The initial value is `maxAttempts`
  or `-1` if `maxAttempts` is `0` (unbounded).

- **`abort`**: `() => void`

  The `abort` function can be called when handling
  an error via `handleError` or when `beforeAttempt` function is invoked.
  The abort function should be used to prevent any further attempts in cases
  when an error indicates that we should not retry.

  For example, an HTTP request that returns an HTTP
  error code of `400` (Bad Request) should not be retried because there is
  a problem with the input (and retrying will not fix this).
  However, a request that returns `504` (Gateway Timeout) should be
  retried because it might be a temporary problem.

## Recipes

### Retry with defaults

```js
// Try the given operation up to 3 times with a delay of 200 between
// each attempt
const result = await retry(async function() {
  // do something that returns a promise
});
```

### Stop retrying if an error indicates that we should not retry

```js
// Try the given operation update to 4 times. The initial delay will be 0
// and subsequent delays will be 200, 400, 800
const result = await retry(async function() {
  // do something that returns a promise
}, {
  delay: 200,
  factor: 2,
  maxAttempts: 4,
  handleError (err, context) {
    if (err.retryable === false) {
      // We should abort because error indicates that request is not retryable
      context.abort();
    }
  }
});
```

### Retry with exponential backoff

```js
// Try the given operation update to 4 times. The initial delay will be 0
// and subsequent delays will be 200, 400, 800 (delay doubles each time due
// to factor of `2`)
const result = await retry(async function() {
  // do something that returns a promise
}, {
  delay: 200,
  factor: 2,
  maxAttempts: 4
});
```

### Retry with exponential backoff and max delay

```js
// Try the given operation up to 5 times. The initial delay will be 0
// and subsequent delays will be 200, 400, 500, 500 (capped at `maxDelay`)
const result = await retry(async function() {
  // do something that returns a promise
}, {
  delay: 200,
  factor: 2,
  maxAttempts: 5,
  maxDelay: 500
});
```

### Retry with exponential backoff, jitter, min delay, and max delay

```js
// Try the given operation 3 times. The initial delay will be 0
// and subsequent delays will be in the following range:
// - 100 to 200
// - 100 to 400
// - 100 to 500 (capped at `maxDelay`)
// - 100 to 500 (capped at `maxDelay`)
const result = await retry(async function() {
  // do something that returns a promise
}, {
  delay: 200,
  factor: 2,
  maxAttempts: 5,
  minDelay: 100,
  maxDelay: 500,
  jitter: true
});
```

### Stop retrying if there is a timeout

```js
// Try the given operation up to 5 times. The initial delay will be 0
// and subsequent delays will be 200, 400, 800, 1600.
//
// If an attempt fails to complete after 1 second then the retries
// are aborted and error with `code` `ATTEMPT_TIMEOUT` is thrown.
const result = await retry(async function() {
  // do something that returns a promise
}, {
  delay: 200,
  factor: 2,
  maxAttempts: 5,
  timeout: 1000
});
```

### Stop retrying if there is a timeout but provide a fallback

```js
// Try the given operation up to 5 times. The initial delay will be 0
// and subsequent delays will be 200, 400, 800, 1600.
//
// If an attempt fails to complete after 1 second then the retries
// are aborted and the `handleTimeout` implements some fallback logic.
const result = await retry(async function() {
  // do something that returns a promise
}, {
  delay: 200,
  factor: 2,
  maxAttempts: 5,
  timeout: 1000,
  async handleTimeout (context) {
    // do something that returns a promise or throw your own error
  }
});
```
