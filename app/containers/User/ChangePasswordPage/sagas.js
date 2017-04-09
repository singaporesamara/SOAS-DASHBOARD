import { put, takeLatest, call } from 'redux-saga/effects';
import { requestStarted, requestFinished, setPageNotices, clearPageNotices } from '../../../actions/common';
import { CHANGE_PASSWORD } from './constants';
import { passwordChanged } from './actions';
import routes from '../../../utils/network/api';

function* changePasswordSaga({ payload: { password, checkword } }) {
  yield put(requestStarted());
  yield put(clearPageNotices('changePassword'));
  const response = yield call(routes.user.changePassword, { password, checkword });
  yield put(requestFinished());

  if (response.err) {
    const { message } = response.err;
    yield put(setPageNotices('changePassword', [{ type: 'error', message }]));
  } else {
    yield put(passwordChanged());
  }
}

export function* changePasswordFlow() {
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
}

export default [
  changePasswordFlow,
];
