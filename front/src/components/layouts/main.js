// main.js
const burgerButton = document.getElementById('burgerButton');
const navbarMenu = document.getElementById('navbar-sticky');

burgerButton.addEventListener('click', () => {
    navbarMenu.classList.toggle('hidden');
});
