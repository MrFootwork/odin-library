export function renderAll(books) {
	books.forEach(book => render(book))
}

export function resetDOMLibrary() {
	while (library.lastElementChild) {
		library.removeChild(library.lastElementChild)
	}
}
