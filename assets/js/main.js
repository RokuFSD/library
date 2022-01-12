/*================ Book Object =================*/

let myBooks = [];

class Book {
  constructor(title, author, numPages, readed) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.readed = readed;
  }

  getInfo = () => {
    return `${this.title} by ${this.author}, ${this.numPages} pages, ${
      this.readed ? "readed" : "not readed"
    }`;
  };
}

/*================ Variables ===================*/

const cardsContainer = document.querySelector(".main");
const addButton = document.querySelector("#btn-add");
const submitButton = document.querySelector(".btn-sub");
const formContainer = document.querySelector(".formAdd");
const form = document.querySelector(".form");

/*================= Functions ====================*/

const addBookToLibrary = (book) => {
  myBooks.push(book);
};

const printBook = (book) => {
  const card = document.createElement("ARTICLE");
  const h2 = document.createElement("H2");
  const h3 = document.createElement("H3");
  const p = document.createElement("P");
  h2.innerText = book.title;
  h3.innerText = book.author;
  p.innerText = book.numPages;
  card.append(h2);
  card.append(h3);
  card.append(p);
  card.classList.add("card");
  cardsContainer.append(card);
};

const updateGrid = () => {
  for (let book of myBooks){
    printBook(book);
  }
};

const createBook = () => {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let qtyPages = document.querySelector("#pages").value;
  let readedState = document.querySelector("#readed").checked;
  let book = new Book(title, author, qtyPages, readedState);
  addBookToLibrary(book);
}

const verifyInput = () => {
  return document.querySelector("#pages").value < 1 ? alert("ERROR! Verify number of pages") : true;
};

const clearForm = () =>{
  form.reset();
}

const closeForm = () =>{
  formContainer.classList.remove("formAdd-show");
  formContainer.classList.add("formAdd-hide");
}

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
  if(verifyInput()){
    createBook();
    clearForm();
    closeForm();
  }
});
