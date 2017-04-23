import { fromJS } from 'immutable';
import { SET_EVENTS } from '../../constants/events';

const initialEventsState = fromJS([]);

export default function reducer(state = fromJS(initialEventsState), action) {
  switch (action.type) {
    case SET_EVENTS:
      return fromJS(action.payload.events);
    default:
      return state;
  }
}
