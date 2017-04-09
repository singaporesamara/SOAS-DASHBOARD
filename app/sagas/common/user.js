import { put, takeLatest } from 'redux-saga/effects';
import { LOGIN } from '../../constants/user';
import { setUser } from '../../actions/user';
import { setAuthToken } from '../../utils/auth';

export function* loginUserSaga({ payload: { user } }) {
  const { token } = user;
  setAuthToken(token);
  yield put(setUser(user));
}

function* userFlow() {
  yield takeLatest(LOGIN, loginUserSaga);
}

export default [
  userFlow,
];
