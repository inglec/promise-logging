# PromiseLogging

This module acts as a wrapper for the [logging](https://www.npmjs.com/package/logging) package to simplify printing intermediate values in Promise chains.

## Installation

`npm install git+https://github.com/inglec/promise-logging.git`

## Initialisation

```js
const createPromiseLogger = require('promise-logging');

const logger = createPromiseLogger('FeatureName');
```

## Example

```js
logger.info('Beginning Promise chain');

promise1
  // Log without resolved value.
  .then(logger.infoAwait('Passing resolved value to next .then'))
  .then(value1 => promise2(value1))

  // Log with resolved value.
  .then(value2 => logger.infoAwait(`Passing ${value2} to next .then`)(value2))
  .then(value2 => promise3(value2))

  // Log only resolved value.
  .then(logger.infoId)
  .then(value3 => promise4(value3));
```

## Features

### Logging Functions

The [levels](https://github.com/dylang/logging#usage) already exposed by the logging package are retained:
* `debug(...messages)`
* `error(...messages)`
* `fatal(...messages)`
* `info(...messages)`
* `trace(...messages)`
* `warn(...messages)`

Returns: `null`.

#### Example

```js
logger.info('Initialising', moduleName);
```

### Await Functions

The following functions are suffixed by `Await`:

* `debugAwait(...messages)`
* `errorAwait(...messages)`
* `fatalAwait(...messages)`
* `infoAwait(...messages)`
* `traceAwait(...messages)`
* `warnAwait(...messages)`

Returns: `value => value`.

#### Examples

These levels return the identity function, which can be used to pass a resolved value to the next `.then` in a Promise chain. The message is **not logged** until this identity function is called.
```js
promise1
  .then(logger.infoAwait('Passing resolved value to next .then'))
  .then(value1 => promise2(value1))
```

```js
promise1
  .then(value1 => logger.infoAwait(`Passing ${value1} to next .then`)(value1))
  .then(value1 => promise2(value1))
```

### Identity Functions

The following functions are suffixed by `Id`:
* `debugId(message)`
* `errorId(message)`
* `fatalId(message)`
* `infoId(message)`
* `traceId(message)`
* `warnId(message)`

Returns: `message`.

#### Example

These are useful for logging just the resolved value in a promise chain.

```js
promise1
  .then(logger.infoId)
  .then(value1 => promise2(value1))
```
