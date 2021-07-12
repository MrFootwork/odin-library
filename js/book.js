export default class Book {
	constructor({ title, author, pages, read, id = null, library }) {
		this.title = title
		this.author = author
		this.pages = pages
		this.read = read

		this.id = id ? id : this.createId()

		this.library = library
	}

	bookCard

	createId() {
		return '_' + Math.random().toString(36).substr(2, 9)
	}

	get book() {
		return this
	}

	//template
	updateRead(bookId, readState) {
		db.collection('library').doc(bookId).update({ read: readState })
	}

	//template
	update(bookId, bookInfo) {
		db.collection('library').doc(bookId).update({
			title: bookInfo.title,
			author: bookInfo.author,
			pages: bookInfo.pages,
			read: bookInfo.read,
		})
	}

	//template
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

			if (elementClass === 'checkboxRead') {
				const readState = e.target.checked
				if (bookId) {
					bookTools.updateRead(bookId, readState)
					lib[bookIndex].read = readState
				}
			}
		})
	}

	#editBook = e => {
		console.log('want to edit?', this.id)
		console.log(e.target)
	}

	#deleteBook = () => {
		// this.library.remove(this)
		this.library.test()
		console.log(libraryTEST)
		console.log('global: ', global)
	}

	#toggleRead = e => {
		console.log('want to toggle?', this.id)
		console.log(e.target)
	}

	render() {
		const bookCard = document.createElement('div')
		this.bookCard = bookCard
		bookCard.classList.add('book')
		bookCard.id = this.id
		this.library.libraryDOM.appendChild(bookCard)

		const textRow = document.createElement('div')
		textRow.classList.add('textRow')
		bookCard.appendChild(textRow)

		const title = document.createElement('h2')
		const author = document.createElement('h3')
		const pages = document.createElement('h3')
		title.innerHTML = `${this.title}`
		author.innerHTML = `written by ${this.author}`
		pages.innerHTML = `${this.pages} pages`
		textRow.appendChild(title)
		textRow.appendChild(author)
		textRow.appendChild(pages)

		const buttonRow = document.createElement('div')
		buttonRow.classList.add('buttonRow')
		bookCard.appendChild(buttonRow)

		const editButton = document.createElement('button')
		editButton.dataset.book = this.id
		editButton.classList.add('editButton')
		editButton.onclick = this.#editBook
		buttonRow.appendChild(editButton)

		const toggleSwitch = document.createElement('label')
		toggleSwitch.classList.add('switch')
		buttonRow.appendChild(toggleSwitch)

		const checkbox = document.createElement('input')
		checkbox.classList.add('checkboxRead')
		checkbox.type = 'checkbox'
		checkbox.checked = this.read
		checkbox.dataset.book = this.id
		checkbox.onchange = this.#toggleRead
		toggleSwitch.appendChild(checkbox)

		const slider = document.createElement('span')
		slider.classList.add('slider')
		toggleSwitch.appendChild(slider)

		const deleteButton = document.createElement('button')
		deleteButton.dataset.book = this.id
		deleteButton.classList.add('deleteButton')
		deleteButton.onclick = this.#deleteBook
		buttonRow.appendChild(deleteButton)
	}
}
