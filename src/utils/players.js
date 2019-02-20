export function getPlayersWithIds(players, playerIds) {
  return players.filter(player => playerIds.includes(player.id));
}

export function getPlayerNames(players, playerIds) {
  return playerIds.map(id => getPlayerName(players, id));
}

export function updatePlayer(players, id, func) {
  return players.map(player => {
    if (player.id !== id) {
      return player;
    }

    return func(player);
  });
}

function getPlayerName(players, id) {
  const player = players.find(player => player.id === id);

  return player ? player.name : 'Unknown';
}
