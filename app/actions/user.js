import { LOGIN, SET_USER } from '../constants/user';

export function login(user) {
  return {
    type: LOGIN,
    payload: { user },
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: { user },
  };
}
