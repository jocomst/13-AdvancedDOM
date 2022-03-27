'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
//nav bar
const navBar = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__link');
const navItems = document.querySelectorAll('.nav__item');
//options
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// smooth scroll on button

const scrollToButton = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

scrollToButton.addEventListener('click', e => {
  const s1cords = section1.getBoundingClientRect();

  section1.scrollIntoView({ behavior: 'smooth' });
});

//page navigation

// document.querySelectorAll('.nav__link').forEach(node => {
//   node.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// event delegation - using bubbling to avoid having to add event listeners to everything

//first add eventlistener to common parent
// determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  //guard clause
  if (!clicked) return;
  //active tabs
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabContent.forEach(t => t.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  // content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// nav bar fade

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
//passing in argument into handler function
navBar.addEventListener('mouseover', handleHover.bind(0.5));
navBar.addEventListener('mouseout', handleHover.bind(1));

// const initialCords = section1.getBoundingClientRect();
// console.log(initialCords);
// //sticky navigation
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCords.top) {
//     navBar.classList.add('sticky');
//   } else navBar.classList.add('sticky');
// });
// const obsCallback = function (entries, observer) {
//   entries.forEach(thresh => {
//     console.log(thresh);
//   });
// };

// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, observerOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = navBar.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) {
    navBar.classList.add('sticky');
  } else navBar.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//reveal sections

const allSections = document.querySelectorAll('section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//lazy loading images - helps performance

const imageTargets = document.querySelectorAll(`img[data-src]`);

// console.log(imageTargets);

const loadImages = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imageTargets.forEach(image => {
  imageObserver.observe(image);
});

// fixing slider

const sliders = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  const maxSlides = slides.length - 1;
  let currentSlide = 0;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = `scale(0.2)`;
  // slider.style.overflow = `visible translateX(-800px)`;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeButton = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');

      document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
    });
  };

  const goToSlide = function (currentSlide) {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });
  };

  const nextSlide = function () {
    currentSlide === maxSlides ? (currentSlide = 0) : currentSlide++;
    goToSlide(currentSlide);
    activeButton(currentSlide);
  };

  const prevSlide = function () {
    currentSlide <= 0 ? (currentSlide = maxSlides) : currentSlide--;
    goToSlide(currentSlide);
    activeButton(currentSlide);
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activeButton(0);
  };

  init();
  //next slide
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    e.key === 'ArrowRight' && nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });

  //button functionality
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeButton(slide);
    }
  });
};

sliders();
//current slide = 1 at 0%, second 100%, etc,
// console.log(e.target.getBoundingClientRect());
// console.log('current scroll (x/y)', window.pageXOffset, window.pageYOffset);
// console.log(
//   'height/width of viewport',
//   document.documentElement.clientHeight,
//   document.documentElement.clientWidth
// );

// scrolling
// window.scrollTo(
//   s1cords.left + window.pageXOffset,
//   s1cords.top + window.pageYOffset
// );

// window.scrollTo({
//   left: s1cords.left + window.pageXOffset,
//   top: s1cords.top + window.pageYOffset,
//   behavior: 'smooth',
// });

/*
// selecting elements

//entire html
console.log(document.documentElement);
console.log(document.body);
console.log(document.head);

//selecting elements from doc
const headerElement = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('#section--1'); // does not update if sections are deleted afterwards
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // returns html collection, live collection, if DOM changes this is updated

console.log(document.getElementsByClassName('btn'));

//creating and inserting elements

// insertadacentHTML easy way of adding elements

//programmatically create elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics <button class="btn btn--close-cookie">Got it</button>';

// headerElement.prepend(message);
headerElement.append(message);

// headerElement.before(message);
// headerElement.after(message);

//delete elements

message
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

// styles

message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(message.style.backgroundColor); // reading styles only works if they are inline and set by ourselves

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

console.log(getComputedStyle(message).height);

// css custom properties

document.documentElement.style.setProperty('--color-primary', 'orangered');

// attributes src, alt, id, class - we can change in js

const logo = document.querySelector('.nav__logo');
console.log(logo.src);
console.log(logo.alt);

logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);

logo.setAttribute('company', 'Bankist');

logo.getAttribute('src');

// data attributes
console.log(logo.dataset.versionNumber);

//classes
logo.classList.add('c', 'j');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

//dont use
logo.className = 'John';



// event - a signal generated by a DOM node, click/mouse moving
const alertH1 = function (e) {
  alert('addEventListener: great you are reading the heading');
};

const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', alertH1);

setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1);
}, 4000);
// h1.onmouseenter = function (e) {
//   alert('addEventListener: great you are reading the heading');
// };

// add event listener is better, can add multiple events to an element
// can remove event listener



//capturing and bubbling

// rgba(255, 255, 255)

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);

  // stop propogation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  e.preventDefault();
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});

*/

// const h1 = document.querySelector('h1');

// //going downwards: child

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // going upwards

// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// // going sideways: siblings

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

// dom content loaded event
document.addEventListener('DOMContentLoaded', function (e) {
  console.log(e);
});

//load event fired by window when HTML, css, images are loaded

window.addEventListener('load', function (e) {
  console.log(e);
});

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// });
