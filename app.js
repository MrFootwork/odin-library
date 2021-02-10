// const body = document.getElementsByTagName('body')[0]

// // <h1>test</h1>
// const test = document.createElement('h1')
// const testContent = test.textContent
// test.textContent = 'test'

// app.appendChild(test)
// body.appendChild(test)

const app = document.getElementById('app')
const library = document.getElementById('library')

//Input field
const input = document.getElementById('input')
const log = document.getElementById('values')
input.addEventListener('input', readInput)

//odin project
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

function Book() {
	// the constructor...
}

function readInput(e) {
	log.textContent = e.target.value
}

function addBookToLibrary() {}

//display all books in the library
;(function displayLibrary(library) {
	library.forEach(book => {
		console.log(book.title)
	})
})(myLibrary)
