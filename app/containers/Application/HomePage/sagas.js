import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { requestStarted, requestFinished, pageLoaded } from '../../../actions/common';
import { loadEvents } from '../../../actions/events';
import { loadEventsSaga } from '../../../sagas/common/events';
import { ROUTES } from '../../../constants/routes';
import { LOAD_PAGE } from '../../../constants/common';
import { getUser } from '../../../sagas/common/user';
import { REFRESH_EVENTS } from './constants';

export function* pageSaga() {
  yield put(requestStarted());
  const user = yield getUser();
  yield put(requestFinished());

  if (user) {
    yield put(loadEvents());
    yield put(pageLoaded('application'));
  } else {
    yield put(push(ROUTES.USER.LOGIN));
  }
}

export function* refreshEventsFlow() {
  yield put(requestStarted());
  yield loadEventsSaga();
  yield put(requestFinished());
}

export function* applicationHomePageFlow() {
  yield takeEvery((action) => action.type === LOAD_PAGE && action.payload.page === 'application', pageSaga);
  yield takeLatest(REFRESH_EVENTS, refreshEventsFlow);
}

export default [
  applicationHomePageFlow,
];
