// Karma configuration file, see link for more information
// https://github.com/angular/angular-cli/blob/v11.0.0/packages/schematics/angular/application/files/karma.conf.js.template

module.exports = function (config) {
  config.set({
    basePath: 'docs',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/selectize/dist/js/standalone/selectize.js"
    ],
    preprocessors: {},
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    coverageReporter: {
      dir: require('path').join(__dirname, 'coverage/docs'), 
      reporters: [
        { type: 'html' },
        { type: 'lcovonly'}
      ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: config.angularCli && config.angularCli.codeCoverage
      ? ['progress', 'coverage-istanbul']
      : ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // browsers: ['ChromeHeadless', 'Chrome'],
    browsers: ['Chrome'],
    // customLaunchers: {
    //   ChromeHeadless: {
    //     base: 'ChromeHeadless',
    //     flags: ['--headless', '--disable-gpu', '--disable-translate', '--disable-extensions']
    //   }
    // },
    singleRun: false
  });
};
