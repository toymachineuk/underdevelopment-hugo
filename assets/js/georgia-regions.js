document.addEventListener("DOMContentLoaded", function () {

  const buttons = document.querySelectorAll(".tv-region-filter");
  const cards = document.querySelectorAll(".tv-rectangle-card[data-region]");
  const mapRegions = document.querySelectorAll(".tv-map-region");


  /* =====================================
     REGION FILTER BUTTONS
  ===================================== */

  buttons.forEach(function (button) {

    button.addEventListener("click", function () {

      const region = this.dataset.region;

      buttons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      this.classList.add("active");

      cards.forEach(function (card) {

        if (
          region === "all" ||
          card.dataset.region === region
        ) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }

      });

    });

  });


  /* =====================================
     MAP REGIONS
  ===================================== */

  mapRegions.forEach(function (mapRegion) {

    mapRegion.addEventListener("click", function (event) {

      event.preventDefault();

      const region = this.dataset.region;

      const button = document.querySelector(
        `.tv-region-filter[data-region="${region}"]`
      );

      if (button) {
        button.click();
      }

    });

  });

});