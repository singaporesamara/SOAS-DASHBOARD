import { merge, pick } from 'lodash';
import { LAYOUT_UPDATE, REQUEST_STARTED, REQUEST_FINISHED, REQUEST_FAILED, VALIDATE_FORM, CLEAR_FORM_ERRORS, SET_FORM_ERRORS, SET_PAGE_NOTICES, CLEAR_PAGE_NOTICES, LOAD_PAGE, PAGE_LOADED, VALIDATION_TYPES, SET_FORM_LOADING, TRIGGER_MODAL } from '../constants/common';

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

export function validateForm({ form, rules = {}, name = null, except = [], strict = false, type = VALIDATION_TYPES.PAGE }, lifecycle = null) {
  const defaultLifecycle = { onSuccess: () => {}, onError: () => {} };
  const { onSuccess, onError } = merge({}, defaultLifecycle, pick(lifecycle, ['onSuccess', 'onError']));
  return {
    type: VALIDATE_FORM,
    payload: { form, rules, name, onSuccess, onError, strict, except, type },
  };
}

export function setFormErrors(page, { errors, type = VALIDATION_TYPES.PAGE }) {
  return {
    type: SET_FORM_ERRORS,
    payload: { page, errors, type },
  };
}

export function clearFormErrors(page, { type = VALIDATION_TYPES.PAGE }) {
  return {
    type: CLEAR_FORM_ERRORS,
    payload: { page, type },
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

export function setFormLoading(page, { loading, type = VALIDATION_TYPES.PAGE }) {
  return {
    type: SET_FORM_LOADING,
    payload: { page, loading, type },
  };
}

export function triggerModal(name, { opened }) {
  return {
    type: TRIGGER_MODAL,
    payload: { name, opened },
  };
}
