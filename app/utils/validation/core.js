import validate from 'validate.js'; // eslint-disable-line import/extensions
import { omit, merge, pick, keys } from 'lodash';
import defaultRules from './rules';

export function isValid(object, rules = {}, except = [], strict = false) {
  const initialRules = merge({}, defaultRules, rules);
  const validationRules = strict ? initialRules : pick(initialRules, keys(object));
  const validationResult = validate(object, omit(validationRules, except));
  return { valid: !validationResult, messages: validationResult || {} };
}
