import { fromJS } from 'immutable';
import { RESTORATION_RESENT } from './constants';

const initialState = fromJS({ errors: {}, show: { form: true, message: false } });

function pageReducer(state = initialState, action) {
  switch (action.type) {
    case RESTORATION_RESENT:
      return state.merge({ show: { form: false, message: true } });
    default:
      return state;
  }
}

export default pageReducer;
