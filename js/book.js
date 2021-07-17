import { db } from './firebase.js'
import Form from './form.js'

export default class Book {
	constructor({ title, author, pages, read, id = null, library }) {
		this.title = title
		this.author = author
		this.pages = pages
		this.read = read

		this.id = id ? id : this.createBookId()

		this.library = library
		this.form = new Form(this.library)
	}

	// DOM-Elements set by render()
	bookCardDOM
	titleDOM
	authorDOM
	pagesDOM
	checkboxDOM

	async createBookId() {
		const bookToAdd = {
			title: this.title,
			author: this.author,
			pages: this.pages,
			read: this.read,
		}

		//firebase returns id
		const docRef = await db.collection('library').add(bookToAdd)
		return await docRef.id
	}

	#editBook = () => {
		editMode = true
		this.form.showModal(this)
	}

	#deleteBook = () => {
		db.collection('library').doc(this.id).delete()
		this.library.remove(this)
		this.bookCard.remove()
	}

	#toggleRead = () => {
		this.read = !this.read
		db.collection('library').doc(this.id).update({ read: this.read })
	}

	update(bookData) {
		this.titleDOM.innerHTML = bookData.title
		this.authorDOM.innerHTML = bookData.author
		this.pagesDOM.innerHTML = bookData.pages
		this.checkboxDOM.checked = bookData.read
	}

	render() {
		const bookCard = document.createElement('div')
		this.bookCardDOM = bookCard
		bookCard.classList.add('book')
		bookCard.id = this.id
		this.library.libraryDOM.appendChild(bookCard)

		const textRow = document.createElement('div')
		textRow.classList.add('textRow')
		bookCard.appendChild(textRow)

		const title = document.createElement('h2')
		const author = document.createElement('h3')
		const pages = document.createElement('h3')
		this.titleDOM = title
		this.authorDOM = author
		this.pagesDOM = pages
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
		this.checkboxDOM = checkbox
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
