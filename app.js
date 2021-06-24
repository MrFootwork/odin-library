import GlobalVariableContainer from './global.js'
import * as bookTools from './book.js'

const globals = new GlobalVariableContainer()
//TODO Authentication
//TODO Kann man meine Bücher-ID-Übergabe optimieren?

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
})

library.addEventListener('click', e => {
	const bookId = e.target.dataset.book
	const lib = globals.snapshotLibrary
	const bookIndex = lib.findIndex(book => book.id === bookId)
	const elementClass = e.target.classList[0]
	if (elementClass === 'editButton') {
		if (bookId) {
			globals.activeBookId = bookId
			globals.newBook = false
			globals.title.value = lib[bookIndex].title
			globals.author.value = lib[bookIndex].author
			globals.pages.value = lib[bookIndex].pages
			globals.read.checked = lib[bookIndex].read
			globals.submitButton.innerText = 'Buch ändern'
			globals.modal.style.display = 'block'
		}
	}
	if (elementClass === 'deleteButton') {
		if (bookId) bookTools.remove(bookId)
	}
	if (elementClass === 'checkboxRead') {
		const readState = e.target.checked
		if (bookId) {
			bookTools.updateRead(bookId, readState)
			lib[bookIndex].read = readState
		}
	}
})

/*################################
#   UI
################################*/
async function initializeApp() {
	globals.snapshotLibrary = await bookTools.loadDB()
	bookTools.resetDOMLibrary()
	bookTools.renderAll(globals.snapshotLibrary)
}
initializeApp()

function Book(title, author, pages, read = false) {
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
}
