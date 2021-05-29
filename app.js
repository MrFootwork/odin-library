//error message
const error = document.getElementById('error')

//App
const app = document.getElementById('app')

//form field
const form = document.getElementById('form')
const title = document.getElementById('title')
const author = document.getElementById('author')
const pages = document.getElementById('pages')

function validateInput() {
	//TODO: implement real validation
	return true
}

function throwError() {
	//TODO: Throw an appripriate error message
	const message = 'Input has errors.'
	error.innerHTML = message
}

form.addEventListener('submit', e => {
	e.preventDefault()
	const inputsAreValid = validateInput()
	if (!inputsAreValid) throwError()
	addBookToLibrary(title.value, author.value, pages.value)
})

//odin project
let myLibrary = [
	{
		Title: 'erstes Buch',
		Author: 'Pandau',
		Pages: 255,
		Read: false,
	},
	{
		Title: 'zweites Buch',
		Author: 'Jia',
		Pages: 12,
		Read: true,
	},
]

function Book() {
	// the constructor...
}

function readInput(e) {
	log.textContent = e.target.value
	console.log(log.textContent)
}

function addBookToLibrary(title, author, pages) {
	myLibrary.push({
		title: title,
		author: author,
		pages: pages,
		read: false,
	})
	resetDOMLibrary()
	displayLibrary(myLibrary)
}

function resetDOMLibrary() {
	while (library.lastElementChild) {
		library.removeChild(library.lastElementChild)
	}
}

function displayLibrary(libraryDB) {
	libraryDB.forEach(book => {
		console.log(book.title)
		const bookCard = document.createElement('div')
		const cardRows = document.createElement('div')
		const title = document.createElement('h3')
		const author = document.createElement('h2')
		const pages = document.createElement('h2')
		bookCard.classList.add('book')
		cardRows.classList.add('row')
		title.innerHTML = book.title
		author.innerHTML = book.author
		pages.innerHTML = book.pages
		library.appendChild(bookCard)
		bookCard.appendChild(cardRows)
		cardRows.appendChild(title)
		cardRows.appendChild(author)
		cardRows.appendChild(pages)
	})
}
displayLibrary(myLibrary)
