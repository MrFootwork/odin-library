import Book from './book.js'
import { db } from './firebase.js'

export default class Form {
	constructor() {
		this.submitButton.onclick = this.#submitBook
		this.closeModalButton.onclick = this.#closeModal
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
		this.modal.onclick = this.#closeModal
	}

	// TODO also close on ESC-button
	#closeModal = e => {
		const closerDomIDs = [
			this.modal.id,
			this.closeModalButton.id,
			this.submitButton.id,
		]
		const clickedOnCloser = closerDomIDs.includes(e.target.id)
		if (clickedOnCloser) {
			this.modal.style.display = 'none'
			this.modal.onclick = null
		}
		if (clickedOnCloser && editMode) {
			this.submitButton.innerText = 'Buch speichern'
			this.title.value = ''
			this.author.value = ''
			this.pages.value = ''
			this.read.checked = false
			editMode = false
		}
	}

	#submitBook = e => {
		e.preventDefault()
		const title = this.title.value
		const author = this.author.value
		const pages = this.pages.value
		const read = this.read.checked
		// const inputsAreValid = this.validateInput(title, author, pages)
		const inputsAreValid = true
		if (!inputsAreValid) {
			// TODO Error-Handler
			throw new Error('Eingabe enthält Fehler!')
		}

		console.log('editMode: ', editMode)
		if (editMode) {
			const newBookEntry = {
				title,
				author,
				pages,
				read,
			}
			db.collection('library').doc(this.bookToChange.id).update(newBookEntry)
			this.bookToChange.update(newBookEntry)
			theLibrary.update(this.bookToChange.id, newBookEntry)
		} else {
			const bookToAdd = {
				title,
				author,
				pages,
				read,
			}
			const newBook = new Book(bookToAdd)
			newBook.addToDB()
			theLibrary.add(newBook)
			newBook.render()
			console.log('allBooks after adding a new one: ', theLibrary)
		}
		this.#closeModal(e)
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
