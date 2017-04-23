import { put, takeLatest, call } from 'redux-saga/effects';
import { LOAD_EVENTS } from '../../constants/events';
import { setEvents } from '../../actions/events';
import routes from '../../utils/network/api';

export function* getEvents() {
  const response = yield call(routes.events.news);
  let events = [];

  if (!response.err) {
    events = response.data.news;
  }

  return events;
}

export function* loadEventsSaga() {
  const events = yield getEvents();
  yield put(setEvents(events));
  return events;
}

function* eventsFlow() {
  yield takeLatest(LOAD_EVENTS, loadEventsSaga);
}

export default [
  eventsFlow,
];
