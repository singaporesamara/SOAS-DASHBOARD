import { LOGIN, SET_USER, RESOLVE_APP_STAGE } from '../constants/user';

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

export function resolveAppStage(user) {
  return {
    type: RESOLVE_APP_STAGE,
    payload: { user },
  };
}
