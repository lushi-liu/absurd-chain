'use client';

import { useRandomShapeTask } from './shape-clicker/useRandomShapeTask';
import ShapeClicker from './shape-clicker/ShapeClicker';
import { useEffect, useState } from 'react';

type GameSelectorProps = {
  setInstructionText: (text: string) => void;
  onRoundComplete?: (wasCorrect: boolean) => void;
};

export default function GameSelector({ setInstructionText, onRoundComplete }: GameSelectorProps) {
  const { task, generateNewTask } = useRandomShapeTask();
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    if (task) {
      const instruction = `CLICK THE ${task.color.toUpperCase()} ${task.type.toUpperCase()}`;
      setInstructionText(instruction);
    }
  }, [task, setInstructionText]);

  const showFeedback = (type: 'correct' | 'wrong') => {
    setFeedback(type);
    setTimeout(() => {
      setFeedback(null);
      generateNewTask();
    }, 400);
  };

  const handleCorrect = () => {
    showFeedback('correct');
    onRoundComplete?.(true);
  };

  const handleWrong = () => {
    showFeedback('wrong');
    onRoundComplete?.(false);
  };

  if (!task) {
    return null;
  }

  return (
    <>
      {feedback && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${
            feedback === 'correct' ? 'bg-green-500/40' : 'bg-red-500/40'
          }`}
        >
          <div className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-widest drop-shadow-2xl">
            {feedback === 'correct' ? 'CORRECT!' : 'WRONG!'}
          </div>
        </div>
      )}

      <ShapeClicker target={task} onCorrect={handleCorrect} onWrong={handleWrong} />
    </>
  );
}
