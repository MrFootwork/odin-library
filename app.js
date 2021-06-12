import * as global from './global'
import * as book from './book.js'

//TODO Authentication

/*################################
#   Modal
################################*/

modalButton.onclick = function () {
	modal.style.display = 'block'
}
span.onclick = function () {
	modal.style.display = 'none'
}
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = 'none'
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
	snapshotLibrary = book.add(thisTitle, thisAuthor, thisPages, thisRead)
	thisTitle = ''
	thisAuthor = ''
	thisPages = ''
	thisRead = false
})

library.addEventListener('click', e => {
	const bookId = e.target.dataset.book
	const element = e.target.tagName
	if (element === 'BUTTON') {
		if (bookId) book.remove(bookId)
	}
	if (element === 'INPUT') {
		const readState = e.target.checked
		if (bookId) book.update(bookId, readState)
	}
})

function Book(title, author, pages, read = false) {
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
}

/*################################
#   UI
################################*/

;(async function initializeApp() {
	snapshotLibrary = await book.loadDB()
	book.renderAll(snapshotLibrary)
})()
