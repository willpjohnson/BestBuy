import * as APIUtil from '../util/search_results_api_util';

export const RECEIVE_NEW_SEARCH = 'RECEIVE_NEW_SEARCH';
export const RECEIVE_ALL_SEARCHES = 'RECEIVE_ALL_SEARCHES';

export const fetchNewSearch = () => dispatch => {
  return APIUtil.fetchNewSearch().then( (searchResults) => {
    return dispatch(receiveNewSearch(searchResults));
  });
};

export const fetchMostRecentSearch = (id) => dispatch => {
  return APIUtil.fetchMostRecentSearch(id).then( (searchResults) => {
    return dispatch(receiveNewSearch(searchResults));
  });
};

export const fetchAllSearches = () => dispatch => {
  return APIUtil.fetchAllSearches().then( (searches) => {
    return dispatch(receiveAllSearches(searches));
  });
};

export const receiveNewSearch = (searchResults) => {
  return({
    type: RECEIVE_NEW_SEARCH,
    searchResults: searchResults
  })
}

export const receiveAllSearches = (searches) => {
  return({
    type: RECEIVE_ALL_SEARCHES,
    searches: searches
  })
}
