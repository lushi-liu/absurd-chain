/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useRandomShapeTask } from './shape-clicker/useRandomShapeTask';
import ShapeClicker from './shape-clicker/ShapeClicker';
import TimerBar from './TimerBar';
import { useEffect, useState, useRef } from 'react';

type GameSelectorProps = {
  setInstructionText: (text: string) => void;
  onRoundComplete?: (wasCorrect: boolean) => void;
};

export default function GameSelector({ setInstructionText, onRoundComplete }: GameSelectorProps) {
  const { task, generateNewTask } = useRandomShapeTask();
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | 'timeup' | null>(null);
  const [timerActive, setTimerActive] = useState(true);
  const [resetCounter, setResetCounter] = useState(0);
  const pendingFeedback = useRef<'correct' | 'wrong' | 'timeup' | null>(null);

  useEffect(() => {
    if (task) {
      const instruction = `CLICK THE ${task.color.toUpperCase()} ${task.type.toUpperCase()}`;
      setInstructionText(instruction);
      setTimerActive(true);
      setFeedback(null);
      pendingFeedback.current = null;
      setResetCounter(prev => prev + 1);
    }
  }, [task, setInstructionText]);

  useEffect(() => {
    if (pendingFeedback.current) {
      setFeedback(pendingFeedback.current);
      pendingFeedback.current = null;
    }
  }, [pendingFeedback.current]);

  const showFeedback = (type: 'correct' | 'wrong' | 'timeup') => {
    setTimeout(() => {
      setFeedback(type);
      setTimerActive(false);
    }, 0);
  };

  const handleCorrect = () => {
    showFeedback('correct');
    onRoundComplete?.(true);
  };

  const handleWrong = () => {
    showFeedback('wrong');
    onRoundComplete?.(false);
  };

  const handleTimeUp = () => {
    showFeedback('timeup');
    onRoundComplete?.(false);
  };

  useEffect(() => {
    if (feedback) {
      const delay = 1000;
      const timer = setTimeout(() => {
        setFeedback(null);
        generateNewTask();
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [feedback, generateNewTask]);

  if (!task) {
    return null;
  }

  return (
    <div className="relative w-full h-full">
      <TimerBar
        durationSeconds={3}
        onTimeUp={handleTimeUp}
        isActive={timerActive}
        resetKey={resetCounter}
      />

      {feedback && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none ${
            feedback === 'correct'
              ? 'bg-green-500/40'
              : feedback === 'wrong'
                ? 'bg-red-500/40'
                : 'bg-orange-500/50'
          }`}
        >
          <div className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest drop-shadow-2xl animate-pulse">
            {feedback === 'correct' ? 'CORRECT!' : feedback === 'wrong' ? 'WRONG!' : 'TIME UP!'}
          </div>
        </div>
      )}

      <ShapeClicker target={task} onCorrect={handleCorrect} onWrong={handleWrong} />
    </div>
  );
}
