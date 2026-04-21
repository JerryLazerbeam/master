const swiper = new Swiper('.swiper', {
  loop: true,
  
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  slidesPerView: 1,
  spaceBetween: 10,

  breakpoints: {
    640: {
      slidesPerView: 3
    }
  }
});
