import { call, put, takeLatest } from 'redux-saga/effects';
import routes from '../../../../../utils/network/api';
import { convertCreateTransactionRequest } from '../../../../../utils/converters/api/request';
import { CREATE_TRANSACTION } from './constants';

export function* eWalletCreateTransactionFormSaga({ payload }) {
  const response = yield call(routes.transactions.create, convertCreateTransactionRequest(payload));
  debugger;

  if (response.err) {

  } else {

  }
}

export function* eWalletCreateTransactionFormFlow() {
  yield takeLatest(CREATE_TRANSACTION, eWalletCreateTransactionFormSaga);
}

export default [
  eWalletCreateTransactionFormFlow,
];
