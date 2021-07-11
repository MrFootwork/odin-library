'use strict'
import Navbar from './js/navbar.js'
import Form from './js/form.js'
import Library from './js/library.js'

var activeBookId = null

async function initializeApp() {
	const library = new Library()
	const form = new Form(library)
	const navbar = new Navbar(form)

	console.log(library.allBooks)
}
initializeApp()

//TODO Authentication
//TODO Kann man meine Bücher-ID-Übergabe optimieren?
