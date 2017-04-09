import { merge, pick } from 'lodash';
import { LAYOUT_UPDATE, REQUEST_STARTED, REQUEST_FINISHED, REQUEST_FAILED, VALIDATE_FORM, CLEAR_FORM_ERRORS, SET_FORM_ERRORS, SET_PAGE_NOTICES, CLEAR_PAGE_NOTICES, LOAD_PAGE, PAGE_LOADED } from '../constants/common';

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

export function setFormErrors(page, errors) {
  return {
    type: SET_FORM_ERRORS,
    payload: { page, errors },
  };
}

export function clearFormErrors(page) {
  return {
    type: CLEAR_FORM_ERRORS,
    payload: { page },
  };
}

export function setPageNotices(page, notices) {
  return {
    type: SET_PAGE_NOTICES,
    payload: { page, notices },
  };
}

export function clearPageNotices(page) {
  return {
    type: CLEAR_PAGE_NOTICES,
    payload: { page },
  };
}

export function loadPage(page) {
  return {
    type: LOAD_PAGE,
    payload: { page },
  };
}

export function pageLoaded(page) {
  return {
    type: PAGE_LOADED,
    payload: { page },
  };
}
