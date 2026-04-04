import { motion } from 'framer-motion';
import type { GameState } from '../../types';
import { Timer } from '../game/Timer';
import { ScoreBoard } from '../game/ScoreBoard';
import { RuleCard } from '../game/RuleCard';
import { ChainDisplay } from '../game/ChainDisplay';
import { CountryInput } from '../game/CountryInput';
import { CountryFacts } from '../game/CountryFacts';
import { Feedback } from '../game/Feedback';

interface GameScreenProps {
  state: GameState;
  timeRemaining: number;
  onSubmit: (input: string) => void;
  onReveal: () => void;
  onQuit: () => void;
}

export function GameScreen({ state, timeRemaining, onSubmit, onReveal, onQuit }: GameScreenProps) {
  const lastCountry = state.chain[state.chain.length - 1]?.country;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-dvh flex flex-col"
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
        <ScoreBoard
          score={state.score}
          chainLength={state.chain.length}
          streak={state.streak}
        />
        <Timer timeRemaining={timeRemaining} />
        <button
          onClick={onQuit}
          className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          Quit
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row p-4 gap-4 max-w-6xl mx-auto w-full">
        <div className="flex-1 flex flex-col gap-4">
          <ChainDisplay chain={state.chain} />
          {state.currentRule && <RuleCard rule={state.currentRule} />}
          <div className="flex justify-center items-center gap-3">
            <CountryInput
              onSubmit={onSubmit}
              disabled={state.status !== 'playing'}
              hideAutocomplete={
                state.currentRule?.type === 'starts_with_same' ||
                state.currentRule?.type === 'starts_with_last'
              }
            />
          </div>
          {state.status === 'playing' && (
            <div className="flex justify-center">
              <button
                onClick={onReveal}
                className="text-sm text-gray-400 dark:text-gray-500 hover:text-ocean-500 dark:hover:text-ocean-400 transition-colors"
              >
                Stuck? Reveal an answer (-15s)
              </button>
            </div>
          )}
          <Feedback feedback={state.lastFeedback} />
        </div>

        {lastCountry && (
          <div className="lg:w-64 shrink-0">
            <CountryFacts country={lastCountry} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
