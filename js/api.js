// JS variables
const buttonSearch = document.querySelector('#button-search');
const searchBar = document.querySelector('#search-bar');
const tagsTrendingGifos = document.getElementsByClassName('words-trending');
const lineSection = document.getElementsByClassName('line-section')[0];

// Se crean las constantes que guardaran la apikey y el API
const apikey = "?api_key=vLrX1NoJtJzqbyTAcVlg7rXe5ipjLXRk";
const apiGiphy = "https://api.giphy.com/v1/gifs/";

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

// Fetch Data from the API to gifos searched
async function sendApiRequest() {
  let userInput = document.querySelector('#search-bar').value
  let response = await fetch(`${apiGiphy}search${apikey}&q=${userInput}`)
  console.log(response) // Para visualizar el fetch
  let gifos = await response.json()
  lineSection.classList.add('activeSection');
  console.log(gifos) // Para visualizar el fetch con json
  useApiData(gifos)
};

// Function for showing the giphys searched
function useApiData(gifos) {
  let sectionGifosSearch = document.querySelector('#section-gifos-search');
  let containerGifosSearch = document.querySelector('#container-gifos-search');
  let searchSinContenido = document.getElementsByClassName('search-sin-contenido')[0];
  if (sectionGifosSearch.childElementCount > 0) { // Condition to clean the container every time the user does a search
    containerGifosSearch.innerHTML = "";
  }
  if (gifos.data.length < 1) {
    searchSinContenido.classList.add('activeSection');
  } else {
    limit = 12;
    searchSinContenido.classList.remove('activeSection')

    for (let i = 0; i < limit; i++) {
      let boxGifoSearch = document.createElement('div');
      boxGifoSearch.setAttribute('class', 'boxGifoSearch');
      let gifoSeacrh = document.createElement('img');
      gifoSeacrh.setAttribute('class', 'gifoSearch');
      gifoSeacrh.setAttribute('src', gifos.data[i].images.original.url)
      boxGifoSearch.appendChild(gifoSeacrh);
      containerGifosSearch.appendChild(boxGifoSearch);
    }
    // document.querySelector('#container-gifos-search').innerHTML = `<img src = "${gifos.data[i].images.original.url}">`
  }
}

// ---------------------- Trending Gifos Tags -------------------------------------
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