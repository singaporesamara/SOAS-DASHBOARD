import { put, takeLatest, call } from 'redux-saga/effects';
import { requestStarted, requestFinished, setPageNotices, clearPageNotices } from '../../../actions/common';
// import { login, resolveAppStage } from '../../../actions/user';
import { signedUp } from './actions';
import { SIGN_UP } from './constants';
import routes from '../../../utils/network/api';

function* signUpSaga({ payload: { email, password } }) {
  yield put(requestStarted());
  yield put(clearPageNotices('signUp'));
  const response = yield call(routes.user.signUp, { email, password });
  yield put(requestFinished());

  if (response.err) {
    const { message } = response.err;
    yield put(setPageNotices('signUp', [{ type: 'error', message }]));
  } else {
    yield put(signedUp());
    // const { token } = response.data;
    // const user = { token };
    // yield put(login(user));
    // yield put(resolveAppStage(user));
  }
}

export function* signUpFlow() {
  yield takeLatest(SIGN_UP, signUpSaga);
}

export default [
  signUpFlow,
];
