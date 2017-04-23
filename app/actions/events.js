import { LOAD_EVENTS, SET_EVENTS } from '../constants/events';

export function loadEvents() {
  return {
    type: LOAD_EVENTS,
  };
}

export function setEvents(events) {
  return {
    type: SET_EVENTS,
    payload: { events },
  };
}
