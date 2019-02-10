const createLogger = require('logging');

const createPromiseLogger = (...args) => {
  const logger = createLogger.default(...args);
  const levels = Object.keys(logger);

  const promiseLogger = levels.reduce((acc, level) => {
    // Wrap each logger level in a function which returns its argument.
    acc[level] = (...messages) => {
      return (promiseResult) => {
        logger[level](...messages);
        return promiseResult;
      };
    }
    return acc;
  }, {});

  return promiseLogger;
}

module.exports = createPromiseLogger;