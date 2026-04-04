import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGame } from './hooks/useGame';
import { StartScreen } from './components/screens/StartScreen';
import { GameScreen } from './components/screens/GameScreen';
import { ResultScreen } from './components/screens/ResultScreen';
import { Leaderboard } from './components/screens/Leaderboard';

function App() {
  const {
    state, stats, playerName, setPlayerName,
    timer, startGame, submitAnswer, revealAnswer, quitGame, saveStats, resetToMenu,
  } = useGame();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <div className="min-h-dvh bg-gray-950 text-gray-100 dark">
      <AnimatePresence mode="wait">
        {showLeaderboard && (
          <Leaderboard
            key="leaderboard"
            onBack={() => setShowLeaderboard(false)}
          />
        )}
        {!showLeaderboard && state.status === 'idle' && (
          <StartScreen
            key="start"
            onStart={startGame}
            onShowLeaderboard={() => setShowLeaderboard(true)}
            stats={stats}
            playerName={playerName}
            onPlayerNameChange={setPlayerName}
          />
        )}
        {!showLeaderboard && state.status === 'playing' && (
          <GameScreen
            key="game"
            state={state}
            timeRemaining={timer.timeRemaining}
            onSubmit={submitAnswer}
            onReveal={revealAnswer}
            onQuit={quitGame}
          />
        )}
        {!showLeaderboard && state.status === 'ended' && (
          <ResultScreen
            key="result"
            state={state}
            stats={stats}
            playerName={playerName}
            onPlayerNameChange={setPlayerName}
            onSaveStats={saveStats}
            onPlayAgain={resetToMenu}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
