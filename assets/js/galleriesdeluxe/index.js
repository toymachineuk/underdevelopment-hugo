(function () {

  /* =========================================
     SEE & DO — FILTERS
  ========================================= */

  const filters = document.querySelectorAll(".tv-filter");
  const cards = document.querySelectorAll(".tv-see-card");
  const count = document.querySelector(".tv-see-do-count strong");

  filters.forEach(filter => {

    filter.addEventListener("click", function () {

      const category = this.dataset.filter;

      filters.forEach(button => {
        button.classList.remove("active");
      });

      this.classList.add("active");

      let visible = 0;

      cards.forEach(card => {

        if (
          category === "all" ||
          card.dataset.category === category
        ) {
          card.classList.remove("is-hidden");
          visible++;
        } else {
          card.classList.add("is-hidden");
        }

      });

      if (count) {
        count.textContent = `Showing ${visible} out of 7`;
      }

      /* Return carousel to the beginning
         after changing the filter */
      const track = document.querySelector(".tv-see-do-grid");

      if (track) {
        track.scrollTo({
          left: 0,
          behavior: "smooth"
        });
      }

    });

  });


  /* =========================================
     SEE & DO — CAROUSEL
  ========================================= */

  const track = document.querySelector(".tv-see-do-grid");
  const prevButton = document.querySelector(".tv-see-prev");
  const nextButton = document.querySelector(".tv-see-next");

  if (!track) {
    return;
  }


  /* Move approximately one card */
  function getScrollAmount() {

    const card = track.querySelector(
      ".tv-see-card:not(.is-hidden)"
    );

    if (!card) {
      return track.clientWidth;
    }

    const gap = parseFloat(
      window.getComputedStyle(track).columnGap
    ) || 0;

    return card.offsetWidth + gap;
  }


  /* NEXT */
  if (nextButton) {

    nextButton.addEventListener("click", function () {

      track.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth"
      });

    });

  }


  /* PREVIOUS */
  if (prevButton) {

    prevButton.addEventListener("click", function () {

      track.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth"
      });

    });

  }


  /* =========================================
     ENABLE / DISABLE ARROWS
  ========================================= */

  function updateArrows() {

    if (!prevButton && !nextButton) {
      return;
    }

    const maxScroll =
      track.scrollWidth - track.clientWidth;

    if (prevButton) {
      prevButton.disabled = track.scrollLeft <= 5;
    }

    if (nextButton) {
      nextButton.disabled =
        track.scrollLeft >= maxScroll - 5;
    }

  }


  track.addEventListener("scroll", updateArrows);

  window.addEventListener("resize", updateArrows);

  updateArrows();

})();