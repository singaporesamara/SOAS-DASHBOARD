import { fromJS } from 'immutable';
import { SET_USER, DESTROY_USER, DEFAULT_USER_STATE, SET_PROFILE } from '../../constants/user';

const initialUserState = DEFAULT_USER_STATE;

export default function reducer(state = initialUserState, action) {
  switch (action.type) {
    case SET_USER:
      return fromJS(action.payload.user);
    case DESTROY_USER:
      return DEFAULT_USER_STATE;
    case SET_PROFILE:
      return state.merge({ profile: action.payload.profile });
    default:
      return state;
  }
}
