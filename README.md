# react 服务端渲染方案

感谢 chikara-chen 的[教程](http://react-china.org/t/react-js/10144)

## 优点
1. 服务端 render 是在服务端部署服务，当客户端请求时，将单页面应用以首屏 html 形式返回，再进行客户端渲染。用户可见画面耗时比传统方案更少。
2. 返回的 html 有内容，不再像传统方案只有项目 root 节点，利于 seo。

## 思路
1. 服务端 render 是写一个服务，应区别于之前练习的客户端传统项目，客户端、服务端都要写。
2. 当用户访问服务地址，应该首先返回已加载的 html --> 使用 react-dom/server
3. 用户访问 localhost:8080/user 时，如何保证 user 路由展示正确 --> 共用 router
4. 如何保证第一次 render 的 redux 状态统一 --> 共用 store

## 项目编写步骤
1. 因原教程较老，首先使用 npm-check-updates 更新包依赖为最新版本。
2. 使用 koa 中间件，编写类似 webpack-dev-server 的服务，便于开发 client。
3. 进行 client 项目编写。（react，router，redux）
4. 进行 server 项目编写，初步完成服务端渲染。
5. 使用 browser history 时，直接访问 localhost:8080/user ，服务器会认为在访问服务器资源，返回 404，所以需要改造服务端 router。(注意 StaticRouter 不要包裹 BrowserRouter，否则会报 BrowserRouter needs a dom 错误)
6. 进行生产环境脚本编写。需要同时打包 client 和 server.

## 总结
1. server 使用分包打包后，运行会报错。（node server.js 只执行了 server，未执行 server 的分包。即使同时运行 server 、 server-chunk ，也会报错。）
2. koa 中间件需要调用 await next() ，否则后续操作不能进行。
3. koa-static 指定服务器静态文件夹。注意路径。
4. 服务端代码可以不用打包依赖，使用 webpack externals 跳过。
