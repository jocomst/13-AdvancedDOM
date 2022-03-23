'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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
