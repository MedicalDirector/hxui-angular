const baseConfig = require('../../jest.config');

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1'
  },
  displayName: 'hxui',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/projects/hx-ui/tsconfig.spec.json'
    }
  },
  coverageDirectory: '<rootDir>/coverage/hxui'
};
