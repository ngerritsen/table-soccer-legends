import ranks from '../ranks';

const STEP_SIZE = 25;
const MIN_RATING = 1850;

export function getRank(rating) {
  const rawRank = (rating - MIN_RATING) / STEP_SIZE;

  return Math.round(Math.max(0, Math.min(rawRank, ranks.length - 1)));
}
