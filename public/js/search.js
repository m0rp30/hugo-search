const options = {
    shouldSort: true,
    location: 0,
    distance: 100,
    threshold: 0.4,
    minMatchCharLength: 2,
    keys: [
	'title',
        'permalink',
	'tags',
        'categories'
        ]
};

const searchInput = document.getElementById("searchInput");


// ==========================================
// Event listener
//
searchInput.addEventListener('keyup', (event) => {
    if(event.key === "Enter") {
	executeSearch();
    }
});

// ==========================================
// fetch some json without jquery
//
function fetchJSONFile(path, callback) {
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        let data = JSON.parse(httpRequest.responseText);
          if (callback) callback(data);
      }
    }
  };
  httpRequest.open('GET', path);
  httpRequest.send(); 
}

// ==========================================
// load our search index, only executed once
// on first call of search box (CMD-/)
//
function executeSearch() {
    if(searchInput.value !== '') {
    fetchJSONFile('/index.json', function(data){
	let fuse = new Fuse(data, options);
	let results = fuse.search(searchInput.value);
	let searchitems = '';
	
	if(results.length > 0){
	    for (let i in results.slice(0,5)) {
		searchitems = searchitems + '<li><a href="' + results[i].item.permalink + '" tabindex="0">' + '<span class="title">' + results[i].item.title + '</span><br /> <span class="sc">'+ results[i].item.tags +'</span> — ' + results[i].item.date + ' — <em>' + results[i].item.contents + '</em></a></li>';
	    }
	} else {
	    searchitems = "<p>No matches found</p>";
	}
	const searchResult = document.getElementById("searchResults")
	setTimeout(() => {
	    searchResult.style.display = 'none';
	}, 2000);
	searchResult.style.display = 'block';
	searchResult.innerHTML = searchitems;
	searchInput.value = ''
    });}
}
