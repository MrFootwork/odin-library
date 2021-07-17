'use strict'
import Navbar from './js/navbar.js'
import Form from './js/form.js'
import Library from './js/library.js'

async function initializeApp() {
	const library = new Library()
	const form = new Form(library)
	library.form = form
	const navbar = new Navbar(form)
}
initializeApp()

//TODO Authentication
