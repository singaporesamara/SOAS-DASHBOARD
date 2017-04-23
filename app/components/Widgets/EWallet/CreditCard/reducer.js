import { fromJS } from 'immutable';
import { merge } from 'lodash';
import { DEFAULT_WIDGET_STATE } from '../../../../constants/common';
import { SET_LOADING, BACK_TO_FORM, TRANSACTION_FINISHED, TRANSACTION_STATUS } from './constants';

const initialWidget = { transaction: { declined: false, completed: false } };
const initialState = fromJS(merge({}, initialWidget, DEFAULT_WIDGET_STATE));

function creditCardReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return state.merge({ loading: action.payload.loading });
    case BACK_TO_FORM:
      return state.merge({ transaction: { declined: false, completed: false } });
    case TRANSACTION_FINISHED: {
      const completed = action.payload.status === TRANSACTION_STATUS.COMPLETED;
      const declined = action.payload.status === TRANSACTION_STATUS.DECLINED;
      return state.merge({ transaction: { declined, completed } });
    }
    default:
      return state;
  }
}

export default creditCardReducer;
