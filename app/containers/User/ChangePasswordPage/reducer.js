import { fromJS } from 'immutable';
import { merge } from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';
import { PASSWORD_CHANGED } from './constants';
import { DEFAULT_PAGE_STATE } from '../../../constants/common';

const initialState = fromJS(merge({ show: { form: true, message: false } }, DEFAULT_PAGE_STATE));

function pageReducer(state = initialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return initialState;
    case PASSWORD_CHANGED:
      return state.merge({ show: { form: false, message: true } });
    default:
      return state;
  }
}

export default pageReducer;
