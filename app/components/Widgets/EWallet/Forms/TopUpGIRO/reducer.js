import { fromJS } from 'immutable';
import { merge } from 'lodash';
import { DEFAULT_WIDGET_STATE } from '../../../../../constants/common';

const initialWidget = {};
const initialState = fromJS(merge({}, initialWidget, DEFAULT_WIDGET_STATE));

function eWalletTopUpGIROFormReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default eWalletTopUpGIROFormReducer;
