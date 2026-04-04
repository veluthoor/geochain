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
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            {END_MESSAGES[state.endReason ?? 'quit']}
          </h2>
          {isNewBest && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.3 }}
              className="mt-2 text-gold-400 font-bold text-lg"
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
            className="bg-gold-500/10 border border-gold-500/30 rounded-2xl p-5 text-center"
          >
            <div className="text-3xl mb-1">
              {position <= 3 ? MEDAL[position - 1] : ''}
            </div>
            <div className="text-lg font-bold text-gold-400">
              You made the leaderboard!
            </div>
            <div className="text-sm text-purple-300 mt-1">
              {ordinal(position)} place
            </div>

            {needsName && (
              <div className="mt-4">
                <p className="text-sm text-purple-300 mb-3">
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
                    className="flex-1 rounded-xl border border-purple-700 bg-purple-900/50 px-4 py-2.5 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent"
                  />
                  <button
                    onClick={handleNameSubmit}
                    className="rounded-xl bg-gold-500 hover:bg-gold-400 text-purple-950 font-semibold px-5 py-2.5 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Score summary */}
        <div className="bg-purple-900/40 rounded-2xl border border-purple-800 p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-200">
                {state.score.toLocaleString()}
              </div>
              <div className="text-sm text-purple-400">Score</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">
                {state.chain.length}
              </div>
              <div className="text-sm text-purple-400">Chain</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white capitalize">
                {state.difficulty}
              </div>
              <div className="text-sm text-purple-400">Difficulty</div>
            </div>
          </div>
        </div>

        {/* Possible answers */}
        {state.possibleAnswers && state.possibleAnswers.length > 0 && state.currentRule && (
          <div className="bg-purple-900/40 border border-purple-800 rounded-2xl p-5">
            <div className="text-xs uppercase tracking-wider text-purple-400 font-semibold mb-1">
              {state.currentRule.displayText}
            </div>
            <div className="text-sm text-purple-300 mb-3">
              Possible answers were:
            </div>
            <div className="flex flex-wrap gap-2">
              {state.possibleAnswers.map((answer) => (
                <span
                  key={answer}
                  className="bg-purple-800/60 rounded-full px-3 py-1 text-sm font-medium text-purple-100 border border-purple-700"
                >
                  {answer}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Chain review */}
        <div className="bg-purple-900/40 rounded-2xl border border-purple-800 p-6">
          <h3 className="font-bold text-white mb-3">
            Your Chain
          </h3>
          <div className="flex flex-wrap gap-2">
            {state.chain.map((link, i) => (
              <motion.div
                key={link.country.code}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-1.5 bg-purple-800/60 rounded-full px-3 py-1 text-sm border border-purple-700"
              >
                <span>{link.country.flag}</span>
                <span className="text-purple-100">
                  {link.country.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Countries learned */}
        <div className="text-center text-sm text-purple-400">
          {stats.countriesLearned.length} countries explored across {stats.gamesPlayed} games
        </div>

        {/* Play again */}
        <button
          onClick={onPlayAgain}
          disabled={needsName}
          className="w-full rounded-xl bg-purple-500 hover:bg-purple-400 disabled:bg-purple-800 disabled:text-purple-500 text-white font-bold py-4 text-lg transition-colors shadow-lg shadow-purple-900/50 active:scale-[0.98] disabled:cursor-not-allowed"
        >
          Play Again
        </button>
      </div>
    </motion.div>
  );
}
