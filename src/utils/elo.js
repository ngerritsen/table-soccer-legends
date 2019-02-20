const MAGIC = 400;

export function getNewRating(score, rating, opponentRating) {
  const expectedScore = getExpectedScore(rating, opponentRating);

  return Math.round(rating + getKFactor(rating) * (score - expectedScore));
}

function getExpectedScore(rating, opponentRating) {
  const tRating = getNormalizedRating(rating);
  const rOpponentRating = getNormalizedRating(opponentRating);

  return tRating / (tRating + rOpponentRating);
}

function getNormalizedRating(rating) {
  return Math.pow(10, rating / MAGIC);
}

function getKFactor(rating) {
  if (rating <= 2100) {
    return 32;
  }

  if (2100 < rating && rating <= 2400) {
    return 24;
  }

  if (2400 < rating) {
    return 16;
  }
}
