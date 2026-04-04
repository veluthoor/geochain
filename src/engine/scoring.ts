import type { Difficulty } from '../types';
import { BASE_POINTS, STREAK_BONUS, MAX_STREAK_BONUS, DIFFICULTY_MULTIPLIER } from '../utils/constants';

export function calculateScore(
  _chainLength: number,
  streak: number,
  difficulty: Difficulty,
): number {
  const base = BASE_POINTS;
  const streakBonus = Math.min(streak * STREAK_BONUS, MAX_STREAK_BONUS);
  return Math.round((base + streakBonus) * DIFFICULTY_MULTIPLIER[difficulty]);
}
