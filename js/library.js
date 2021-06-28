export async function loadDB() {
	const snapshot = await db.collection('library').get()
	const dbLibrary = snapshot.docs.reduce((library, doc) => {
		//format array by adding firestore id as property
		library.push({
			id: doc.id,
			...doc.data(),
		})
		return library
	}, [])
	return dbLibrary.sort((a, b) => {
		if (a.title < b.title) return -1
		if (b.title < a.title) return 1
		return 0
	})
}

export async function add(title, author, pages, read = false) {
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
