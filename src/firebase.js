import firebase from 'firebase/app';

import 'firebase/firestore';

export default firebase.initializeApp({
  apiKey: 'AIzaSyCTyxZyDWVmSaJOLUDFZG5OlzoUW4MEH1o',
  authDomain: 'table-soccer-legends.firebaseapp.com',
  databaseURL: 'https://table-soccer-legends.firebaseio.com',
  projectId: 'table-soccer-legends',
  storageBucket: 'table-soccer-legends.appspot.com',
  messagingSenderId: '225126533819'
});
