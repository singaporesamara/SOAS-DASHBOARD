import { CHANGE_PASSWORD, PASSWORD_CHANGED } from './constants';

export function changePassword({ password, checkword }) {
  return {
    type: CHANGE_PASSWORD,
    payload: { password, checkword },
  };
}

export function passwordChanged() {
  return {
    type: PASSWORD_CHANGED,
  };
}
