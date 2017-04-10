import { fromJS } from 'immutable';
import { omit, keys, forEach } from 'lodash';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'connected-react-router';
import { SET_FORM_ERRORS, CLEAR_FORM_ERRORS, SET_PAGE_NOTICES, CLEAR_PAGE_NOTICES, LOAD_PAGE, PAGE_LOADED, DEFAULT_PAGE_STATE } from '../../constants/common';

import current from './current';
import login from '../../containers/User/LoginPage/reducer';
import signUp from '../../containers/User/SignUpPage/reducer';
import forgotPassword from '../../containers/User/ForgotPasswordPage/reducer';
import changePassword from '../../containers/User/ChangePasswordPage/reducer';
import registration from '../../containers/User/RegistrationPage/reducer';
import application from '../../containers/Application/HomePage/reducer';
import home from '../../containers/HomePage/reducer';

const pages = { current, login, signUp, forgotPassword, changePassword, registration, application, home };

export default () => (combineReducers(pages));

export function commonPageReducer(globalState = fromJS({}), action) {
  let state = globalState;
  if (!state.get('pages')) {
    state = state.set('pages', fromJS({}));
  }
  switch (action.type) {
    case LOCATION_CHANGE: {
      const newState = state.asMutable();
      forEach(omit(keys(pages), ['current']), (page) => {
        newState.mergeIn(['pages', page], DEFAULT_PAGE_STATE);
      });
      return newState.asImmutable();
      // if (action.type === LOCATION_CHANGE) {
      //   const oldLocation = state.getIn(['beforeRouteTransition', 'location']).toJS();
      //   const newLocation = action.payload.location;
      //   if (oldLocation.pathname === newLocation.pathname) {
      //     return state;
      //   }
      // }
      // const newState = state.asMutable();
      // Object.keys(pages).forEach((page) => {
      //   if (page !== 'current') {
      //     newState.mergeIn(['pages', page], { errors: {}, notices: {}, loading: true, error: null });
      //   }
      // });
      // return newState.asImmutable();
    }
    case SET_FORM_ERRORS:
      return state.setIn(['pages', action.payload.page, 'errors'], fromJS(action.payload.errors));
    case CLEAR_FORM_ERRORS:
      return state.setIn(['pages', action.payload.page, 'errors'], fromJS({}));
    case SET_PAGE_NOTICES:
      return state.setIn(['pages', action.payload.page, 'notices'], fromJS(action.payload.notices));
    case CLEAR_PAGE_NOTICES:
      return state.setIn(['pages', action.payload.page, 'notices'], fromJS({}));
    case LOAD_PAGE:
      return state.setIn(['pages', action.payload.page, 'loading'], true);
    case PAGE_LOADED:
      return state.setIn(['pages', action.payload.page, 'loading'], false);
    default:
      return state;
  }
}
