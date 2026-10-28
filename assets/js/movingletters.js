
/* =====================================
   ANIMATED GREETING — ML8
===================================== */

var ml = {
  timelines: {}
};

ml.timelines["ml8"] = anime.timeline({
  loop: false,
  autoplay: false
})

.add({
  targets: '.tv-hero-heading .ml8 .circle-white',
  scale: [0, 3],
  opacity: [1, 0],
  easing: "easeInOutExpo",
  rotateZ: 360,
  duration: 1100
})

.add({
  targets: '.tv-hero-heading .ml8 .circle-container',
  scale: [0, 1],
  duration: 1100,
  easing: "easeInOutExpo",
  offset: '-=1000'
})

.add({
  targets: '.tv-hero-heading .ml8 .circle-dark',
  scale: [0, 1],
  duration: 1100,
  easing: "easeOutExpo",
  offset: '-=600'
})

.add({
  targets: '.tv-hero-heading .ml8 .letters-left',
  scale: [0, 1],
  duration: 1200,
  offset: '-=550'
})

.add({
  targets: '.tv-hero-heading .ml8 .bang',
  scale: [0, 1],
  opacity: [0, 1],
  rotateZ: 15,
  duration: 1200,
  offset: '-=1000'
});


/* =====================================
   PLAY ONCE WHEN HEADING ENTERS VIEW
===================================== */

var movingLetterSection = document.querySelector('.tv-hero-heading');

if (movingLetterSection && window.IntersectionObserver) {

  var movingLetterObserver = new IntersectionObserver(function(entries) {

    if (entries[0].isIntersecting) {
      ml.timelines["ml8"].play();
      movingLetterObserver.unobserve(movingLetterSection);
    }

  }, {
    threshold: 0.15
  });

  movingLetterObserver.observe(movingLetterSection);

} else if (movingLetterSection) {
  ml.timelines["ml8"].play();
}


/* =====================================
   GREEN DASHED CIRCLE — ROTATES FOREVER
===================================== */

anime({
  targets: '.tv-hero-heading .ml8 .circle-dark-dashed',
  rotateZ: 360,
  duration: 8000,
  easing: "linear",
  loop: true
});
