// JS variables
const buttonSearch = document.querySelector('#button-search');
const searchBar = document.querySelector('#search-bar');
const lineSearchSection = document.getElementsByClassName('line-search-section')[0];
const containerSuggestionsSearch = document.querySelector('#cont-suggestion-search');
const suggestionBox = document.getElementsByClassName('suggestion');
const sectionGifosSearch = document.querySelector('#section-gifos-search');
const containerGifosSearch = document.querySelector('#container-gifos-search');
const searchSinContenido = document.getElementsByClassName('search-sin-contenido')[0];
const searchConContenido = document.getElementsByClassName('search-con-contenido')[0];
let titleSearch = document.querySelector('#title-search');
const trendingSection = document.querySelector('#trending-section');
const tagsTrendingGifos = document.getElementsByClassName('words-trending');
const lineSection = document.getElementsByClassName('line-section')[0];
const buttonClean = document.querySelector('#button-clean');

// Se crean las constantes que guardaran la apikey y el API
const apikey = "?api_key=vLrX1NoJtJzqbyTAcVlg7rXe5ipjLXRk";
const apiGiphy = "https://api.giphy.com/v1/gifs/";


// -----------------------------Funcionalidad de Busqueda----------------------------------------------------

// Se agrega el evento que correra la funcion cuando el icono es clickeado
buttonSearch.addEventListener('click',() => {
  sendApiRequest()
}) 

// Se agrega la funcion keypress que correra el codigo cuando se oprima la tecla enter
searchBar.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    sendApiRequest()
  }
});

// Se hace el Fetch Data de la API con el valor de busqueda del Usuario
async function sendApiRequest() {
  lineSection.classList.add('activeSection'); // Se activa la linea que divide las secciones
  trendingSection.classList.add('desactiveSection');
  let userInput = searchBar.value
  let response = await fetch(`${apiGiphy}search${apikey}&q=${userInput}`)
  let gifos = await response.json()
  console.log(gifos) // Para visualizar el fetch con json
  useApiData(gifos)
};

// Funcion para mostrar los Gifos buscados
function useApiData(gifos) {
  titleSearch.textContent = searchBar.value
  if (sectionGifosSearch.childElementCount > 0) { // Condicion para limpiar los Gifos buscados cada vez que el usuario hace una nueva busqueda
    containerGifosSearch.innerHTML = "";
  }
  if (gifos.data.length < 1) { //Condicional para activar la seccion de busqueda sin contenido
    searchSinContenido.classList.add('activeSection');
    trendingSection.classList.remove('desactiveSection');
  } else { //Condicional para activar la seccion de busqueda con contenido con 12 Gifos
    limit = 12;
    searchSinContenido.classList.remove('activeSection');
    searchConContenido.classList.add('activeSection');
    for (let i = 0; i < limit; i++) {
      let boxGifoSearch = document.createElement('div');
      boxGifoSearch.setAttribute('class', 'boxGifoSearch');
      let gifoSeacrh = document.createElement('img');
      gifoSeacrh.setAttribute('class', 'gifoSearch');
      gifoSeacrh.setAttribute('src', gifos.data[i].images.original.url)
      boxGifoSearch.appendChild(gifoSeacrh);
      containerGifosSearch.appendChild(boxGifoSearch);
    }
  }
}

// -----------------------Autocompletado y Sugerencias--------------------------------------

let suggestionsArray = [];
searchBar.addEventListener('keyup', (e) => { //Evento para tomar las letras que se ponen en la barra de busqueda
  let userData = e.target.value;
  buttonSearch.classList.add('activeSearch');
  buttonClean.classList.add('activeSearch');
  if (userData == "") {
    containerSuggestionsSearch.innerHTML = '';
    lineSearchSection.classList.remove('activeSection')
  }
  containerSuggestionsSearch.innerHTML = ''; //Codigo para limpiar el contenedor de sugerencias cuando se teclee una nueva letra
  suggestionsArray = [];
  if (userData.length > 0) {
    console.log(userData)
    sendApiRequestSuggestions(userData);
  }
})

async function sendApiRequestSuggestions (userData) { //Funcion para enlazar la API del Autocomplete 
  let response = await fetch(`${apiGiphy}search/tags${apikey}&q=${userData}`);
  let suggestionJson = await response.json();
  console.log(suggestionJson);
  useApiDataSuggestions(suggestionJson);
}

function useApiDataSuggestions(object) { //Funcion para consumir la API y crear las sugerencias
  if (object.data.length > 0) {
    lineSearchSection.classList.add('activeSection');
    containerSuggestionsSearch.classList.add('activeSection');
    for (let i=0; i < 4 && i < object.data.length; i++) {
      suggestionsArray.push(object.data[i].name)
      let suggestionBoxClone = suggestionBox[0].cloneNode(true);
      containerSuggestionsSearch.appendChild(suggestionBoxClone);
      // console.log(suggestion, i);
      let textInputSuggestion = document.getElementsByClassName('input-suggestion');
      textInputSuggestion[i].innerHTML = object.data[i].name;
      suggestionBoxClone.style.display = 'block';
      suggestionBoxClone.addEventListener('click', () => { //Evento para reemplazar valor de la barra de busqueda cuando clickea alguna sugerencia
        searchBar.value = object.data[i].name;
        sendApiRequest()
        containerSuggestionsSearch.classList.remove('activeSection');
        lineSearchSection.classList.remove('activeSection');
      })
      if (containerSuggestionsSearch.childElementCount > 4) {
        break;
      }
    }
  }
}

// ---------------------- Evento para limpiar la barra de busqueda ------------------------

buttonClean.addEventListener('click', () => {
  searchBar.value = "";
  buttonClean.classList.remove('activeSearch');
  buttonSearch.classList.remove('activeSearch');
  lineSection.classList.remove('activeSection');
  searchConContenido.classList.remove('activeSection');
  containerSuggestionsSearch.innerHTML = "";
  lineSearchSection.classList.remove('activeSection');
  titleSearch.innerHTML = "";
  trendingSection.classList.remove('desactiveSection');
})

// ----------------------Search Header ----------------------------------------------
const cntSearchBar = document.getElementsByClassName('container-search-gifos')[0];
const cntSearchHeader = document.getElementsByClassName('container-search-nav')[0];

function activeSearchHeader() {
  if (document.documentElement.scrollTop > 350) {
    let ctnSearchBarClone = cntSearchBar.cloneNode(true);
    cntSearchHeader.appendChild(ctnSearchBarClone)
  }
}


// ----------------------Tags Trending Gifos ----------------------------------------------
window.onload = sendApiRandomRequest();
async function sendApiRandomRequest(){
  let response = await fetch(`${apiGiphy}categories${apikey}`);
  let tagGifo = await response.json()
  useApiRandomData(tagGifo)
  console.log(tagGifo)
};

function useApiRandomData(tagGifo) {
  for (let i = 0; i < tagsTrendingGifos.length; i++) {
    tagsTrendingGifos[i].innerHTML = tagGifo.data[Math.floor(Math.random()*28)].name;
  }
}

// let response = await fetch(`https://media2.giphy.com/media/${this.id}/giphy.gif?${apiKey}&rid=giphy.gif`);
//   let file = await response.blob();
