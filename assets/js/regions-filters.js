document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     ELEMENTS
  ========================================= */

  const mapRegions = document.querySelectorAll(
    ".tv-map-region[data-region]"
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


  /* =========================================
     DEBUG
  ========================================= */

  console.log("Region filter loaded");
  console.log("Map regions:", mapRegions.length);
  console.log("Region filters:", filters.length);
  console.log("Destination cards:", cards.length);


  /* =========================================
     INITIAL STATE
  ========================================= */

  filters.forEach(function (filter) {
    filter.classList.remove("is-visible", "active");
  });

  cards.forEach(function (card) {
    card.style.display = "";
  });

  /* Initial filter text */
  const initialText = document.querySelector(
    ".tv-region-filter-initial"
  );

  if (initialText) {
    initialText.textContent = "Hello";
    initialText.style.display = "none";
  }

  /* Show all destinations initially */
  if (count) {
    count.textContent =
      "Showing " + cards.length + " destinations";
  }


  /* =========================================
     SHOW REGION
  ========================================= */

  function showRegion(region) {

    console.log("Selected region:", region);


    /* -----------------------------------------
       Hide initial text
    ----------------------------------------- */

    if (initialText) {
      initialText.style.display = "none";
    }


    /* -----------------------------------------
       Hide all region filters
    ----------------------------------------- */

    filters.forEach(function (filter) {
      filter.classList.remove("is-visible", "active");
    });


    /* -----------------------------------------
       Hide all destination cards
    ----------------------------------------- */

    cards.forEach(function (card) {
      card.style.display = "none";
    });


    /* -----------------------------------------
       Show selected region filter
    ----------------------------------------- */

    const selectedFilter = document.querySelector(
      '.tv-region-filter[data-region="' + region + '"]'
    );

    if (selectedFilter) {
      selectedFilter.classList.add("is-visible", "active");
    }


    /* -----------------------------------------
       Show selected destination cards
    ----------------------------------------- */

    let visibleCards = 0;

    cards.forEach(function (card) {

      if (card.dataset.region === region) {

        card.style.display = "";

        visibleCards++;

      }

    });


    /* -----------------------------------------
       Update count
    ----------------------------------------- */

    if (count) {

      count.textContent =
        "Showing " + visibleCards + " destinations";

    }

  }


  /* =========================================
     MAP CLICK
  ========================================= */

  mapRegions.forEach(function (mapRegion) {

    mapRegion.addEventListener("click", function (event) {

      event.preventDefault();

      showRegion(this.dataset.region);

    });

  });


  /* =========================================
     REGION FILTER CLICK
  ========================================= */

  filters.forEach(function (filter) {

    filter.addEventListener("click", function () {

      showRegion(this.dataset.region);

    });

  });

});
