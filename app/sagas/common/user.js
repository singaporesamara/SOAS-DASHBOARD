import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { LOGIN, RESOLVE_APP_STAGE } from '../../constants/user';
import { ROUTES } from '../../constants/routes';
import { setUser } from '../../actions/user';
import { setAuthToken } from '../../utils/auth';

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

function* userFlow() {
  yield takeLatest(LOGIN, loginUserSaga);
  yield takeLatest(RESOLVE_APP_STAGE, resolveAppStageSaga);
}

export default [
  userFlow,
];
