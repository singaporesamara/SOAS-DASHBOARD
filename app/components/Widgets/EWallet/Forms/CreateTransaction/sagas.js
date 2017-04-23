import { call, takeLatest, put } from 'redux-saga/effects';
import routes from '../../../../../utils/network/api';
import { setFormErrors } from '../../../../../actions/common';
import { VALIDATION_TYPES } from '../../../../../constants/common';
import { convertCreateTransactionRequest } from '../../../../../utils/converters/api/request';
import { CREATE_TRANSACTION } from './constants';

export function* eWalletCreateTransactionFormSaga({ payload }) {
  const response = yield call(routes.transactions.create, convertCreateTransactionRequest(payload));

  if (response.err) {
    const { errors, message } = response.err;

    if (errors) {
      yield put(setFormErrors('eWalletCreateTransactionForm', { errors, type: VALIDATION_TYPES.WIDGET }));
    } else {
      alert(message);
    }
  } else {
    alert('done..');
  }
}

export function* eWalletCreateTransactionFormFlow() {
  yield takeLatest(CREATE_TRANSACTION, eWalletCreateTransactionFormSaga);
}

export default [
  eWalletCreateTransactionFormFlow,
];
