export default class Book {
	constructor(db, id, title, author, pages, read) {
		this.id = id
		this.title = title
		this.author = author
		this.pages = pages
		this.read = read
		this.dbBook = db.collection('library').doc(bookId)
	}

	get book() {
		return this
	}

	updateRead(bookId, readState) {
		db.collection('library').doc(bookId).update({ read: readState })
	}

	update(bookId, bookInfo) {
		db.collection('library').doc(bookId).update({
			title: bookInfo.title,
			author: bookInfo.author,
			pages: bookInfo.pages,
			read: bookInfo.read,
		})
	}

	addListener() {
		library.addEventListener('click', e => {
			const bookId = e.target.dataset.book
			const lib = globals.snapshotLibrary
			const bookIndex = lib.findIndex(book => book.id === bookId)
			const elementClass = e.target.classList[0]

			if (elementClass === 'editButton') {
				if (bookId) {
					globals.activeBookId = bookId
					globals.newBook = false
					globals.title.value = lib[bookIndex].title
					globals.author.value = lib[bookIndex].author
					globals.pages.value = lib[bookIndex].pages
					globals.read.checked = lib[bookIndex].read
					globals.submitButton.innerText = 'Buch ändern'
					globals.modal.style.display = 'block'
				}
			}

			if (elementClass === 'deleteButton') {
				if (bookId) bookTools.remove(bookId)
			}

			if (elementClass === 'checkboxRead') {
				const readState = e.target.checked
				if (bookId) {
					bookTools.updateRead(bookId, readState)
					lib[bookIndex].read = readState
				}
			}
		})
	}
}
