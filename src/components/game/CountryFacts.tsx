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
        className="bg-purple-900/40 rounded-xl border border-purple-800 p-4 text-sm"
      >
        <div className="text-3xl mb-2">{country.flag}</div>
        <h3 className="font-bold text-white mb-2">
          {country.name}
        </h3>
        <div className="space-y-1 text-purple-300">
          <div>
            <span className="text-purple-200">Capital:</span> {country.capital}
          </div>
          <div>
            <span className="text-purple-200">Continent:</span> {country.continent}
          </div>
          <div>
            <span className="text-purple-200">Population:</span>{' '}
            {country.population.toLocaleString()}
          </div>
          {country.landlocked && (
            <div className="text-gold-400 font-medium">
              Landlocked
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
