
/* =========================================
   HERO TITLE ANIMATION
   No external libraries required
========================================= */

(() => {

  function initHeroAnimation() {

    const hero = document.querySelector(".tv-editorial-hero");
    const main = hero?.querySelector(".ml2");
    const secondary = hero?.querySelector(".hero-title-secondary");

    if (!hero || !main || !secondary) return;

    // Respect accessibility preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Wrap letters only once
    if (!main.querySelector(".letter")) {

      const text = main.textContent.trim();
      const fragment = document.createDocumentFragment();

      Array.from(text).forEach((char, index) => {

        if (char === " ") {
          fragment.appendChild(document.createTextNode(" "));
          return;
        }

        const span = document.createElement("span");
        span.className = "letter";
        span.textContent = char;
        span.style.setProperty("--i", index);

        fragment.appendChild(span);

      });

      main.replaceChildren(fragment);
    }

    let isActive = false;

    function play() {
      if (isActive) return;

      isActive = true;

      // Restart CSS animation
      hero.classList.remove("hero-animate");
      void hero.offsetWidth;
      hero.classList.add("hero-animate");
    }

    function reset() {
      if (!isActive) return;

      isActive = false;

      // Reset only after leaving the viewport
      hero.classList.remove("hero-animate");
    }

    const observer = new IntersectionObserver(
      ([entry]) => {

        if (entry.isIntersecting) {
          play();
        } else {
          reset();
        }

      },
      {
        threshold: 0.15
      }
    );

    observer.observe(hero);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroAnimation);
  } else {
    initHeroAnimation();
  }

})();
