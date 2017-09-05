import { combineReducers } from 'redux';
import SearchResultsReducer from './search_result_reducer';

const rootReducer = combineReducers({
  searchResult: SearchResultsReducer
});

export default rootReducer;
