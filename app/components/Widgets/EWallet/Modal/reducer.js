import { fromJS } from 'immutable';
import { merge } from 'lodash';
import { DEFAULT_WIDGET_STATE } from '../../../../constants/common';
import { TRIGGER_WALLET_TOP_UP } from '../../../../constants/wallet';

const initialWidget = { opened: false };
const initialState = fromJS(merge({}, initialWidget, DEFAULT_WIDGET_STATE));

function eWalletModalReducer(state = initialState, action) {
  switch (action.type) {
    case TRIGGER_WALLET_TOP_UP: {
      const { opened } = action.payload;
      return state.merge({ opened });
    }
    default:
      return state;
  }
}

export default eWalletModalReducer;
