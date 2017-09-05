import React from 'react';
import { connect } from 'react-redux';

import { volatilityDataCompiler, searchRankDataCompiler, brandCompDataCompiler } from '../graph_data';
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

    let brandCompData = brandCompDataCompiler(nextProps.current);
    Plotly.newPlot('current-smart-tv-graph', brandCompData.currentSmart);
    Plotly.newPlot('current-curved-tv-graph', brandCompData.currentCurved);

    let searchRankData = searchRankDataCompiler(nextProps.current);
    Plotly.newPlot('reviews-scatter-graph', [searchRankData.reviewsSmart, searchRankData.reviewsCurved]);
    Plotly.newPlot('ratings-scatter-graph', [searchRankData.ratingsSmart, searchRankData.ratingsCurved]);

    let volatilityData = volatilityDataCompiler(nextProps.index);
    Plotly.newPlot('smart-index-graph', [volatilityData.smartSamsungGraph,volatilityData.smartLGGraph,volatilityData.smartToshibaGraph,volatilityData.smartSonyGraph]);
    Plotly.newPlot('curved-index-graph', [volatilityData.curvedSamsungGraph,volatilityData.curvedLGGraph,volatilityData.curvedToshibaGraph,volatilityData.curvedSonyGraph]);
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
          <h2>Number of Reviews (y) vs Search Ranking (x)</h2>
          <div className="scatter-graph" id="reviews-scatter-graph"></div>
          <h2>5-Star Ranking (y) vs Search Ranking (x)</h2>
          <div className="scatter-graph" id="ratings-scatter-graph"></div>
        </div>
        <div id="index-results-div">
          <h1>Reults History</h1>
          <h2>'smart tv'</h2>
          <div className="scatter-graph" id="smart-index-graph"></div>
          <h2>'curved smart tv'</h2>
          <div className="scatter-graph" id="curved-index-graph"></div>
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
