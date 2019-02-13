const { default: createLogger } = require('logging');

const createPromiseLogger = (...args) => {
  const logger = createLogger(...args);
  const levels = Object.keys(logger);

  const promiseLogger = levels.reduce((acc, level) => {
    // Make each logger level return an identity function.
    acc[level] = (...messages) => {
      logger[level](...messages);

      return promiseResult => promiseResult;
    };

    // Make each logger level an identity function.
    acc[`${level}Id`] = (promiseResult) => {
      logger[level](promiseResult);

      return promiseResult;
    };

    return acc;
  }, {});

  return promiseLogger;
};

module.exports = createPromiseLogger;
