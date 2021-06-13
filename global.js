export default class {
	constructor() {
		//Data
		this.snapshotLibrary = []

		//HTML elements
		this.library = document.getElementById('library')

		this.form = document.getElementById('form')
		this.title = document.getElementById('title')
		this.author = document.getElementById('author')
		this.pages = document.getElementById('pages')
		this.read = document.getElementById('read')

		this.modal = document.getElementById('myModal')
		this.modalButton = document.getElementById('modalButton')
		this.closeModalButton = document.getElementsByClassName('close')[0]
	}
}
