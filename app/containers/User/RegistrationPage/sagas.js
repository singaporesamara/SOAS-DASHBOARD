import { put, takeLatest, call, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { requestStarted, requestFinished, pageLoaded, setPageNotices, clearPageNotices } from '../../../actions/common';
import { ROUTES } from '../../../constants/routes';
import { LOAD_PAGE } from '../../../constants/common';
import { getUser } from '../../../sagas/common/user';
import { REGISTER } from './constants';
import { registrationCompleted } from './actions';
import routes from '../../../utils/network/api';
import { convertRegistrationRequest } from '../../../utils/converters/api/request';

export function* registrationSaga({ payload: { profile } }) {
  yield put(requestStarted());
  yield put(clearPageNotices('registration'));
  const response = yield call(routes.user.register, convertRegistrationRequest(profile));
  yield put(requestFinished());

  if (response.err) {
    const { message } = response.err;
    yield put(setPageNotices('registration', [{ type: 'error', message }]));
  } else {
    yield put(registrationCompleted());
  }
}

export function* pageSaga() {
  yield put(requestStarted());
  const user = yield getUser();
  yield put(requestFinished());

  if (user) {
    if (user.profile.registered) {
      yield put(push(ROUTES.APP.HOME));
    } else {
      yield put(pageLoaded('registration'));
    }
  } else {
    yield put(push(ROUTES.USER.LOGIN));
  }
}

export function* registrationFlow() {
  yield takeEvery((action) => action.type === LOAD_PAGE && action.payload.page === 'registration', pageSaga);
  yield takeLatest(REGISTER, registrationSaga);
}

export default [
  registrationFlow,
];
