import { put, takeLatest, call } from 'redux-saga/effects';
import { requestStarted, requestFinished, setFormErrors, clearFormErrors } from '../../../actions/common';
import { login } from '../../../actions/user';
import { LOGIN } from './constants';
import routes from '../../../utils/network/api';

function* loginSaga({ payload: { email, password } }) {
  yield put(requestStarted());
  yield put(clearFormErrors('login'));
  const response = yield call(routes.user.login, { email, password });
  yield put(requestFinished());

  if (response.err) {
    const { message } = response.err;
    yield put(setFormErrors('login', { username: message, password: message }));
  } else {
    const { token } = response.data;
    yield put(login({ token }));
    // TODO login user here..
  }
}

export function* loginFlow() {
  yield takeLatest(LOGIN, loginSaga);
}

export default [
  loginFlow,
];
