var path = require('path');

module.exports = function(config) {
    var cfg = {
        browsers: ['Firefox'],
        customLaunchers: {
          Chrome_travis_ci: {
            base: 'Chrome',
            flags: ['--no-sandbox']
          }
        },
        plugins : [
            'karma-jasmine',
            'karma-firefox-launcher',
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
            entry: ['tests.webpack.js'],
            module: {
                rules: [
                    {
                        enforce: 'pre',
                        test: /.spec\.js$/,
                        include: /calculations/,
                        exclude: /(bower_components|node_modules)/,
                        loader: 'babel-loader',
                        query: {
                            cacheDirectory: true
                        }
                    }, {
                        enforce: 'pre',
                        test: /\.js?$/,
                        include: path.resolve(__dirname, '../calculations/'),
                        exclude: /(node_modules|bower_components|__spec__)/,
                        loader: 'babel-istanbul',
                        query: {
                            cacheDirectory: true
                        }
                    },
                    {
                        test: /\.js$/,
                        include: path.resolve(__dirname, '../calculations'),
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
    // if (process.env.TRAVIS) {
    //     cfg.browsers = ['Chrome_travis_ci'];
    // }
    config.set(cfg);
};
