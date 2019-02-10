const { default: createLogger } = require('logging');

const createPromiseLogger = (...args) => {
  const logger = createLogger(...args);
  const levels = Object.keys(logger);

  const promiseLogger = levels.reduce((acc, level) => {
    // Wrap each logger level in a function which returns its argument.
    acc[level] = (...messages) => {
      logger[level](...messages);
      return promiseResult => promiseResult;
    }
    return acc;
  }, {});

  return promiseLogger;
}

module.exports = createPromiseLogger;
