const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const BabelMinifyWebpackPlugin = require("babel-minify-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const BrotliWebpackPlugin = require("brotli-webpack-plugin");

module.exports = {
    entry: {
        common: [
            "babel-runtime/regenerator",
            "babel-register",
            "webpack-hot-middleware/client?reload=true",
            "./src/index.js"
        ]
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['react']
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader"]
                })
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src"],
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "markdown-with-front-matter-loader"
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
    output: {
        filename: "scripts/[name].bundle.js",
        path: path.resolve(__dirname,"../dist"),
        publicPath: "/"
    },
    plugins: [
        new ExtractTextWebpackPlugin({ filename: "styles/common.min.css" }),
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({ template: "./src/index.html" }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new BabelMinifyWebpackPlugin(),
        new CompressionWebpackPlugin({
            algorithm: "gzip"
        }),
        new BrotliWebpackPlugin(),
    ]
}