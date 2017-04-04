import { merge, pick } from 'lodash';
import { LAYOUT_UPDATE, REQUEST_STARTED, REQUEST_FINISHED, REQUEST_FAILED, VALIDATE_FORM } from '../constants/common';

export function layoutUpdate(layout) {
  return {
    type: LAYOUT_UPDATE,
    payload: { layout },
  };
}

export function requestStarted() {
  return {
    type: REQUEST_STARTED,
  };
}

export function requestFinished() {
  return {
    type: REQUEST_FINISHED,
  };
}

export function requestFailed() {
  return {
    type: REQUEST_FAILED,
  };
}

export function validateForm({ form, rules = {}, name = null, except = [], strict = false }, lifecycle = null) {
  const defaultLifecycle = { onSuccess: () => {}, onError: () => {} };
  const { onSuccess, onError } = merge({}, defaultLifecycle, pick(lifecycle, ['onSuccess', 'onError']));
  return {
    type: VALIDATE_FORM,
    payload: { form, rules, name, onSuccess, onError, strict, except },
  };
}
