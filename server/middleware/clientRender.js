import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from '../../client/App';

function clientRender(ctx) {
  const htmlData = fs.readFileSync(path.resolve('./template/index.dev.html'), 'utf-8');
  if (!htmlData) {
    return 404;
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

  return htmlData.replace('{{replace}}', html);
}

export default clientRender;
