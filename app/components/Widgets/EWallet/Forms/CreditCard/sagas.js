import { call, put, takeLatest } from 'redux-saga/effects';
import routes from '../../../../../utils/network/api';
import { convertTopUpRequest } from '../../../../../utils/converters/api/request';
import { setLoading, transactionFinished } from './actions';
import { TOP_UP, TRANSACTION_STATUS } from './constants';

export function* eWalletCreditCardSaga({ payload }) {
  yield put(setLoading(true));
  const response = yield call(routes.transactions.topUp, convertTopUpRequest(payload));
  yield put(setLoading(false));

  if (response.err) {
    yield put(transactionFinished(TRANSACTION_STATUS.DECLINED));
  } else {
    yield put(transactionFinished(TRANSACTION_STATUS.COMPLETED));
  }
}

export function* eWalletCreditCardFlow() {
  yield takeLatest(TOP_UP, eWalletCreditCardSaga);
}

export default [
  eWalletCreditCardFlow,
];
