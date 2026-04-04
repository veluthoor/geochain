import { useState, useRef, useCallback, useEffect } from 'react';

interface UseTimerOptions {
  onExpire: () => void;
}

export function useTimer({ onExpire }: UseTimerOptions) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback((seconds: number) => {
    clear();
    setTimeRemaining(seconds);
    setIsRunning(true);
  }, [clear]);

  useEffect(() => {
    if (!isRunning) {
      clear();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          onExpireRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clear;
  }, [isRunning, clear]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    setTimeRemaining((prev) => {
      if (prev > 0) setIsRunning(true);
      return prev;
    });
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    setTimeRemaining(0);
  }, []);

  const penalize = useCallback((seconds: number) => {
    setTimeRemaining((prev) => {
      const next = prev - seconds;
      if (next <= 0) {
        setIsRunning(false);
        onExpireRef.current();
        return 0;
      }
      return next;
    });
  }, []);

  return { timeRemaining, isRunning, start, pause, resume, stop, penalize };
}
