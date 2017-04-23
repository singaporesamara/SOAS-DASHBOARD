import { LOAD_EVENTS, SET_EVENTS } from '../constants/events';

export function loadEvents(loader = false) {
  return {
    type: LOAD_EVENTS,
    payload: { loader },
  };
}

export function setEvents(events) {
  return {
    type: SET_EVENTS,
    payload: { events },
  };
}
