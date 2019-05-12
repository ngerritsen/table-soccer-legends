import ranks, { MIN_RATING, STEP_SIZE } from '../constants/ranks';

export function getRank(rating, wins, losses) {
  if (wins + losses === 0) {
    return 0;
  }
  const rawRank = (rating - MIN_RATING) / STEP_SIZE;

  return Math.round(Math.max(0, Math.min(rawRank, ranks.length - 1)));
}

export function getRanksWithRatings() {
  return ranks.map((rank, index) => {
    if (index === 0) {
      return rank;
    }

    return {
      ...rank,
      from: MIN_RATING + STEP_SIZE * (index - 1),
      to: MIN_RATING + STEP_SIZE * index - 1
    };
  });
}
