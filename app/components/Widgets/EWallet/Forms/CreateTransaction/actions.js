import { CREATE_TRANSACTION, SET_LOADING } from './constants';

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
