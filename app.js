//App
const app = document.getElementById('app')
const library = document.getElementById('library')
var snapshotLibrary = []

//form field
const formWrapper = document.getElementById('form-wrapper')
const form = document.getElementById('form')
const title = document.getElementById('title')
const author = document.getElementById('author')
const pages = document.getElementById('pages')
const read = document.getElementById('read')

//TODO Authentication

/*################################
#   Modal
################################*/
var modal = document.getElementById('myModal')
var modalButton = document.getElementById('modalButton')
var span = document.getElementsByClassName('close')[0]

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
	addBookToLibrary(thisTitle, thisAuthor, thisPages, thisRead)
	thisTitle = ''
	thisAuthor = ''
	thisPages = ''
	thisRead = false
})

library.addEventListener('click', e => {
	const bookId = e.target.dataset.book
	const element = e.target.tagName
	if (element === 'BUTTON') {
		if (bookId) deleteBook(bookId)
	}
	if (element === 'INPUT') {
		const readState = e.target.checked
		if (bookId) updateRead(bookId, readState)
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
function resetDOMLibrary() {
	while (library.lastElementChild) {
		library.removeChild(library.lastElementChild)
	}
}

async function initializeApp() {
	snapshotLibrary = await loadDB()
	displayLibrary(snapshotLibrary)
}
initializeApp()

/*################################
#   DB Calls
################################*/

async function loadDB() {
	let dbLibrary = await db
		.collection('library')
		.get()
		.then(snapshot => {
			return snapshot.docs.reduce((library, doc) => {
				library.push({
					id: doc.id,
					...doc.data(),
				})
				return library
			}, [])
		})
	return dbLibrary.sort((a, b) => {
		if (a.title < b.title) return -1
		if (b.title < a.title) return 1
		return 0
	})
}

async function addBookToLibrary(title, author, pages, read = false) {
	db.collection('library').add({
		title,
		author,
		pages,
		read,
	})
	snapshotLibrary = await loadDB()
	resetDOMLibrary()
	displayLibrary(snapshotLibrary)
	modal.style.display = 'none'
	//TODO kurzes Highlighting des neu hinzugefügten Buches
}

function updateRead(bookId, readState) {
	db.collection('library').doc(bookId).update({ read: readState })
}

function deleteBook(bookId) {
	db.collection('library').doc(bookId).delete()
	snapshotLibrary.forEach((book, i) => {
		if (book.id === bookId) snapshotLibrary.splice(i, 1)
	})
	document.getElementById(bookId).remove()
}

function renderBook(book) {
	const bookCard = document.createElement('div')
	bookCard.classList.add('book')
	bookCard.id = book.id
	library.appendChild(bookCard)

	const textRow = document.createElement('div')
	textRow.classList.add('textRow')
	bookCard.appendChild(textRow)

	const title = document.createElement('h2')
	const author = document.createElement('h3')
	const pages = document.createElement('h3')
	title.innerHTML = `${book.title}`
	author.innerHTML = `written by ${book.author}`
	pages.innerHTML = `${book.pages} pages`
	textRow.appendChild(title)
	textRow.appendChild(author)
	textRow.appendChild(pages)

	const buttonRow = document.createElement('div')
	buttonRow.classList.add('buttonRow')
	bookCard.appendChild(buttonRow)

	const deleteButton = document.createElement('button')
	deleteButton.dataset.book = book.id
	deleteButton.classList.add('deleteButton')
	buttonRow.appendChild(deleteButton)

	const toggleSwitch = document.createElement('label')
	toggleSwitch.classList.add('switch')
	buttonRow.appendChild(toggleSwitch)

	const checkbox = document.createElement('input')
	checkbox.type = 'checkbox'
	checkbox.checked = book.read
	checkbox.dataset.book = book.id
	toggleSwitch.appendChild(checkbox)

	const slider = document.createElement('span')
	slider.classList.add('slider')
	toggleSwitch.appendChild(slider)
}

function displayLibrary(books) {
	books.forEach(book => renderBook(book))
}
