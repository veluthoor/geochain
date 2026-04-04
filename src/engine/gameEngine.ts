import type { Country, Difficulty, GameState, Rule } from '../types';
import { countries } from '../data/countries';
import { generateRule } from './ruleGenerator';
import { validateRule, getValidCountries } from './ruleValidator';
import { resolveCountryName } from './fuzzyMatcher';
import { calculateScore } from './scoring';

function randomCountry(): Country {
  return countries[Math.floor(Math.random() * countries.length)];
}

export function initGame(difficulty: Difficulty, timeLimit: number): GameState {
  const startCountry = randomCountry();
  const usedCountries = new Set([startCountry.code]);
  const firstRule = generateRule(startCountry, difficulty, usedCountries);

  return {
    status: 'playing',
    difficulty,
    chain: [{ country: startCountry, rule: null }],
    currentRule: firstRule,
    score: 0,
    timeLimit,
    timeRemaining: timeLimit,
    usedCountries,
    streak: 0,
    lastFeedback: null,
    endReason: firstRule ? undefined : 'no_moves',
  };
}

export function submitAnswer(state: GameState, input: string): GameState {
  if (state.status !== 'playing' || !state.currentRule) return state;

  const country = resolveCountryName(input);

  if (!country) {
    return {
      ...state,
      lastFeedback: {
        type: 'invalid_country',
        message: `"${input}" is not a recognized country`,
        hint: 'Check your spelling or try an alternate name',
      },
    };
  }

  if (state.usedCountries.has(country.code)) {
    return {
      ...state,
      lastFeedback: {
        type: 'already_used',
        message: `${country.name} is already in the chain!`,
      },
    };
  }

  const lastCountry = state.chain[state.chain.length - 1].country;
  const isValid = validateRule(state.currentRule.type, lastCountry, country);

  if (!isValid) {
    const hint = generateHint(state.currentRule, lastCountry, state.usedCountries);
    return {
      ...state,
      streak: 0,
      lastFeedback: {
        type: 'wrong',
        message: `${country.name} doesn't satisfy the rule!`,
        hint,
      },
    };
  }

  // Correct answer
  const newStreak = state.streak + 1;
  const pointsEarned = calculateScore(state.chain.length, newStreak, state.difficulty);
  const newUsed = new Set(state.usedCountries);
  newUsed.add(country.code);

  const nextRule = generateRule(country, state.difficulty, newUsed);

  return {
    ...state,
    chain: [...state.chain, { country, rule: state.currentRule }],
    currentRule: nextRule,
    score: state.score + pointsEarned,
    usedCountries: newUsed,
    streak: newStreak,
    lastFeedback: {
      type: 'correct',
      message: `${country.flag} ${country.name} added! +${pointsEarned} points`,
    },
    status: nextRule ? 'playing' : 'ended',
    endReason: nextRule ? undefined : 'no_moves',
  };
}

function generateHint(
  rule: Rule,
  lastCountry: Country,
  usedCountries: Set<string>,
): string {
  const valid = getValidCountries(rule.type, lastCountry, countries, usedCountries);
  if (valid.length === 0) return 'No valid answers remain!';

  const sample = valid[Math.floor(Math.random() * valid.length)];
  const firstLetter = sample.name[0];
  const length = sample.name.length;

  return `Try a country starting with "${firstLetter}" (${length} letters)`;
}

export const REVEAL_PENALTY = 15;

export function revealAnswer(state: GameState): GameState {
  if (state.status !== 'playing' || !state.currentRule) return state;

  const lastCountry = state.chain[state.chain.length - 1].country;
  const valid = getValidCountries(state.currentRule.type, lastCountry, countries, state.usedCountries);
  if (valid.length === 0) return state;

  // Pick a random valid answer and auto-add it
  const revealed = valid[Math.floor(Math.random() * valid.length)];
  const newUsed = new Set(state.usedCountries);
  newUsed.add(revealed.code);

  const nextRule = generateRule(revealed, state.difficulty, newUsed);

  return {
    ...state,
    chain: [...state.chain, { country: revealed, rule: state.currentRule }],
    currentRule: nextRule,
    usedCountries: newUsed,
    streak: 0,
    lastFeedback: {
      type: 'correct',
      message: `${revealed.flag} ${revealed.name} revealed! (-${REVEAL_PENALTY}s penalty)`,
    },
    status: nextRule ? 'playing' : 'ended',
    endReason: nextRule ? undefined : 'no_moves',
  };
}

export function endGame(state: GameState, reason: 'timeout' | 'quit'): GameState {
  let possibleAnswers: string[] = [];
  if (state.currentRule && state.chain.length > 0) {
    const lastCountry = state.chain[state.chain.length - 1].country;
    const valid = getValidCountries(state.currentRule.type, lastCountry, countries, state.usedCountries);
    possibleAnswers = valid.slice(0, 5).map((c) => `${c.flag} ${c.name}`);
  }

  return {
    ...state,
    status: 'ended',
    endReason: reason,
    possibleAnswers,
  };
}
