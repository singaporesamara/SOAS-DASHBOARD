import { fromJS } from 'immutable';
import { LAYOUT_UPDATE, DEFAULT_LAYOUT } from '../../constants/common';

export default function reducer(state = fromJS(DEFAULT_LAYOUT), action) {
  switch (action.type) {
    case LAYOUT_UPDATE:
      return state.merge(action.payload.layout);
    default:
      return state;
  }
}
