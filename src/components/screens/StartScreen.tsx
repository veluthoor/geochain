import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Difficulty, PlayerStats } from '../../types';
import { TIME_LIMIT } from '../../utils/constants';
import clsx from 'clsx';

interface StartScreenProps {
  onStart: (difficulty: Difficulty, timeLimit: number) => void;
  onShowLeaderboard: () => void;
  stats: PlayerStats;
  playerName: string;
  onPlayerNameChange: (name: string) => void;
}

const DIFFICULTIES: { value: Difficulty; label: string; desc: string; tag?: string }[] = [
  { value: 'easy', label: 'Easy', desc: 'Borders, continents & letters' },
  { value: 'hard', label: 'Hard', desc: 'All rule types, 2x points', tag: 'For geography enthusiasts' },
];

export function StartScreen({ onStart, onShowLeaderboard, stats, playerName, onPlayerNameChange }: StartScreenProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-dvh p-6"
    >
      <div className="max-w-md w-full space-y-8">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-ocean-500 to-earth-500 bg-clip-text text-transparent">
            GeoChain
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Chain countries together. 2 minutes on the clock.
          </p>
        </div>

        {/* Player name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => onPlayerNameChange(e.target.value)}
            placeholder="Enter your name..."
            maxLength={20}
            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-400 focus:border-transparent transition-shadow"
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Difficulty
          </label>
          <div className="grid grid-cols-2 gap-3">
            {DIFFICULTIES.map((d) => (
              <button
                key={d.value}
                onClick={() => setDifficulty(d.value)}
                className={clsx(
                  'rounded-xl p-4 border-2 transition-all text-center relative',
                  difficulty === d.value
                    ? 'border-ocean-400 bg-ocean-50 dark:bg-ocean-900/30 text-ocean-700 dark:text-ocean-300'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-600 dark:text-gray-400',
                )}
              >
                {d.tag && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold bg-gold-500 text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                    {d.tag}
                  </span>
                )}
                <div className="font-bold text-sm">{d.label}</div>
                <div className="text-xs mt-1 opacity-75">{d.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => onStart(difficulty, TIME_LIMIT)}
            className="w-full rounded-xl bg-gradient-to-r from-ocean-500 to-ocean-600 hover:from-ocean-600 hover:to-ocean-700 text-white font-bold py-4 text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            Start Game
          </button>
          <button
            onClick={onShowLeaderboard}
            className="w-full rounded-xl border-2 border-gold-400 hover:bg-gold-400/10 text-gold-500 font-semibold py-3 transition-colors"
          >
            Leaderboard
          </button>
        </div>

        {/* Stats */}
        {stats.gamesPlayed > 0 && (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-center">
            <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mb-2">
              Your Stats
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-bold text-ocean-600 dark:text-ocean-400">
                  {stats.gamesPlayed}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-xs">Games</div>
              </div>
              <div>
                <div className="font-bold text-earth-600 dark:text-earth-400">
                  {stats.bestChainLength}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-xs">Best Chain</div>
              </div>
              <div>
                <div className="font-bold text-gold-500">{stats.bestScore.toLocaleString()}</div>
                <div className="text-gray-500 dark:text-gray-400 text-xs">Best Score</div>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-400">
              {stats.countriesLearned.length} countries explored
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
