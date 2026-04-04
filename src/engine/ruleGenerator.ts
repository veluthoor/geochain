import type { Country, Difficulty, Rule, RuleType } from '../types';
import { DIFFICULTY_RULES } from '../utils/constants';
import { getValidCountries } from './ruleValidator';
import { countries } from '../data/countries';

const RULE_DISPLAY: Record<RuleType, (prev: Country) => string> = {
  borders: (prev) => `Name a country that borders ${prev.name}`,
  same_continent: (prev) => `Name a country in ${prev.continent}`,
  starts_with_same: (prev) => `Name a country starting with "${prev.name[0]}"`,
  starts_with_last: (prev) => `Name a country starting with "${prev.name.slice(-1).toUpperCase()}"`,
  same_first_letter_capital: (prev) =>
    `Name a country whose capital starts with "${prev.capital[0]}"`,
};

export function generateRule(
  lastCountry: Country,
  difficulty: Difficulty,
  usedCountries: Set<string>,
): Rule | null {
  const candidateTypes = DIFFICULTY_RULES[difficulty];

  // Filter to rules that have at least one valid answer
  const viable = candidateTypes
    .map((type) => ({
      type,
      count: getValidCountries(type, lastCountry, countries, usedCountries).length,
    }))
    .filter((r) => r.count > 0);

  if (viable.length === 0) return null;

  // Weight toward rules with more valid answers (better for playability)
  const totalWeight = viable.reduce((sum, r) => sum + r.count, 0);
  let random = Math.random() * totalWeight;
  let selected = viable[0];

  for (const rule of viable) {
    random -= rule.count;
    if (random <= 0) {
      selected = rule;
      break;
    }
  }

  return {
    type: selected.type,
    displayText: RULE_DISPLAY[selected.type](lastCountry),
  };
}
