// const body = document.getElementsByTagName('body')[0]

// // <h1>test</h1>
// const test = document.createElement('h1')
// const testContent = test.textContent
// test.textContent = 'test'

// app.appendChild(test)
// body.appendChild(test)

const app = document.getElementById('app')

//Input field
const input = document.getElementById('input')
const log = document.getElementById('values')
input.addEventListener('input', readInput)

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
}

function addBookToLibrary() {}
