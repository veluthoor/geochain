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
          className="flex-1 rounded-xl border border-purple-700 bg-purple-900/50 px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent disabled:opacity-50 transition-all"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={() => handleSubmit(selectedIndex >= 0 ? suggestions[selectedIndex]?.name ?? value : value)}
          disabled={disabled || !value.trim()}
          className="rounded-xl bg-purple-500 hover:bg-purple-400 disabled:bg-purple-800 disabled:text-purple-500 text-white font-semibold px-6 py-3 transition-colors disabled:cursor-not-allowed"
        >
          Go
        </button>
      </div>

      {showSuggestions && (
        <div className="absolute top-full left-0 right-12 mt-1 bg-purple-900 border border-purple-700 rounded-xl shadow-xl overflow-hidden z-10">
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
                  ? 'bg-purple-800 text-white'
                  : 'text-purple-200 hover:bg-purple-800/50',
              )}
            >
              <span className="text-lg">{country.flag}</span>
              <span className="font-medium">{country.name}</span>
              <span className="text-xs text-purple-400 ml-auto">
                {country.continent}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
