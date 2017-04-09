import { put, takeLatest, call, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { requestStarted, requestFinished, pageLoaded } from '../../../actions/common';
import { ROUTES } from '../../../constants/routes';
import { LOAD_PAGE } from '../../../constants/common';
import { getUserProfile } from '../../../sagas/common/user';
import { REGISTER } from './constants';
import routes from '../../../utils/network/api';

export function* registrationSaga({ payload: { profile } }) {
  yield put(requestStarted());
  const response = yield call(routes.user.register, { profile });
  yield put(requestFinished());

  if (response.err) {
    alert('error...');
  }
}

export function* pageSaga() {
  yield put(requestStarted());
  const profile = yield getUserProfile();
  yield put(requestFinished());

  if (profile) {
    yield put(pageLoaded('registration'));
  } else {
    yield put(push(ROUTES.USER.LOGIN));
  }
}

export function* registrationFlow() {
  yield takeEvery((action) => action.type === LOAD_PAGE && action.payload.page === 'registration', pageSaga);
  yield takeLatest(REGISTER, registrationSaga);
}

export default [
  registrationFlow,
];
