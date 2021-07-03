export default class Form {
	constructor() {
		this.modal = document.getElementById('myModal')
		this.closeModalButton = document.getElementsByClassName('close')[0]
		this.submitButton = document.getElementById('formSubmit')
	}
	submitForm() {
		form.addEventListener('submit', formHandler)
		function formHandler(e) {
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

	setModalEvents = () => {
		// this.globals.modalButton.onclick = function () {
		// 	this.globals.modal.style.display = 'block'
		// }
		// this.globals.closeModalButton.onclick = function () {
		// 	this.globals.modal.style.display = 'none'
		// }
		window.onclick = function (event) {
			console.log(this.modal)
			if (event.target === this.modal) {
				this.modal.style.display = 'none'
			}
		}
	}

	validateInput(title, author, pages) {
		const titleIsValid = /\w+/.test(title)
		const authorIsValid = /\w+/.test(author)
		const pagesIsValid = /\d+/.test(pages)
		console.log('titleIsValid: ', titleIsValid)
		console.log('authorIsValid: ', authorIsValid)
		console.log('pagesIsValid: ', pagesIsValid)
		return titleIsValid && authorIsValid && pagesIsValid
	}
}
