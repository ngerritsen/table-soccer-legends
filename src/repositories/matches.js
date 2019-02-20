import firebase from '../firebase';
import { numericObjectToArray, arrayToNumericObject } from '../utils/general';
import { getDocsWithIds } from '../utils/firebase';

export function saveMatch(match) {
  return firebase
    .firestore()
    .collection('matches')
    .add(prepareMatchForStorage(match));
}

export function getMatches() {
  return firebase
    .firestore()
    .collection('matches')
    .orderBy('date', 'desc')
    .get()
    .then(getDocsWithIds)
    .then(matches => matches.map(storedMatch => parseStoredMatch(storedMatch)));
}

function parseStoredMatch(storedMatch) {
  return {
    id: storedMatch.id,
    date: storedMatch.date.toDate(),
    teams: numericObjectToArray(storedMatch.teams),
    rounds: numericObjectToArray(storedMatch.rounds)
  };
}

function prepareMatchForStorage(match) {
  return {
    date: new Date(),
    teams: arrayToNumericObject(match.teams),
    rounds: arrayToNumericObject(match.rounds)
  };
}
