import merge from 'lodash/merge';

import { RECEIVE_NEW_SEARCH, RECEIVE_ALL_SEARCHES } from '../actions/search_result_actions';

const defaultState = {
  current: {id: 0},
  index: {}
}

const SearchResultsReducer = (state = defaultState, action) => {
  Object.freeze(state)
  let newState = merge({}, state);

  switch(action.type) {
    case RECEIVE_NEW_SEARCH:
      newState.current = action.searchResults;
      return newState;
    case RECEIVE_ALL_SEARCHES:
      newState.index = action.searches;
      return newState;
    default:
      return state;
  }
};

export default SearchResultsReducer;
