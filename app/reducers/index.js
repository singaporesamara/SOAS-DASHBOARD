/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducer from '../containers/App/reducer';
import languageProviderReducer from '../containers/LanguageProvider/reducer';
import pages, { commonPageReducer } from './pages/index';
import widgets, { commonWidgetReducer } from './widgets/index';
import entities from './entities/index';
import layout from './pages/layout';
import user from './entities/user';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  const combined = combineReducers({
    route: routeReducer,
    global: globalReducer,
    language: languageProviderReducer,
    layout,
    user,
    pages: pages(),
    widgets: widgets(),
    entities: entities(),
    ...asyncReducers,
  });

  return (state, action) => {
    let newState = state;
    newState = commonPageReducer(newState, action, state);
    newState = commonWidgetReducer(newState, action, state);
    return combined(newState, action);
  };
}
