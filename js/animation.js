(() => {
  const SECTION = ".hero";
  const STAGGER = 140; // задержка между элементами

  const section = document.querySelector(SECTION);
  if (!section) return;

  const items = [
    section.querySelector(".hero__title"),
    section.querySelector(".hero__subtitle"),
    section.querySelector(".btn-static"),
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
        io.disconnect(); // hero один раз
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px",
    },
  );

  io.observe(section);
})();

//

(() => {
  const section = document.querySelector(".about");
  if (!section) return;

  const HEADER_STAGGER = 140; // каскад для заголовка секции
  const CARD_STAGGER = 180; // задержка между карточками
  const INSIDE_STAGGER = 110; // каскад внутри карточки

  const headerEls = [
    section.querySelector(".section-muted"),
    section.querySelector(".about__title"),
  ].filter(Boolean);

  const cards = Array.from(section.querySelectorAll(".about__blocks-item"));

  const revealList = (elements, stagger) => {
    elements.forEach((el, i) => {
      if (!el || el.classList.contains("is-in")) return;
      el.style.transitionDelay = `${i * stagger}ms`;
      requestAnimationFrame(() => el.classList.add("is-in"));
    });
  };

  const revealCard = (card) => {
    // сначала сама карточка (легкий появляющийся контейнер)
    if (!card.classList.contains("is-in")) card.classList.add("is-in");

    // затем контент внутри карточки
    const innerEls = [
      card.querySelector(".about__blocks-muted"),
      card.querySelector(".about__blocks-title"),
      card.querySelector(".about__blocks-subtitle"),
      card.querySelector(".btn-static"),
      ...Array.from(card.querySelectorAll("img")),
    ].filter(Boolean);

    innerEls.forEach((el, i) => {
      if (el.classList.contains("is-in")) return;
      el.style.transitionDelay = `${i * INSIDE_STAGGER}ms`;
      requestAnimationFrame(() => el.classList.add("is-in"));
    });
  };

  const revealAll = () => {
    // 1) заголовок секции
    revealList(headerEls, HEADER_STAGGER);

    // 2) карточки по очереди сверху вниз
    cards.forEach((card, idx) => {
      // общая задержка карточки относительно старта секции
      const baseDelay = headerEls.length * HEADER_STAGGER + idx * CARD_STAGGER;

      // запускаем карточку чуть позже, чтобы не все сразу
      setTimeout(() => revealCard(card), baseDelay);
    });
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealAll();
        io.disconnect(); // один раз на секцию
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
  );

  io.observe(section);
})();

//

(() => {
  const section = document.querySelector(".testimonials");
  if (!section) return;

  const STAGGER = 140;

  const items = [
    section.querySelector(".section-muted"),
    section.querySelector(".section-title"), // у тебя: section-title about__title
    section.querySelector(".about__subtitle"),
    section.querySelector(".buttons"),
    section.querySelector(".swiper-testimonials"), // весь слайдер одним блоком
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
        io.disconnect();
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
  );

  io.observe(section);
})();

//

(() => {
  const section = document.querySelector(".process");
  if (!section) return;

  const HEAD_STAGGER = 140; // каскад слева
  const CARD_GAP = 190; // пауза между карточками
  const INSIDE = 110; // каскад внутри карточки

  const head = [
    section.querySelector(".section-muted"),
    section.querySelector(".section-title"),
    section.querySelector(".about__subtitle"),
    section.querySelector(".btn-static"),
  ].filter(Boolean);

  const cards = Array.from(section.querySelectorAll(".process__blocks-item"));

  const markIn = (el, delayMs) => {
    if (!el || el.classList.contains("is-in")) return;
    el.style.transitionDelay = `${delayMs}ms`;
    requestAnimationFrame(() => el.classList.add("is-in"));
  };

  const revealHead = () => {
    head.forEach((el, i) => markIn(el, i * HEAD_STAGGER));
  };

  const revealCard = (card, baseDelay) => {
    // сама карточка
    markIn(card, 0);

    const inner = [
      card.querySelector(".process__blocks-icon"),
      card.querySelector(".process__blocks-title"),
      card.querySelector(".process__blocks-subtitle"),
    ].filter(Boolean);

    inner.forEach((el, i) => markIn(el, baseDelay + i * INSIDE));
  };

  const revealAll = () => {
    revealHead();

    const headTotal =
      (head.length ? (head.length - 1) * HEAD_STAGGER : 0) + 120;

    cards.forEach((card, idx) => {
      const baseDelay = headTotal + idx * CARD_GAP;

      // запускаем карточку позже через setTimeout, чтобы не зависеть от рефлоу
      setTimeout(() => {
        // чтобы карточка тоже появилась чуть-чуть раньше внутренностей
        markIn(card, 0);
        revealCard(card, 0);
      }, baseDelay);
    });
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealAll();
        io.disconnect();
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
  );

  io.observe(section);
})();

//

(() => {
  const section = document.querySelector(".form");
  if (!section) return;

  const STAGGER = 120;

  const title = section.querySelector(".form__title");

  const left = [
    section.querySelector(".user-form__title"),
    ...Array.from(section.querySelectorAll(".form-section__input")),
    section.querySelector(".user-form .btn-static"),
  ].filter(Boolean);

  const right = [
    ...Array.from(section.querySelectorAll(".form__info_list-item")),
    section.querySelector(".form__info-subtitle"),
  ].filter(Boolean);

  const markIn = (el, delay) => {
    if (!el || el.classList.contains("is-in")) return;
    el.style.transitionDelay = `${delay}ms`;
    requestAnimationFrame(() => el.classList.add("is-in"));
  };

  const revealAll = () => {
    let t = 0;

    // 1) Заголовок секции
    if (title) {
      markIn(title, t);
      t += 180;
    }

    // 2) Левая колонка (форма)
    left.forEach((el) => {
      markIn(el, t);
      t += STAGGER;
    });

    // 3) Правая колонка (контакты)
    t += 120; // короткая пауза между колонками
    right.forEach((el) => {
      markIn(el, t);
      t += STAGGER;
    });
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealAll();
        io.disconnect();
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
  );

  io.observe(section);
})();

//
