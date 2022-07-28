globalThis.ngJest = {
  skipNgcc: true,
  tsconfig: './tsconfig.spec.json',
};

module.exports = {
  preset: 'jest-preset-angular',
  displayName: 'hxui',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  coverageDirectory: '../../coverage/docs',
};
