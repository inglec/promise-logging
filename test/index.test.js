const createPromiseLogger = require('../src/index');

const logger = createPromiseLogger('Test PromiseLogger');
const levels = Object.keys(logger);

describe('logger returns passed value for level', () => {
  levels.forEach((level) => {
    test(level, () => {
      const func = logger[level]('Testing level ' + level);
      const value = 'test';

      expect(func(value)).toBe(value);
    });
  });
});
