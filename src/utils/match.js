import { getPlayerNames } from './players';
import { numericObjectToArray } from './general';

export function parseMatchInput(matchInput) {
  const teams = numericObjectToArray(matchInput.teams).filter(
    players => players.length === 2
  );

  const rounds = numericObjectToArray(matchInput.rounds)
    .map(scores => scores.filter(Boolean))
    .filter(scores => scores.length === 2)
    .map(scores => scores.map(Number));

  return { rounds, teams };
}

export function getMatchHistory(matches, players) {
  return matches.map(match => ({
    ...match,
    teams: match.teams.map(playerIds => getPlayerNames(players, playerIds)),
    result: getResult(match)
  }));
}

export function getResult(match) {
  return match.rounds.reduce(
    ([roundWins1, roundWins2], [score1, score2]) => {
      if (score1 > score2) {
        return [roundWins1 + 1, roundWins2];
      }

      if (score1 < score2) {
        return [roundWins1, roundWins2 + 1];
      }

      return [roundWins1, roundWins2];
    },
    [0, 0]
  );
}
