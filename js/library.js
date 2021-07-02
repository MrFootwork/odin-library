export default class Library {
	constructor() {
		var snapshotLibrary = []
	}

	async loadDB(db) {
		const snapshot = await db.collection('library').get()
		const dbLibrary = snapshot.docs.reduce((library, doc) => {
			library.push({
				id: doc.id,
				...doc.data(),
			})
			return library
		}, [])
		this.snapshotLibrary = dbLibrary.sort((a, b) => {
			if (a.title < b.title) return -1
			if (a.title > b.title) return 1
			return 0
		})
		return this.snapshotLibrary
	}

	async add(title, author, pages, read = false) {
		db.collection('library').add({
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
