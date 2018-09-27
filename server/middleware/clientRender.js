import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import App from '../../client/App';
import configStore from '../../client/store';
import routerConf from '../../client/routerConf';

const store = configStore();
const tempPath = (
  process.env.NODE_ENV === 'development'
    ? './template/index.dev.html'
    : './build/client/index.html'
);

async function clientRender(ctx, next) {
  let pathMatch = false;
  routerConf.forEach((item) => {
    if (ctx.url === item.path) {
      pathMatch = true;
    }
  });

  if (pathMatch) {
    const htmlData = fs.readFileSync(path.resolve(tempPath), 'utf-8');
    if (!htmlData) {
      ctx.body = 404;
    } else {
      const context = {};
      // 使用 服务端渲染 函数
      const html = renderToString(
        <Provider store={store}>
          <StaticRouter
            location={ctx.url}
            context={context}
          >
            <App />
          </StaticRouter>
        </Provider>
      );

      ctx.body = htmlData.replace('{{replace}}', html);
    }
  } else {
    // 不调用 next 会找不到 js
    await next();
  }
}

export default clientRender;
