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
  onQuit: () => void;
}

export function GameScreen({ state, timeRemaining, onSubmit, onQuit }: GameScreenProps) {
  const lastCountry = state.chain[state.chain.length - 1]?.country;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-dvh flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
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

      {/* Main area */}
      <div className="flex-1 flex flex-col lg:flex-row p-4 gap-4 max-w-6xl mx-auto w-full">
        {/* Left: game play */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Chain */}
          <ChainDisplay chain={state.chain} />

          {/* Rule */}
          {state.currentRule && <RuleCard rule={state.currentRule} />}

          {/* Input */}
          <div className="flex justify-center">
            <CountryInput
              onSubmit={onSubmit}
              disabled={state.status !== 'playing'}
              hideAutocomplete={
                state.currentRule?.type === 'starts_with_same' ||
                state.currentRule?.type === 'starts_with_last'
              }
            />
          </div>

          {/* Feedback */}
          <Feedback feedback={state.lastFeedback} />
        </div>

        {/* Right: country facts */}
        {lastCountry && (
          <div className="lg:w-64 shrink-0">
            <CountryFacts country={lastCountry} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
