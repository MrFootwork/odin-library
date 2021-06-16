import GlobalVariableContainer from './global.js'
import * as bookTools from './book.js'

const globals = new GlobalVariableContainer()
//TODO Authentication

/*################################
#   Modal
################################*/
globals.modalButton.onclick = function () {
	globals.modal.style.display = 'block'
}
globals.closeModalButton.onclick = function () {
	globals.modal.style.display = 'none'
}
window.onclick = function (event) {
	if (event.target === globals.modal) {
		globals.modal.style.display = 'none'
	}
}

/*################################
#   Validation
################################*/

function validateInput(title, author, pages) {
	const titleIsValid = /\w+/.test(title)
	const authorIsValid = /\w+/.test(author)
	const pagesIsValid = /\d+/.test(pages)
	console.log('titleIsValid: ', titleIsValid)
	console.log('authorIsValid: ', authorIsValid)
	console.log('pagesIsValid: ', pagesIsValid)
	return titleIsValid && authorIsValid && pagesIsValid
}

/*################################
#   Event Listener
################################*/
form.addEventListener('submit', e => {
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
	globals.snapshotLibrary = bookTools.add(
		thisTitle,
		thisAuthor,
		thisPages,
		thisRead
	)
	thisTitle = ''
	thisAuthor = ''
	thisPages = ''
	thisRead = false
	globals.modal.style.display = 'none'
})

library.addEventListener('click', e => {
	const bookId = e.target.dataset.book
	const elementClass = e.target.classList[0]
	if (elementClass === 'editButton') {
		console.log('You want to edit?')
		// TODO implement edit function
	}
	if (elementClass === 'deleteButton') {
		if (bookId) bookTools.remove(bookId)
	}
	if (elementClass === 'checkboxRead') {
		const readState = e.target.checked
		if (bookId) bookTools.update(bookId, readState)
	}
})

/*################################
#   UI
################################*/
;(async function initializeApp() {
	globals.snapshotLibrary = await bookTools.loadDB()
	bookTools.renderAll(globals.snapshotLibrary)
})()

function Book(title, author, pages, read = false) {
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
}
