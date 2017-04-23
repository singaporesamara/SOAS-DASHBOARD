import { TOP_UP, SET_LOADING, BACK_TO_FORM, TRANSACTION_FINISHED } from './constants';

export function topUp({ number, cvc, expirationDate, amount }) {
  return {
    type: TOP_UP,
    payload: { number, cvc, expirationDate, amount },
  };
}

export function setLoading(loading) {
  return {
    type: SET_LOADING,
    payload: { loading },
  };
}

export function backToForm() {
  return {
    type: BACK_TO_FORM,
  };
}

export function transactionFinished(status) {
  return {
    type: TRANSACTION_FINISHED,
    payload: { status },
  };
}
