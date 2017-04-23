import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { SET_FORM_ERRORS, CLEAR_FORM_ERRORS, VALIDATION_TYPES } from '../../constants/common';
import eWalletCreditCard from '../../components/Widgets/EWallet/CreditCard/reducer';
import eWalletTopUpModal from '../../components/Widgets/EWallet/Modals/TopUp/reducer';

const widgets = { eWalletTopUpModal, eWalletCreditCard };

export default () => (combineReducers(widgets));

export function commonWidgetReducer(globalState = fromJS({}), action) {
  let state = globalState;
  if (!state.get('pages')) {
    state = state.set('pages', fromJS({}));
  }
  switch (action.type) {
    case SET_FORM_ERRORS:
      if (action.payload.type === VALIDATION_TYPES.WIDGET) {
        return state.setIn(['widgets', action.payload.page, 'errors'], fromJS(action.payload.errors));
      }
      return state;
    case CLEAR_FORM_ERRORS:
      if (action.payload.type === VALIDATION_TYPES.WIDGET) {
        return state.setIn(['widgets', action.payload.page, 'errors'], fromJS({}));
      }
      return state;
    default:
      return state;
  }
}