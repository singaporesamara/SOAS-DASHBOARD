import { call, takeLatest, put } from 'redux-saga/effects';
import routes from '../../../../../utils/network/api';
import { setFormErrors, setFormLoading } from '../../../../../actions/common';
import { loadEvents } from '../../../../../actions/events';
import { VALIDATION_TYPES } from '../../../../../constants/common';
import { TRANSACTION_STATUS } from '../../../../../constants/tansactions';
import { updateUserProfile } from '../../../../../sagas/common/user';
import { convertCreateTransactionRequest } from '../../../../../utils/converters/api/request';
import { CREATE_TRANSACTION } from './constants';
import { transactionFinished } from './actions';

export function* eWalletCreateTransactionFormSaga({ payload }) {
  console.info(payload);
  return;

  // TODO GIRO Transaction here..
  yield put(setFormLoading('eWalletCreateGIROTransactionForm', { loading: true, type: VALIDATION_TYPES.WIDGET }));
  const response = yield call(routes.transactions.create, convertCreateTransactionRequest(payload));
  yield put(setFormLoading('eWalletCreateGIROTransactionForm', { loading: false, type: VALIDATION_TYPES.WIDGET }));

  if (response.err) {
    const { errors, message } = response.err;
    if (errors) {
      yield put(setFormErrors('eWalletCreateGIROTransactionForm', { errors, type: VALIDATION_TYPES.WIDGET }));
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
