import { put, takeLatest, call } from 'redux-saga/effects';
import { requestStarted, requestFinished } from '../../../actions/common';
import { CHANGE_PASSWORD } from './constants';
import routes from '../../../utils/network/api';

function* changePasswordSaga({ payload: { password, passwordConfirmation } }) {
  yield put(requestStarted());
  const response = yield call(routes.user.changePassword, { password, checkword: passwordConfirmation });
  yield put(requestFinished());

  if (response.err) {
    alert('error...');
  }
}

export function* changePasswordFlow() {
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
}

export default [
  changePasswordFlow,
];
