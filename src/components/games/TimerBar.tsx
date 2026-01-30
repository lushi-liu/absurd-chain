/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState, useRef } from 'react';

type TimerBarProps = {
  durationSeconds: number;
  onTimeUp: () => void;
  isActive: boolean;
  resetKey: string | number;
};

export default function TimerBar({ durationSeconds, onTimeUp, isActive, resetKey }: TimerBarProps) {
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const hasTimedUp = useRef(false);

  useEffect(() => {
    setTimeLeft(durationSeconds);
    hasTimedUp.current = false;
  }, [resetKey, durationSeconds]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const next = Math.max(0, prev - 0.1);

        if (next <= 0 && !hasTimedUp.current) {
          hasTimedUp.current = true;
          onTimeUp();
        }

        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, onTimeUp]);

  const percentage = (timeLeft / durationSeconds) * 100;

  return (
    <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-8 h-64 bg-black/50 backdrop-blur-sm rounded-full border-2 border-pink-500/60 overflow-hidden shadow-xl">
      <div
        className="w-full bg-gradient-to-t from-red-600 via-yellow-400 to-green-500 transition-all duration-100 ease-linear"
        style={{ height: `${percentage}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs tracking-wider rotate-90">
        {Math.ceil(timeLeft)}s
      </div>
    </div>
  );
}
