import { call, takeLatest, put } from 'redux-saga/effects';
import routes from '../../../../../utils/network/api';
import { setFormErrors } from '../../../../../actions/common';
import { VALIDATION_TYPES } from '../../../../../constants/common';
import { updateUserProfile } from '../../../../../sagas/common/user';
import { convertCreateTransactionRequest } from '../../../../../utils/converters/api/request';
import { CREATE_TRANSACTION } from './constants';
import { setLoading } from './actions';

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
    yield updateUserProfile();
    alert('done..');
  }
}

export function* eWalletCreateTransactionFormFlow() {
  yield takeLatest(CREATE_TRANSACTION, eWalletCreateTransactionFormSaga);
}

export default [
  eWalletCreateTransactionFormFlow,
];