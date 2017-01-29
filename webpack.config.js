/* eslint-disable */
// require('./test/helpers/browser-webpack');
var path = require('path'),
    autoprefixer = require('autoprefixer'),
    pack = require('./package.json'),
    webpack = require('webpack'),
    nodeExternals = require('webpack-node-externals'),

    isTest = process.env.NODE_ENV === 'test',
    isProd = process.env.NODE_ENV === 'production',
    isDev = process.env.NODE_ENV === 'dev',

    styleLoader = ['style-loader'].concat(isProd ? [] : ['?sourceMap']).join(''),
    cssLoader = [
        'css-loader?minimize&camelCase&modules&importLoaders=1'
    ].concat(
        isProd
            ? ['&localIdentName=[hash:base64:32]']
            : ['&sourceMap', '&localIdentName=[name]--[local]']
    ).join(''),
    pureCssLoader = [
        'css-loader?minimize&modules&importLoaders=1',
        '&sourceMap',
        '&localIdentName=[local]'
    ].join(''),
    sassLoader = [
        'sass-loader'
    ].concat(
        isProd
            ? []
            : ['?sourceMap']
    ).join(''),
    sassResourcesLoader = 'sass-resources-loader',
    postcssLoader = ['postcss-loader'].concat(isProd ? [] : ['?sourceMap']).join(''),
    resolveUrlLoader = ['resolve-url-loader'].concat(isProd ? [] : ['?sourceMap']).join(''),

    urlLoader = 'url-loader?limit=10000',
    fileLoader = 'file-loader',
    imgLoader = 'img-loader',

    webpackConfig = {
        entry: {
            bundle: [
                require.resolve('babel-polyfill'),
                './javascripts/index.js'
            ] 
        },
        sassLoader: {
            includePaths: [
                path.resolve(__dirname, 'javascripts'),
                path.resolve(__dirname, 'node_modules')
                // path.resolve(__dirname, 'node_modules', 'font-awesome', 'scss'),
                // path.resolve(__dirname, 'node_modules', 'font-awesome'),
                // path.resolve(__dirname, 'node_modules', 'font-awesome', 'fonts')
            ]//,
            // data: '$fa-font-path: "font-awesome/fonts";'
        },
        sassResources: [
            './javascripts/resources/scss/variables.scss',
            './javascripts/resources/scss/media-query.scss',
            './javascripts/resources/scss/resources.scss'
        ],
        module: {
            preLoaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'source-map'
                }
            ],
            loaders: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel',
                    query: {
                        presets: ['react', 'es2015', 'stage-0']
                    }
                },
                {
                    test: /\.(s)?css$/,
                    include: /(javascripts|DEV)\//,
                    loaders: [styleLoader, cssLoader, resolveUrlLoader, sassLoader, postcssLoader, sassResourcesLoader]
                },
                {
                    test: /\.(s)?css$/,
                    include: /node_modules/,
                    loaders: [ styleLoader, pureCssLoader, resolveUrlLoader, sassLoader ]
                },
                {
                    test: /\.(jpe?g|png|gif)$/,
                    loaders: [urlLoader, imgLoader]
                },
                { test: /\.svg(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/, loader: [urlLoader, '&mimetype=image/svg+xml'].join('') },
                { test: /\.woff(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/, loader: [urlLoader, '&mimetype=application/font-woff'].join('') },
                { test: /\.woff2(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/, loader: [urlLoader, '&mimetype=application/font-woff'].join('') },
                { test: /\.ttf(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/, loader: [urlLoader, '&mimetype=application/octet-stream'].join('') },
                { test: /\.eot(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/, loader: fileLoader },
                {
                    test: /\.json$/,
                    loader: 'json'
                }
            ]
        },
        postcss: function () {
            return [autoprefixer];
        }
    };

function toCamelCase(text) {
    return text.split('-')
        .map((part, idx) =>
            idx === 0
                ? part
                : [part.charAt(0).toUpperCase(), part.substring(1).toLowerCase()].join('')
        )
        .join('');
}

if (isProd) {
    webpackConfig.plugins = [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                booleans: true,
                conditionals: true,
                drop_console: true,
                drop_debugger: true,
                join_vars: true,
                screw_ie8: true,
                sequences: true
            }
        })
    ];
} else {
    webpackConfig.devtool = 'source-map';
}

if (isTest) {
    delete webpackConfig.entry;
    webpackConfig.target = 'node'; // in order to ignore built-in modules like path, fs, etc.
    webpackConfig.externals = [{
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    }, nodeExternals()]; // in order to ignore all modules in node_modules folder
    webpackConfig.output = {
        // sourcemap support for IntelliJ/Webstorm 
        devtoolModuleFilenameTemplate: '[absolute-resource-path]',
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
    };
} else {
    webpackConfig.output = {
        path: path.resolve(__dirname, 'assets/javascripts'),
        filename: 'bundle.js',
        publicPath: 'http://localhost:4000/'
    };
}

module.exports = webpackConfig;
/* eslint-enable */
