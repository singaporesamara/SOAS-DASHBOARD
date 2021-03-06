import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { requestStarted, requestFinished, setPageNotices } from '../../actions/common';
import { clearInvoice } from '../../actions/invoices';
import { CREATE_INVOICE } from '../../constants/invoices';
import { ROUTES } from '../../constants/routes';
import routes from '../../utils/network/api';

export function* createInvoiceSaga({ payload }) {
  yield put(requestStarted());
  const response = yield call(routes.invoices.create, payload);
  yield put(requestFinished());

  if (response.err) {
    const { message } = response.err;
    alert(message);
  } else {
    const { number } = response.data;
    const message = `Invoice #${number} has been successfully sent`;
    yield put(clearInvoice());
    yield put(push(ROUTES.APP.HOME));
    yield put(setPageNotices('application', [{ type: 'info', message }]));
  }
}

function* invoicesFlow() {
  yield takeLatest(CREATE_INVOICE, createInvoiceSaga);
}

export default [
  invoicesFlow,
];
