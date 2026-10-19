
document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.tv-destination-carousel').forEach((carousel) => {

    const track = carousel.querySelector('.tv-destination-track');
    const cards = Array.from(
      carousel.querySelectorAll('.tv-destination-card')
    );

    const nextButton = carousel.querySelector('.tv-destination-next');
    const prevButton = carousel.querySelector('.tv-destination-prev');

    if (!track || !cards.length) return;


    /* ========================================
       ACTIVE CARD
    ======================================== */

    let activeIndex = 0;
    let scrollFrame = null;
    let scrollTimeout = null;

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

      if (prevButton) {
        prevButton.disabled = activeIndex === 0;
      }

      if (nextButton) {
        nextButton.disabled = activeIndex === cards.length - 1;
      }

    }


    /* ========================================
       SCROLL TO CARD
    ======================================== */

    function scrollToCard(index) {

      index = Math.max(0, Math.min(index, cards.length - 1));

      const card = cards[index];

      if (!card) return;

      const trackRect = track.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      // Calculate the card's center relative to the scroll position.
      // This remains accurate when cards overlap and scale.

      const cardCenter =
        track.scrollLeft +
        cardRect.left +
        cardRect.width / 2 -
        trackRect.left;

      const targetScroll =
        cardCenter - track.clientWidth / 2;

      track.scrollTo({
        left: Math.max(
          0,
          Math.min(
            targetScroll,
            track.scrollWidth - track.clientWidth
          )
        ),
        behavior: 'smooth'
      });

    }


    /* ========================================
       ARROW CONTROLS
    ======================================== */

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        scrollToCard(activeIndex + 1);
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        scrollToCard(activeIndex - 1);
      });
    }


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

    });


    /* ========================================
       MOUSE DRAGGING
    ======================================== */

    let isDragging = false;
    let hasDragged = false;
    let startX = 0;
    let startScroll = 0;

    const dragThreshold = 5;

    track.addEventListener('mousedown', (event) => {

      // Only respond to the primary mouse button.
      if (event.button !== 0) return;

      // Preserve interaction with controls and links.
      if (event.target.closest('button, a, input, select, textarea')) {
        return;
      }

      isDragging = true;
      hasDragged = false;

      startX = event.pageX;
      startScroll = track.scrollLeft;

      track.classList.add('is-dragging');

    });

    document.addEventListener('mousemove', (event) => {

      if (!isDragging) return;

      const distance = event.pageX - startX;

      if (Math.abs(distance) > dragThreshold) {
        hasDragged = true;
      }

      if (!hasDragged) return;

      event.preventDefault();

      track.scrollLeft = startScroll - distance;

    });

    function stopDragging() {

      if (!isDragging) return;

      isDragging = false;
      track.classList.remove('is-dragging');

      updateActiveCard();

    }

    document.addEventListener('mouseup', stopDragging);


    // Prevent links from opening if the user dragged the carousel.

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
      updateActiveCard();
    });


    /* ========================================
       INITIAL STATE
    ======================================== */

    updateActiveCard();

  });

});
