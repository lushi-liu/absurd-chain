// src/components/games/GameSelector.tsx
'use client';

import { useRandomShapeTask } from './shape-clicker/useRandomShapeTask';
import ShapeClicker from './shape-clicker/ShapeClicker';
import GameInstruction from './GameInstruction';
import { ShapeType } from './shape-clicker/useRandomShapeTask';

type GameProps = {
  onRoundComplete?: (wasCorrect: boolean) => void;
};

export default function GameSelector({ onRoundComplete }: GameProps = {}) {
  const { task, generateNewTask } = useRandomShapeTask();

  if (!task) {
    return null;
  }

  const instruction = `CLICK THE ${task.color.toUpperCase()} ${task.type.toUpperCase()}`;

  const handleCorrect = () => {
    generateNewTask(); // next round in same game
    onRoundComplete?.(true);
  };

  const handleWrong = () => {
    generateNewTask(); // still advance
    onRoundComplete?.(false);
  };

  return (
    <>
      <GameInstruction text={instruction} />

      <ShapeClicker target={task} onCorrect={handleCorrect} onWrong={handleWrong} />
    </>
  );
}
