import { call, takeLatest, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import routes from '../../../../../utils/network/api';
import { setFormLoading } from '../../../../../actions/common';
import { VALIDATION_TYPES } from '../../../../../constants/common';
import { TRANSACTION_STATUS } from '../../../../../constants/tansactions';
import { TOP_UP_BY_GIRO } from './constants';
import { transactionFinished } from './actions';

export function* eWalletTopUpGIROFormSaga({ payload }) {
  yield put(setFormLoading('eWalletTopUpGIROForm', { loading: true, type: VALIDATION_TYPES.WIDGET }));

  yield call(delay, 1000);

  yield put(setFormLoading('eWalletTopUpGIROForm', { loading: false, type: VALIDATION_TYPES.WIDGET }));
  yield put(transactionFinished(TRANSACTION_STATUS.COMPLETED));

  console.info(payload);
  // const response = yield call(routes.transactions.create, convertCreateTransactionRequest(payload));
}

export function* eWalletTopUpGIROFormFlow() {
  yield takeLatest(TOP_UP_BY_GIRO, eWalletTopUpGIROFormSaga);
}

export default [
  eWalletTopUpGIROFormFlow,
];
