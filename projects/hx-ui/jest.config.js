const baseConfig = require('../../jest.config');

globalThis.ngJest = {
  skipNgcc: true,
  tsconfig: './tsconfig.spec.json',
};

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    // https://github.com/JsDaddy/ngx-mask/issues/962#issuecomment-1029284593
    'ngx-mask': '<rootDir>/node_modules/ngx-mask/fesm2015/ngx-mask.mjs',
  },
  displayName: 'hxui',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/projects/hx-ui/tsconfig.spec.json',
    },
  },
  coverageDirectory: '<rootDir>/coverage/hxui',
};
