/*################################
#   Event Listener
################################*/
form.addEventListener('submit', formHandler)
function formHandler(e) {
	e.preventDefault()
	let thisTitle = title.value
	let thisAuthor = author.value
	let thisPages = pages.value
	let thisRead = read.checked

	const inputsAreValid = validateInput(thisTitle, thisAuthor, thisPages)
	if (!inputsAreValid) {
		// TODO Error-Handler
		throw new Error('Eingabe enthält Fehler!')
	}
	if (globals.newBook) {
		bookTools.add(thisTitle, thisAuthor, thisPages, thisRead)
	} else {
		bookTools.update(globals.activeBookId, {
			//TODO Update rendert verzögert...
			title: thisTitle,
			author: thisAuthor,
			pages: thisPages,
			read: thisRead,
		})
		globals.newBook = true
	}

	globals.modal.style.display = 'none'
	title.value = ''
	author.value = ''
	pages.value = ''
	read.checked = false
	globals.submitButton.innerText = 'Buch speichern'
	globals.activeBookId = null
	initializeApp()
}

/*################################
#   Modal
################################*/
globals.modalButton.onclick = function () {
	globals.modal.style.display = 'block'
}
globals.closeModalButton.onclick = function () {
	globals.modal.style.display = 'none'
}
window.onclick = function (event) {
	if (event.target === globals.modal) {
		globals.modal.style.display = 'none'
	}
}

/*################################
#   Validation
################################*/

function validateInput(title, author, pages) {
	const titleIsValid = /\w+/.test(title)
	const authorIsValid = /\w+/.test(author)
	const pagesIsValid = /\d+/.test(pages)
	console.log('titleIsValid: ', titleIsValid)
	console.log('authorIsValid: ', authorIsValid)
	console.log('pagesIsValid: ', pagesIsValid)
	return titleIsValid && authorIsValid && pagesIsValid
}
