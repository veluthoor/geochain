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
      <div className="max-w-md w-full space-y-7">
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-white tracking-tight">
            GeoChain
          </h1>
          <p className="mt-2 text-purple-300 text-base">
            Chain countries together. 2 minutes on the clock.
          </p>
        </div>

        {/* Player name */}
        <div>
          <label className="block text-sm font-medium text-purple-300 mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => onPlayerNameChange(e.target.value)}
            placeholder="Enter your name..."
            maxLength={20}
            className="w-full rounded-xl border border-purple-700 bg-purple-900/50 px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-medium text-purple-300 mb-3">
            Difficulty
          </label>
          <div className="grid grid-cols-2 gap-3">
            {DIFFICULTIES.map((d) => (
              <button
                key={d.value}
                onClick={() => setDifficulty(d.value)}
                className={clsx(
                  'rounded-xl p-4 border transition-all text-center relative',
                  difficulty === d.value
                    ? 'border-purple-400 bg-purple-800/60 text-white shadow-lg shadow-purple-900/50'
                    : 'border-purple-800 bg-purple-900/30 text-purple-300 hover:border-purple-600 hover:bg-purple-900/50',
                )}
              >
                {d.tag && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold bg-purple-500 text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                    {d.tag}
                  </span>
                )}
                <div className="font-bold text-sm">{d.label}</div>
                <div className="text-xs mt-1 text-purple-400">{d.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => onStart(difficulty, TIME_LIMIT)}
            className="w-full rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold py-4 text-lg transition-colors shadow-lg shadow-purple-900/50 active:scale-[0.98]"
          >
            Start Game
          </button>
          <button
            onClick={onShowLeaderboard}
            className="w-full rounded-xl border border-purple-700 hover:bg-purple-900/50 text-purple-300 hover:text-white font-semibold py-3 transition-all"
          >
            Leaderboard
          </button>
        </div>

        {/* Stats */}
        {stats.gamesPlayed > 0 && (
          <div className="bg-purple-900/40 rounded-xl p-4 text-center border border-purple-800">
            <div className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-2">
              Your Stats
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-bold text-lg text-white">{stats.gamesPlayed}</div>
                <div className="text-purple-400 text-xs">Games</div>
              </div>
              <div>
                <div className="font-bold text-lg text-white">{stats.bestChainLength}</div>
                <div className="text-purple-400 text-xs">Best Chain</div>
              </div>
              <div>
                <div className="font-bold text-lg text-gold-400">{stats.bestScore.toLocaleString()}</div>
                <div className="text-purple-400 text-xs">Best Score</div>
              </div>
            </div>
            <div className="mt-2 text-xs text-purple-500">
              {stats.countriesLearned.length} countries explored
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-purple-500 pt-2">
          Made with lots of love by a fellow geography quiz enthusiast :){' '}
          Drop any feedback to me over X{' '}
          <a
            href="https://x.com/veluthoor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
          >
            @veluthoor
          </a>
        </div>
      </div>
    </motion.div>
  );
}
