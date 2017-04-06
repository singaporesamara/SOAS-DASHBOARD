import { put, takeLatest } from 'redux-saga/effects';
import { requestStarted, requestFinished } from '../../../actions/common';
import { RESTORE_PASSWORD } from './constants';
import { restorationResent } from './actions';

function* restorePasswordSaga({ payload: { email } }) {
  yield put(requestStarted());
  console.info(email);
  yield put(requestFinished());
  yield put(restorationResent());
}

export function* forgotPasswordFlow() {
  yield takeLatest(RESTORE_PASSWORD, restorePasswordSaga);
}

export default [
  forgotPasswordFlow,
];
