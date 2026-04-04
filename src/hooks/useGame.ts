import { useState, useCallback } from 'react';
import type { Difficulty, GameState, PlayerStats, LeaderboardEntry, LeaderboardData } from '../types';
import { initGame, submitAnswer, endGame } from '../engine/gameEngine';
import { useTimer } from './useTimer';
import { useLocalStorage } from './useLocalStorage';
import { INITIAL_STATS } from '../utils/constants';
import { submitScore } from '../firebase';

export function useGame() {
  const [state, setState] = useState<GameState>({
    status: 'idle',
    difficulty: 'easy',
    chain: [],
    currentRule: null,
    score: 0,
    timeLimit: 120,
    timeRemaining: 120,
    usedCountries: new Set(),
    streak: 0,
    lastFeedback: null,
  });

  const [playerName, setPlayerName] = useLocalStorage<string>('geochain-name', '');
  const [stats, setStats] = useLocalStorage<PlayerStats>('geochain-stats', INITIAL_STATS);
  const [leaderboard, setLeaderboard] = useLocalStorage<LeaderboardData>('geochain-leaderboard', {
    easy: [],
    hard: [],
  });

  const handleExpire = useCallback(() => {
    setState((prev) => endGame(prev, 'timeout'));
  }, []);

  const timer = useTimer({ onExpire: handleExpire });

  const startGame = useCallback(
    (difficulty: Difficulty, timeLimit: number) => {
      const newState = initGame(difficulty, timeLimit);
      setState(newState);
      timer.start(timeLimit);
    },
    [timer],
  );

  const handleSubmit = useCallback(
    (input: string) => {
      setState((prev) => {
        const next = submitAnswer(prev, input);
        if (next.status === 'ended') {
          timer.stop();
        }
        return next;
      });
    },
    [timer],
  );

  const quitGame = useCallback(() => {
    timer.stop();
    setState((prev) => endGame(prev, 'quit'));
  }, [timer]);

  const saveStats = useCallback(() => {
    if (state.status !== 'ended') return;

    const name = playerName || 'Anonymous';
    const countryCodes = state.chain.map((link) => link.country.code);
    const newLearned = [
      ...new Set([...(stats.countriesLearned || []), ...countryCodes]),
    ];

    setStats({
      gamesPlayed: stats.gamesPlayed + 1,
      bestChainLength: Math.max(stats.bestChainLength, state.chain.length),
      bestScore: Math.max(stats.bestScore, state.score),
      countriesLearned: newLearned,
      history: [
        {
          date: new Date().toISOString(),
          playerName: name,
          difficulty: state.difficulty,
          chainLength: state.chain.length,
          score: state.score,
          countries: countryCodes,
        },
        ...stats.history.slice(0, 19),
      ],
    });

    // Submit to Firebase (fire and forget)
    const entry: LeaderboardEntry = {
      playerName: name,
      score: state.score,
      chainLength: state.chain.length,
      difficulty: state.difficulty,
      date: new Date().toISOString(),
    };
    submitScore(entry).catch(console.error);

    // Also update local leaderboard cache
    setLeaderboard((prev) => {
      const diffBoard = prev[state.difficulty] || [];
      return {
        ...prev,
        [state.difficulty]: [...diffBoard, entry]
          .sort((a, b) => b.score - a.score)
          .slice(0, 20),
      };
    });
  }, [state, playerName, stats, setStats, setLeaderboard]);

  const resetToMenu = useCallback(() => {
    setState({
      status: 'idle',
      difficulty: 'easy',
      chain: [],
      currentRule: null,
      score: 0,
      timeLimit: 120,
      timeRemaining: 120,
      usedCountries: new Set(),
      streak: 0,
      lastFeedback: null,
    });
  }, []);

  return {
    state,
    stats,
    leaderboard,
    playerName,
    setPlayerName,
    timer,
    startGame,
    submitAnswer: handleSubmit,
    quitGame,
    saveStats,
    resetToMenu,
  };
}
