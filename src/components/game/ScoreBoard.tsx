interface ScoreBoardProps {
  score: number;
  chainLength: number;
  streak: number;
}

export function ScoreBoard({ score, chainLength, streak }: ScoreBoardProps) {
  return (
    <div className="flex gap-6 text-sm">
      <div className="text-center">
        <div className="text-gray-500 dark:text-gray-400">Score</div>
        <div className="text-xl font-bold text-ocean-600 dark:text-ocean-400">
          {score.toLocaleString()}
        </div>
      </div>
      <div className="text-center">
        <div className="text-gray-500 dark:text-gray-400">Chain</div>
        <div className="text-xl font-bold text-earth-600 dark:text-earth-400">
          {chainLength}
        </div>
      </div>
      {streak > 1 && (
        <div className="text-center">
          <div className="text-gray-500 dark:text-gray-400">Streak</div>
          <div className="text-xl font-bold text-gold-500">
            {streak}x
          </div>
        </div>
      )}
    </div>
  );
}
