import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { GameState, PlayerStats, LeaderboardEntry, LeaderboardData } from '../../types';

interface ResultScreenProps {
  state: GameState;
  stats: PlayerStats;
  leaderboard: LeaderboardData;
  playerName: string;
  onPlayerNameChange: (name: string) => void;
  onSaveStats: () => void;
  onPlayAgain: () => void;
}

const END_MESSAGES: Record<string, string> = {
  timeout: 'Time\'s up!',
  no_moves: 'No more moves!',
  quit: 'Game ended',
};

const MEDAL = ['', '', ''];

function getLeaderboardPosition(score: number, leaderboard: LeaderboardEntry[]): number | null {
  if (leaderboard.length < 20) {
    return leaderboard.filter((e) => e.score > score).length + 1;
  }
  const sorted = [...leaderboard].sort((a, b) => b.score - a.score);
  if (score <= sorted[sorted.length - 1].score) return null;
  return sorted.filter((e) => e.score > score).length + 1;
}

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function ResultScreen({
  state, stats, leaderboard, playerName, onPlayerNameChange, onSaveStats, onPlayAgain,
}: ResultScreenProps) {
  const [nameInput, setNameInput] = useState(playerName);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const diffBoard = leaderboard[state.difficulty] || [];
  const position = getLeaderboardPosition(state.score, diffBoard);
  const needsName = position !== null && !playerName.trim();

  useEffect(() => {
    if (!needsName && !saved) {
      onSaveStats();
      setSaved(true);
    }
  }, [needsName, saved, onSaveStats]);

  useEffect(() => {
    if (needsName) inputRef.current?.focus();
  }, [needsName]);

  const handleNameSubmit = () => {
    onPlayerNameChange(nameInput.trim() || 'Anonymous');
  };

  const isNewBest = state.chain.length >= stats.bestChainLength || state.score >= stats.bestScore;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-dvh p-6"
    >
      <div className="max-w-lg w-full space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {END_MESSAGES[state.endReason ?? 'quit']}
          </h2>
          {isNewBest && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.3 }}
              className="mt-2 text-gold-500 font-bold text-lg"
            >
              New personal best!
            </motion.div>
          )}
        </div>

        {position !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gold-500/5 border border-gold-400/30 rounded-2xl p-5 text-center"
          >
            <div className="text-3xl mb-1">
              {position <= 3 ? MEDAL[position - 1] : ''}
            </div>
            <div className="text-lg font-bold text-gold-600 dark:text-gold-400">
              You made the leaderboard!
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {ordinal(position)} place
            </div>

            {needsName && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-3">
                  Enter your name for the leaderboard:
                </p>
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                    placeholder="Your name..."
                    maxLength={20}
                    className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean-400 focus:border-transparent"
                  />
                  <button
                    onClick={handleNameSubmit}
                    className="rounded-xl bg-ocean-500 hover:bg-ocean-600 text-white font-semibold px-5 py-2.5 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-ocean-600 dark:text-ocean-400">
                {state.score.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Score</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {state.chain.length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Chain</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100 capitalize">
                {state.difficulty}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Difficulty</div>
            </div>
          </div>
        </div>

        {state.possibleAnswers && state.possibleAnswers.length > 0 && state.currentRule && (
          <div className="bg-ocean-50 dark:bg-gray-800 border border-ocean-200 dark:border-gray-700 rounded-2xl p-5">
            <div className="text-xs uppercase tracking-wider text-ocean-500 dark:text-ocean-300 font-semibold mb-1">
              {state.currentRule.displayText}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Possible answers were:
            </div>
            <div className="flex flex-wrap gap-2">
              {state.possibleAnswers.map((answer) => (
                <span
                  key={answer}
                  className="bg-white dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                >
                  {answer}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">
            Your Chain
          </h3>
          <div className="flex flex-wrap gap-2">
            {state.chain.map((link, i) => (
              <motion.div
                key={link.country.code}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-1.5 bg-white dark:bg-gray-700 rounded-full px-3 py-1 text-sm border border-gray-200 dark:border-gray-600"
              >
                <span>{link.country.flag}</span>
                <span className="text-gray-700 dark:text-gray-300">
                  {link.country.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center text-sm text-gray-400">
          {stats.countriesLearned.length} countries explored across {stats.gamesPlayed} games
        </div>

        <button
          onClick={onPlayAgain}
          disabled={needsName}
          className="w-full rounded-xl bg-ocean-500 hover:bg-ocean-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold py-4 text-lg transition-colors shadow-sm active:scale-[0.98] disabled:cursor-not-allowed"
        >
          Play Again
        </button>
      </div>
    </motion.div>
  );
}
