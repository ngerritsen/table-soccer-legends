import firebase from './firebase';
import { numericObjectToArray, arrayToNumericObject, getDocsWithIds } from './utils';

export function saveMatch(match) {
  return firebase.firestore()
    .collection('matches')
    .add(prepareMatchForStorage(match));
}

export function getMatches(players) {
  return firebase.firestore()
    .collection('matches')
    .orderBy('date', 'desc')
    .get()
    .then(getDocsWithIds)
    .then(matches => matches.map(storedMatch => parseStoredMatch(storedMatch, players)));
}

function parseStoredMatch(storedMatch, players) {
  return {
    id: storedMatch.id,
    date: storedMatch.date.toDate(),
    teams: numericObjectToArray(storedMatch.teams)
      .map(playerIds => playerIds
        .map(id =>
          players.find(player => player.id === id)
        )
      ),
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
