// DARK MODE

const linkDarkMode = document.querySelector('#dark-mode');
linkDarkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  linkDarkMode.classList.toggle('active');
})



const linkFavoritos = document.querySelector('#link-favoritos');
const sectionMainSearch = document.querySelector('#section-main-search');
const sectionFavoritos = document.querySelector('#section-favoritos');
const sectionMisGifos = document.querySelector('#section-mis-gifos')
const linkMisGifos = document.querySelector('#link-mis-gifos');

// Se activa seccion mis favoritos
linkFavoritos.addEventListener('click', () => {
  sectionMainSearch.classList.add('desactiveSection');
  sectionFavoritos.classList.add('activeSection');
  sectionMisGifos.classList.remove('activeSection');
  linkFavoritos.classList.add('activeLink');
  linkMisGifos.classList.remove('activeLink');
})

// Se activa seccion mis favoritos
linkMisGifos.addEventListener('click', () => {
  sectionMainSearch.classList.add('desactiveSection');
  sectionFavoritos.classList.remove('activeSection');
  sectionMisGifos.classList.add('activeSection');
  linkFavoritos.classList.remove('activeLink');
  linkMisGifos.classList.add('activeLink');
})
