import {
  db,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "./firebase.js";

export default class Book {
  constructor({ title, author, pages, read, id = null }) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }

  // DOM-Elements set by render()
  bookCardDOM;
  titleDOM;
  authorDOM;
  pagesDOM;
  checkboxDOM;

  async addToDB() {
    const bookToAdd = {
      title: this.title,
      author: this.author,
      pages: this.pages,
      read: this.read,
    };

    //firebase returns id
    const docRef = await addDoc(collection(db, "library"), bookToAdd);
    this.id = docRef.id;
  }

  #editBook = () => {
    editMode = true;
    theForm.showModal(this);
  };

  #deleteBook = () => {
    deleteDoc(doc(collection(db, "library"), this.id));
    theLibrary.remove(this);
    this.bookCardDOM.remove();
  };

  #toggleRead = () => {
    this.read = !this.read;
    updateDoc(doc(collection(db, "library"), this.id), { read: this.read });
  };

  update(bookData) {
    this.titleDOM.innerHTML = `${bookData.title}`;
    this.authorDOM.innerHTML = `written by ${bookData.author}`;
    this.pagesDOM.innerHTML = `${bookData.pages} pages`;
    this.checkboxDOM.checked = bookData.read;
  }

  render() {
    this.bookCardDOM = document.createElement("div");
    this.bookCardDOM.classList.add("book");
    this.bookCardDOM.id = this.id;
    theLibrary.libraryDOM.appendChild(this.bookCardDOM);

    const textRow = document.createElement("div");
    textRow.classList.add("textRow");
    this.bookCardDOM.appendChild(textRow);

    const title = document.createElement("h2");
    const author = document.createElement("h3");
    const pages = document.createElement("h3");
    this.titleDOM = title;
    this.authorDOM = author;
    this.pagesDOM = pages;
    title.innerHTML = `${this.title}`;
    author.innerHTML = `written by ${this.author}`;
    pages.innerHTML = `${this.pages} pages`;
    textRow.appendChild(title);
    textRow.appendChild(author);
    textRow.appendChild(pages);

    const buttonRow = document.createElement("div");
    buttonRow.classList.add("buttonRow");
    this.bookCardDOM.appendChild(buttonRow);

    const editButton = document.createElement("button");
    editButton.dataset.book = this.id;
    editButton.classList.add("editButton");
    editButton.onclick = this.#editBook;
    buttonRow.appendChild(editButton);

    const toggleSwitch = document.createElement("label");
    toggleSwitch.classList.add("switch");
    buttonRow.appendChild(toggleSwitch);

    const checkbox = document.createElement("input");
    this.checkboxDOM = checkbox;
    checkbox.classList.add("checkboxRead");
    checkbox.type = "checkbox";
    checkbox.checked = this.read;
    checkbox.dataset.book = this.id;
    checkbox.onchange = this.#toggleRead;
    toggleSwitch.appendChild(checkbox);

    const slider = document.createElement("span");
    slider.classList.add("slider");
    toggleSwitch.appendChild(slider);

    const deleteButton = document.createElement("button");
    deleteButton.dataset.book = this.id;
    deleteButton.classList.add("deleteButton");
    deleteButton.onclick = this.#deleteBook;
    buttonRow.appendChild(deleteButton);
  }
}
