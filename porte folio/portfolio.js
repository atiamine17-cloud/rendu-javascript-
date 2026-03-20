
//Ajout de slider horizontal//
    const swiper = new Swiper(".mySwiper", {

    direction: "horizontal",
    mousewheel: true,
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: false, 
        draggable: true, 
    },
    initialSlide: 1, 
    speed: 800,
});

const menuLinks = document.querySelectorAll('.onglet a');

menuLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); 
        swiper.slideTo(index);
    });
});