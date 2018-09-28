import path from "path";
import express from "express";

const server = express();
const webpack = require("webpack");
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
server.use('*/img',express.static("src/img"));
server.use('*/styles',express.static("styles/css"));
server.use('*/vid',express.static('src/media/vid'));
server.use('*/font',express.static('src/fonts'))
server.listen(PORT, ()=>{
    console.log(`---- Server is running at port ${PORT}----`)
});