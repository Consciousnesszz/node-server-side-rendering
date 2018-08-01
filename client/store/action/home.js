import { createAction } from 'redux-actions';
import { ASYNC_CHANGE } from '../types/home';

export const asyncInc = createAction(ASYNC_CHANGE, () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('async changed')
    }, 1000)
  });
});
