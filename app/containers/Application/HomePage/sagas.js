import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { requestStarted, requestFinished, pageLoaded } from '../../../actions/common';
import { ROUTES } from '../../../constants/routes';
import { LOAD_PAGE } from '../../../constants/common';
import { getUserProfile } from '../../../sagas/common/user';

export function* pageSaga() {
  yield put(requestStarted());
  const profile = yield getUserProfile();
  yield put(requestFinished());

  if (profile) {
    yield put(pageLoaded('application'));
  } else {
    yield put(push(ROUTES.USER.LOGIN));
  }
}

export function* registrationFlow() {
  yield takeEvery((action) => action.type === LOAD_PAGE && action.payload.page === 'application', pageSaga);
}

export default [
  registrationFlow,
];
