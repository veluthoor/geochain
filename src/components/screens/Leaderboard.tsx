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
  const [tab, setTab] = useState<Difficulty>('hard');
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
          <h1 className="text-4xl font-extrabold text-white">
            Leaderboard
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl bg-purple-900/60 p-1 border border-purple-800">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={clsx(
                'flex-1 rounded-lg py-2 text-sm font-semibold transition-all',
                tab === t.value
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'text-purple-400 hover:text-purple-200',
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-12 text-purple-400">
            <div className="text-4xl mb-3">&#127758;</div>
            <p>Play a {tab} game to get on the board!</p>
          </div>
        ) : (
          <div className="bg-purple-900/40 rounded-2xl border border-purple-800 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[2.5rem_1fr_4.5rem_4rem] gap-2 px-4 py-3 border-b border-purple-800 text-xs font-semibold uppercase tracking-wider text-purple-400">
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
                  i >= 3 && i % 2 === 0 && 'bg-purple-900/20',
                )}
              >
                <div className="text-sm font-bold text-purple-400">
                  {i < 3 ? MEDAL[i] : i + 1}
                </div>
                <div className="min-w-0">
                  <div className={clsx(
                    'font-semibold text-sm truncate',
                    i < 3 ? 'text-white' : 'text-purple-200',
                  )}>
                    {entry.playerName}
                  </div>
                  <div className="text-xs text-purple-500">{formatDate(entry.date)}</div>
                </div>
                <div className={clsx(
                  'text-right font-bold text-sm tabular-nums',
                  i === 0 ? 'text-gold-400' : 'text-purple-200',
                )}>
                  {entry.score.toLocaleString()}
                </div>
                <div className="text-right text-sm tabular-nums text-purple-300 font-medium">
                  {entry.chainLength}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <button
          onClick={onBack}
          className="w-full rounded-xl border border-purple-700 hover:bg-purple-900/50 text-purple-300 hover:text-white font-semibold py-3 transition-all"
        >
          Back to Menu
        </button>
      </div>
    </motion.div>
  );
}
