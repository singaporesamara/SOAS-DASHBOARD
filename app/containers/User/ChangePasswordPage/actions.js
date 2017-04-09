import { CHANGE_PASSWORD, PASSWORD_CHANGED } from './constants';

export function changePassword({ password, passwordConfirmation }) {
  return {
    type: CHANGE_PASSWORD,
    payload: { password, passwordConfirmation },
  };
}

export function passwordChanged() {
  return {
    type: PASSWORD_CHANGED,
  };
}
