
/* =========================================
   TBILISI VISITS — NAVIGATION
   Desktop + Mobile
========================================= */

(function () {
  "use strict";

  function initNavigation() {

    /* -------------------------------------
       PREVENT DUPLICATE INITIALIZATION
    ------------------------------------- */

    if (
      document.documentElement.dataset.navigationInitialized === "true"
    ) {
      return;
    }

    document.documentElement.dataset.navigationInitialized = "true";


    /* -------------------------------------
       ELEMENTS
    ------------------------------------- */

    const header = document.querySelector(".nav");

    const menuButton = document.querySelector(
      ".nav > .menu"
    );

    const mobileMenu = document.getElementById(
      "mobile-menu"
    );

    const dropdown = document.querySelector(
      ".nav-dropdown"
    );

    const dropdownButton = dropdown?.querySelector(
      ".nav-button"
    );

    const desktopMedia = window.matchMedia(
      "(min-width: 901px)"
    );


    /* -------------------------------------
       ACTIVE NAVIGATION LINKS
    ------------------------------------- */

    function normalizePath(path) {

      return path
        .replace(/\/index\.html$/i, "/")
        .replace(/\/+$/, "") || "/";

    }

    const currentPath = normalizePath(
      window.location.pathname
    );

    document.querySelectorAll(
      ".mobile-menu__nav a, " +
      ".mobile-menu__featured-map, " +
      ".nav-links a, " +
      ".nav-dropdown__menu a"
    ).forEach((link) => {

      const linkPath = normalizePath(
        new URL(link.href, window.location.origin).pathname
      );

      // Do not highlight shared placeholder pages.
      const isActive =
        linkPath === currentPath &&
        linkPath !== "/page-is-coming";

      link.classList.toggle("active", isActive);

      if (isActive) {

        link.setAttribute(
          "aria-current",
          "page"
        );

      } else {

        link.removeAttribute("aria-current");

      }

    });


    /* -------------------------------------
       BEYOND TBILISI DROPDOWN
    ------------------------------------- */

    function setDropdown(isOpen) {

      if (!dropdown || !dropdownButton) return;

      dropdown.classList.toggle(
        "is-open",
        isOpen
      );

      dropdownButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

    }


    function closeDropdown() {
      setDropdown(false);
    }


    if (dropdown && dropdownButton) {

      dropdownButton.addEventListener(
        "click",
        function (event) {

          event.preventDefault();
          event.stopPropagation();

          const isOpen =
            !dropdown.classList.contains("is-open");

          setDropdown(isOpen);

          // Do not close or reset the mobile menu.
          // Its current state remains unchanged.

        }
      );

    }


    /* -------------------------------------
       MOBILE MENU
    ------------------------------------- */

    function setMobileMenu(isOpen) {

      if (!menuButton || !mobileMenu) return;

      mobileMenu.classList.toggle(
        "is-open",
        isOpen
      );

      menuButton.classList.toggle(
        "is-open",
        isOpen
      );

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );

      // Close destinations only when
      // the main mobile menu is closed.
      if (!isOpen) {
        closeDropdown();
      }

    }


    if (menuButton && mobileMenu) {

      menuButton.addEventListener(
        "click",
        function (event) {

          event.preventDefault();
          event.stopPropagation();

          const isOpen =
            !mobileMenu.classList.contains("is-open");

          setMobileMenu(isOpen);

        }
      );

    }


    /* -------------------------------------
       CLICK OUTSIDE
    ------------------------------------- */

    document.addEventListener(
      "click",
      function (event) {

        const target = event.target;

        // Close dropdown when clicking
        // outside Beyond Tbilisi.
        if (
          dropdown &&
          !dropdown.contains(target)
        ) {
          closeDropdown();
        }

        // Clicking the header must not
        // close the mobile navigation.
        const clickedHeader =
          header?.contains(target);

        const clickedMobileMenu =
          mobileMenu?.contains(target);

        if (
          mobileMenu?.classList.contains("is-open") &&
          !clickedHeader &&
          !clickedMobileMenu
        ) {
          setMobileMenu(false);
        }

      }
    );


    /* -------------------------------------
       ESCAPE KEY
    ------------------------------------- */

    document.addEventListener(
      "keydown",
      function (event) {

        if (event.key !== "Escape") return;

        // First Escape closes destinations.
        if (
          dropdown?.classList.contains("is-open")
        ) {

          closeDropdown();
          dropdownButton?.focus();
          return;

        }

        // Second Escape closes mobile menu.
        if (
          mobileMenu?.classList.contains("is-open")
        ) {

          setMobileMenu(false);
          menuButton?.focus();

        }

      }
    );


    /* -------------------------------------
       RESET ON SCREEN RESIZE
    ------------------------------------- */

    function handleDesktopChange(event) {

      closeDropdown();

      if (event.matches) {
        setMobileMenu(false);
      }

    }

    desktopMedia.addEventListener(
      "change",
      handleDesktopChange
    );


    /* -------------------------------------
       INITIAL STATE
    ------------------------------------- */

    setDropdown(false);
    setMobileMenu(false);

  }


  /* -------------------------------------
     INITIALIZE
  ------------------------------------- */

  if (document.readyState === "loading") {

    document.addEventListener(
      "DOMContentLoaded",
      initNavigation,
      { once: true }
    );

  } else {

    initNavigation();

  }

})();
