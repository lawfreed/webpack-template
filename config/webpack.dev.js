const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        bundle: [
            "babel-runtime/regenerator",
            "babel-register",
            "webpack-hot-middleware/client?reload=true",
            "./src/index.js"]
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
                        loader: "html-loader"
                    },
                    {
                        loader: "markdown-loader"
                    }
                ]
            }
        ]
    },
    output: {
        filename: "scripts/[name].js",
        path: path.resolve(__dirname,"../dist"),
        publicPath: "/"
    },
    devtool: "source-map",
    devServer: {
        contentBase: "dist",
        overlay: true,
        hot: true
    },
    plugins: [
        new ExtractTextWebpackPlugin({ filename: "styles/style.min.css" }),
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({ template: "./src/index.html" }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),
    ]
}