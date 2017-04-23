import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { requestStarted, requestFinished, pageLoaded } from '../../../actions/common';
import { ROUTES } from '../../../constants/routes';
import { LOAD_PAGE } from '../../../constants/common';
import { getUser } from '../../../sagas/common/user';

export function* pageSaga() {
  yield put(requestStarted());
  const user = yield getUser();
  yield put(requestFinished());

  if (user) {
    yield put(pageLoaded('application'));
  } else {
    yield put(push(ROUTES.USER.LOGIN));
  }
}

export function* registrationFlow() {
  yield takeEvery((action) => action.type === LOAD_PAGE && action.payload.page === 'application', pageSaga);
}

export default [
  registrationFlow,
];
