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
      this.readed ? "readed" : "not readed"}`;
  };
}

const cardsContainer = document.querySelector(".main");
const addButton = document.querySelector("#btn-add");
const book1 = new Book('jajas', 'kjrow', 230, true);
const formContainer = document.querySelector(".formAdd");


addButton.addEventListener("click", () => {
  formContainer.classList.add("formAdd-show");
  formContainer.classList.remove("formAdd-hide");
})

formContainer.addEventListener("click", (e) => {
  console.log(e.target);
  if(e.target.id === "formAdd"){
    e.target.classList.remove("formAdd-show");
    e.target.classList.add("formAdd-hide");
  }
})
