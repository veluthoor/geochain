interface ScoreBoardProps {
  score: number;
  chainLength: number;
  streak: number;
}

export function ScoreBoard({ score, chainLength, streak }: ScoreBoardProps) {
  return (
    <div className="flex gap-6 text-sm">
      <div className="text-center">
        <div className="text-purple-400 text-xs">Score</div>
        <div className="text-xl font-bold text-purple-200">
          {score.toLocaleString()}
        </div>
      </div>
      <div className="text-center">
        <div className="text-purple-400 text-xs">Chain</div>
        <div className="text-xl font-bold text-white">
          {chainLength}
        </div>
      </div>
      {streak > 1 && (
        <div className="text-center">
          <div className="text-purple-400 text-xs">Streak</div>
          <div className="text-xl font-bold text-gold-400">
            {streak}x
          </div>
        </div>
      )}
    </div>
  );
}
