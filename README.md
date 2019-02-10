# PromiseLogging

This module acts as a wrapper for the [logging](https://www.npmjs.com/package/logging) package to simplify printing intermediate values in promise chains.

## Usage

```js
const createPromiseLogger = require('promise-logging');

const logger = createPromiseLogger('FeatureName');
```

### Existing Logger Usage

The levels exposed by `logging` remain unchanged, these being:
* `.debug`
* `.error`
* `.fatal`
* `.info`
* `.trace`
* `.warn`

#### Examples

```js
logger.info('Interesting');
logger.warn('Hmm...', { details });
logger.error('Not good.', 'Not good at all.', { err }, { context }, { etc });
```

### Logger with Promises

This module wraps the `logging` functions to return a function which takes a single argument. This value is immediately returned. This can be used to pass a value to the next `.then`.

```js
const promise = logger[<LEVEL>](<MESSAGES>)(<VALUE_TO_RESOLVE>)
```

#### Example

Before:
```js
promise1
  .then((value1) => {
    logger.info(`Passing ${value1} to the next promise`);
    return promise2(value1);
  })
  .then((value2) => {
    logger.info('Resolved promise 2!')
    return promise3(value2);
  })
  ...
```

After:
```js
promise1
  .then(value1 => logger.info(`Passing ${value1} to the next promise`)(value1))
  .then(value1 => promise2(value1))
  .then(logger.info('Resolved promise 2!'))
  .then(value2 => promise3(value2))
  ...
```
