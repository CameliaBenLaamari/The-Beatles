window.addEventListener('scroll', function() {
    let header = document.querySelector('header');
    let windowPosition = window.scrollY > 0;
    header.classList.toggle('scrolling', windowPosition);
});

document.addEventListener('DOMContentLoaded', function () {
    let menu = document.getElementById('menu');
    menu.addEventListener('click', () => {
        let navUL = document.getElementById('nav-ul');
        navUL.classList.toggle('show');
    });
});
