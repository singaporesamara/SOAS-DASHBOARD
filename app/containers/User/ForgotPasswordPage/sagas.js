import { put, takeLatest, call } from 'redux-saga/effects';
import { requestStarted, requestFinished, setPageNotices, clearPageNotices } from '../../../actions/common';
import { RESTORE_PASSWORD } from './constants';
import { restorationResent } from './actions';
import routes from '../../../utils/network/api';

function* restorePasswordSaga({ payload: { email } }) {
  yield put(requestStarted());
  yield put(clearPageNotices('forgotPassword'));
  const response = yield call(routes.user.forgotPassword, { email });
  yield put(requestFinished());

  if (response.err) {
    const { message } = response.err;
    yield put(setPageNotices('forgotPassword', [{ type: 'error', message }]));
  } else {
    yield put(restorationResent());
  }
}

export function* forgotPasswordFlow() {
  yield takeLatest(RESTORE_PASSWORD, restorePasswordSaga);
}

export default [
  forgotPasswordFlow,
];
