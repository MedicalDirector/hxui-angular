globalThis.ngJest = {
  skipNgcc: true,
  tsconfig: './tsconfig.spec.json',
};

module.exports = {
  displayName: 'docs',
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.spec.json',
    },
  },
  coverageDirectory: './coverage/docs',
};
