import { unique, flattenArray } from './utils/general';

export function validateMatch(match) {
  const errors = [];

  if (unique(flattenArray(match.teams)).length !== 4) {
    errors.push('Teams are not complete, select 2 unique players per team.');
  }

  if (match.rounds.length < 1) {
    errors.push('Enter a minimum of 1 round.');
  }

  return errors;
}
