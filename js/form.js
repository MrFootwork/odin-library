import Book from './book.js'

export default class Form {
	constructor(library) {
		this.library = library
		this.addBookMode = true

		//listener
		this.submitButton.onclick = this.#submitBook
		this.closeModalButton.onclick = this.#closeModal
	}

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

	showModal = () => {
		this.modal.style.display = 'block'
		this.submitButton.onclick = this.#submitBook
		this.modal.onclick = this.#closeModal
	}

	#closeModal = e => {
		const closerDomIDs = [this.modal.id, this.closeModalButton.id]
		if (closerDomIDs.includes(e.target.id)) {
			this.modal.style.display = 'none'
			this.modal.onclick = null
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
		if (this.addBookMode) {
			const bookToAdd = {
				title,
				author,
				pages,
				read,
				library: this.library,
			}
			const newBook = new Book(bookToAdd)
			this.library.add(newBook)
			newBook.render()
		} else {
			//process for update methods of book
		}
		this.modal.style.display = 'none'
		this.title.value = ''
		this.author.value = ''
		this.pages.value = ''
		this.read.checked = false
		this.submitButton.innerText = 'Buch speichern'
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
