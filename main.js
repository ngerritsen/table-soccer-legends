const app = new Vue({
  el: '#app',
  created() {
    initFirebase();
    getPlayers();
  },
  data: {
    message: 'Hello Vue!'
  }
});

function initFirebase() {
  firebase.initializeApp({
    apiKey: 'AIzaSyCTyxZyDWVmSaJOLUDFZG5OlzoUW4MEH1o',
    authDomain: 'table-soccer-legends.firebaseapp.com',
    databaseURL: 'https://table-soccer-legends.firebaseio.com',
    projectId: 'table-soccer-legends',
    storageBucket: 'table-soccer-legends.appspot.com',
    messagingSenderId: '225126533819'
  });
}

function getPlayers() {
  firebase.database()
    .ref('players')
    .orderByKey()
    .once('value')
    .then(console.log);
}
