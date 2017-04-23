import { REFRESH_EVENTS } from './constants';

export function refreshEvents() {
  return {
    type: REFRESH_EVENTS,
  };
}
