// A search of Literotica (search.literotica.com/?query=castle, page=2 for the next page) is read as a listing of what
// it finds (see searchResultsOf), in its order: the page lists its results as schema.org list items
// ([property="itemListElement"]), each naming the work it stands for as its resource, which, unlike the page's class
// names, carry no build hash. Each is titled by its heading.
function parseLiteroticaSearch() {
  if (location.hostname !== 'search.literotica.com') {
    return null
  }
  const works = Array.from(document.querySelectorAll('[property="itemListElement"][resource]'), item => ({
    url: item.getAttribute('resource'),
    title: item.querySelector('h1, h2, h3, h4')?.textContent,
  }))
  return searchResultsOf('Literotica', works)
}

// The parser a scrape calls.
registerParser(parseLiteroticaSearch)
