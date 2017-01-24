var path = require('path');

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        plugins : ['karma-jasmine', 'karma-phantomjs-launcher', 'karma-webpack'],
        coverageReporter: {
            reporters: [
                {
                    type: 'html',
                    subdir: 'html'
                }, {
                    type: 'lcovonly',
                    subdir: '.'
                }
            ]
        },
        files: [
            'node_modules/babel-polyfill/dist/polyfill.js', 'tests.webpack.js'
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap']
        },
        reporters: [
            'progress', 'coverage'
        ],
        webpack: {
            cache: true,
            devtool: 'inline-source-map',
            module: {
                preLoaders: [
                    {
                        test: /.spec\.js$/,
                        include: /calculations/,
                        exclude: /(bower_components|node_modules)/,
                        loader: 'babel',
                        query: {
                            cacheDirectory: true
                        }
                    }, {
                        test: /\.js?$/,
                        include: /calculations/,
                        exclude: /(node_modules|bower_components|__spec__)/,
                        loader: 'babel-istanbul',
                        query: {
                            cacheDirectory: true
                        }
                    }
                ],
                loaders: [
                    {
                        test: /\.js$/,
                        include: path.resolve(__dirname, '../calculations'),
                        exclude: /(bower_components|node_modules|__spec__)/,
                        loader: 'babel',
                        query: {
                            cacheDirectory: true
                        }
                    }
                ]
            }
        }
    });
};
