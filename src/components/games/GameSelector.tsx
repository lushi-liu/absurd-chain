/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useRandomShapeTask } from './shape-clicker/useRandomShapeTask';
import ShapeClicker from './shape-clicker/ShapeClicker';
import { useRandomNumberTask } from './number-range-clicker/useRandomNumberTask';
import NumberRangeClicker from './number-range-clicker/NumberRangeClicker';
import TimerBar from './TimerBar';
import LivesDisplay from './LivesDisplay';

type GameSelectorProps = {
  setInstructionText: (text: string) => void;
  onRoundComplete?: (wasCorrect: boolean) => void;
};

const GAME_COUNT = 2;

export default function GameSelector({ setInstructionText, onRoundComplete }: GameSelectorProps) {
  const router = useRouter();

  const shapeHook = useRandomShapeTask();
  const numberHook = useRandomNumberTask();

  const [gameId, setGameId] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | 'timeup' | null>(null);
  const [timerActive, setTimerActive] = useState(true);
  const [resetCounter, setResetCounter] = useState(0);
  const [lives, setLives] = useState(3);
  const pendingFeedback = useRef<'correct' | 'wrong' | 'timeup' | null>(null);

  useEffect(() => {
    setGameId(Math.floor(Math.random() * GAME_COUNT));
  }, []);

  const currentTask = gameId === 0 ? shapeHook.task : numberHook.task;
  const generateNewTask = gameId === 0 ? shapeHook.generateNewTask : numberHook.generateNewTask;

  useEffect(() => {
    if (!currentTask) return;

    let instruction = '';
    if (gameId === 0) {
      const t = currentTask as { color: string; type: string }; // shape task
      instruction = `CLICK THE ${t.color.toUpperCase()} ${t.type.toUpperCase()}`;
    } else {
      const t = currentTask as { min: number; max: number }; // number task
      instruction = `CLICK A NUMBER GREATER THAN ${t.min} BUT LESS THAN ${t.max}`;
    }

    setInstructionText(instruction);
    setTimerActive(true);
    setFeedback(null);
    pendingFeedback.current = null;
    setResetCounter(prev => prev + 1);
  }, [currentTask, gameId, setInstructionText]);

  useEffect(() => {
    if (pendingFeedback.current) {
      setFeedback(pendingFeedback.current);
      setTimerActive(false);
      pendingFeedback.current = null;
    }
  }, []);

  const showFeedback = (type: 'correct' | 'wrong' | 'timeup') => {
    setTimeout(() => {
      setFeedback(type);
      setTimerActive(false);
      if (type === 'wrong' || type === 'timeup') {
        setLives(prev => Math.max(0, prev - 1));
      }
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
        if (lives <= 0) {
          router.push('/');
        } else {
          setGameId(Math.floor(Math.random() * GAME_COUNT));
          generateNewTask();
        }
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [feedback, lives, generateNewTask, router]);

  if (!currentTask) {
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

      <LivesDisplay lives={lives} maxLives={3} />

      {feedback && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-auto ${
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

      {gameId === 0 && (
        <ShapeClicker target={currentTask as any} onCorrect={handleCorrect} onWrong={handleWrong} />
      )}
      {gameId === 1 && (
        <NumberRangeClicker
          target={currentTask as any}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      )}
    </div>
  );
}
