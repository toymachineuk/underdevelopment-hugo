document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     ELEMENTS
  ========================================= */

  const mapRegions = document.querySelectorAll(
    ".tv-map-region[data-region]"
  );

  const regionIndexItems = document.querySelectorAll(
    ".tv-region-index-item[data-region]"
  );

  const filters = document.querySelectorAll(
    ".tv-region-filter[data-region]"
  );

  const cards = document.querySelectorAll(
    ".tv-georgia-destinations .tv-rectangle-card[data-region]"
  );

  const count = document.querySelector(
    ".tv-filter-count strong"
  );

  const initialText = document.querySelector(
    ".tv-region-filter-initial"
  );


  /* =========================================
     SHOW REGION
  ========================================= */

  function showRegion(region) {

    /* Hide initial message */

    if (initialText) {
      initialText.style.display = "none";
    }


    /* -----------------------------------------
       ACTIVE REGION BUTTON
    ----------------------------------------- */

    regionIndexItems.forEach(function (button) {
      button.classList.toggle(
        "active",
        button.dataset.region === region
      );
    });


    /* -----------------------------------------
       REGION CONTENT
    ----------------------------------------- */

    filters.forEach(function (filter) {
      filter.classList.toggle(
        "is-visible",
        filter.dataset.region === region
      );

      filter.classList.toggle(
        "active",
        filter.dataset.region === region
      );
    });


    /* -----------------------------------------
       DESTINATION CARDS
    ----------------------------------------- */

    let visibleCards = 0;

    cards.forEach(function (card) {

      const isMatch =
        card.dataset.region === region;

      card.style.display =
        isMatch ? "" : "none";

      if (isMatch) {
        visibleCards++;
      }

    });


    /* -----------------------------------------
       UPDATE COUNT
    ----------------------------------------- */

    if (count) {
      count.textContent =
        "Showing " +
        visibleCards +
        " destinations";
    }

  }


  /* =========================================
     REGION BUTTONS
  ========================================= */

  regionIndexItems.forEach(function (button) {

    button.addEventListener("click", function (event) {

      event.preventDefault();

      showRegion(this.dataset.region);

    });

  });


  /* =========================================
     MAP REGIONS
  ========================================= */

  mapRegions.forEach(function (mapRegion) {

    mapRegion.addEventListener("click", function (event) {

      event.preventDefault();

      const region = this.dataset.region;

      const matchingButton =
        document.querySelector(
          '.tv-region-index-item[data-region="' +
          region +
          '"]'
        );

      if (matchingButton) {
        matchingButton.click();
      }

    });

  });


  /* =========================================
     REGION CONTENT
  ========================================= */

  filters.forEach(function (filter) {

    filter.addEventListener("click", function () {

      showRegion(this.dataset.region);

    });

  });

});