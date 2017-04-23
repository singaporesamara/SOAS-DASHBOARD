import { fromJS } from 'immutable';
import { merge } from 'lodash';
import { DEFAULT_WIDGET_STATE } from '../../../../constants/common';
import { SET_LOADING } from './constants';

const initialState = fromJS(merge({}, DEFAULT_WIDGET_STATE));

function creditCardReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return state.merge({ loading: action.payload.loading });
    default:
      return state;
  }
}

export default creditCardReducer;
