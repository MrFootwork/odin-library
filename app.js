//error message
const error = document.getElementById('error')

//App
const app = document.getElementById('app')
const library = document.getElementById('library')

//form field
const formWrapper = document.getElementById('form-wrapper')
const form = document.getElementById('form')
const title = document.getElementById('title')
const author = document.getElementById('author')
const pages = document.getElementById('pages')
const read = document.getElementById('read')

// TODO Implement firebase to save data

function validateInput(title, author, pages) {
	const titleIsValid = /\w+/.test(title)
	const authorIsValid = /\w+/.test(author)
	const pagesIsValid = /\d+/.test(pages)
	return titleIsValid && authorIsValid && pagesIsValid
}

function throwError() {
	//TODO: Throw an appripriate error message
	const message = 'Input has errors.'
	error.innerHTML = message
}

form.addEventListener('submit', e => {
	e.preventDefault()
	let thisTitle = title.value
	let thisAuthor = author.value
	let thisPages = pages.value
	let thisRead = read.checked

	const inputsAreValid = validateInput(thisTitle, thisAuthor, thisPages)
	if (!inputsAreValid) throwError()
	// TODO Error-Handler
	addBookToLibrary(thisTitle, thisAuthor, thisPages, thisRead)
	thisTitle = ''
	thisAuthor = ''
	thisPages = ''
	thisRead = false
})

library.addEventListener('click', e => {
	bookNumber = e.target.dataset.book
	//only clicks on delete button should fire
	//clicks on delete: bookNumber != undefined
	if (bookNumber) deleteBook(bookNumber)
})

let myLibrary = [
	{
		title: 'erstes Buch',
		author: 'Pandau',
		pages: 255,
		read: false,
	},
	{
		title: 'zweites Buch',
		author: 'Jia',
		pages: 12,
		read: true,
	},
]

function Book(title, author, pages, read = false) {
	this.title = title
	this.author = author
	this.pages = pages
	this.read = read
}

function addBookToLibrary(title, author, pages, read) {
	myLibrary.push(new Book(title, author, pages, read))
	resetDOMLibrary()
	displayLibrary(myLibrary)
}

function deleteBook(bookNumber) {
	myLibrary.splice(bookNumber, 1)
	resetDOMLibrary()
	displayLibrary(myLibrary)
}

function resetDOMLibrary() {
	while (library.lastElementChild) {
		library.removeChild(library.lastElementChild)
	}
}

function displayLibrary(libraryDB) {
	libraryDB.forEach((book, i) => {
		const bookCard = document.createElement('div')
		bookCard.classList.add('book')
		library.appendChild(bookCard)

		const cardRows = document.createElement('div')
		cardRows.classList.add('row')
		bookCard.appendChild(cardRows)

		const title = document.createElement('h3')
		const author = document.createElement('h2')
		const pages = document.createElement('h2')
		title.innerHTML = book.title
		author.innerHTML = book.author
		pages.innerHTML = book.pages
		cardRows.appendChild(title)
		cardRows.appendChild(author)
		cardRows.appendChild(pages)

		const deleteButton = document.createElement('button')
		deleteButton.dataset.book = i
		cardRows.appendChild(deleteButton)

		const toggleSwitch = document.createElement('label')
		toggleSwitch.classList.add('switch')
		cardRows.appendChild(toggleSwitch)

		const checkbox = document.createElement('input')
		checkbox.type = 'checkbox'
		checkbox.checked = book.read
		toggleSwitch.appendChild(checkbox)

		const slider = document.createElement('span')
		slider.classList.add('slider')
		toggleSwitch.appendChild(slider)
	})
}
displayLibrary(myLibrary)
