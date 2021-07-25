import Book from './book.js'
import { db } from './firebase.js'

export default class Form {
	constructor() {
		this.submitButton.onclick = this.#submitBook
		this.closeModalButton.onclick = this.#closeModalClick
	}

	// book from editButton
	bookToChange

	// modal elements
	form = document.getElementById('form')
	modal = document.getElementById('myModal')
	closeModalButton = document.getElementById('closeModalButton')
	submitButton = document.getElementById('formSubmit')

	// input fields
	title = document.getElementById('title')
	author = document.getElementById('author')
	pages = document.getElementById('pages')
	read = document.getElementById('read')

	showModal = book => {
		this.bookToChange = book
		if (editMode) {
			console.log('showModal(): ', book)
			this.title.value = book.title
			this.author.value = book.author
			this.pages.value = book.pages
			this.read.checked = book.read
			this.submitButton.innerText = 'Änderung speichern'
		}
		this.modal.style.display = 'block'
		this.submitButton.onclick = this.#submitBook
		this.modal.onclick = this.#closeModalClick
		document.addEventListener('keydown', this.#closeModalESC)
	}

	#closeModalClick = e => {
		const closerDomIDs = [
			this.modal.id,
			this.closeModalButton.id,
			this.submitButton.id,
		]
		const clickedOnCloser = closerDomIDs.includes(e.target.id)
		this.#closeModalProcess(clickedOnCloser)
	}

	#closeModalESC = e => {
		const escButtonPressed = e.key === 'Escape'
		this.#closeModalProcess(escButtonPressed)
	}

	#closeModalProcess = function (wantToClose) {
		if (wantToClose && editMode) {
			this.submitButton.innerText = 'Buch speichern'
			editMode = false
			this.title.value = ''
			this.author.value = ''
			this.pages.value = ''
			this.read.checked = false
		}
		if (wantToClose) {
			this.modal.style.display = 'none'
			this.modal.onclick = null
		}
	}

	// TODO Clean Code
	// Decoupling of "add" and "change" funkctions
	#submitBook = async e => {
		e.preventDefault()
		const title = this.title.value
		const author = this.author.value
		const pages = this.pages.value
		const read = this.read.checked

		const bookEntry = {
			title,
			author,
			pages,
			read,
		}

		// FIXME Validierung fehlt
		// const inputsAreValid = this.validateInput(title, author, pages)
		const inputsAreValid = true
		if (!inputsAreValid) {
			throw new Error('Eingabe enthält Fehler!')
		}

		if (editMode) {
			this.#updateBook(this.bookToChange.id, bookEntry)
		} else {
			this.#addBook(bookEntry)
		}
		this.#closeModalClick(e)
	}

	async #updateBook(bookId, bookEntry) {
		db.collection('library').doc(bookId).update(bookEntry)
		this.bookToChange.update(bookEntry)
		theLibrary.update(bookId, bookEntry)
	}

	async #addBook(bookEntry) {
		const newBook = new Book(bookEntry)
		await newBook.addToDB()
		theLibrary.add(newBook)
		newBook.render()
	}

	validateInput(title, author, pages) {
		const titleIsValid = /\w+/.test(title)
		const authorIsValid = /\w+/.test(author)
		const pagesIsValid = /\d+/.test(pages)
		if (!titleIsValid) throw new Error('Titel muss Wörter enthalten!')
		if (!authorIsValid) throw new Error('Author muss Wörter enthalten!')
		if (!pagesIsValid) throw new Error('Seitenanzahl muss Zahlen enthalten!')
		return titleIsValid && authorIsValid && pagesIsValid
	}
}
