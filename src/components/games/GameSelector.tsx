/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useRandomShapeTask } from './shape-clicker/useRandomShapeTask';
import ShapeClicker from './shape-clicker/ShapeClicker';
import { useRandomNumberTask } from './number-range-clicker/useRandomNumberTask';
import NumberRangeClicker from './number-range-clicker/NumberRangeClicker';
import { useRandomOddOneTask } from './odd-one-out-clicker/useRandomOddOneTask';
import OddOneOutClicker from './odd-one-out-clicker/OddOneOutClicker';
import TimerBar from './TimerBar';
import LivesDisplay from './LivesDisplay';
import { GameTask } from '@/types/game-tasks';
import ScoreDisplay from './ScoreDisplay';
import GameOverScreen from './GameOverScreen';

type GameSelectorProps = {
  setInstructionText: (text: string) => void;
  onRoundComplete?: (wasCorrect: boolean) => void;
};

const GAME_COUNT = 3;

export default function GameSelector({ setInstructionText, onRoundComplete }: GameSelectorProps) {
  const router = useRouter();

  const shapeHook = useRandomShapeTask();
  const numberHook = useRandomNumberTask();
  const oddOneHook = useRandomOddOneTask();

  const [gameId, setGameId] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | 'timeup' | null>(null);
  const [timerActive, setTimerActive] = useState(true);
  const [resetCounter, setResetCounter] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const pendingFeedback = useRef<'correct' | 'wrong' | 'timeup' | null>(null);

  useEffect(() => {
    setGameId(Math.floor(Math.random() * GAME_COUNT));
  }, []);
  const currentHook = gameId === 0 ? shapeHook : gameId === 1 ? numberHook : oddOneHook;
  const task: GameTask | null = currentHook.task;
  const generateNewTask = currentHook.generateNewTask;

  useEffect(() => {
    let instruction = '';
    if (gameId === 0 && task) {
      const t = task as { color: string; type: string };
      instruction = `CLICK THE ${t.color.toUpperCase()} ${t.type.toUpperCase()}`;
    } else if (gameId === 1 && task) {
      const t = task as { min: number; max: number };
      instruction = `CLICK A NUMBER GREATER THAN ${t.min} BUT LESS THAN ${t.max}`;
    } else if (gameId === 2) {
      instruction = 'CLICK THE SHAPE WITH NO PAIR';
    }

    if (instruction) {
      setInstructionText(instruction);
    }

    setTimerActive(true);
    setFeedback(null);
    pendingFeedback.current = null;
    setResetCounter(prev => prev + 1);
  }, [gameId, task, setInstructionText]);

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
        setLives(prev => {
          const newLives = Math.max(0, prev - 1);
          if (newLives === 0) {
            setTimeout(() => setGameOver(true), 1200);
          }
          return newLives;
        });
      }
    }, 0);
  };

  const handleCorrect = () => {
    showFeedback('correct');
    setScore(prev => prev + 1);
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
        if (lives > 0) {
          setGameId(Math.floor(Math.random() * GAME_COUNT));
          generateNewTask();
        }
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [feedback]);

  if (!task && gameId !== 2) {
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
      <ScoreDisplay score={score} />
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

      {gameOver && (
        <GameOverScreen
          finalScore={score}
          onRetry={() => {
            setGameOver(false);
            setLives(3);
            setScore(0);
            setTimerActive(true);
            setFeedback(null);
            setGameId(Math.floor(Math.random() * GAME_COUNT));
            generateNewTask();
            setResetCounter(prev => prev + 1);
          }}
          onHome={() => router.push('/')}
        />
      )}

      {gameId === 0 && (
        <ShapeClicker target={task as GameTask} onCorrect={handleCorrect} onWrong={handleWrong} />
      )}
      {gameId === 1 && (
        <NumberRangeClicker
          target={task as GameTask}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      )}
      {gameId === 2 && (
        <OddOneOutClicker roundKey={resetCounter} onCorrect={handleCorrect} onWrong={handleWrong} />
      )}
    </div>
  );
}
