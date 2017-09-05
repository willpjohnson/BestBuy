export const fetchNewSearch = () => {
  return (
    $.ajax({
      method: 'POST',
      url: 'search_results'
    })
  );
};

export const fetchMostRecentSearch = (id) => {
  return (
    $.ajax({
      method: 'GET',
      url: `search_results/${id}`
    })
  )
}

export const fetchAllSearches = () => {
  return (
    $.ajax({
      method: 'GET',
      url: 'search_results'
    })
  )
}
