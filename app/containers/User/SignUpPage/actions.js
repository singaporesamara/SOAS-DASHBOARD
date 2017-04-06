import { SIGN_UP } from './constants';

export function signUp({ email, password }) {
  return {
    type: SIGN_UP,
    payload: { email, password },
  };
}
