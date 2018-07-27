import { handleActions } from 'redux-actions';
import { SAVE_USER_INFO } from '../types/user';

export default handleActions({
  [SAVE_USER_INFO](state, action) {
    return {
      ...state,
      nickName: action.nickName,
      id: action.id,
    };
  },
}, {
  nickName: 'a',
  id: '1',
});
