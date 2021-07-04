export default class Form {
	constructor(library) {
		this.library = library
		this.openModalButton = document.getElementById('modalButton')
		this.newBook = true

		// modal elements
		this.form = document.getElementById('form')
		this.modal = document.getElementById('myModal')
		this.closeModalButton = document.getElementsByClassName('close')[0]
		this.submitButton = document.getElementById('formSubmit')

		// input fields
		this.title = document.getElementById('title')
		this.author = document.getElementById('author')
		this.pages = document.getElementById('pages')
		this.read = document.getElementById('read')
	}

	submitForm = function () {
		this.form.addEventListener('submit', formHandler)
		formHandler = e => {
			console.log('clicked on submit')
			e.preventDefault()
			let thisTitle = title.value
			let thisAuthor = author.value
			let thisPages = pages.value
			let thisRead = read.checked

			const inputsAreValid = validateInput(thisTitle, thisAuthor, thisPages)
			if (!inputsAreValid) {
				// TODO Error-Handler
				throw new Error('Eingabe enthält Fehler!')
			}
			if (globals.newBook) {
				bookTools.add(thisTitle, thisAuthor, thisPages, thisRead)
			} else {
				bookTools.update(globals.activeBookId, {
					//TODO Update rendert verzögert...
					title: thisTitle,
					author: thisAuthor,
					pages: thisPages,
					read: thisRead,
				})
				globals.newBook = true
			}

			globals.modal.style.display = 'none'
			title.value = ''
			author.value = ''
			pages.value = ''
			read.checked = false
			globals.submitButton.innerText = 'Buch speichern'
			globals.activeBookId = null
			initializeApp()
		}
	}

	setModalListeners = function () {
		this.openModalButton.onclick = () => {
			this.modal.style.display = 'block'
		}

		this.closeModalButton.onclick = () => {
			this.modal.style.display = 'none'
		}

		window.onclick = event => {
			if (event.target === this.modal) {
				this.modal.style.display = 'none'
			}
		}

		this.submitButton.onclick = event => {
			event.preventDefault()
			const title = this.title.value
			const author = this.author.value
			const pages = this.pages.value
			const read = this.read.checked
			const inputsAreValid = this.validateInput(title, author, pages)
			if (!inputsAreValid) {
				// TODO Error-Handler
				throw new Error('Eingabe enthält Fehler!')
			}
			if (this.newBook) {
				console.log('input: ', title, author, pages, read)
				console.log('object: ', this.library)
				this.library.add(title, author, pages, read)
			} else {
				bookTools.update(globals.activeBookId, {
					//TODO Update rendert verzögert...
					title: thisTitle,
					author: thisAuthor,
					pages: thisPages,
					read: thisRead,
				})
				globals.newBook = true
			}
		}
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
