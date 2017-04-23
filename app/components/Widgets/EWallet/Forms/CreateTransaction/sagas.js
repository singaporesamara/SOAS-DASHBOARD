import { call, takeLatest, put } from 'redux-saga/effects';
import routes from '../../../../../utils/network/api';
import { setFormErrors } from '../../../../../actions/common';
import { loadEvents } from '../../../../../actions/events';
import { VALIDATION_TYPES } from '../../../../../constants/common';
import { TRANSACTION_STATUS } from '../../../../../constants/tansactions';
import { updateUserProfile } from '../../../../../sagas/common/user';
import { convertCreateTransactionRequest } from '../../../../../utils/converters/api/request';
import { CREATE_TRANSACTION } from './constants';
import { setLoading, transactionFinished } from './actions';

export function* eWalletCreateTransactionFormSaga({ payload }) {
  yield put(setLoading(true));
  const response = yield call(routes.transactions.create, convertCreateTransactionRequest(payload));
  yield put(setLoading(false));

  if (response.err) {
    const { errors, message } = response.err;
    if (errors) {
      yield put(setFormErrors('eWalletCreateTransactionForm', { errors, type: VALIDATION_TYPES.WIDGET }));
    } else {
      alert(message);
    }
  } else {
    yield put(transactionFinished(TRANSACTION_STATUS.COMPLETED));
    yield put(loadEvents());
    yield updateUserProfile();
  }
}

export function* eWalletCreateTransactionFormFlow() {
  yield takeLatest(CREATE_TRANSACTION, eWalletCreateTransactionFormSaga);
}

export default [
  eWalletCreateTransactionFormFlow,
];
