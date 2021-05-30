// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: 'AIzaSyDJV_BSGZcTDMHriwqihtTSoNxitevkoO0',
	authDomain: 'the-odin-project-library-91e50.firebaseapp.com',
	projectId: 'the-odin-project-library-91e50',
	storageBucket: 'the-odin-project-library-91e50.appspot.com',
	messagingSenderId: '572851761208',
	appId: '1:572851761208:web:7fd719d304747f419cf6cd',
	measurementId: 'G-RVM02W4J3M',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
//without this, we get errors in the console
db.settings({ timestampsInSnapshots: true })
