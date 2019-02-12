const app = new Vue({
  el: '#app',
  created() {
    initFirebase();
    getPlayers()
      .then(players => {
        this.players = players;
      });
  },
  data: {
    players: []
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
  return firebase.firestore()
    .collection('players')
    .get()
    .then((querySnapshot) => {
      const docs = [];

      querySnapshot.forEach(doc => {
        docs.push(Object.assign(doc.data(), {
          id: doc.id
        }))
      });

      return docs;
    });
}
