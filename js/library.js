import { db } from './firebase.js'
import Book from './book.js'

export default class Library {
	constructor() {
		this.allBooks = []
		this.dbBookIDs = []
		this.libraryDOM = document.getElementById('library')
		this.libraryDOM.onclick = this.init()
	}

	test() {
		console.log('test')
	}

	get books() {
		return this.allBooks
	}

	async init() {
		const snapshot = await db.collection('library').get()
		const libraryJSON = this.#makeJSON(snapshot)
		const dbBookList = this.#sortBooks(libraryJSON)
		this.dbBookIDs = this.#createIdList(snapshot)
		this.allBooks = dbBookList.map(dbBook => this.#createBookFromDB(dbBook))
		console.log('allBooks: ', this.allBooks)
		console.log('dbBookIDs: ', this.dbBookIDs)
		console.log(this.allBooks[1].bookCard)
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
		return libraryJSON
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

	#createBookFromDB(dbBook) {
		const bookToAdd = { ...dbBook, library: this }
		const newBook = new Book(bookToAdd)
		newBook.render()
		return newBook
	}

	add(book) {
		const dbBook = {
			id: book.id,
			title: book.title,
			author: book.author,
			pages: book.pages,
			read: book.read,
		}
		const addBookReturn = this.#addBookToDB(dbBook)
		addBookReturn.then(docRef => console.log(docRef.id))
		this.#addBookToList(book)
	}

	#addBookToDB(book) {
		return db.collection('library').add(book)
	}

	#addBookToList(book) {
		this.allBooks.push(book)
	}

	remove(bookToDelete) {
		const bookIndex = this.allBooks.findIndex(book => bookToDelete == book)
		const dbBookId = this.dbBookIDs[bookIndex]
		db.collection('library').doc(dbBookId).delete()
		bookToDelete.bookCard.remove()
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
			await db
				.collection('library')
				.doc(this.dbBookIDs[lastChild--])
				.delete()
		}
	}
}
