import { db } from './firebase.js'
import Book from './book.js'

export default class Library {
	constructor() {
		this.snapshot = []
		this.allBooks = []

		this.libraryDOM.onclick = this.init()
	}

	// DOM-elements
	libraryDOM = document.getElementById('library')

	async init() {
		this.snapshot = await db.collection('library').get()
		const libraryJSON = this.#makeJSON(this.snapshot)
		const dbBookList = this.#sortBooks(libraryJSON)
		this.allBooks = dbBookList.map(dbBook => this.#createBookFromDB(dbBook))
		console.log('allBooks: ', this.allBooks)
	}

	get books() {
		return this.allBooks
	}

	#makeJSON(snapshot) {
		return snapshot.docs.reduce((library, doc) => {
			library.push({
				id: doc.id,
				...doc.data(),
			})
			return library
		}, [])
	}

	#sortBooks(libraryJSON) {
		return libraryJSON.sort((a, b) => {
			if (a.title < b.title) return -1
			if (a.title > b.title) return 1
			return 0
		})
	}

	#createBookFromDB(dbBook) {
		const bookToAdd = { ...dbBook, library: this }
		const newBook = new Book(bookToAdd)
		newBook.render()
		return newBook
	}

	add(book) {
		this.allBooks.push(book)
	}

	remove(bookToDelete) {
		this.allBooks = this.allBooks.filter(book => book.id !== bookToDelete.id)
	}

	update(bookToUpdateId, newEntry) {
		const index = this.allBooks.findIndex(book => book.id === bookToUpdateId)
		const bookToChange = this.allBooks[index]
		bookToChange.title = newEntry.title
		bookToChange.author = newEntry.author
		bookToChange.pages = newEntry.pages
		bookToChange.read = newEntry.read
	}

	allBooksRemove() {
		this.allBooks.forEach(book => {
			book.bookCardDOM.remove()
		})
	}

	allBooksRender() {
		this.allBooks.forEach(book => {
			book.render()
		})
	}

	// use carefully! This also deletes the collection
	async resetLibrary() {
		let lastChild = this.allBooks.length - 1
		while (this.allBooks[lastChild]) {
			this.libraryDOM.removeChild(this.libraryDOM.lastElementChild)
			this.allBooks.splice(lastChild)
			await db
				.collection('library')
				.doc(this.dbBookIDs[lastChild--])
				.delete()
		}
	}
}
