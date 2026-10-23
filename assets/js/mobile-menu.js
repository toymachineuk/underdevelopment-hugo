
(function () {
  function initNavigation() {
    const menuButton = document.querySelector(".nav > .menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const destinationButton = document.querySelector(
      ".mobile-destinations__toggle"
    );
    const destinationList = document.getElementById(
      "mobile-destinations-list"
    );

    // Prevent duplicate initialization
    if (document.documentElement.dataset.navigationInitialized === "true") {
      return;
    }

    document.documentElement.dataset.navigationInitialized = "true";

    // Mobile hamburger
    if (menuButton && mobileMenu) {
      menuButton.addEventListener("click", function () {
        const isOpen = !mobileMenu.classList.contains("is-open");

        mobileMenu.classList.toggle("is-open", isOpen);
        menuButton.classList.toggle("is-open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute(
          "aria-label",
          isOpen ? "Close menu" : "Open menu"
        );
      });
    }

    // Mobile destination accordion
    if (destinationButton && destinationList) {
      destinationButton.addEventListener("click", function () {
        const isOpen =
          destinationButton.getAttribute("aria-expanded") !== "true";

        destinationButton.setAttribute("aria-expanded", String(isOpen));
        destinationList.hidden = !isOpen;
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavigation, { once: true });
  } else {
    initNavigation();
  }
})();
