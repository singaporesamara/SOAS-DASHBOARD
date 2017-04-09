import { fromJS } from 'immutable';
import { SET_USER } from '../../constants/user';

const initialUserState = null;

export default function reducer(state = initialUserState, action) {
  switch (action.type) {
    case SET_USER:
      return fromJS(action.payload.user);
    default:
      return state;
  }
}
