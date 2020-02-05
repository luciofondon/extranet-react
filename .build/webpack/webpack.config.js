const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

module.exports = (env) => {
    const fileEnv = dotenv.config({path: `.env.${env.ENVIRONMENT}`}).parsed;

    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
      }, {});

    return {
        entry: './src/front',
        output: {
            path: path.join(__dirname, '../../dist'),
            filename: 'app.bundle.js',
        },
        devServer: {
            port: 9000,
        },
        devtool: 'source-map',

        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader',
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                },
                {
                    test: /\.(eot|woff|woff2|ttf)$/,
                    use: {
                        loader: 'url-loader',
                    },
                },
                {
                    test: /\.(jpg|jpeg|png|gif|svg)$/,
                    use: {
                      loader: "url-loader",
                      options: {
                        limit: 1000000,
                        fallback: "file-loader",
                      }
                    }
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/front/index.html',
            }),
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin(envKeys)
        ],

        externals: {
            React: {
                commonjs: 'React',
                commonjs2: 'React',
            },
            ReactDOM: {
                commonjs: 'ReactDOM',
                commonjs2: 'ReactDOM',
            },
        },
    }
}
