export const brandCompDataCompiler = (current) => {
  let currentSmart = [{
      x: ['Samsung', 'LG', 'Toshiba', 'Sony'],
      y: [current.samsung_smart_tv, current.lg_smart_tv, current.toshiba_smart_tv, current.sony_smart_tv],
      type: 'bar'
  }];
  let currentCurved = [{
      x: ['Samsung', 'LG', 'Toshiba', 'Sony'],
      y: [current.samsung_curved_tv, current.lg_curved_tv, current.toshiba_curved_tv, current.sony_curved_tv],
      type: 'bar'
  }];
  return {currentSmart, currentCurved}
}

export const searchRankDataCompiler = (current) => {
  let items = current.search_result_items
  let reviews = {smart: [], curved: []};
  let ratings = {smart: [], curved: []};
  let smartIndices = [];
  let curvedIndices = [];
  for (let i = 0; i < current.total_smart_tv; i++) {
    smartIndices.push(i)
  }
  for (let i = 0; i < current.total_curved_tv; i++) {
    curvedIndices.push(i)
  }
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    if (item.search_term === "smart_tv") {
      reviews.smart.push(item.reviews);
      ratings.smart.push(item.rating);
    } else {
      reviews.curved.push(item.reviews);
      ratings.curved.push(item.rating);
    }
  }
  let reviewsSmart = {
    x: smartIndices,
    y: reviews.smart,
    mode: 'markers',
    type: 'scatter',
    name: 'smart tv'
  };
  let reviewsCurved = {
    x: curvedIndices,
    y: reviews.curved,
    mode: 'markers',
    type: 'scatter',
    name: 'curved smart tv'
  };
  let ratingsSmart = {
    x: smartIndices,
    y: ratings.smart,
    mode: 'markers',
    type: 'scatter',
    name: 'smart tv'
  };
  let ratingsCurved = {
    x: curvedIndices,
    y: ratings.curved,
    mode: 'markers',
    type: 'scatter',
    name: 'curved smart tv'
  };
  return {reviewsSmart, reviewsCurved, ratingsSmart, ratingsCurved}
}

export const volatilityDataCompiler = (index) => {
  let smartSamsung = [];
  let smartLG = [];
  let smartToshiba = [];
  let smartSony = [];
  let curvedSamsung = [];
  let curvedLG = [];
  let curvedToshiba = [];
  let curvedSony = [];
  let dates = [];
  for ( let id in index) {
    let search = index[id];
    dates.push(search.created_at);
    smartSamsung.push(search.samsung_smart_tv);
    smartLG.push(search.lg_smart_tv);
    smartToshiba.push(search.toshiba_smart_tv);
    smartSony.push(search.sony_smart_tv);
    curvedSamsung.push(search.samsung_curved_tv);
    curvedLG.push(search.lg_curved_tv);
    curvedToshiba.push(search.toshiba_curved_tv);
    curvedSony.push(search.sony_curved_tv);
  }
  let smartSamsungGraph = {
    x: dates,
    y: smartSamsung,
    mode: 'markers',
    type: 'scatter',
    name: 'Samsung'
  };
  let smartLGGraph = {
    x: dates,
    y: smartLG,
    mode: 'markers',
    type: 'scatter',
    name: 'LG'
  };
  let smartToshibaGraph = {
    x: dates,
    y: smartToshiba,
    mode: 'markers',
    type: 'scatter',
    name: 'Toshiba'
  };
  let smartSonyGraph = {
    x: dates,
    y: smartSony,
    mode: 'markers',
    type: 'scatter',
    name: 'Sony'
  };
  let curvedSamsungGraph = {
    x: dates,
    y: curvedSamsung,
    mode: 'markers',
    type: 'scatter',
    name: 'Samsung'
  };
  let curvedLGGraph = {
    x: dates,
    y: curvedLG,
    mode: 'markers',
    type: 'scatter',
    name: 'LG'
  };
  let curvedToshibaGraph = {
    x: dates,
    y: curvedToshiba,
    mode: 'markers',
    type: 'scatter',
    name: 'Toshiba'
  };
  let curvedSonyGraph = {
    x: dates,
    y: curvedSony,
    mode: 'markers',
    type: 'scatter',
    name: 'Sony'
  };
  return {
    smartSamsungGraph, smartLGGraph, smartToshibaGraph, smartSonyGraph, curvedSamsungGraph, curvedLGGraph, curvedToshibaGraph, curvedSonyGraph
  }
}
