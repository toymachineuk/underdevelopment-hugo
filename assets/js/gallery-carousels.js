document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.tv-destination-carousel').forEach((carousel) => {

    const track = carousel.querySelector('.tv-destination-track');
    const cards = Array.from(
      carousel.querySelectorAll('.tv-destination-card')
    );

    const nextButton = carousel.querySelector('.tv-destination-next');
    const prevButton = carousel.querySelector('.tv-destination-prev');

    if (!track || !cards.length) return;


    /* --------------------------------
       FIND ACTIVE CARD
    -------------------------------- */

    function updateActiveCard() {

      const trackRect = track.getBoundingClientRect();

      const trackCenter =
        trackRect.left + trackRect.width / 2;

      let closestCard = null;
      let closestDistance = Infinity;

      cards.forEach((card) => {

        const rect = card.getBoundingClientRect();

        const cardCenter =
          rect.left + rect.width / 2;

        const distance =
          Math.abs(trackCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestCard = card;
        }

      });


      cards.forEach((card) => {
        card.classList.remove('is-active');
      });

      if (closestCard) {
        closestCard.classList.add('is-active');
      }
    }


    /* --------------------------------
       SCROLL TO CARD
    -------------------------------- */

    function scrollToCard(index) {

      if (index < 0) {
        index = 0;
      }

      if (index >= cards.length) {
        index = cards.length - 1;
      }

      const card = cards[index];

      const trackRect = track.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();

      const offset =
        cardRect.left -
        trackRect.left -
        (trackRect.width - cardRect.width) / 2;

      track.scrollBy({
        left: offset,
        behavior: 'smooth'
      });
    }


    /* --------------------------------
       FIND CURRENT CARD
    -------------------------------- */

    function getActiveIndex() {

      const activeCard =
        carousel.querySelector('.tv-destination-card.is-active');

      if (!activeCard) {
        return 0;
      }

      return cards.indexOf(activeCard);
    }


    /* --------------------------------
       NEXT
    -------------------------------- */

    if (nextButton) {

      nextButton.addEventListener('click', () => {

        const currentIndex =
          getActiveIndex();

        scrollToCard(currentIndex + 1);

      });

    }


    /* --------------------------------
       PREVIOUS
    -------------------------------- */

    if (prevButton) {

      prevButton.addEventListener('click', () => {

        const currentIndex =
          getActiveIndex();

        scrollToCard(currentIndex - 1);

      });

    }


    /* --------------------------------
       UPDATE WHILE SCROLLING
    -------------------------------- */

    let scrollTimeout;

    track.addEventListener('scroll', () => {

      window.requestAnimationFrame(() => {
        updateActiveCard();
      });

      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        updateActiveCard();
      }, 100);

    });


    /* --------------------------------
       DRAG WITH MOUSE
    -------------------------------- */

    let isDragging = false;
    let startX = 0;
    let startScroll = 0;


    track.addEventListener('mousedown', (event) => {

      isDragging = true;

      startX = event.pageX;
      startScroll = track.scrollLeft;

      track.classList.add('is-dragging');

    });


    track.addEventListener('mousemove', (event) => {

      if (!isDragging) return;

      event.preventDefault();

      const distance =
        event.pageX - startX;

      track.scrollLeft =
        startScroll - distance;

    });


    function stopDragging() {

      if (!isDragging) return;

      isDragging = false;

      track.classList.remove('is-dragging');

      updateActiveCard();

    }


    track.addEventListener('mouseup', stopDragging);
    track.addEventListener('mouseleave', stopDragging);


    /* --------------------------------
       INITIAL STATE
    -------------------------------- */

    updateActiveCard();

  });

});