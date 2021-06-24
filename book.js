import { db } from './firebase.js'

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

export function updateRead(bookId, readState) {
	db.collection('library').doc(bookId).update({ read: readState })
}

export async function update(bookId, bookInfo) {
	db.collection('library').doc(bookId).update({
		title: bookInfo.title,
		author: bookInfo.author,
		pages: bookInfo.pages,
		read: bookInfo.read,
	})
}

export function remove(bookId) {
	db.collection('library').doc(bookId).delete()
	document.getElementById(bookId).remove()
}

export function render(book) {
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

	//Trying to style the svg via CSS doesn't work
	//so for now I load the image as background in .deleteButton
	// const deleteIcon = document.createElement('img')
	// deleteIcon.classList.add('deleteIcon')
	// deleteIcon.src = './images/trash-outline.svg'
	// deleteButton.appendChild(deleteIcon)
}

export function renderAll(books) {
	books.forEach(book => render(book))
}

export function resetDOMLibrary() {
	while (library.lastElementChild) {
		library.removeChild(library.lastElementChild)
	}
}
