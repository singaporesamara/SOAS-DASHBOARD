import { call, takeLatest, put } from 'redux-saga/effects';
import routes from '../../../../../utils/network/api';
import { setFormErrors } from '../../../../../actions/common';
import { convertTopUpByGIRORequest } from '../../../../../utils/converters/api/request';
import { loadEvents } from '../../../../../actions/events';
import { updateUserProfile } from '../../../../../sagas/common/user';
import { setFormLoading } from '../../../../../actions/common';
import { VALIDATION_TYPES } from '../../../../../constants/common';
import { TRANSACTION_STATUS } from '../../../../../constants/tansactions';
import { TOP_UP_BY_GIRO } from './constants';
import { transactionFinished } from './actions';

export function* eWalletTopUpGIROFormSaga({ payload }) {
  yield put(setFormLoading('eWalletTopUpGIROForm', { loading: true, type: VALIDATION_TYPES.WIDGET }));
  const response = yield call(routes.transactions.topUpByGIRO, convertTopUpByGIRORequest(payload));
  yield put(setFormLoading('eWalletTopUpGIROForm', { loading: false, type: VALIDATION_TYPES.WIDGET }));

  if (response.err) {
    const { errors, message } = response.err;
    if (errors) {
      yield put(setFormErrors('eWalletTopUpGIROForm', { errors, type: VALIDATION_TYPES.WIDGET }));
    } else {
      alert(message);
    }
  } else {
    yield put(transactionFinished(TRANSACTION_STATUS.COMPLETED));
    yield put(loadEvents());
    yield updateUserProfile();
  }
}

export function* eWalletTopUpGIROFormFlow() {
  yield takeLatest(TOP_UP_BY_GIRO, eWalletTopUpGIROFormSaga);
}

export default [
  eWalletTopUpGIROFormFlow,
];
