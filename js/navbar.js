export default class Navbar {
	constructor(form) {
		this.form = form
		this.openModalButton = document.getElementById('modalButton')
		this.openModalButton.onclick = this.showModal
	}

	showModal = e => {
		this.form.showModal(e)
	}
}
