import React from 'react';
import { render } from 'react-dom';
// import { Router, match, browserHistory } from 'react-router';
// import { Provider } from 'react-redux';

// import router from './router';

// const store = configureStore(window.REDUX_STATE);

// match({ history: browserHistory, router }, (err, redirectLocation, renderProps) => {
//   render(
//     <Provider store={store}>
//       <Router {...renderProps} />
//     </Provider>,
//     document.getElementById('root')
//   );
// });

// 执行热更新模块下的 accept 函数，监听文件变化。
if (module.hot) {
  module.hot.accept();
}

render(
  <div>
    root
  </div>,
  document.getElementById('root')
);
