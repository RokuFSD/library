/*================ Book Object =================*/

let myBooks = [];

class Book {
  constructor(title, author, numPages, readed) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.readed = readed;
  }

  setReaded = (readed) => {
    this.readed = readed;
  };

  getTitle = () => {
    return this.title;
  };
}

/*================ Variables ===================*/

const cardsContainer = document.querySelector(".main");
const addButton = document.querySelector("#btn-add");
const submitButton = document.querySelector(".btn-sub");
const form = document.querySelector(".form");
const formContainer = document.querySelector(".formAdd");
const bgText = document.querySelector(".bg-text");

/*================= Functions ====================*/
const saveUserData = () => {
  let myArraySerialized = JSON.stringify(myBooks);
  localStorage.setItem("myArray", myArraySerialized);
};

const loadUserData = () => {
  let currentBooks = localStorage.getItem("myArray");
  let storedBooks = [];
  if (currentBooks == null) return;
  currentBooks = JSON.parse(currentBooks);
  storedBooks = currentBooks.map((book) => {
    return new Book(book.title, book.author, book.numPages, book.readed);
  });

  myBooks = [...storedBooks];
  updateGrid();
};

const addBookToLibrary = (book) => {
  myBooks.push(book);
};

const printBook = (book) => {
  const card = document.createElement("ARTICLE");
  const h2 = document.createElement("H2");
  const h3 = document.createElement("H3");
  const p = document.createElement("P");
  const buttonRemove = `<button class="card__btn card__btn--remove">Remove</button>`;
  let doc;

  if (book.readed) {
    doc = `<button class="card__btn" id="btn__readed">Readed <i class="material-icons">check</i></button>`;
  } else {
    doc = `<button class="card__btn card__btn--false" id="btn__readed">Readed <i class="material-icons">close</i></button>`;
  }

  h2.innerText = book.title;
  h3.innerText = `Author: ${book.author}`;
  p.innerText = `Pages: ${book.numPages}`;
  card.append(h2);
  card.append(h3);
  card.append(p);
  card.insertAdjacentHTML("beforeend", doc);
  card.insertAdjacentHTML("beforeend", buttonRemove);
  card.classList.add("card");
  cardsContainer.append(card);
};

const updateGrid = () => {
  cardsContainer.innerHTML = "";
  myBooks.length > 0
    ? (bgText.innerHTML = "")
    : (bgText.innerHTML = "No books added");

  for (let book of myBooks) {
    printBook(book);
  }
  saveUserData();
};

const createBook = () => {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let qtyPages = document.querySelector("#pages").value;
  let readedState = document.querySelector("#readed").checked;
  let book = new Book(title, author, qtyPages, readedState);
  addBookToLibrary(book);
};

const verifyInput = () => {
  return document.querySelector("#pages").value < 1
    ? alert("ERROR! Verify number of pages")
    : true;
};

const clearForm = () => {
  form.reset();
};

const closeForm = () => {
  formContainer.classList.remove("formAdd-show");
  formContainer.classList.add("formAdd-hide");
};

const checkButton = (button) => {
  return button.classList.contains("card__btn--false")
    ? "not readed"
    : "readed";
};

const updateStatus = (button) => {
  myBooks.filter((book) => {
    if (book.getTitle().toUpperCase() !== button.parentNode.firstChild.innerText)return;

    if (checkButton(button) == "readed") {
      button.childNodes[1].innerHTML = "check";
      book.setReaded(true);
    } else {
      button.childNodes[1].innerHTML = "close";
      book.setReaded(false);
    }
  });
  saveUserData();
};

const removeBook = (card) => {
  card.remove();
  let newBooks = myBooks.filter(
    (book) => book.getTitle() !== card.firstChild.innerHTML
  );
  myBooks = [...newBooks];
  updateGrid();
};

/*================= Events ================*/

addButton.addEventListener("click", () => {
  formContainer.classList.add("formAdd-show");
  formContainer.classList.remove("formAdd-hide");
});

formContainer.addEventListener("click", (e) => {
  if (e.target.id === "formAdd") {
    closeForm();
  }
});

submitButton.addEventListener("click", () => {
  if (verifyInput()) {
    createBook();
    clearForm();
    closeForm();
    updateGrid();
  }
});

cardsContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && e.target.id === "btn__readed") {
    e.target.classList.toggle("card__btn--false");
    updateStatus(e.target);
  }

  if (
    e.target.tagName === "BUTTON" &&
    e.target.classList.contains("card__btn--remove")
  )
    removeBook(e.target.parentNode);
});

//check saved books
loadUserData();
