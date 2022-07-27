const baseConfig = require('../jest.config');

globalThis.ngJest = {
  skipNgcc: true,
  tsconfig: './tsconfig.spec.json',
};

module.exports = {
  ...baseConfig,
  displayName: 'docs',
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    // https://github.com/JsDaddy/ngx-mask/issues/962#issuecomment-1029284593
    'ngx-mask': '<rootDir>/node_modules/ngx-mask/fesm2015/ngx-mask.mjs',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/src/tsconfig.spec.json',
    },
  },
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/projects/',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/projects/',
  ],
  coverageDirectory: '<rootDir>/coverage/docs',
};
