import { LAYOUT_UPDATE } from '../constants/common';

export function layoutUpdate(layout) {
  return {
    type: LAYOUT_UPDATE,
    payload: { layout },
  };
}
