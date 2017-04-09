import { merge } from 'lodash';

export const LAYOUT_UPDATE = 'common/LAYOUT_UPDATE';
export const REQUEST_STARTED = 'common/REQUEST_STARTED';
export const REQUEST_FINISHED = 'common/REQUEST_FINISHED';
export const REQUEST_FAILED = 'common/REQUEST_FAILED';
export const VALIDATE_FORM = 'common/VALIDATE_FORM';
export const SET_FORM_ERRORS = 'common/SET_FORM_ERRORS';
export const CLEAR_FORM_ERRORS = 'common/CLEAR_FORM_ERRORS';
export const SET_PAGE_NOTICES = 'common/SET_PAGE_NOTICES';
export const CLEAR_PAGE_NOTICES = 'common/CLEAR_PAGE_NOTICES';

export const DEFAULT_LAYOUT = {
  footer: { show: true },
};

export const LAYOUT_NO_FOOTER = merge({}, DEFAULT_LAYOUT, { footer: { show: false } });
