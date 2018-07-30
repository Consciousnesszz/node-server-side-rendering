import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App';
import configStore from './store';

const store = configStore();

const render = Component => (
  ReactDom.hydrate((
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>
  ), document.getElementById('root'))
);

render(App);

// 执行热更新模块下的 accept 函数，监听文件变化。
if (module.hot) {
  module.hot.accept('./App', () => {
    // 使用 require 重新加载 app (注：没有加上 default 会报错)
    // --> require 与 import 区别：
    //     require 运行时调用，import 编译时调用，
    //     因此 import 调用之后，代码就不会变了，
    //     所以这里使用 require 获取最新代码。
    render(require('./App').default);
  });
}
