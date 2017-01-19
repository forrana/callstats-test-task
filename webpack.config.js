const path = require('path');

const BUILD_DIR = './dist'
const ASSETS = '/assets'

module.exports =
    {
        context: path.resolve(__dirname, './src/client'),
        entry: {
          app: 'app.js',
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
                    loader: "worker-loader?inline=true"
                }

            ]
        },
        devServer: {
          contentBase: path.resolve(__dirname, './src/client'),
        },
        resolve: {
          modules: [path.resolve(__dirname, './src/client'), 'node_modules'],
          extensions: ['.js']
        }
    }
