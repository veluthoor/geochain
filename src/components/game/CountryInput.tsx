import { useState, useRef, useCallback, useEffect } from 'react';
import { searchCountries } from '../../engine/fuzzyMatcher';
import type { Country } from '../../types';
import { AUTOCOMPLETE_LIMIT, AUTOCOMPLETE_DEBOUNCE_MS } from '../../utils/constants';
import clsx from 'clsx';

interface CountryInputProps {
  onSubmit: (input: string) => void;
  disabled?: boolean;
  hideAutocomplete?: boolean;
}

export function CountryInput({ onSubmit, disabled, hideAutocomplete }: CountryInputProps) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<Country[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [disabled]);

  const updateSuggestions = useCallback((input: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!input.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    debounceRef.current = setTimeout(() => {
      const results = searchCountries(input, AUTOCOMPLETE_LIMIT);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setSelectedIndex(-1);
    }, AUTOCOMPLETE_DEBOUNCE_MS);
  }, []);

  const handleSubmit = useCallback(
    (text: string) => {
      if (!text.trim() || disabled) return;
      onSubmit(text.trim());
      setValue('');
      setSuggestions([]);
      setShowSuggestions(false);
      setSelectedIndex(-1);
      // Re-focus input to keep mobile keyboard open
      requestAnimationFrame(() => inputRef.current?.focus());
    },
    [onSubmit, disabled],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSubmit(suggestions[selectedIndex].name);
      } else {
        handleSubmit(value);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (!hideAutocomplete) updateSuggestions(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          placeholder="Type a country name..."
          disabled={disabled}
          className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-400 focus:border-transparent disabled:opacity-50 transition-shadow"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={() => handleSubmit(selectedIndex >= 0 ? suggestions[selectedIndex]?.name ?? value : value)}
          disabled={disabled || !value.trim()}
          className="rounded-xl bg-ocean-500 hover:bg-ocean-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-semibold px-6 py-3 transition-colors disabled:cursor-not-allowed"
        >
          Go
        </button>
      </div>

      {showSuggestions && (
        <div className="absolute top-full left-0 right-12 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden z-10">
          {suggestions.map((country, i) => (
            <button
              key={country.code}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSubmit(country.name);
              }}
              className={clsx(
                'w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors',
                i === selectedIndex
                  ? 'bg-ocean-50 dark:bg-ocean-900/40 text-ocean-800 dark:text-ocean-200'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750',
              )}
            >
              <span className="text-lg">{country.flag}</span>
              <span className="font-medium">{country.name}</span>
              <span className="text-xs text-gray-400 ml-auto">
                {country.continent}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
