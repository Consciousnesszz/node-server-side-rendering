/**
 * server-prod
 */

// babel 运行时转换
// require('babel-polyfill');

// require('babel-register')({
//   presets: ['es2015', 'react', 'stage-0'],
//   plugins: [
//     'add-module-exports',
//     'transform-runtime',
//     'transform-async-to-generator',
//     'transform-decorators-legacy',
//     'transform-class-properties',
//   ],
// });


import 'babel-polyfill';
import serve from 'koa-static';
import path from 'path';
// import views from 'koa-views';

import app from './app';
import router from './router';
import clientRender from './middleware/clientRender';

// require('babel-polyfill');
// const serve = require('koa-static');
// const path = require('path');
// // const views = require('koa-views');
// const app = require('./app');
// const router = require('./router');

const port = process.env.port || 3000;

// app.use(views(path.resolve(__dirname, '../build/client/index.html')));
app.use(serve('./build/client'));
app.use(clientRender);
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port);
console.log(`\n==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.\n`);
