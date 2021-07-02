import GlobalVariableContainer from './global.js'
import Book from './js/book.js'

const globals = new GlobalVariableContainer()
new Book(1, 'mein Titel', 'Pandau', 123, true)
//TODO Authentication
//TODO Kann man meine Bücher-ID-Übergabe optimieren?

async(function initializeApp() {
	globals.snapshotLibrary = await bookTools.loadDB()
	bookTools.resetDOMLibrary()
	bookTools.renderAll(globals.snapshotLibrary)
})()
