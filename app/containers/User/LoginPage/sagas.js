import { put, takeLatest, call, select } from 'redux-saga/effects';
import { requestStarted, requestFinished, setPageNotices, clearPageNotices } from '../../../actions/common';
import { login, resolveAppStage, setProfile } from '../../../actions/user';
import { getUserProfile } from '../../../sagas/common/user';
import { LOGIN } from './constants';
import routes from '../../../utils/network/api';
import { convertProfileResponse } from '../../../utils/converters/api/response';

function* loginSaga({ payload: { email, password } }) {
  yield put(requestStarted());
  yield put(clearPageNotices('login'));
  const response = yield call(routes.user.login, { email, password });
  yield put(requestFinished());

  if (response.err) {
    const { message } = response.err;
    yield put(setPageNotices('login', [{ type: 'error', message }]));
  } else {
    const { token } = response.data;
    yield put(login({ token }));
    const profile = yield getUserProfile();
    yield put(setProfile(convertProfileResponse(profile)));
    const user = yield select((state) => state.get('user'));
    yield put(resolveAppStage(user.toJS()));
  }
}

export function* loginFlow() {
  yield takeLatest(LOGIN, loginSaga);
}

export default [
  loginFlow,
];
