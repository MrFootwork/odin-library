import { db } from './firebase.js'

export default class Book {
	constructor(id, title, author, pages, read) {}

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

	remove(bookId) {
		db.collection('library').doc(bookId).delete()
		document.getElementById(bookId).remove()
	}

	render(book) {
		const bookCard = document.createElement('div')
		bookCard.classList.add('book')
		bookCard.id = book.id
		library.appendChild(bookCard)

		const textRow = document.createElement('div')
		textRow.classList.add('textRow')
		bookCard.appendChild(textRow)

		const title = document.createElement('h2')
		const author = document.createElement('h3')
		const pages = document.createElement('h3')
		title.innerHTML = `${book.title}`
		author.innerHTML = `written by ${book.author}`
		pages.innerHTML = `${book.pages} pages`
		textRow.appendChild(title)
		textRow.appendChild(author)
		textRow.appendChild(pages)

		const buttonRow = document.createElement('div')
		buttonRow.classList.add('buttonRow')
		bookCard.appendChild(buttonRow)

		const editButton = document.createElement('button')
		editButton.dataset.book = book.id
		editButton.classList.add('editButton')
		buttonRow.appendChild(editButton)

		const toggleSwitch = document.createElement('label')
		toggleSwitch.classList.add('switch')
		buttonRow.appendChild(toggleSwitch)

		const checkbox = document.createElement('input')
		checkbox.classList.add('checkboxRead')
		checkbox.type = 'checkbox'
		checkbox.checked = book.read
		checkbox.dataset.book = book.id
		toggleSwitch.appendChild(checkbox)

		const slider = document.createElement('span')
		slider.classList.add('slider')
		toggleSwitch.appendChild(slider)

		const deleteButton = document.createElement('button')
		deleteButton.dataset.book = book.id
		deleteButton.classList.add('deleteButton')
		buttonRow.appendChild(deleteButton)
	}
}
