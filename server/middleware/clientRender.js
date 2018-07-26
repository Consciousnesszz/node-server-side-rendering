import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from '../../client/App';

async function clientRender(ctx) {
  fs.readFileSync(path.resolve('index.temp.html'), 'utf-8', (err, htmlData) => {
    if (err) {
      console.error('read err', err);
      return ctx.status(404);
    }

    const context = {};
    // 使用 服务端渲染 函数
    const html = renderToString(
      <StaticRouter
        location={ctx.url}
        context={context}
      >
        <App />
      </StaticRouter>
    );

    ctx.body = htmlData.replace('{{replace}}', html);
  });
}

export default clientRender;
