import { REGISTER } from './constants';

export function register(profile) {
  return {
    type: REGISTER,
    payload: { profile },
  };
}
