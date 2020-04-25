// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require("karma-spec-reporter"),
      require("karma-junit-reporter")
    ],
    customLaunchers: {
      ChromeHeadless: {
          base: "Chrome",
          flags: [
              "--headless",
              "--disable-gpu",
              "--no-sandbox",
              "--remote-debugging-port=9222",
              "--disable-web-security"
          ]
      },
      ChromeDebug: {
          base: "Chrome",
          flags: [
              "--disable-gpu",
              "--no-sandbox",
              "--remote-debugging-port=9222",
              "--disable-web-security"
          ]
      }
  },
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: "test-results/coverage",
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    browserSocketTimeout: 60000,
    browserNoActivityTimeout: 60000,
    browserDisconnectTimeout: 60000,
    browserDisconnectTolerance: 5,

    junitReporter: {
      outputDir: "test-results/junit",
      outputFile: "tests-unit/unit.xml",
      suite: "unit"
  },
  
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
