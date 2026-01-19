const menu = document.querySelector(".menu-phone");
const btnMenu = document.querySelector(".btn-menu");
const btnMenuClose = document.querySelector(".menu-phone__top-btn");

function openMenu() {
  menu.classList.add("active");
}

function closeMenu() {
  menu.classList.remove("active");
}

btnMenu.addEventListener("click", openMenu);

btnMenuClose.addEventListener("click", closeMenu);

// faq__list-item

const faqItems = document.querySelectorAll(".faq__list-item");

faqItems.forEach((item) => {
  item.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    // закрываем все
    faqItems.forEach((el) => el.classList.remove("active"));

    // если кликнули НЕ по уже открытому — открываем
    if (!isActive) {
      item.classList.add("active");
    }
  });
});

// 

(() => {
  const section = document.querySelector(".faq");
  if (!section) return;

  const STAGGER = 140;

  const items = [
    section.querySelector(".faq__title"),
    section.querySelector(".faq__subtitle"),
    ...section.querySelectorAll(".faq__list-item"),
  ].filter(Boolean);

  const reveal = () => {
    items.forEach((el, i) => {
      if (el.classList.contains("is-in")) return;
      el.style.transitionDelay = `${i * STAGGER}ms`;
      requestAnimationFrame(() => el.classList.add("is-in"));
    });
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal();
        io.disconnect(); // один раз на секцию
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
  );

  io.observe(section);
})();
