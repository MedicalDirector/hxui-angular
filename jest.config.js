const esModules = ['@angular', 'rxjs'];

module.exports = {
  preset: 'jest-preset-angular',
  coverageReporters: ['html'],
  globalSetup: 'jest-preset-angular/global-setup',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!.*\\.mjs$|${esModules.join('|')})`,
  ],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
