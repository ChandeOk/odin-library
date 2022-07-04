'use strict';

const mainContainer = document.querySelector('main');
const form = document.querySelector('.pop-up');
const btnAddNew = document.querySelector('.add-new');
const overlay = document.querySelector('.overlay');
const btnFinish = document.querySelector('.is-finished');

function Book(title, author, pages, isFinished) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isFinished = isFinished;

  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${
      isFinished ? 'finished' : 'not read yet'
    }`;
  };
}

const myLibrary = [];

const govno = new Book('Hueta', 'Professor Xavier', 255, true);

const addBookToLibrary = (title, author, pages, isFinished) => {
  const book = new Book(title, author, pages, isFinished);
  myLibrary.push(book);
};

const clearMain = () => {
  const renderedBooks = document.querySelectorAll('figure');
  if (!renderedBooks) return;
  renderedBooks.forEach((book) => book.remove());
};

const displayLibrary = () => {
  clearMain();

  myLibrary.forEach((book, i) => {
    const bookCard = document.createElement('figure');
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove');
    bookCard.appendChild(removeBtn);
    bookCard.classList.add('book-card');
    bookCard.setAttribute('data-id', `${i}`);
    bookCard.insertAdjacentHTML(
      'afterbegin',
      `<div class="details-container">
        <p>Title: ${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        ${
          book.isFinished
            ? '<p>Finished</p>'
            : '<button class="is-finished">Mark as read</button>'
        }
      </div>
      `
    );
    mainContainer.appendChild(bookCard);
  });
};

displayLibrary();

form.addEventListener('submit', function (event) {
  event.preventDefault();
  const submitedForm = event.target.closest('form');
  const titleInput = submitedForm.querySelector('#title').value;
  const authorInput = submitedForm.querySelector('#author').value;
  const pagesInput = submitedForm.querySelector('#pages').value;
  const isFinished = submitedForm.querySelector('#is-finished').checked;
  console.log(isFinished);
  addBookToLibrary(titleInput, authorInput, +pagesInput, isFinished);
  displayLibrary();
  hideForm();
});

const showForm = function () {
  form.classList.remove('hidden');
  overlay.style.setProperty('display', 'block');
};

const hideForm = function () {
  overlay.style.setProperty('display', 'none');
  form.classList.add('hidden');
};

btnAddNew.addEventListener('click', showForm);
overlay.addEventListener('click', hideForm);

// btnFinish.addEventListener('click', function () {
//   const id = this.closest('figure').dataset.id;
//   console.log(id);
// });

const markAsFinished = function (event) {
  const clickedButton = event.target.closest('.is-finished');
  if (!clickedButton) return;
  const id = clickedButton.closest('figure').dataset.id;
  myLibrary[id].isFinished = true;
  displayLibrary();
};

mainContainer.addEventListener('click', markAsFinished);

const removeFromLib = function (event) {
  const clickedButton = event.target.closest('.remove');
  if (!clickedButton) return;
  const id = clickedButton.closest('figure').dataset.id;
  myLibrary.splice(id, 1);
  displayLibrary();
};

mainContainer.addEventListener('click', removeFromLib);
