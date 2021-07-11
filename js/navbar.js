export default class Navbar {
	constructor(form) {
		this.form = form
		this.openModalButton = document.getElementById('modalButton')
		this.openModalButton.onclick = this.form.showModal
	}
}
