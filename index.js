import GlobalVariableContainer from './js/global.js'
import Library from './js/library.js'
import Book from './js/book.js'
import Display from './js/ui/display.js'
import { db } from './js/firebase.js'

const globals = new GlobalVariableContainer()
const display = new Display()
const library = new Library()
//TODO Authentication
//TODO Kann man meine Bücher-ID-Übergabe optimieren?

async function initializeApp() {
	const lib = await library.loadDB(db)
	display.resetDOMLibrary()
	display.renderAll(lib)
}
initializeApp()

console.log(globals.closeModalButton)

let testBook = new Book(1, 'mein Titel', 'Pandau', 123, true)
console.log(testBook.book)
