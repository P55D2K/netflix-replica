const searchInput = $("#search-input");

function search() {
  const searchQuery = searchInput.val();

  if(searchQuery == "")
    return

  window.location.href = "search/search.html?s=" + searchQuery;
}