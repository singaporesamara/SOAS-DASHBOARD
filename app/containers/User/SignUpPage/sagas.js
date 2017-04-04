import { put, takeLatest } from 'redux-saga/effects';
import { requestStarted, requestFinished } from '../../../actions/common';
import { SIGN_UP } from './constants';

function* signUpSaga({ payload: { user } }) {
  yield put(requestStarted());
  console.info(user);
  yield put(requestFinished());
}

export function* signUpFlow() {
  yield takeLatest(SIGN_UP, signUpSaga);
}

export default [
  signUpFlow,
];
