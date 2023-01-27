// Opzioni per la ricerca di fuse
const options = {
    shouldSort: true,
    location: 0,
    distance: 100,
    threshold: 0.4,
    minMatchCharLength: 2,
    // Chiavi di ricerca
    keys: [
	'title',
        'permalink',
	'tags',
        'categories'
        ]
};
const hidenTime = 5000; // Tempo di attesa prima che i risultati mostrati spariscano
const n = 5; // Numero massimo di risultati da mostrare
const contentLenght = 30; // Lunghezza del contenuto dei post riportati dalla ricerca

// Elementi del DOM
const searchInput = document.getElementById("searchInput"); // Campo di input per la query di ricerca
const searchButton = document.getElementById("searchButton"); // Bottone di invio query
const searchResult = document.getElementById("searchResults"); // Elemento padre che conterra' la lista dei risultati


// Event listener che controlla se nel campo inputSearch e' stato premuto RET
searchInput.addEventListener('keyup', (event) => { if(event.key == "Enter") executeSearch(); });

// Event listener che controlla se il bottone searchButton e' stato premuto
searchButton.addEventListener('click', (event) => { if(event.button == 0) executeSearch() });


// funzione che elabora il file JSON senza l'utilizzo di jquery
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

// Funzione che esegue la query di ricerca inserita nel campo searchInput
function executeSearch() {
    // Se il campo searchInput non e' vuoto
    if(searchInput.value !== '') {
	// Elabora il file JSON e restituisce un risultato
	fetchJSONFile('/index.json', function(data){
	    let fuse = new Fuse(data, options); // inizializza fuse
	    let results = fuse.search(searchInput.value); // Variabile con i valori della ricerca con la ricerca passatagli
	    let searchItems = ''; // Variabile che conterra' il risultato, elaborato, da mostrare

	    // Se ci sono risultati
	    if(results.length > 0){
		// Cicla n risultati 
		for (let i in results.slice(0, n)) {
		    let result = results[i].item // Variabile di appoggio del singolo risultato
		    // Concatena i risultati elaborati nella variabile seachItems
		    searchItems = searchItems + '<li><a href="' + result.permalink + '" tabindex="0">' + '<span class="title">' + result.title + '</span><br /> <span class="sc">'+ result.tags +'</span> — ' + result.date + ' — <em>' + result.contents.slice(0, contentLenght) + '</em></a></li>';
		}
	    } else { // Se non ci sono risultati
		searchitems = "<p>No matches found</p>";
	    }

	    // Fa partire il timer per nascondere i risultati
	    setTimeout(() => {
		searchResult.innerHTML = ''; // Elimina i risultati
	    }, hidenTime);

	    // Mostra i risultati
	    searchResult.innerHTML = searchItems; // Mostra i risultati
	    searchInput.value = '' // Svuota il campo searchInput
	});
    }
}
