const path = require('path');

const BUILD_DIR = './dist'
const ASSETS = '/assets'

module.exports =
    {
        context: path.resolve(__dirname, './src/client'),
        entry: {
          app: ['babel-polyfill', 'app.js'],
        },
        output: {
          path: path.resolve(__dirname, BUILD_DIR + ASSETS),
          filename: '[name].bundle.js',
          publicPath: ASSETS,
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.worker\.js$/,
                    loader: 'worker-loader?inline=true'
                },
                {
                    test: /\.js$/,
                    exclude: [/node_modules/, /calculations/],
                    use: [{
                             loader: 'babel-loader',
                             options: { presets: ['es2015', 'stage-3'] }
                           }],
                },
            ]
        },
        devServer: {
          contentBase: path.resolve(__dirname, './src/client'),
        },
        resolve: {
          modules: [
              path.resolve(__dirname, './src/client/'),
              path.resolve(__dirname, './src/client/modules/lifeCycle'),
              path.resolve(__dirname, './src/client/modules/calculations'),
                            'node_modules'
                        ],
          extensions: ['.js']
        }
    }
