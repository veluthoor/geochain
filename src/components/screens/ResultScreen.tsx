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
    // Board isn't full — always qualifies
    const pos = leaderboard.filter((e) => e.score > score).length + 1;
    return pos;
  }
  // Board is full — must beat the lowest entry
  const sorted = [...leaderboard].sort((a, b) => b.score - a.score);
  const lowestScore = sorted[sorted.length - 1].score;
  if (score <= lowestScore) return null;
  const pos = sorted.filter((e) => e.score > score).length + 1;
  return pos;
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
    if (needsName) {
      inputRef.current?.focus();
    }
  }, [needsName]);

  const handleNameSubmit = () => {
    const name = nameInput.trim() || 'Anonymous';
    onPlayerNameChange(name);
    // saveStats will fire on next render via the useEffect above
  };

  const isNewBest = state.chain.length >= stats.bestChainLength || state.score >= stats.bestScore;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-dvh p-6"
    >
      <div className="max-w-lg w-full space-y-6">
        {/* Header */}
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

        {/* Leaderboard placement */}
        {position !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-gold-400/10 to-gold-500/10 border border-gold-400/30 rounded-2xl p-5 text-center"
          >
            <div className="text-3xl mb-1">
              {position <= 3 ? MEDAL[position - 1] : ''}
            </div>
            <div className="text-lg font-bold text-gold-500">
              You made the leaderboard!
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {ordinal(position)} place
            </div>

            {needsName && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
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
                    className="flex-1 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                  />
                  <button
                    onClick={handleNameSubmit}
                    className="rounded-xl bg-gold-500 hover:bg-gold-400 text-white font-semibold px-5 py-2.5 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Score summary */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-ocean-600 dark:text-ocean-400">
                {state.score.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Score</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-earth-600 dark:text-earth-400">
                {state.chain.length}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Chain Length</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-700 dark:text-gray-300 capitalize">
                {state.difficulty}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Difficulty</div>
            </div>
          </div>
        </div>

        {/* Possible answers */}
        {state.possibleAnswers && state.possibleAnswers.length > 0 && state.currentRule && (
          <div className="bg-ocean-50 dark:bg-ocean-900/20 border border-ocean-200 dark:border-ocean-800 rounded-2xl p-5">
            <div className="text-xs uppercase tracking-wider text-ocean-600 dark:text-ocean-400 font-semibold mb-1">
              {state.currentRule.displayText}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Possible answers were:
            </div>
            <div className="flex flex-wrap gap-2">
              {state.possibleAnswers.map((answer) => (
                <span
                  key={answer}
                  className="bg-white dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                >
                  {answer}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Chain review */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
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
                className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-750 rounded-full px-3 py-1 text-sm"
              >
                <span>{link.country.flag}</span>
                <span className="text-gray-700 dark:text-gray-300">
                  {link.country.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Countries learned */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          {stats.countriesLearned.length} countries explored across {stats.gamesPlayed} games
        </div>

        {/* Play again */}
        <button
          onClick={onPlayAgain}
          disabled={needsName}
          className="w-full rounded-xl bg-gradient-to-r from-ocean-500 to-ocean-600 hover:from-ocean-600 hover:to-ocean-700 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-700 dark:disabled:to-gray-600 text-white font-bold py-4 text-lg transition-all shadow-lg hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed"
        >
          Play Again
        </button>
      </div>
    </motion.div>
  );
}
