import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { TOP_UP } from './constants';
import routes from '../../../../utils/network/api';
import { convertTopUpRequest } from '../../../../utils/converters/api/request';
import { setLoading } from './actions';

export function* eWalletCreditCardSaga({ payload }) {
  yield put(setLoading(true));
  const response = yield call(routes.transactions.topUp, convertTopUpRequest(payload));
  yield put(setLoading(false));

  if (response.err) {
    const { message } = response.err;

  } else {

  }
}

export function* eWalletCreditCardFlow() {
  yield takeLatest(TOP_UP, eWalletCreditCardSaga);
}

export default [
  eWalletCreditCardFlow,
];
