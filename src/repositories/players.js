import app from '../firebase';
import { getDocsWithIds } from '../utils/firebase';

export function getPlayers() {
  return app
    .firestore()
    .collection('players')
    .orderBy('name')
    .get()
    .then(getDocsWithIds);
}

export function savePlayer(name) {
  return app
    .firestore()
    .collection('players')
    .add({ name, added: Date.now() });
}
