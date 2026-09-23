var ml = {
  timelines: {}
};

ml.timelines["ml8"] = anime.timeline({
  loop: false,
  autoplay: false
})

.add({

  targets: '.tv-moving-letter .ml8 .circle-white',

  scale: [0, 3],
  opacity: [1, 0],

  easing: "easeInOutExpo",
  rotateZ: 360,
  duration: 1100

}).add({

  targets: '.tv-moving-letter .ml8 .circle-container',

  scale: [0, 1],
  duration: 1100,
  easing: "easeInOutExpo",
  offset: '-=1000'

}).add({

  targets: '.tv-moving-letter .ml8 .circle-dark',

  scale: [0, 1],
  duration: 1100,
  easing: "easeOutExpo",
  offset: '-=600'

}).add({

  targets: '.tv-moving-letter .letters-left',

  scale: [0, 1],
  duration: 1200,
  offset: '-=550'

}).add({
  targets: '.tv-moving-letter .bang',
  scale: [0, 1],
  opacity: [0, 1],
  rotateZ: 15,
  duration: 1200,
  offset: '-=1000'
});

/* =====================================
   PLAY ONCE ON SCROLL
===================================== */

var movingLetterSection = document.querySelector('.tv-moving-letter');

if (movingLetterSection) {

  var movingLetterObserver = new IntersectionObserver(function(entries) {

    if (entries[0].isIntersecting) {

      ml.timelines["ml8"].play();

      /* Never play again */
      movingLetterObserver.unobserve(movingLetterSection);
    }

  }, {
    threshold: 0.35
  });

  movingLetterObserver.observe(movingLetterSection);
}


/* =====================================
   GREEN DASHED CIRCLE
   KEEPS ROTATING
===================================== */

anime({

  targets: '.tv-moving-letter .ml8 .circle-dark-dashed',

  rotateZ: 360,
  duration: 8000,
  easing: "linear",
  loop: true

});