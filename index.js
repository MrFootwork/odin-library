import GlobalVariableContainer from './global.js'
import * as bookTools from './book.js'

const globals = new GlobalVariableContainer()
//TODO Authentication
//TODO Kann man meine Bücher-ID-Übergabe optimieren?

async function initializeApp() {
	globals.snapshotLibrary = await bookTools.loadDB()
	bookTools.resetDOMLibrary()
	bookTools.renderAll(globals.snapshotLibrary)
}
initializeApp()
