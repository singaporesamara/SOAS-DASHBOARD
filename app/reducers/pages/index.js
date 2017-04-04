import { fromJS } from 'immutable';
import { omit, keys, forEach } from 'lodash';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'connected-react-router';
import { SET_FORM_ERRORS, CLEAR_FORM_ERRORS } from '../../constants/common';

import current from './current';
import login from '../../containers/User/LoginPage/reduces';

const pages = { current, login };

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
        newState.mergeIn(['pages', page], { errors: {} });
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
    default:
      return state;
  }
}
