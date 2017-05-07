import { fromJS } from 'immutable';
import { merge } from 'lodash';
import { DEFAULT_WIDGET_STATE } from '../../../../../constants/common';
import { TRANSACTION_STATUS } from '../../../../../constants/tansactions';
import { TRANSACTION_FINISHED, BACK_TO_FORM } from './constants';

const initialWidget = { invoice: { sent: false } };
const initialState = fromJS(merge({}, initialWidget, DEFAULT_WIDGET_STATE));

function eWalletTopUpGIROFormReducer(state = initialState, action) {
  switch (action.type) {
    case TRANSACTION_FINISHED: {
      const completed = action.payload.status === TRANSACTION_STATUS.COMPLETED;
      return state.merge({ transaction: { completed } });
    }
    case BACK_TO_FORM:
      return state.merge({ transaction: { completed: false } });
    default:
      return state;
  }
}

export default eWalletTopUpGIROFormReducer;
