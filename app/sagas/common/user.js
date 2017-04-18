import { put, takeLatest, call, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { LOGIN, RESOLVE_APP_STAGE, GET_PROFILE, SIGN_OUT } from '../../constants/user';
import { ROUTES } from '../../constants/routes';
import { setUser, destroyUser, setProfile } from '../../actions/user';
import { setAuthToken, removeAuthToken } from '../../utils/auth';
import { convertProfileResponse } from '../../utils/converters/api/response';
import routes from '../../utils/network/api';

export function* resolveAppStageSaga({ payload: { user } }) {
  if (user.token && user.profile) {
    if (!user.profile.registered) {
      yield put(push(ROUTES.USER.REGISTRATION));
    } else {
      yield put(push(ROUTES.APP.HOME));
    }
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

export function* getUser() {
  let user = yield select((state) => state.get('user'));

  if (!user.toJS().profile) {
    const profile = yield getUserProfile();
    if (profile) {
      yield put(setProfile(convertProfileResponse(profile)));
      const stateUser = yield select((state) => state.get('user'));
      user = stateUser.toJS();
    } else {
      user = null;
    }
  } else {
    user = user.toJS();
  }

  return user;
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
