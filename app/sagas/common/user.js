import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { LOGIN, RESOLVE_APP_STAGE, GET_PROFILE } from '../../constants/user';
import { ROUTES } from '../../constants/routes';
import { setUser } from '../../actions/user';
import { setAuthToken } from '../../utils/auth';
import routes from '../../utils/network/api';

export function* resolveAppStageSaga({ payload: { user } }) {
  if (user.token && !user.registered) {
    yield put(push(ROUTES.USER.REGISTRATION));
  }
}

export function* loginUserSaga({ payload: { user } }) {
  const { token } = user;
  setAuthToken(token);
  yield put(setUser(user));
}

export function* getUserProfile() {
  const response = yield call(routes.user.profile);
  console.info(response);
}

function* userFlow() {
  yield takeLatest(LOGIN, loginUserSaga);
  yield takeLatest(RESOLVE_APP_STAGE, resolveAppStageSaga);
  yield takeLatest(GET_PROFILE, getUserProfile);
}

export default [
  userFlow,
];
