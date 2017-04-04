import { combineReducers } from 'redux-immutable';
import current from './current';

const pages = { current };

export default () => (combineReducers(pages));
