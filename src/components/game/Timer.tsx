import clsx from 'clsx';

interface TimerProps {
  timeRemaining: number;
}

export function Timer({ timeRemaining }: TimerProps) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const isLow = timeRemaining <= 15;
  const isCritical = timeRemaining <= 5;

  return (
    <div
      className={clsx(
        'text-2xl font-mono font-bold tabular-nums transition-colors',
        isCritical && 'text-danger-500 animate-pulse',
        isLow && !isCritical && 'text-gold-500',
        !isLow && 'text-gray-700 dark:text-gray-300',
      )}
    >
      {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}
