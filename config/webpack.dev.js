const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

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
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
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
    output: {
        filename: "scripts/[name].bundle.js",
        path: path.resolve(__dirname,"../dist"),
        publicPath: "/"
    },
    devtool: "source-map",
    devServer: {
        contentBase: "dist",
        overlay: true,
        hot: true
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "vendor",
                    chunks: "all",
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        // new ExtractTextWebpackPlugin({ filename: "styles/style.min.css" }),
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({ template: "./src/index.html" }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        // new BundleAnalyzerPlugin({
        //     generateStatsFile: true
        // })
    ]
}