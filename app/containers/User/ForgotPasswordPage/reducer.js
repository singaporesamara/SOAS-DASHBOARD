import { fromJS } from 'immutable';
import { merge } from 'lodash';
import { RESTORATION_RESENT } from './constants';
import { DEFAULT_PAGE_STATE } from '../../../constants/common';

const initialState = fromJS(merge({ show: { form: true, message: false } }, DEFAULT_PAGE_STATE));

function pageReducer(state = initialState, action) {
  switch (action.type) {
    case RESTORATION_RESENT:
      return state.merge({ show: { form: false, message: true } });
    default:
      return state;
  }
}

export default pageReducer;
