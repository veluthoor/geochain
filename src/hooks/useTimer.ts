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
    if (seconds <= 0) {
      // Unlimited mode
      setTimeRemaining(0);
      setIsRunning(false);
      return;
    }
    setTimeRemaining(seconds);
    setIsRunning(true);
  }, [clear]);

  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;

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
  }, [isRunning, clear, timeRemaining > 0]);

  const pause = useCallback(() => {
    clear();
    setIsRunning(false);
  }, [clear]);

  const resume = useCallback(() => {
    if (timeRemaining > 0) {
      setIsRunning(true);
    }
  }, [timeRemaining]);

  const stop = useCallback(() => {
    clear();
    setIsRunning(false);
    setTimeRemaining(0);
  }, [clear]);

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
