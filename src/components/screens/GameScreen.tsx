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
      <div className="flex items-center justify-between p-4 border-b border-purple-800/50">
        <ScoreBoard
          score={state.score}
          chainLength={state.chain.length}
          streak={state.streak}
        />
        <Timer timeRemaining={timeRemaining} />
        <button
          onClick={onQuit}
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          Quit
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row p-4 gap-4 max-w-6xl mx-auto w-full">
        <div className="flex-1 flex flex-col gap-4">
          <ChainDisplay chain={state.chain} />
          {state.currentRule && <RuleCard rule={state.currentRule} />}
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
