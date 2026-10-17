
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".tv-district-nav");
  const modal = document.getElementById("district-modal");
  const panel = modal?.querySelector(".tv-district-modal__panel");
  const content = document.getElementById("district-modal-content");

  if (!nav || !modal || !panel || !content) {
    console.error("District modal: required HTML elements are missing.", {
      nav: !!nav,
      modal: !!modal,
      panel: !!panel,
      content: !!content
    });
    return;
  }

  let lastTrigger = null;

  function openModal(key, trigger) {
    const template = document.querySelector(
      `template[data-district-content="${key}"]`
    );

    if (!template) {
      console.error(`District modal: no template found for "${key}".`);
      return;
    }

    lastTrigger = trigger;

    content.replaceChildren(template.content.cloneNode(true));
    modal.dataset.district = key;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("district-modal-open");

    panel.focus();

    document.dispatchEvent(
      new CustomEvent("district-modal:opened", {
        detail: { district: key, content }
      })
    );
  }

  function closeModal() {
    if (!modal.classList.contains("is-open")) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("district-modal-open");

    delete modal.dataset.district;
    content.replaceChildren();

    if (lastTrigger?.isConnected) {
      lastTrigger.focus();
    }
  }

  nav.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-district]");

    if (!button || !nav.contains(button)) return;

    openModal(button.dataset.district, button);
  });

  modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-district-close]")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      modal.classList.contains("is-open")
    ) {
      closeModal();
    }
  });
});
