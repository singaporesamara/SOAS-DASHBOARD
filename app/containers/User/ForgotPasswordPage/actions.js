import { RESTORE_PASSWORD, RESTORATION_RESENT } from './constants';

export function restorePassword(email) {
  return {
    type: RESTORE_PASSWORD,
    payload: { email },
  };
}

export function restorationResent() {
  return {
    type: RESTORATION_RESENT,
  };
}
