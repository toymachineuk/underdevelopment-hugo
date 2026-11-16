
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

    // Mobile hamburger
    const menuButton = document.querySelector(
      ".nav > .menu"
    );

    const mobileMenu = document.getElementById(
      "mobile-menu"
    );

    // Desktop Beyond Tbilisi dropdown
    const dropdown = document.querySelector(
      ".nav-dropdown"
    );

    const dropdownButton = dropdown?.querySelector(
      ".nav-button"
    );

    // Mobile Beyond Tbilisi accordion
    const mobileBeyondToggle = document.querySelector(
      ".mobile-menu__beyond-toggle"
    );

    const mobileBeyondMenu = document.getElementById(
      "mobile-beyond-menu"
    );

    // Desktop breakpoint
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
      ".mobile-menu__beyond-list a, " +
      ".mobile-menu__actions a, " +
      ".nav-links a, " +
      ".nav-dropdown__menu a"
    ).forEach((link) => {

      const linkPath = normalizePath(
        new URL(link.href, window.location.origin).pathname
      );

      // Shared placeholder pages should not be active.
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
       DESKTOP — BEYOND TBILISI DROPDOWN
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

          // Desktop only
          if (!desktopMedia.matches) return;

          const isOpen =
            dropdown.classList.contains("is-open");

          setDropdown(!isOpen);

        }
      );

    }


    /* -------------------------------------
       MOBILE — BEYOND TBILISI ACCORDION
    ------------------------------------- */

    function setMobileBeyond(isOpen) {

      if (!mobileBeyondToggle || !mobileBeyondMenu) {
        return;
      }

      mobileBeyondToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      mobileBeyondMenu.hidden = !isOpen;

    }

    function closeMobileBeyond() {
      setMobileBeyond(false);
    }

    if (mobileBeyondToggle && mobileBeyondMenu) {

      mobileBeyondToggle.addEventListener(
        "click",
        function (event) {

          event.preventDefault();
          event.stopPropagation();

          // Mobile only
          if (desktopMedia.matches) return;

          const isOpen =
            mobileBeyondToggle.getAttribute(
              "aria-expanded"
            ) === "true";

          setMobileBeyond(!isOpen);

        }
      );

    }


    /* -------------------------------------
       MOBILE — MAIN HAMBURGER MENU
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

      // Reset both dropdowns when mobile menu closes.
      if (!isOpen) {
        closeDropdown();
        closeMobileBeyond();
      }

    }

    if (menuButton && mobileMenu) {

      menuButton.addEventListener(
        "click",
        function (event) {

          event.preventDefault();
          event.stopPropagation();

          const isOpen =
            mobileMenu.classList.contains("is-open");

          setMobileMenu(!isOpen);

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

        // Close desktop dropdown when clicking outside.
        if (
          dropdown &&
          !dropdown.contains(target)
        ) {
          closeDropdown();
        }

        // Check whether click occurred inside header
        // or mobile navigation.
        const clickedHeader =
          header?.contains(target);

        const clickedMobileMenu =
          mobileMenu?.contains(target);

        // Close mobile navigation only
        // when clicking completely outside.
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

        // 1. Close desktop dropdown first.
        if (
          dropdown?.classList.contains("is-open")
        ) {

          closeDropdown();
          dropdownButton?.focus();
          return;

        }

        // 2. Close mobile destinations accordion.
        if (
          mobileBeyondToggle?.getAttribute(
            "aria-expanded"
          ) === "true"
        ) {

          closeMobileBeyond();
          mobileBeyondToggle.focus();
          return;

        }

        // 3. Close main mobile menu.
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

      // Always reset both destination menus.
      closeDropdown();
      closeMobileBeyond();

      // Close mobile navigation
      // when entering desktop layout.
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
    setMobileBeyond(false);
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
