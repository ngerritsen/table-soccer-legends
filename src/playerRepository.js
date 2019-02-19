import firebase from './firebase';
import { getDocsWithIds } from './utils';

export function getPlayers() {
  return firebase.firestore()
    .collection('players')
    .orderBy('name')
    .get()
    .then(getDocsWithIds);
}
