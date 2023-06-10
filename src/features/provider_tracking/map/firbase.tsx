import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
export const firebaseConfig = {
  apiKey: 'AIzaSyBds-2Ga5ABWjpBEBuB3gZXX0Hbc_JyxJg',
  authDomain: 'dashboard-f1c0d.firebaseapp.com',
  databaseURL: 'https://dashboard-f1c0d-default-rtdb.firebaseio.com',
  projectId: 'dashboard-f1c0d',
  storageBucket: 'dashboard-f1c0d.appspot.com',
  messagingSenderId: '601837731552',
  appId: '1:601837731552:web:4763027b90e36cf3285a85',
  measurementId: 'G-CYVBNYFVRD',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export { firebase }
