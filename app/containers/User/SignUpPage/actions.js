import { SIGN_UP, SIGNED_UP } from './constants';

export function signUp({ email, password }) {
  return {
    type: SIGN_UP,
    payload: { email, password },
  };
}

export function signedUp() {
  return {
    type: SIGNED_UP,
  };
}
