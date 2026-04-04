import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useGame } from './hooks/useGame';
import { StartScreen } from './components/screens/StartScreen';
import { GameScreen } from './components/screens/GameScreen';
import { ResultScreen } from './components/screens/ResultScreen';
import { Leaderboard } from './components/screens/Leaderboard';

function App() {
  const {
    state, stats, leaderboard, playerName, setPlayerName,
    timer, startGame, submitAnswer, quitGame, saveStats, resetToMenu,
  } = useGame();
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <div className="min-h-dvh bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <AnimatePresence mode="wait">
        {showLeaderboard && (
          <Leaderboard
            key="leaderboard"
            data={leaderboard}
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
            onQuit={quitGame}
          />
        )}
        {!showLeaderboard && state.status === 'ended' && (
          <ResultScreen
            key="result"
            state={state}
            stats={stats}
            leaderboard={leaderboard}
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
