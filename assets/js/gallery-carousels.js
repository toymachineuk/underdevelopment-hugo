
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tv-destination-carousel').forEach((carousel) => {
    const track = carousel.querySelector('.tv-destination-track');
    const cards = Array.from(
      carousel.querySelectorAll('.tv-destination-card')
    );

    const nextButton = carousel.querySelector('.tv-destination-next');
    const prevButton = carousel.querySelector('.tv-destination-prev');

    if (!track || !cards.length) return;

    let activeIndex = 0;
    let scrollFrame = null;
    let scrollTimeout = null;
    let resizeFrame = null;

    let isDragging = false;
    let hasDragged = false;
    let startX = 0;
    let startScroll = 0;

    const dragThreshold = 5;

    /* ========================================
       ACTIVE CARD
    ======================================== */

    function updateActiveCard() {
      const trackRect = track.getBoundingClientRect();
      const trackCenter = trackRect.left + track.clientWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(trackCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      activeIndex = closestIndex;

      cards.forEach((card, index) => {
        card.classList.toggle('is-active', index === activeIndex);
      });

      // Determine navigation from actual scroll limits.
      const maxScroll = Math.max(
        0,
        track.scrollWidth - track.clientWidth
      );

      const atStart = track.scrollLeft <= 2;
      const atEnd = track.scrollLeft >= maxScroll - 2;

      if (prevButton) {
        prevButton.disabled = atStart;
      }

      if (nextButton) {
        nextButton.disabled = atEnd;
      }
    }

    /* ========================================
       SCROLL TO CARD
    ======================================== */

    function scrollToCard(index) {
      const targetIndex = Math.max(
        0,
        Math.min(index, cards.length - 1)
      );

      const card = cards[targetIndex];

      if (!card) return;

      // Measure the card's current center relative to the track.
      const trackRect = track.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      const cardCenter =
        track.scrollLeft +
        cardRect.left +
        cardRect.width / 2 -
        trackRect.left;

      const targetScroll = cardCenter - track.clientWidth / 2;

      const maxScroll = Math.max(
        0,
        track.scrollWidth - track.clientWidth
      );

      track.scrollTo({
        left: Math.max(0, Math.min(targetScroll, maxScroll)),
        behavior: 'smooth'
      });
    }

    /* ========================================
       ARROW CONTROLS
    ======================================== */

    nextButton?.addEventListener('click', () => {
      scrollToCard(activeIndex + 1);
    });

    prevButton?.addEventListener('click', () => {
      scrollToCard(activeIndex - 1);
    });

    /* ========================================
       TRACK SCROLL
    ======================================== */

    track.addEventListener('scroll', () => {
      if (!scrollFrame) {
        scrollFrame = requestAnimationFrame(() => {
          updateActiveCard();
          scrollFrame = null;
        });
      }

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        updateActiveCard();
      }, 120);
    }, { passive: true });

    /* ========================================
       MOUSE DRAGGING
    ======================================== */

    track.addEventListener('mousedown', (event) => {
      if (event.button !== 0) return;

      if (event.target.closest(
        'button, a, input, select, textarea'
      )) {
        return;
      }

      // Clear any previous drag's click suppression.
      hasDragged = false;
      isDragging = true;

      startX = event.pageX;
      startScroll = track.scrollLeft;

      track.classList.add('is-dragging');
    });

    function onMouseMove(event) {
      if (!isDragging) return;

      const distance = event.pageX - startX;

      if (Math.abs(distance) > dragThreshold) {
        hasDragged = true;
      }

      if (!hasDragged) return;

      event.preventDefault();
      track.scrollLeft = startScroll - distance;
    }

    function stopDragging() {
      if (!isDragging) return;

      isDragging = false;
      track.classList.remove('is-dragging');

      updateActiveCard();
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', stopDragging);

    // Prevent accidental clicks after a real drag.
    track.addEventListener('click', (event) => {
      if (!hasDragged) return;

      event.preventDefault();
      event.stopPropagation();

      hasDragged = false;
    }, true);

    /* ========================================
       PREVENT NATIVE IMAGE DRAGGING
    ======================================== */

    track.addEventListener('dragstart', (event) => {
      event.preventDefault();
    });

    /* ========================================
       RESIZE
    ======================================== */

    window.addEventListener('resize', () => {
      if (resizeFrame) {
        cancelAnimationFrame(resizeFrame);
      }

      resizeFrame = requestAnimationFrame(() => {
        updateActiveCard();
        resizeFrame = null;
      });
    });

    /* ========================================
       INITIAL STATE
    ======================================== */

    updateActiveCard();
  });
});
