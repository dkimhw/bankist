'use strict';


const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');




const openModal = function (evt) {
  evt.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => {
  btn.addEventListener('click', openModal);
})

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button Scroll
btnScrollTo.addEventListener('click', (evt) => {
  const s1coords = section1.getBoundingClientRect();
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth'
  });

  // works with modern browsers
  // section1.scrollIntoView({ behavior: 'smooth' });
});

// Page navigation

// document.querySelectorAll('.nav__link').forEach((li) => {
//   li.addEventListener('click', (evt) => {
//     evt.preventDefault();
//     const id = li.getAttribute('href');
//     const section = document.querySelector(id);
//     section.scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', (evt) => {
  evt.preventDefault();
  if (evt.target.classList.contains('nav__link')) {
    const id = evt.target.getAttribute('href');
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: 'smooth' });
  }
});


// Tab components
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', (evt) => {
  const clicked = evt.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content => content.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');

  // activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const nav = document.querySelector('.nav');

const handleNavbarHover3 = (evt) => {
  // console.log(this);
  // console.log(evt);

  if (evt.target.classList.contains('nav__link')) {
    const link = evt.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });

    logo.style.opacity = this;
  }
}

const handleNavbarHover2 = (evt) => {
  console.log(this);
  console.log(evt);

  if (evt.target.classList.contains('nav__link')) {
    const link = evt.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });

    logo.style.opacity = this;
  }
}

const handleNavbarHover = function(evt) {
  // console.log(this);
  // console.log(evt);
  if (evt.target.classList.contains('nav__link')) {
    const link = evt.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });

    logo.style.opacity = this;
  }
}

nav.addEventListener('mouseover', handleNavbarHover.bind(0.5));

nav.addEventListener('mouseout', handleNavbarHover.bind(1));

// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function() {
//   if (this.window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// })

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, // 0% of the header is visible we want to go to sticky nav
  rootMargin: `${navHeight}px`
});
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');
const revealSection = function(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); // no need to observe it anymore once unhidden
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px' // loads a little faster before threshold
})
imgTargets.forEach(img => imgObserver.observe(img));


// Slider
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currSlide = 0;
const maxSlide = slides.length - 1;
const dotContainer = document.querySelector('.dots');

// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';

const createDots = function () {
  slides.forEach(function(_, i) {
    dotContainer.insertAdjacentHTML('beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`);
  });
};


const activateDot = function(slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  })

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

const goToSlide = function(slide) {
  slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
  activateDot(slide);
}

const nextSlide = function() {
  if (currSlide === maxSlide) {
    currSlide = 0;
  } else {
    currSlide++;
  }

  goToSlide(currSlide);
  activateDot(currSlide);
}

const prevSlide = function() {
  if (currSlide === 0) {
    currSlide = maxSlide;
  } else {
    currSlide--;
  }

  goToSlide(currSlide);
  activateDot(currSlide);
}

const init = () => {
  createDots();
  goToSlide(0);
}

init();

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'ArrowLeft') {
    prevSlide();
  } else if (evt.key === 'ArrowRight') {
    nextSlide();
  }
});

dotContainer.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('dots__dot')) {
    const {slide} = evt.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

document.addEventListener('DOMContentLoaded', function(evt) {
  console.log('HTML parsed and DOM tree built!');
});

window.addEventListener('load', function(evt) {
  console.log('Page fully loaded', e);
});
