import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import App from '../../client/App';
import configStore from '../../client/store';

const store = configStore();

function clientRender(ctx) {
  const htmlData = fs.readFileSync(path.resolve('./template/index.dev.html'), 'utf-8');
  if (!htmlData) {
    return 404;
  }

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

  return htmlData.replace('{{replace}}', html);
}

export default clientRender;
