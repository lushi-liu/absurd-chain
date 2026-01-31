/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from 'react';
import { GameTask } from '@/types/game-tasks';

export type ShapeType = 'circle' | 'square' | 'triangle';

export const COLORS = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'orange',
  'pink',
  'cyan',
] as const;

export const SHAPES = ['circle', 'square', 'triangle'] as const;

export function useRandomOddOneTask() {
  const [task, setTask] = useState<GameTask | null>(null);

  const generateNewTask = useCallback(() => {
    // We don't need min/max here — task is just a dummy to trigger re-render
    setTask({ type: 'circle', color: 'red', min: 0, max: 9 });
  }, []);

  useEffect(() => {
    generateNewTask();
  }, [generateNewTask]);

  return { task, generateNewTask };
}
