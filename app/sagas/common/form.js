import { put, takeLatest } from 'redux-saga/effects';
import { isFunction, forEach } from 'lodash';
import { invalidForm, clearFormErrors } from '../../actions/common';
import { VALIDATE_FORM } from '../../constants/common';
import { isValid } from '../../utils/validation';

export function* validateFormSaga({ payload: { name, form, rules, onSuccess, onError, except, strict } }) {
  const { valid, messages } = isValid(form, rules, except, strict);

  if (!valid && name) {
    const errorMessages = {};
    forEach(messages, (value, key) => { errorMessages[key] = value.join('. '); });
    yield put(invalidForm(name, errorMessages));
  } else if (name) {
    yield put(clearFormErrors(name));
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
