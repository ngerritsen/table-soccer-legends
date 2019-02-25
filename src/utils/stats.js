import { getResult } from './match';
import { getNewRating } from './elo';
import { getRank } from './rank';
import { getPlayersWithIds, updatePlayer } from './players';
import { getSortByFunc } from './general';

import { START_RATING } from '../constants/rating';

export function getPlayersWithStats(matches, players) {
  return matches
    .reduce((playersWithStats, match) => {
      const matchResult = getRelativeResult(getResult(match));

      return match.teams.reduce((newPlayersWithStats, playerIds, teamId) => {
        const score = matchResult[teamId];
        const opposingPlayerIds = match.teams[getOpposingTeamId(teamId)];
        const opposingPlayersWithOriginalStats = getPlayersWithIds(
          playersWithStats,
          opposingPlayerIds
        );
        const currentPlayersWithStats = getPlayersWithIds(
          playersWithStats,
          playerIds
        );
        const opposingPlayerAverageRating = getAveragePlayerRating(
          opposingPlayersWithOriginalStats
        );

        return updateStatsForTeam(
          newPlayersWithStats,
          currentPlayersWithStats,
          opposingPlayerAverageRating,
          score
        );
      }, playersWithStats);
    }, decoratePlayersWithStats(players))
    .map(player => ({
      ...player,
      rank: getRank(player.rating, player.wins, player.losses)
    }))
    .sort(getSortByFunc('rating'));
}

function getRelativeResult(result) {
  const [score1, score2] = result;
  const totalScore = score1 + score2;

  return [score1 / totalScore, score2 / totalScore];
}

function updateStatsForTeam(
  playersWithStats,
  currentPlayersWithStats,
  opposingPlayerAverageRating,
  score
) {
  return currentPlayersWithStats.reduce((newPlayerStats, player) => {
    const newRating = getNewRating(
      score,
      player.rating,
      opposingPlayerAverageRating
    );

    return updatePlayerStats(newPlayerStats, player.id, newRating, score);
  }, playersWithStats);
}

function getAveragePlayerRating(players) {
  const totalRating = players.reduce(
    (totalRating, player) => totalRating + player.rating,
    0
  );

  return totalRating / players.length;
}

function getOpposingTeamId(teamId) {
  return -1 * (teamId - 1);
}

function updatePlayerStats(players, id, rating, score) {
  return updatePlayer(players, id, player => ({
    ...player,
    rating,
    wins: incrementIf(player.wins, score > 0.5),
    losses: incrementIf(player.losses, score < 0.5)
  }));
}

function incrementIf(value, boolean) {
  return boolean ? value + 1 : value;
}

function decoratePlayersWithStats(players) {
  return players.map(player => ({
    ...player,
    wins: 0,
    losses: 0,
    rating: START_RATING
  }));
}
