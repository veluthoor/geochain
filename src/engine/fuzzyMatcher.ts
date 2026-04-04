import Fuse from 'fuse.js';
import type { Country } from '../types';
import { countries, countryByName } from '../data/countries';
import { alternateNames } from '../data/alternateNames';

let fuse: Fuse<Country> | null = null;

function getFuse(): Fuse<Country> {
  if (!fuse) {
    fuse = new Fuse(countries, {
      keys: [
        { name: 'name', weight: 0.7 },
        { name: 'alternateNames', weight: 0.3 },
      ],
      threshold: 0.35,
      includeScore: true,
    });
  }
  return fuse;
}

export function resolveCountryName(input: string): Country | null {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return null;

  // 1. Exact match by name
  const exact = countryByName[trimmed];
  if (exact) return exact;

  // 2. Check alternate names map
  const altName = alternateNames[trimmed];
  if (altName) {
    const alt = countryByName[altName.toLowerCase()];
    if (alt) return alt;
  }

  // 3. Fuzzy search
  const results = getFuse().search(input.trim());
  if (results.length > 0 && results[0].score! < 0.35) {
    return results[0].item;
  }

  return null;
}

export function searchCountries(input: string, limit = 5): Country[] {
  const trimmed = input.trim();
  if (!trimmed) return [];

  const results = getFuse().search(trimmed, { limit });
  return results.map((r) => r.item);
}
