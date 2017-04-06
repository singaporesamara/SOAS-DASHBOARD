import { CHANGE_PASSWORD } from './constants';

export function changePassword({ password, passwordConfirmation }) {
  return {
    type: CHANGE_PASSWORD,
    payload: { password, passwordConfirmation },
  };
}
