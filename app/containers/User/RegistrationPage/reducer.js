import { fromJS } from 'immutable';
import { merge } from 'lodash';
import { DEFAULT_PAGE_STATE } from '../../../constants/common';
import { REGISTRATION_COMPLETED } from './constants';

const initialState = fromJS(merge({ show: { form: true, message: false } }, DEFAULT_PAGE_STATE));

function pageReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTRATION_COMPLETED:
      return state.merge({ show: { form: false, message: true } });
    default:
      return state;
  }
}

export default pageReducer;
