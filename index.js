'use strict'
import Navbar from './js/navbar.js'
import Form from './js/form.js'
import Library from './js/library.js'
import Book from './js/book.js'

const library = new Library()
const form = new Form(library)
const navbar = new Navbar(form)

//TODO Authentication
//TODO Kann man meine Bücher-ID-Übergabe optimieren?

var activeBookId = null

const beispielBuch = new Book('testBuch', 'Pandau', 555, false)

// library.add(beispielBuch)
console.log(library.books)
