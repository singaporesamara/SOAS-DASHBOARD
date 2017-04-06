import { fromJS } from 'immutable';

const initialState = fromJS({ errors: {} });

function pageReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default pageReducer;
