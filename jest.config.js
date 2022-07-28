// eslint-disable-next-line no-undef
globalThis.ngJest = {
  skipNgcc: true,
  // tsconfig: 'tsconfig.spec.json', // this is relative to each project root
};

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  globalSetup: 'jest-preset-angular/global-setup',
  coverageReporters: ['json', 'lcov', 'text', 'html'],
  coverageDirectory: '<rootDir>/coverage/combined',
  projects: ['<rootDir>/src', '<rootDir>/projects/hx-ui'],
};
