var path = require('path');

module.exports = function(config) {
    var cfg = {
        browsers: ['PhantomJS'],
        plugins : [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-webpack',
            'karma-coverage',
            'karma-coveralls',
            'karma-sourcemap-loader'
        ],
        coverageReporter: {
            reporters: [
                {
                    type: 'html',
                    subdir: 'html'
                },
                {
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
            'progress', 'coverage', 'coveralls'
        ],
        webpack: {
            cache: true,
            devtool: 'inline-source-map',
            entry: ['babel-polyfill'],
            module: {
                rules: [
                    {
                        enforce: 'pre',
                        test: /.spec\.js$/,
                        include: /__spec__/,
                        exclude: /(bower_components|node_modules)/,
                        loader: 'babel-loader',
                        query: {
                            cacheDirectory: true
                        }
                    },
                    {
                        test: /\.js$/,
                        include: /calculations/,
                        exclude: /(bower_components|node_modules|__spec__)/,
                        loader: 'babel-loader',
                        query: {
                            cacheDirectory: true
                        }
                    }
                ]
            }
        }
    };
    config.set(cfg);
};
