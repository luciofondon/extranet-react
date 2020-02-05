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
                        options: {
                            limit: 10000,
                            fallback: 'file-loader',
                            name: 'public/fonts/[name].[ext]',
                        },
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
                favicon: "public/favicon.ico"
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
