import { fromJS } from 'immutable';
import { merge } from 'lodash';
import { DEFAULT_PAGE_STATE } from '../../../constants/common';

const initialState = fromJS(merge({}, DEFAULT_PAGE_STATE));

function pageReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default pageReducer;
