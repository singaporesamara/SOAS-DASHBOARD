import { merge } from 'lodash';

export const LAYOUT_UPDATE = 'common/LAYOUT_UPDATE';

export const DEFAULT_LAYOUT = {
  footer: { show: true },
};

export const LAYOUT_NO_FOOTER = merge({}, DEFAULT_LAYOUT, { footer: { show: false } });
