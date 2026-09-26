document.addEventListener("DOMContentLoaded", function () {
  /* ========================================= ELEMENTS ========================================= */ const mapRegions =
    document.querySelectorAll(".tv-map-region[data-region]");
  const filters = document.querySelectorAll(".tv-region-filter[data-region]");
  const cards = document.querySelectorAll(
    ".tv-georgia-destinations .tv-rectangle-card[data-region]",
  );
  const count = document.querySelector(".tv-filter-count strong");
  const initialText = document.querySelector(".tv-region-filter-initial");
  /* ========================================= DEBUG ========================================= */ console.log(
    "Region filter loaded",
  );
  console.log("Map regions:", mapRegions.length);
  console.log("Region filters:", filters.length);
  console.log("Destination cards:", cards.length);
  /* ========================================= INITIAL STATE ========================================= */ /* Hide all region buttons */ filters.forEach(
    function (filter) {
      filter.classList.remove("is-visible", "active");
    },
  );
  /* Show Hello */ if (initialText) {
    initialText.style.display = "grid";
  }
  /* Show all destination cards */ cards.forEach(function (card) {
    card.style.display = "";
  });
  /* Show total destination count */ if (count) {
    count.textContent = "Showing " + cards.length + " destinations";
  }
  /* ========================================= SHOW REGION ========================================= */ function showRegion(
    region,
  ) {
    console.log("Selected region:", region);

    /* -----------------------------------------
   Reset map regions
----------------------------------------- */

mapRegions.forEach(function (mapRegion) {
  mapRegion.classList.remove("active");
});

/* Highlight selected map region */

const selectedMapRegion = document.querySelector(
  '.tv-map-region[data-region="' + region + '"]'
);

if (selectedMapRegion) {
  selectedMapRegion.classList.add("active");
}
    /* ----------------------------------------- Hide initial Hello ----------------------------------------- */ if (
      initialText
    ) {
      initialText.style.display = "none";
    }
    /* ----------------------------------------- Hide all region filters ----------------------------------------- */ filters.forEach(
      function (filter) {
        filter.classList.remove("is-visible", "active");
      },
    );
    /* ----------------------------------------- Hide all destination cards ----------------------------------------- */ cards.forEach(
      function (card) {
        card.style.display = "none";
      },
    );
    /* ----------------------------------------- Show selected region filter ----------------------------------------- */ const selectedFilter =
      document.querySelector('.tv-region-filter[data-region="' + region + '"]');
    if (selectedFilter) {
      selectedFilter.classList.add("is-visible", "active");
    }
    /* ----------------------------------------- Show selected destination cards ----------------------------------------- */ let visibleCards = 0;
    cards.forEach(function (card) {
      if (card.dataset.region === region) {
        card.style.display = "";
        visibleCards++;
      }
    });
    /* ----------------------------------------- Update count ----------------------------------------- */ if (
      count
    ) {
      count.textContent = "Showing " + visibleCards + " destinations";
    }
  }
  /* ========================================= MAP CLICK ========================================= */ mapRegions.forEach(
    function (mapRegion) {
      mapRegion.addEventListener("click", function (event) {
        event.preventDefault();
        showRegion(this.dataset.region);
      });
    },
  );
  /* ========================================= REGION FILTER CLICK ========================================= */ filters.forEach(
    function (filter) {
      filter.addEventListener("click", function () {
        showRegion(this.dataset.region);
      });
    },
  );
});
