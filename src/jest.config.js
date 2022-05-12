const baseConfig = require('../jest.config');

module.exports = {
  ...baseConfig,
  displayName: 'docs',
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1'
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/src/tsconfig.spec.json'
    }
  },
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/projects/'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/projects/'
  ],
  coverageDirectory: '<rootDir>/coverage/docs'
};
