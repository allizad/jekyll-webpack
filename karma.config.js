/* eslint-disable */
var webpackConfig = require('./webpack.config'),
    path = require('path'),
    
    phantomPolyfill = require.resolve('phantomjs-polyfill'),
    babelPolyfill = require.resolve('babel-polyfill');

function initKarma(config) {
    config.set({
        frameworks: ['jasmine'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        reporters: ['progress'],
        browsers: ['PhantomJS'],
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true,
            stats: 'errors-only'
        },
        basePath: path.resolve(__dirname),
        files: [
            phantomPolyfill,
            
            babelPolyfill,

            { pattern: './javascripts/.setup-test.js', watched: false },
            { pattern: './**/*-test.js', watched: false }
        ],
        exclude: [
            './node_modules/**/*-test.js'
        ],
        preprocessors: {
            './javacripts/**/*.js': ['webpack', 'sourcemap'],
            [babelPolyfill]: ['webpack', 'sourcemap'],
            './DEV/**/*.js': ['webpack', 'sourcemap']
        },
        plugins: [
            'karma-jasmine',
            'karma-webpack',
            'karma-phantomjs-launcher',
            'karma-phantomjs-shim',
            'karma-sourcemap-loader'
        ],
        babelPreprocessor: {
            options: {
                presets: ['airbnb']
            }
        }
    });
}
module.exports = initKarma;
/* eslint-enable */
