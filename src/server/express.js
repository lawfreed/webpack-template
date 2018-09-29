import path from "path";
import express from "express";

const server = express();
const webpack = require("webpack");
// const config = require("../../config/webpack.dev.js");
const config = require("../../config/webpack.prod.js");
const compiler = webpack(config);
const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);
const webpackDevMiddleware = require("webpack-dev-middleware")(compiler, config.devServer);

server.use(webpackHotMiddleware);
server.use(webpackDevMiddleware);
const PORT = process.env.PORT || 8080;
// const staticMiddleware = express.static("dist");
// server.use(staticMiddleware); 
const expressStaticGzip = require("express-static-gzip");
    server.use(expressStaticGzip("dist", {
        enableBrotli: true
    })
);
server.use('*/icon',express.static("../../dist/icon"));
server.use('*/images',express.static("../../dist/images"));
server.use('*/styles',express.static("../../dist/styles"));
server.use('*/videos',express.static('../../dist/media/video'));
server.use('*/font',express.static('../../dist/fonts'))
server.listen(PORT, ()=> {
    console.log(`---- Server is running at port ${PORT}----`)
});