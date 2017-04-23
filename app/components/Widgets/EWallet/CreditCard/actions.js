import { TOP_UP, SET_LOADING } from './constants';

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
