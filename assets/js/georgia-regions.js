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

  const grid = document.querySelector(
    ".tv-georgia-destinations .tv-grid"
  );

  const count = document.querySelector(
    ".tv-filter-count strong"
  );

  const initialText = document.querySelector(
    ".tv-region-filter-initial"
  );


  /* =========================================
     DEBUG
  ========================================= */

  console.log("Region filter loaded");
  console.log("Map regions:", mapRegions.length);
  console.log("Region filters:", filters.length);
  console.log("Destination cards:", cards.length);
  console.log("Grid:", grid);


  /* =========================================
     INITIAL STATE
  ========================================= */

  /* Hide all region buttons */

  filters.forEach(function (filter) {

    filter.classList.remove(
      "is-visible",
      "active"
    );

  });


  /* Show initial Georgia text */

  if (initialText) {

    initialText.style.display = "grid";

  }


  /* Show all destination cards */

  cards.forEach(function (card) {

    card.style.display = "";
    card.classList.remove("is-region-first");

  });


  /* Remove any region class from grid */

  if (grid) {

    grid.className = "tv-grid";

  }


  /* Show total destination count */

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
       Update grid background class
    ----------------------------------------- */

    if (grid) {

      /* Remove previous region classes */

      grid.className = "tv-grid";

      /* Add selected region class */

      grid.classList.add(
        "region-" + region
      );

    }


    /* -----------------------------------------
       Reset map regions
    ----------------------------------------- */

    mapRegions.forEach(function (mapRegion) {

      mapRegion.classList.remove("active");

    });


    /* -----------------------------------------
       Highlight selected map region
    ----------------------------------------- */

    const selectedMapRegion = document.querySelector(
      '.tv-map-region[data-region="' + region + '"]'
    );

    if (selectedMapRegion) {

      selectedMapRegion.classList.add("active");

    }


    /* -----------------------------------------
       Hide initial Georgia text
    ----------------------------------------- */

    if (initialText) {

      initialText.style.display = "none";

    }


    /* -----------------------------------------
       Hide all region filters
    ----------------------------------------- */

    filters.forEach(function (filter) {

      filter.classList.remove(
        "is-visible",
        "active"
      );

    });


    /* -----------------------------------------
       Hide all destination cards
       + remove previous first-card class
    ----------------------------------------- */

    cards.forEach(function (card) {

      card.style.display = "none";

      card.classList.remove(
        "is-region-first"
      );

    });


    /* -----------------------------------------
       Show selected region filter
    ----------------------------------------- */

    const selectedFilter = document.querySelector(
      '.tv-region-filter[data-region="' + region + '"]'
    );

    if (selectedFilter) {

      selectedFilter.classList.add(
        "is-visible",
        "active"
      );

    }


    /* -----------------------------------------
       Show selected destination cards
       + identify first card
    ----------------------------------------- */

    let visibleCards = 0;
    let firstVisibleCard = null;

    cards.forEach(function (card) {

      if (card.dataset.region === region) {

        card.style.display = "";

        /* Store the first matching card */

        if (!firstVisibleCard) {

          firstVisibleCard = card;

        }

        visibleCards++;

      }

    });


    /* -----------------------------------------
       Add first-card class
    ----------------------------------------- */

    if (firstVisibleCard) {

      firstVisibleCard.classList.add(
        "is-region-first"
      );

    }


    /* -----------------------------------------
       Update destination count
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

    mapRegion.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        showRegion(
          this.dataset.region
        );

      }
    );

  });


  /* =========================================
     REGION FILTER CLICK
  ========================================= */

  filters.forEach(function (filter) {

    filter.addEventListener(
      "click",
      function () {

        showRegion(
          this.dataset.region
        );

      }
    );

  });

});