import { put, takeLatest } from 'redux-saga/effects';
import { isFunction, forEach } from 'lodash';
import { setFormErrors, clearFormErrors } from '../../actions/common';
import { VALIDATE_FORM } from '../../constants/common';
import { isValid } from '../../utils/validation';

export function* validateFormSaga({ payload: { name, form, rules, onSuccess, onError, except, strict, type } }) {
  const { valid, messages } = isValid(form, rules, except, strict);

  if (!valid && name) {
    const errorMessages = {};
    forEach(messages, (value, key) => { errorMessages[key] = value.join('. '); });
    yield put(setFormErrors(name, { errors: errorMessages, type }));
  } else if (name) {
    yield put(clearFormErrors(name, { type }));
  }

  const method = valid ? onSuccess : onError;

  if (isFunction(method)) {
    method({ valid, messages });
  }
}

function* formFlow() {
  yield takeLatest(VALIDATE_FORM, validateFormSaga);
}

export default [
  formFlow,
];
