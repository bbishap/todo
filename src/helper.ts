import firebase from 'firebase'
require('firebase/firestore');

firebase.initializeApp({
  apiKey: 'AIzaSyA1gLjvGJUWI0GjRm3wlQbIKRrO-nz0DB4',
  authDomain: 'mytodo-448e9.firebaseapp.com',
  projectId: 'mytodo-448e9'

})

let db = firebase.firestore();


export default db