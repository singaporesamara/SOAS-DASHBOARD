import { LOGIN, SET_USER, RESOLVE_APP_STAGE, GET_PROFILE } from '../constants/user';

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

export function getProfile() {
  return {
    type: GET_PROFILE,
  };
}
