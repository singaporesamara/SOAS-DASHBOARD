import { put, takeLatest, call } from 'redux-saga/effects';
import { requestStarted, requestFinished } from '../../../actions/common';
import { REGISTER } from './constants';
import routes from '../../../utils/network/api';

function* registrationSaga({ payload: { profile } }) {
  yield put(requestStarted());
  const response = yield call(routes.user.register, { profile });
  yield put(requestFinished());

  if (response.err) {
    alert('error...');
  }
}

export function* registrationFlow() {
  yield takeLatest(REGISTER, registrationSaga);
}

export default [
  registrationFlow,
];
