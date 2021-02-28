// DARK MODE

const linkDarkMode = document.querySelector('#dark-mode');
linkDarkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  linkDarkMode.classList.toggle('active');
})


// Variables para cambiar el contenido central de la pagina entre los links favoritos y mis gifos
const linkFavoritos = document.querySelector('#link-favoritos');
const sectionMainSearch = document.querySelector('#section-main-search');
const sectionFavoritos = document.querySelector('#section-favoritos');
const sectionMisGifos = document.querySelector('#section-mis-gifos')
const linkMisGifos = document.querySelector('#link-mis-gifos');

// Se activa seccion mis favoritos
linkFavoritos.addEventListener('click', () => {
  sectionMainSearch.classList.add('desactiveSection'); // Se agrega la clase desactiveSection
  sectionFavoritos.classList.add('activeSection'); // Se agrega la clase activeSection para mostrar el contenido en la pagina
  sectionMisGifos.classList.remove('activeSection'); // Se remueve la clase activeSection
  linkFavoritos.classList.add('activeLink'); // Se agrega la clase activeLink 
  linkMisGifos.classList.remove('activeLink'); // Se remueve la clase activeLink
})

// Se activa seccion mis gifos
linkMisGifos.addEventListener('click', () => {
  sectionMainSearch.classList.add('desactiveSection'); 
  sectionFavoritos.classList.remove('activeSection'); 
  sectionMisGifos.classList.add('activeSection'); 
  linkFavoritos.classList.remove('activeLink');
  linkMisGifos.classList.add('activeLink');
})
