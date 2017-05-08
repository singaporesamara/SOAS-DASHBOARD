import { combineReducers } from 'redux-immutable';
import eventsReducer from './events';
import invoicesReducer from './invoices';

const events = { events: eventsReducer, invoices: invoicesReducer };

export default () => (combineReducers(events));
