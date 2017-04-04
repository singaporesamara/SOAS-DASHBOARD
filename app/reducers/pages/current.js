import { fromJS } from 'immutable';
import { REQUEST_STARTED, REQUEST_FINISHED, REQUEST_FAILED } from '../../constants/common';

const currentPageState = fromJS({ loadersCounter: 0, loading: false });

export default function currentPageReducer(state = currentPageState, action) {
  const count = state.get('loadersCounter');
  switch (action.type) {
    case REQUEST_STARTED:
      return state.merge({ loadersCounter: count + 1, loading: count + 1 !== 0 });
    case REQUEST_FINISHED:
    case REQUEST_FAILED:
      return state.merge({ loadersCounter: count - 1, loading: count - 1 !== 0 });
    default:
      return state;
  }
}
