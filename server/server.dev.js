/**
 * server-dev
 *   类似于 webpack-dev-server
 */

// babel 运行时转换
require('babel-polyfill');

require('babel-register')({
  presets: ['es2015', 'react', 'stage-0'],
  plugins: ['add-module-exports'],
});

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

/**
 * middleware 中间件本质是 一个类似于
 * async (ctx, next) => {
 *   ctx.body = 'hello world';
 *   next();
 * }
 * 的异步函数。为保证 koa@3 可用，需要使用 convert 转换。
 */
const convert = require('koa-convert'); // 将 generator 中间件函数 转换为 koa@3 支持的格式
const views = require('koa-views'); // koa 模版引擎模块
const devMiddleware = require('koa-webpack-dev-middleware'); // koa-webpack 自动刷新中间件
const hotMiddleware = require('koa-webpack-hot-middleware');

const server = require('./server.com.js');
const config = require('../webpack.dev.config');

const compiler = webpack(config); // 使用 webpack 生成编译器
const port = process.env.port || 3000;

// 将 html 模版转换为 ejs
server.use(views(path.resolve(__dirname, '../index.temp.html'), { map: { html: 'ejs' } }));

// 使用 koa-webpack 自动刷新中间件
server.use(convert(devMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
})));
server.use(convert(hotMiddleware(compiler)));

server.listen(port, () => {
  console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`);
});
