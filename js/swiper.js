const swiper = new Swiper(".swiper-testimonials", {
  direction: "horizontal",
  loop: true,
  slidesPerView: 1.9,
  spaceBetween: 24,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".btn-next",
    prevEl: ".btn-prev",
  },

  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },

  breakpoints: {
    1080: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 1.2,
    },
    440: {
      slidesPerView: 1.5,
      spaceBetween: 14,
    },
    0: {
      slidesPerView: 1.5,
      spaceBetween: 14,
    },
  },
});
