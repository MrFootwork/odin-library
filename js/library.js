export default class Library {
	constructor(database, displayController) {
		this.database = database
		this.display = displayController
		this.librarySnapshot = []
	}

	async loadDB() {
		const snapshot = await this.database.collection('library').get()
		const libraryJSON = this.#makeJSON(snapshot)
		this.librarySnapshot = this.#sortBooks(libraryJSON)
		return this.librarySnapshot
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

	async add(title, author, pages, read = false) {
		let docRef = await this.#addBookToDB(title, author, pages, read)
		let id = docRef.id
		const newBook = this.#addBookToSnapshot(id, title, author, pages, read)
		this.display.render(newBook)

		//TODO kurzes Highlighting des neu hinzugefügten Buches
	}

	#addBookToDB(title, author, pages, read) {
		return this.database.collection('library').add({
			title,
			author,
			pages,
			read,
		})
	}

	#addBookToSnapshot(id, title, author, pages, read) {
		const book = {
			id,
			title,
			author,
			pages,
			read,
		}
		this.librarySnapshot.push(book)
		return book
	}

	remove(bookId) {
		db.collection('library').doc(bookId).delete()
		document.getElementById(bookId).remove()
	}
}
