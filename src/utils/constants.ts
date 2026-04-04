import type { Difficulty, RuleType } from '../types';

export const TIME_LIMIT = 120;

export const DIFFICULTY_RULES: Record<Difficulty, RuleType[]> = {
  easy: ['borders', 'same_continent', 'starts_with_same', 'starts_with_last'],
  hard: ['borders', 'same_continent', 'starts_with_same', 'starts_with_last', 'same_first_letter_capital'],
};

export const DIFFICULTY_MULTIPLIER: Record<Difficulty, number> = {
  easy: 1,
  hard: 2,
};

export const BASE_POINTS = 100;
export const STREAK_BONUS = 25;
export const MAX_STREAK_BONUS = 200;

export const AUTOCOMPLETE_LIMIT = 5;
export const AUTOCOMPLETE_DEBOUNCE_MS = 150;

export const INITIAL_STATS = {
  gamesPlayed: 0,
  bestChainLength: 0,
  bestScore: 0,
  countriesLearned: [] as string[],
  history: [],
};
