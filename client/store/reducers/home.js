import { handleActions } from 'redux-actions';
import { CHANGE_HOME_STATUS, ASYNC_CHANGE } from '../types/home';

export default handleActions({
  [CHANGE_HOME_STATUS](state, action) {
    return {
      ...state,
      status: action.payload,
    };
  },
  [ASYNC_CHANGE](state, action) {
    return {
      ...state,
      status: action.payload,
    };
  },
}, {
  status: 'home',
});
