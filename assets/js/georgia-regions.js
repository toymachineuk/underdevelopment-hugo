
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* =========================================
     01. ELEMENTS
  ========================================= */

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
    ".tv-georgia-destinations .tv-filter-count strong"
  );

  const initialText = document.querySelector(
    ".tv-georgia-explorer .tv-region-filter-initial"
  );

  const regionPanelTarget = document.querySelector(
    ".tv-georgia-explorer .tv-region-panel-target"
  );

  const regionInfoTarget = document.querySelector(
    ".tv-georgia-explorer .tv-region-details-target"
  );

  const cavesCarousel = document.querySelector(
    ".caves-strip .tv-carousel"
  );

  /* =========================================
     02. VALIDATION
  ========================================= */

  console.log("Georgia region filter loaded");

  console.log({
    mapRegions: mapRegions.length,
    filters: filters.length,
    regionIndexItems: regionIndexItems.length,
    cards: cards.length,
    grid: !!grid,
    regionPanelTarget: !!regionPanelTarget,
    regionInfoTarget: !!regionInfoTarget,
    cavesCarousel: !!cavesCarousel
  });

  if (!regionPanelTarget || !regionInfoTarget) {
    console.warn(
      "Georgia Regions: panel or details target missing."
    );
    return;
  }

  /* =========================================
     03. INITIAL STATE
  ========================================= */

  filters.forEach(function (filter) {
    filter.classList.remove(
      "is-visible",
      "active"
    );
    filter.style.display = "none";
  });

  regionIndexItems.forEach(function (item) {
    item.classList.remove("active");
    item.setAttribute("aria-pressed", "false");
  });

  mapRegions.forEach(function (mapRegion) {
    mapRegion.classList.remove("active");
  });

  if (initialText) {
    initialText.hidden = false;
    initialText.style.display = "";
  }

  cards.forEach(function (card) {
    card.hidden = false;
    card.style.display = "";
    card.classList.remove("is-region-first");
  });

  if (grid) {
    grid.className = "tv-grid";
  }

  if (count) {
    count.textContent =
      "Showing " + cards.length + " destinations";
  }

/* =========================================
   04. REGION DETAILS
========================================= */

function getRegionDetails(filter, region) {

  let details = filter.querySelector(
    ".tv-region-details"
  );

  if (!details) {

    details = Array.from(
      regionInfoTarget.querySelectorAll(
        ".tv-region-details[data-region]"
      )
    ).find(function (item) {
      return item.dataset.region === region;
    });

  }

  return details;
}

function updateRegionDetails(filter, region) {

  /* Hide previously selected details */

  regionInfoTarget
    .querySelectorAll(".tv-region-details")
    .forEach(function (details) {

      details.classList.remove(
        "is-region-info-active"
      );

      // Let CSS control display
      details.style.removeProperty("display");

    });

  /* Find selected region details */

  const selectedDetails = getRegionDetails(
    filter,
    region
  );

  if (!selectedDetails) {

    console.warn(
      "No region details found for:",
      region
    );

    return;
  }

  /* Move details below carousel */

  selectedDetails.dataset.region = region;

  regionInfoTarget.appendChild(
    selectedDetails
  );

  /* Activate selected details */

  selectedDetails.classList.add(
    "is-region-info-active"
  );

  selectedDetails.style.removeProperty("display");

  /* Reset horizontal scroll when changing region */

  const track = selectedDetails.querySelector(
    ".tv-region-details-track"
  );

  if (track) {
    track.scrollLeft = 0;
  }

}

  /* =========================================
     05. REGION HEADING
  ========================================= */

  function updateRegionPanel(region) {

    const selectedFilter = Array.from(
      filters
    ).find(function (filter) {
      return filter.dataset.region === region;
    });

    if (!selectedFilter) {

      console.warn(
        "No region panel found for:",
        region
      );

      return;
    }

    /* Hide every region panel */

    filters.forEach(function (filter) {

      filter.classList.remove(
        "is-visible",
        "active"
      );

      filter.style.display = "none";

    });

    /* Move selected region into heading target */

    regionPanelTarget.appendChild(
      selectedFilter
    );

    /* Move selected details below carousel */

    updateRegionDetails(
      selectedFilter,
      region
    );

    /* Show selected heading and description */

    selectedFilter.classList.add(
      "is-visible",
      "active"
    );

    selectedFilter.style.display = "block";
  }

  /* =========================================
     06. DESTINATION FILTERING
  ========================================= */

  function filterDestinationCards(region) {

    let visibleCards = 0;
    let firstVisibleCard = null;

    cards.forEach(function (card) {

      const matches =
        card.dataset.region === region;

      card.hidden = !matches;

      card.style.display =
        matches ? "" : "none";

      card.classList.remove(
        "is-region-first"
      );

      if (matches) {

        if (!firstVisibleCard) {
          firstVisibleCard = card;
        }

        visibleCards++;
      }

    });

    if (firstVisibleCard) {
      firstVisibleCard.classList.add(
        "is-region-first"
      );
    }

    if (count) {

      count.textContent =
        "Showing " +
        visibleCards +
        (visibleCards === 1
          ? " destination"
          : " destinations");

    }

    if (grid) {

      grid.className = "tv-grid";

      grid.classList.add(
        "region-" + region
      );

      grid.scrollLeft = 0;
    }
  }

  /* =========================================
     07. MAP AND NAVIGATION
  ========================================= */

  function updateNavigation(region) {

    mapRegions.forEach(function (mapRegion) {

      const active =
        mapRegion.dataset.region === region;

      mapRegion.classList.toggle(
        "active",
        active
      );

    });

    regionIndexItems.forEach(function (item) {

      const active =
        item.dataset.region === region;

      item.classList.toggle(
        "active",
        active
      );

      item.setAttribute(
        "aria-pressed",
        String(active)
      );

    });
  }

  /* =========================================
     08. CAVES CAROUSEL
  ========================================= */

  function scrollCarouselToRegion(region) {

    if (!cavesCarousel) return;

    const targetCard = Array.from(
      cavesCarousel.querySelectorAll(
        ".tv-carousel-card[data-region]"
      )
    ).find(function (card) {
      return card.dataset.region === region;
    });

    if (!targetCard) return;

    const targetLeft =
      targetCard.getBoundingClientRect().left -
      cavesCarousel.getBoundingClientRect().left +
      cavesCarousel.scrollLeft;

    cavesCarousel.scrollTo({
      left: targetLeft,
      behavior: "smooth"
    });
  }

  /* =========================================
     09. SELECT REGION
  ========================================= */

  function showRegion(region) {

    if (!region) return;

    console.log(
      "Selected Georgia region:",
      region
    );

    /* Hide welcome message */

    if (initialText) {
      initialText.hidden = true;
      initialText.style.display = "none";
    }

    /* Update region heading and information */

    updateRegionPanel(region);

    /* Update map and navigation buttons */

    updateNavigation(region);

    /* Filter destination cards */

    filterDestinationCards(region);

    /* Scroll caves carousel */

    scrollCarouselToRegion(region);
  }

  /* =========================================
     10. MAP CLICKS
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
     11. REGION BUTTON CLICKS
  ========================================= */

  regionIndexItems.forEach(function (item) {

    item.addEventListener(
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
     12. REGION PANEL CLICKS
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
