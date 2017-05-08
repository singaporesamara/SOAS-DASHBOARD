import { fromJS } from 'immutable';
import { merge } from 'lodash';
import { DEFAULT_WIDGET_STATE, TRIGGER_MODAL } from '../../../../../constants/common';

const initialWidget = { opened: false };
const initialState = fromJS(merge({}, initialWidget, DEFAULT_WIDGET_STATE));

function eWalletCreateTransactionModalReducer(state = initialState, action) {
  switch (action.type) {
    case TRIGGER_MODAL: {
      if (action.payload.name === 'eWalletCreateInvoiceModal') return state.merge({ opened: action.payload.opened });
      return state;
    }
    default:
      return state;
  }
}

export default eWalletCreateTransactionModalReducer;
