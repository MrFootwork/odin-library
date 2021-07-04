export default class Library {
	constructor(database) {
		this.database = database
		this.librarySnapshot = []
	}

	async loadDB() {
		const snapshot = await this.database.collection('library').get()
		const dbLibrary = this.#processSnapshot(snapshot)
		this.librarySnapshot = this.#sortBooks(dbLibrary)
		return this.librarySnapshot
	}

	#processSnapshot(snapshot) {
		return snapshot.docs.reduce((library, doc) => {
			library.push({
				id: doc.id,
				...doc.data(),
			})
			return library
		}, [])
	}

	#sortBooks(dbLibrary) {
		return dbLibrary.sort((a, b) => {
			if (a.title < b.title) return -1
			if (a.title > b.title) return 1
			return 0
		})
	}

	async add(title, author, pages, read = false) {
		this.database.collection('library').add({
			title,
			author,
			pages,
			read,
		})
		// const library = await loadDB()
		// resetDOMLibrary()
		// renderAll(library)

		//TODO kurzes Highlighting des neu hinzugefügten Buches
	}

	remove(bookId) {
		db.collection('library').doc(bookId).delete()
		document.getElementById(bookId).remove()
	}
}
