import { put, takeLatest, call } from 'redux-saga/effects';
import { requestStarted, requestFinished } from '../../../actions/common';
import { RESTORE_PASSWORD } from './constants';
import { restorationResent } from './actions';
import routes from '../../../utils/network/api';

function* restorePasswordSaga({ payload: { email } }) {
  yield put(requestStarted());
  const response = yield call(routes.user.forgotPassword, { email });
  yield put(requestFinished());

  if (response.err) {
    alert('error...');
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
