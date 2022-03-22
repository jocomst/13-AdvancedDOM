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
