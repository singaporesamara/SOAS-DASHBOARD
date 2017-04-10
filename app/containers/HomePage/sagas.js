import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { requestStarted, requestFinished, pageLoaded } from '../../actions/common';
import { ROUTES } from '../../constants/routes';
import { LOAD_PAGE } from '../../constants/common';

export function* pageSaga() {
  yield put(requestStarted());
  yield put(push(ROUTES.USER.LOGIN));
  yield put(requestFinished());
  yield put(pageLoaded('home'));
}

export function* homeFlow() {
  yield takeEvery((action) => action.type === LOAD_PAGE && action.payload.page === 'home', pageSaga);
}

export default [
  homeFlow,
];
