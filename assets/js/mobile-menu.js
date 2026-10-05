(function () {

  const menuButton = document.querySelector(".menu");
  const mobileMenu = document.querySelector("#mobile-menu");

  if (!menuButton || !mobileMenu) {
    return;
  }

  menuButton.addEventListener("click", function () {

    mobileMenu.classList.toggle("is-open");
    menuButton.classList.toggle("is-open");

    const open = mobileMenu.classList.contains("is-open");

    menuButton.setAttribute(
      "aria-expanded",
      open ? "true" : "false"
    );

    menuButton.setAttribute(
      "aria-label",
      open ? "Close menu" : "Open menu"
    );

  });

})();