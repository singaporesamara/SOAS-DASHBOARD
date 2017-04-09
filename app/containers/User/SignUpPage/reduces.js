import { fromJS } from 'immutable';
import { merge } from 'lodash';
import { SIGNED_UP } from './constants';
import { DEFAULT_PAGE_STATE } from '../../../constants/common';

const initialState = fromJS(merge({ show: { form: true, message: false } }, DEFAULT_PAGE_STATE));

function pageReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNED_UP:
      return state.merge({ show: { form: false, message: true } });
    default:
      return state;
  }
}

export default pageReducer;
