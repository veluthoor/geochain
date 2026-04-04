import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, query, orderByChild, limitToLast, get } from 'firebase/database';
import type { LeaderboardEntry, Difficulty } from './types';

const firebaseConfig = {
  apiKey: "AIzaSyBJVGocHQGcp-2VjWPejLJHN5B59GPyZDc",
  authDomain: "geo-chain-54d2e.firebaseapp.com",
  projectId: "geo-chain-54d2e",
  storageBucket: "geo-chain-54d2e.firebasestorage.app",
  messagingSenderId: "345413973285",
  appId: "1:345413973285:web:9eb00c3b54e8c0a55656cc",
  measurementId: "G-7TSF95KMLE",
  databaseURL: "https://geo-chain-54d2e-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export async function submitScore(entry: LeaderboardEntry): Promise<void> {
  const listRef = ref(db, `leaderboard/${entry.difficulty}`);
  await push(listRef, {
    playerName: entry.playerName,
    score: entry.score,
    chainLength: entry.chainLength,
    difficulty: entry.difficulty,
    date: entry.date,
  });
}

export async function fetchLeaderboard(difficulty: Difficulty): Promise<LeaderboardEntry[]> {
  const listRef = query(
    ref(db, `leaderboard/${difficulty}`),
    orderByChild('score'),
    limitToLast(20),
  );
  const snapshot = await get(listRef);
  if (!snapshot.exists()) return [];

  const entries: LeaderboardEntry[] = [];
  snapshot.forEach((child) => {
    entries.push(child.val() as LeaderboardEntry);
  });

  // limitToLast + orderByChild returns ascending, so reverse for descending
  return entries.reverse();
}
