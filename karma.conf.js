module.exports = function (config) {

    config.set({
        basePath: '.',

        frameworks: ['jasmine', 'fixture'],

        files: [
            'node_modules/angular/angular.min.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'app/bower_components/angular-ui-router/release/resolveService.min.js',
            'app/bower_components/angular-ui-router/release/stateEvents.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'app/src/*.js',
            'app/src/**/*.js',
            'app/templateCache/templates.js',
            'stubs/**/*'
        ],


        jsonFixturesPreprocessor: {
            stripPrefix: 'stubs/',
            variableName: '__json__',
        },

        exclude: [
            '**/Gruntfile.js',
            '**/karma.conf.js'
        ],

        preprocessors: {
            'stubs/**/*': ['json_fixtures']
        },

        browsers: [
            'PhantomJS'
        ],

        browserNoActivityTimeout: 60000,


        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-fixture',
            'karma-json-fixtures-preprocessor',
            'karma-coverage'
        ],

        colors: true,

        logLevel: config.LOG_ERROR,

        reporters: [
            'dots',
        ].concat(process.env.npm_config_single_run ? ['coverage'] : []),
        //reporters: ['spec'],

        specReporter: {
            maxLogLines: 5,             // limit number of lines logged per test
            suppressErrorSummary: true, // do not print error summary
            suppressFailed: false,      // do not print information about failed tests
            suppressPassed: false,      // do not print information about passed tests
            suppressSkipped: true,      // do not print information about skipped tests
            showSpecTiming: false,      // print the time elapsed for each spec
            failFast: false,              // test would finish with error when a first fail occurs.
        }

    });
};
