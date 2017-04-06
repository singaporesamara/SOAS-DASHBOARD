import { put, takeLatest, call } from 'redux-saga/effects';
import { requestStarted, requestFinished } from '../../../actions/common';
import { SIGN_UP } from './constants';
import routes from '../../../utils/network/api';

function* signUpSaga({ payload: { email, password } }) {
  yield put(requestStarted());
  const response = yield call(routes.user.signUp, { email, password });
  yield put(requestFinished());

  if (response.err) {
    alert('error...');
  } else {
    alert('done...');
  }
}

export function* signUpFlow() {
  yield takeLatest(SIGN_UP, signUpSaga);
}

export default [
  signUpFlow,
];
