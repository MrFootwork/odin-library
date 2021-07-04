'use strict'
import GlobalVariableContainer from './js/global.js'
import { db } from './js/firebase.js'
import Display from './js/ui/display.js'
import Form from './js/ui/form.js'
import Library from './js/library.js'
import Book from './js/book.js'

const globals = new GlobalVariableContainer()
const display = new Display()
const library = new Library(db)
const form = new Form(library)
//TODO Authentication
//TODO Kann man meine Bücher-ID-Übergabe optimieren?

async function initializeApp() {
	const lib = await library.loadDB(db)
	display.resetDOMLibrary()
	display.renderAll(lib)
	form.setModalListeners()
}
initializeApp()
