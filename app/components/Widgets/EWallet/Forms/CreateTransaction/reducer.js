import { fromJS } from 'immutable';
import { merge } from 'lodash';
import { DEFAULT_WIDGET_STATE } from '../../../../../constants/common';
import { SET_LOADING } from './constants';

const initialWidget = {};
const initialState = fromJS(merge({}, initialWidget, DEFAULT_WIDGET_STATE));

function createTransactionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return state.merge({ loading: action.payload.loading });
    default:
      return state;
  }
}

export default createTransactionReducer;
