import express from "express";
import path from "path";

const server  = express();
const webpack = require("webpack");
const config = require("../../config/webpack.dev.js");
const compiler = webpack(config);
const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);
const webpackDevMiddleware = require("webpack-dev-middleware")(compiler, config.devServer);

server.use(webpackHotMiddleware);
server.use(webpackDevMiddleware);

const staticMiddleware = express.static("dist");
server.use(staticMiddleware);
server.listen(8080, () => {
    console.log("---- Server is ready ----");
});