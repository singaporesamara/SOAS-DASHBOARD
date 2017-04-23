import { fromJS } from 'immutable';
import { merge } from 'lodash';
import { DEFAULT_WIDGET_STATE } from '../../../../../constants/common';
import { TRIGGER_WALLET_CREATE_TRANSACTION } from '../../../../../constants/wallet';

const initialWidget = { opened: false };
const initialState = fromJS(merge({}, initialWidget, DEFAULT_WIDGET_STATE));

function eWalletCreateTransactionModalReducer(state = initialState, action) {
  switch (action.type) {
    case TRIGGER_WALLET_CREATE_TRANSACTION: {
      const { opened } = action.payload;
      return state.merge({ opened });
    }
    default:
      return state;
  }
}

export default eWalletCreateTransactionModalReducer;
