import { fromJS } from 'immutable';
import { merge } from 'lodash';
import { DEFAULT_WIDGET_STATE } from '../../../../../constants/common';
import { SET_LOADING, TRANSACTION_FINISHED, BACK_TO_FORM } from './constants';
import { TRANSACTION_STATUS } from '../../../../../constants/tansactions';

const initialWidget = { transaction: { completed: false } };
const initialState = fromJS(merge({}, initialWidget, DEFAULT_WIDGET_STATE));

function createTransactionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return state.merge({ loading: action.payload.loading });
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

export default createTransactionReducer;
