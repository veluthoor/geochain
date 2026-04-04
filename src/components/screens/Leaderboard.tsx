import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Difficulty, LeaderboardData } from '../../types';
import clsx from 'clsx';

interface LeaderboardProps {
  data: LeaderboardData;
  onBack: () => void;
}

const TABS: { value: Difficulty; label: string }[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'hard', label: 'Hard' },
];

const MEDAL = ['', '', ''];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function Leaderboard({ data, onBack }: LeaderboardProps) {
  const [tab, setTab] = useState<Difficulty>('easy');
  const entries = data[tab] || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-dvh p-6"
    >
      <div className="max-w-lg w-full space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gold-400 to-gold-500 bg-clip-text text-transparent">
            Leaderboard
          </h1>
        </div>

        {/* Difficulty tabs */}
        <div className="flex rounded-xl bg-gray-100 dark:bg-gray-800 p-1">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={clsx(
                'flex-1 rounded-lg py-2 text-sm font-semibold transition-all',
                tab === t.value
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-12 text-gray-400 dark:text-gray-500">
            <div className="text-4xl mb-3">No games yet</div>
            <p>Play a {tab} game to get on the board!</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[2.5rem_1fr_4.5rem_4rem] gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <div>#</div>
              <div>Player</div>
              <div className="text-right">Score</div>
              <div className="text-right">Chain</div>
            </div>

            {/* Rows */}
            {entries.map((entry, i) => (
              <motion.div
                key={`${entry.date}-${i}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className={clsx(
                  'grid grid-cols-[2.5rem_1fr_4.5rem_4rem] gap-2 px-4 py-3 items-center',
                  i < 3 && 'bg-gold-500/5',
                  i % 2 === 0 && i >= 3 && 'bg-gray-50/50 dark:bg-gray-800/30',
                )}
              >
                <div className="text-sm font-bold text-gray-400 dark:text-gray-500">
                  {i < 3 ? MEDAL[i] : i + 1}
                </div>
                <div className="min-w-0">
                  <div className={clsx(
                    'font-semibold text-sm truncate',
                    i < 3 ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300',
                  )}>
                    {entry.playerName}
                  </div>
                  <div className="text-xs text-gray-400">{formatDate(entry.date)}</div>
                </div>
                <div className={clsx(
                  'text-right font-bold text-sm tabular-nums',
                  i === 0 ? 'text-gold-500' : 'text-ocean-600 dark:text-ocean-400',
                )}>
                  {entry.score.toLocaleString()}
                </div>
                <div className="text-right text-sm tabular-nums text-earth-600 dark:text-earth-400 font-medium">
                  {entry.chainLength}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <button
          onClick={onBack}
          className="w-full rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 transition-colors"
        >
          Back to Menu
        </button>
      </div>
    </motion.div>
  );
}
