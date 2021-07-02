export default class Display {
	renderAll(books) {
		books.forEach(book => this.render(book))
	}

	resetDOMLibrary() {
		while (library.lastElementChild) {
			library.removeChild(library.lastElementChild)
		}
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
