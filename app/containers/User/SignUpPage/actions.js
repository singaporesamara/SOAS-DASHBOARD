import { SIGN_UP } from './constants';

export function signUp(user) {
  return {
    type: SIGN_UP,
    payload: { user },
  };
}
