import { REGISTER, REGISTRATION_COMPLETED } from './constants';

export function register(profile) {
  return {
    type: REGISTER,
    payload: { profile },
  };
}

export function registrationCompleted() {
  return {
    type: REGISTRATION_COMPLETED,
  };
}
