import ranks, { MIN_RATING, STEP_SIZE } from '../constants/ranks';

export function getRank(rating) {
  const rawRank = (rating - MIN_RATING) / STEP_SIZE;

  return Math.round(Math.max(0, Math.min(rawRank, ranks.length - 1)));
}

export function getRanksWithRatings() {
  return ranks.map((rank, index) => ({
    ...rank,
    from: MIN_RATING + STEP_SIZE * index,
    to: MIN_RATING + STEP_SIZE * (index + 1) - 1
  }));
}
