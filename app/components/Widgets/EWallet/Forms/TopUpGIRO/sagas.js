import { call, takeLatest, put } from 'redux-saga/effects';
import routes from '../../../../../utils/network/api';
import { TOP_UP_BY_GIRO } from './constants';

export function* eWalletTopUpGIROFormSaga({ payload }) {
  console.info(payload);
  alert('submit GIRO here...');
  // const response = yield call(routes.transactions.create, convertCreateTransactionRequest(payload));
}

export function* eWalletTopUpGIROFormFlow() {
  yield takeLatest(TOP_UP_BY_GIRO, eWalletTopUpGIROFormSaga);
}

export default [
  eWalletTopUpGIROFormFlow,
];
