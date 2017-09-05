

import React from 'react';
import { connect } from 'react-redux';

import { fetchNewSearch, fetchAllSearches, fetchMostRecentSearch } from '../actions/search_result_actions';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllSearches();
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.index).length > Object.keys(this.props.index).length) {
      let searchArray = Object.keys(nextProps.index);
      let mostRecentID = searchArray[searchArray.length-1];
      this.props.fetchMostRecentSearch(mostRecentID);
    }
    if ((this.props.current.id !== 0) && (nextProps.current.id !== this.props.current.id)) {
      this.props.fetchAllSearches();
    }

    let currentSmart = [{
        x: ['Samsung', 'LG', 'Toshiba', 'Sony'],
        y: [nextProps.current.samsung_smart_tv, nextProps.current.lg_smart_tv, nextProps.current.toshiba_smart_tv, nextProps.current.sony_smart_tv],
        type: 'bar'
    }];

    let currentCurved = [{
        x: ['Samsung', 'LG', 'Toshiba', 'Sony'],
        y: [nextProps.current.samsung_curved_tv, nextProps.current.lg_curved_tv, nextProps.current.toshiba_curved_tv, nextProps.current.sony_curved_tv],
        type: 'bar'
    }];

    Plotly.newPlot('current-smart-tv-graph', currentSmart);
    Plotly.newPlot('current-curved-tv-graph', currentCurved);
  }

  render() {

    let current = this.props.current;
    return(
      <div id="search-results-div">
        <h1 id="fetch-new-results-button" onClick={this.props.fetchNewSearch}>Click To Get New Results</h1>
        <div id="current-results-div">
          <h1>Most Recent Result</h1>
          <div id="current-results-search-terms">
            <div className="search-term smart">
              <h2>'smart tv'</h2>
              <p>{current.total_smart_tv} total results</p>
              <div className="bar-graph" id="current-smart-tv-graph"></div>
              <p>Top 3 Results Breakdown:</p>
              <ul>
                <li>Samsung had {current.samsung_smart_tv_top3}</li>
                <li>LG had {current.lg_smart_tv_top3}</li>
                <li>Toshiba had {current.toshiba_smart_tv_top3}</li>
                <li>Sony had {current.sony_smart_tv_top3}</li>
              </ul>
            </div>
            <div className="search-term curved">
              <h2>'smart curved tv'</h2>
              <p>{current.total_curved_tv} total results</p>
              <div className="bar-graph" id="current-curved-tv-graph"></div>
              <p>Top 3 Results Breakdown:</p>
                <ul>
                  <li>Samsung had {current.samsung_curved_tv_top3}</li>
                  <li>LG had {current.lg_curved_tv_top3}</li>
                  <li>Toshiba had {current.toshiba_curved_tv_top3}</li>
                  <li>Sony had {current.sony_curved_tv_top3}</li>
                </ul>
            </div>
          </div>
        </div>
        <div id="index-results-div">

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  current: state.searchResult.current,
  index: state.searchResult.index
});

const mapDispatchToProps = (dispatch) => ({
  fetchNewSearch: () => {
    dispatch(fetchNewSearch());
  },
  fetchAllSearches: () => {
    dispatch(fetchAllSearches());
  },
  fetchMostRecentSearch: (id) => {
    dispatch(fetchMostRecentSearch(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
