import type { Country, RuleType } from '../types';
import { borders } from '../data/borders';

type Validator = (prev: Country, candidate: Country) => boolean;

const validators: Record<RuleType, Validator> = {
  borders: (prev, cand) => borders[prev.code]?.includes(cand.code) ?? false,

  same_continent: (prev, cand) => prev.continent === cand.continent,

  starts_with_same: (prev, cand) =>
    cand.name[0].toLowerCase() === prev.name[0].toLowerCase(),

  starts_with_last: (prev, cand) => {
    const lastChar = prev.name.slice(-1).toLowerCase();
    return cand.name[0].toLowerCase() === lastChar;
  },

  same_first_letter_capital: (prev, cand) =>
    cand.capital[0].toLowerCase() === prev.capital[0].toLowerCase(),
};

export function validateRule(
  ruleType: RuleType,
  prev: Country,
  candidate: Country,
): boolean {
  return validators[ruleType](prev, candidate);
}

export function getValidCountries(
  ruleType: RuleType,
  prev: Country,
  allCountries: Country[],
  usedCountries: Set<string>,
): Country[] {
  return allCountries.filter(
    (c) => !usedCountries.has(c.code) && validators[ruleType](prev, c),
  );
}
