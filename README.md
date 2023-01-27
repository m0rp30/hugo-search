Semplice motore di ricerca, basato su fuse.js, per siti statici generati da hugo.
In questo esempio ho testato il funzionamento su due diversi temi (ananke e terminal) ma dovrebbe funzionare comunque anche con 
altri temi, al massimo con qualche piccola modifica.

# Richiesti

- Fuse.js v6.6.2

Al momento e' stato testato solo con i temi ananke e terminal

# Descrizione

## File

Non necessita di molti file, gli unici che ci servono sono

- `static/js/fuse.js` importato da https://fusejs.io/ 
- `static/js/search.js` che si occupa della ricerca e di mostrare i risultati
- `layouts/_default/baseof.html` che sovrascrive qullo originale del tema e mostra la barra di ricerca
- `layouts/_default/index.json` che si occupa di fornire la struttura del file JSON

## Note

Nel file di configurazione di hugo `config.toml` va aggiunto come tipo di file di output il JSON con queste direttive

```toml
[outputs]
  home = ["HTML", "RSS", "JSON"]
```

io ho anche esplicitato le tassionomie, anche se sono quelle di default, che devono esserci e che il motore di ricerca usa

```toml
[taxonomies]
  category = 'categories'
  tag = 'tags'
```

In questo semplice esempio ho voluto inserire la barra di ricerca in ogni pagina quindi ho creato il file `layouts/_default/baseof.html`
che, nella generazione del sito, va a sovrascrivere queelo originale del tema, piu' nello specifico ho inserito le righe dalla linea 17 alla 24

```html
  <!-- Search input -->
  <div id="search" style="margin-left: 10px;margin-top: 20px;">
    <input id="searchInput" tabindex="0">
    <button id="searchButton">Search</button>
    <ul id="searchResults">
    </ul>
  </div>
  <script src="/js/fuse.js"></script> <!-- download and copy over fuse.js file from fusejs.io -->
  <script src="/js/search.js"></script>
```
