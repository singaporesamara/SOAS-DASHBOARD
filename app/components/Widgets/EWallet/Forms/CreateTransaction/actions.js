import { CREATE_TRANSACTION, SET_LOADING, TRANSACTION_FINISHED, BACK_TO_FORM } from './constants';

export function createTransaction({ emailOrUEN, amount, purpose, description }) {
  return {
    type: CREATE_TRANSACTION,
    payload: { emailOrUEN, amount, purpose, description },
  };
}

export function setLoading(loading) {
  return {
    type: SET_LOADING,
    payload: { loading },
  };
}

export function transactionFinished(status) {
  return {
    type: TRANSACTION_FINISHED,
    payload: { status },
  };
}

export function backToForm() {
  return {
    type: BACK_TO_FORM,
  };
}
