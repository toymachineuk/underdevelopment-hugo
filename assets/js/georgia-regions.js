document.addEventListener("DOMContentLoaded", function () {

  const mapRegions = document.querySelectorAll(
    ".tv-map-region[data-region]"
  );

  const filters = document.querySelectorAll(
    ".tv-region-filter[data-region]"
  );

  const regionIndexItems = document.querySelectorAll(
    ".tv-region-index-item[data-region]"
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

  /* Region panel destinations */
  const regionPanelTarget = document.querySelector(
    ".tv-region-panel-target"
  );

  const regionInfoTarget = document.querySelector(
    ".tv-region-info-target"
  );

  /* Caves carousel */
  const cavesCarousel = document.querySelector(
    ".caves-strip .tv-carousel"
  );

  console.log("Region filter loaded");
  console.log("Map regions:", mapRegions.length);
  console.log("Region filters:", filters.length);
  console.log("Region index items:", regionIndexItems.length);
  console.log("Destination cards:", cards.length);
  console.log("Grid:", grid);
  console.log("Region panel target:", regionPanelTarget);
  console.log("Region info target:", regionInfoTarget);
  console.log("Caves carousel:", cavesCarousel);


  /* Initial state */

  filters.forEach(function (filter) {
    filter.classList.remove("is-visible", "active");
  });

  regionIndexItems.forEach(function (item) {
    item.classList.remove("active");
  });

  if (initialText) {
    initialText.style.display = "grid";
  }

  cards.forEach(function (card) {
    card.style.display = "";
    card.classList.remove("is-region-first");
  });

  if (grid) {
    grid.className = "tv-grid";
  }

  if (count) {
    count.textContent = "Showing " + cards.length + " destinations";
  }


  /* Move Caves carousel to selected region */

  function scrollCarouselToRegion(region) {
    if (!cavesCarousel) return;

    const targetCard = cavesCarousel.querySelector(
      '.tv-carousel-card[data-region="' + region + '"]'
    );

    if (!targetCard) {
      console.log("No Caves card found for region:", region);
      return;
    }

    const targetLeft =
      targetCard.getBoundingClientRect().left -
      cavesCarousel.getBoundingClientRect().left +
      cavesCarousel.scrollLeft;

    cavesCarousel.scrollTo({
      left: targetLeft,
      behavior: "smooth"
    });

    console.log("Caves carousel moved to:", region);
  }


  /* Show selected region */

  function showRegion(region) {
    console.log("Selected region:", region);

    if (grid) {
      grid.className = "tv-grid";
      grid.classList.add("region-" + region);
    }


    /* Update map */

    mapRegions.forEach(function (mapRegion) {
      mapRegion.classList.remove("active");
    });

    const selectedMapRegion = document.querySelector(
      '.tv-map-region[data-region="' + region + '"]'
    );

    if (selectedMapRegion) {
      selectedMapRegion.classList.add("active");
    }


    /* Hide initial text */

    if (initialText) {
      initialText.style.display = "none";
    }


    /* Reset region filters and index */

    filters.forEach(function (filter) {
      filter.classList.remove("is-visible", "active");
    });

    regionIndexItems.forEach(function (item) {
      item.classList.remove("active");
    });

    const selectedIndexItem = document.querySelector(
      '.tv-region-index-item[data-region="' + region + '"]'
    );

    if (selectedIndexItem) {
      selectedIndexItem.classList.add("active");
    }


    /* Hide all destination cards */

    cards.forEach(function (card) {
      card.style.display = "none";
      card.classList.remove("is-region-first");
    });


/* Move selected region panel and details */

const selectedFilter = document.querySelector(
  '.tv-region-filter[data-region="' + region + '"]'
);

if (selectedFilter) {

  /* Keep title and description in the header */

  if (regionPanelTarget) {
    regionPanelTarget.appendChild(selectedFilter);
  }

  /* Find the selected region's details */

  let selectedDetails = selectedFilter.querySelector(
    ".tv-region-details"
  );

  /* If already moved, find it in the details target */

  if (!selectedDetails && regionInfoTarget) {
    selectedDetails = regionInfoTarget.querySelector(
      '.tv-region-details[data-region="' + region + '"]'
    );
  }

  /* Move details below the grid */

  if (selectedDetails && regionInfoTarget) {

    regionInfoTarget
      .querySelectorAll(".tv-region-details")
      .forEach(function (details) {
        details.classList.remove("is-region-info-active");
      });

    selectedDetails.dataset.region = region;

    regionInfoTarget.appendChild(selectedDetails);

    selectedDetails.classList.add(
      "is-region-info-active"
    );
  }

  selectedFilter.classList.add(
    "is-visible",
    "active"
  );
}

    /* Show destination cards for selected region */

    let visibleCards = 0;
    let firstVisibleCard = null;

    cards.forEach(function (card) {
      if (card.dataset.region === region) {
        card.style.display = "";

        if (!firstVisibleCard) {
          firstVisibleCard = card;
        }

        visibleCards++;
      }
    });

    if (firstVisibleCard) {
      firstVisibleCard.classList.add("is-region-first");
    }


    /* Update destination count */

    if (count) {
      count.textContent = "Showing " + visibleCards + " destinations";
    }


    /* Update Caves carousel */

    scrollCarouselToRegion(region);
  }


  /* Map clicks */

  mapRegions.forEach(function (mapRegion) {
    mapRegion.addEventListener("click", function (event) {
      event.preventDefault();
      showRegion(this.dataset.region);
    });
  });


  /* Region filter clicks */

  filters.forEach(function (filter) {
    filter.addEventListener("click", function () {
      showRegion(this.dataset.region);
    });
  });


  /* Region index clicks */

  regionIndexItems.forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      showRegion(this.dataset.region);
    });
  });

});