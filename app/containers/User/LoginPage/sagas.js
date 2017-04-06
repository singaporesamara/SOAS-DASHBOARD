import { put, takeLatest, call } from 'redux-saga/effects';
import { requestStarted, requestFinished } from '../../../actions/common';
import { LOGIN } from './constants';
import routes from '../../../utils/network/api';

function* loginSaga({ payload: { email, password } }) {
  yield put(requestStarted());
  const response = yield call(routes.user.login, { email, password });
  yield put(requestFinished());

  if (response.err) {
    alert('error....');
  } else {
    alert('done....');
  }
}

export function* loginFlow() {
  yield takeLatest(LOGIN, loginSaga);
}

export default [
  loginFlow,
];
