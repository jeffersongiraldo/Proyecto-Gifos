// DARK MODE

const linkDarkMode = document.querySelector('#dark-mode');

linkDarkMode.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  linkDarkMode.classList.toggle('active');
})