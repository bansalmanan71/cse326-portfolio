// Select the hamburger button and the navigation links
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

// Toggle the 'show' class when the button is clicked
hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});