'use strict'
import Navbar from './js/navbar.js'
import Form from './js/form.js'
import Library from './js/library.js'

var activeBookId = null
var libraryTEST = null
var global = 'globaler Test'

async function initializeApp() {
	libraryTEST = new Library()
	const form = new Form(libraryTEST)
	const navbar = new Navbar(form)

	console.log(libraryTEST.allBooks)
}
initializeApp()

//TODO Authentication
//TODO Kann man meine Bücher-ID-Übergabe optimieren?
