
(function () {

  document.querySelectorAll(".tv-filter-section").forEach(function (section) {

    const filters = section.querySelectorAll("[data-filter]");
    const cards = section.querySelectorAll("[data-category]");
    const count = section.querySelector(
      ".tv-filter-count strong, .tv-see-do-count strong"
    );

    if (!filters.length || !cards.length) return;

    filters.forEach(function (filter) {

      filter.addEventListener("click", function () {

        const selectedCategory = this.dataset.filter;

        /* Active button */
        filters.forEach(function (button) {
          button.classList.remove("active");
        });

        this.classList.add("active");

        /* Filter only cards inside THIS section */
        let visibleCards = 0;

        cards.forEach(function (card) {

          const category = card.dataset.category;

          if (
            selectedCategory === "all" ||
            category === selectedCategory
          ) {
            card.style.display = "";
            visibleCards++;
          } else {
            card.style.display = "none";
          }

        });

        /* Count */
        if (count) {
          count.textContent =
            "Showing " + visibleCards + " out of " + cards.length;
        }

      });

    });

  });

})();

