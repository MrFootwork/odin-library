import { db } from './firebase.js'
import Book from './book.js'

export default class Library {
	constructor() {
		this.snapshot = []
		this.allBooks = []

		this.libraryDOM = document.getElementById('library')
		this.libraryDOM.onclick = this.init()
	}

	get books() {
		return this.allBooks
	}

	async init() {
		this.snapshot = await db.collection('library').get()
		const libraryJSON = this.#makeJSON(this.snapshot)
		const dbBookList = this.#sortBooks(libraryJSON)
		this.allBooks = dbBookList.map(dbBook => this.#createBookFromDB(dbBook))
		console.log('snapshot: ', this.snapshot)
		console.log('allBooks: ', this.allBooks)
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
		this.allBooks[index] = {
			...this.allBooks[index],
			title: newEntry.title,
			author: newEntry.author,
			pages: newEntry.pages,
			read: newEntry.read,
		}
	}

	renderAll(librarySnapshot) {
		librarySnapshot.forEach(book => {
			console.log(book)
			// book.render()
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
