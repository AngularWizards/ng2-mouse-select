// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  var configuration =
    {

      basePath: './',
      frameworks: ['jasmine', '@angular/cli'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage-istanbul-reporter'),
        require('@angular/cli/plugins/karma'),
        // require('karma-requirejs'),
      ],
      files: [
        // for Travis
        'node_modules/zone.js/dist/zone.js',
        'node_modules/zone.js/dist/long-stack-trace-zone.js',
        'node_modules/zone.js/dist/proxy.js',
        'node_modules/zone.js/dist/sync-test.js',
        'node_modules/zone.js/dist/jasmine-patch.js',
        'node_modules/zone.js/dist/async-test.js',
        'node_modules/zone.js/dist/fake-async-test.js',
        // 'node_modules/core-js/es7/reflect.js',
        // 'node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js',
        // 'node_modules/jasmine-core/lib/jasmine-core/boot.js',

        { pattern: 'node_modules/@angular/**/*.js', included: false, watched: false, served: true },
        { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false, served: true },
        { pattern: 'src/**/*.ts', included: false, watched: true }, // source files
        { pattern: 'playground/**/*.ts', included: false, watched: true }, // test files
      ],
      client: {
        clearContext: false // leave Jasmine Spec Runner output visible in browser
      },
      coverageIstanbulReporter: {
        reports: ['html', 'lcovonly'],
        fixWebpackSourcePaths: true
      },
      angularCli: {
        environment: 'dev'
      },
      reporters: ['progress', 'kjhtml'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: false,
      browsers: ['Chrome'],
      singleRun: true,
      customLaunchers: {
        Chrome_travis_ci: {
          base: 'Chrome',
          flags: ['--no-sandbox']
        }
      }
    };
    if (process.env.TRAVIS){
      configuration.browsers=['Chrome_travis_ci'];
    }
  config.set(configuration);
};
