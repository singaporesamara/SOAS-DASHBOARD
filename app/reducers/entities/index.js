import { combineReducers } from 'redux-immutable';
import eventsReducer from './events';

const events = { events: eventsReducer };

export default () => (combineReducers(events));
