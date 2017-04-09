import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { LOGIN, RESOLVE_APP_STAGE, GET_PROFILE, SIGN_OUT } from '../../constants/user';
import { ROUTES } from '../../constants/routes';
import { setUser, destroyUser } from '../../actions/user';
import { setAuthToken, removeAuthToken } from '../../utils/auth';
import routes from '../../utils/network/api';

export function* resolveAppStageSaga({ payload: { user } }) {
  if (user.token && user.profile && !user.registered) {
    yield put(push(ROUTES.USER.REGISTRATION));
  }
}

export function* loginUserSaga({ payload: { user } }) {
  const { token } = user;
  setAuthToken(token);
  yield put(setUser(user));
}

export function* signOutSaga() {
  removeAuthToken();
  yield put(destroyUser());
  yield put(push(ROUTES.USER.LOGIN));
}

export function* getUserProfile() {
  const response = yield call(routes.user.profile);
  let profile = null;

  if (!response.err) {
    profile = response.data.profile;
  }

  return profile;
}

function* userFlow() {
  yield takeLatest(LOGIN, loginUserSaga);
  yield takeLatest(RESOLVE_APP_STAGE, resolveAppStageSaga);
  yield takeLatest(GET_PROFILE, getUserProfile);
  yield takeLatest(SIGN_OUT, signOutSaga);
}

export default [
  userFlow,
];
