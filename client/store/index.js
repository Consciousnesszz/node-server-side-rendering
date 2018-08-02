import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import rootReducer from './reducers';

// 使用 redux devtool
// const composeEnhancers = (
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
//     : compose
// );

export default function configStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(promiseMiddleware),
  );
  return store;
}
