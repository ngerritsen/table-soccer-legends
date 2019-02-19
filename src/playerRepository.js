(() => {
  const { getDocsWithIds } = window.utils;

  function getPlayers() {
    return firebase.firestore()
      .collection('players')
      .orderBy('name')
      .get()
      .then(getDocsWithIds);
  }

  window.playerRepository = {
    getPlayers
  };
})();
