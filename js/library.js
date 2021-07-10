import { db } from './firebase.js'
import Book from './book.js'

export default class Library {
	constructor() {
		this.database = db
		this.allBooks = []
		this.dbBookIDs = []
		this.libraryDOM = document.getElementById('library')
		this.init()
	}

	get books() {
		return this.allBooks
	}

	async init() {
		const snapshot = await this.database.collection('library').get()
		const libraryJSON = this.#makeJSON(snapshot)
		const dbBookList = this.#sortBooks(libraryJSON)
		this.dbBookIDs = this.#createIdList(snapshot)
		this.allBooks = dbBookList.map(dbBook => new Book(dbBook))
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

	#createIdList(snapshot) {
		return snapshot.docs.reduce((idList, doc) => {
			idList.push(doc.id)
			return idList
		}, [])
	}

	add(book) {
		const dbBook = {
			id: book.id,
			title: book.title,
			author: book.author,
			pages: book.pages,
			read: book.read,
		}
		this.#addBookToDB(dbBook)
		this.#addBookToList(book)
	}

	#addBookToDB(book) {
		return this.database.collection('library').add(book)
	}

	#addBookToList(book) {
		this.allBooks.push(book)
	}

	remove(bookId) {
		db.collection('library').doc(bookId).delete()
		document.getElementById(bookId).remove()
	}

	renderAll(librarySnapshot) {
		librarySnapshot.forEach(book => {
			console.log(book)
			// book.render()
		})
	}

	async resetLibrary() {
		let lastChild = this.allBooks.length - 1
		while (this.allBooks[lastChild]) {
			this.libraryDOM.removeChild(this.libraryDOM.lastElementChild)
			this.allBooks.splice(lastChild)
			await this.database
				.collection('library')
				.doc(this.dbBookIDs[lastChild--])
				.delete()
		}
	}
}
