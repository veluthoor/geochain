import { motion, AnimatePresence } from 'framer-motion';
import type { Country } from '../../types';

interface CountryFactsProps {
  country: Country;
}

export function CountryFacts({ country }: CountryFactsProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={country.code}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-sm"
      >
        <div className="text-3xl mb-2">{country.flag}</div>
        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
          {country.name}
        </h3>
        <div className="space-y-1 text-gray-600 dark:text-gray-400">
          <div>
            <span className="font-medium">Capital:</span> {country.capital}
          </div>
          <div>
            <span className="font-medium">Continent:</span> {country.continent}
          </div>
          <div>
            <span className="font-medium">Population:</span>{' '}
            {country.population.toLocaleString()}
          </div>
          {country.landlocked && (
            <div className="text-amber-600 dark:text-amber-400 font-medium">
              Landlocked
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
