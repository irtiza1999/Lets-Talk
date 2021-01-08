import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAD1sgRRJKnLd8ztVRVPgLsbMOICLwTH1s',
  authDomain: 'let-s-talk-ishad.firebaseapp.com',
  projectId: 'let-s-talk-ishad',
  storageBucket: 'let-s-talk-ishad.appspot.com',
  messagingSenderId: '310064979629',
  appId: '1:310064979629:web:e3e8f91ea03a48b1457024',
}
const firebaseApp = firebase.initializeApp(firebaseConfig)
const fireDb = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default fireDb
