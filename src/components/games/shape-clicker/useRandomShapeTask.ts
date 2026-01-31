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

export function useRandomShapeTask() {
  const [task, setTask] = useState<GameTask | null>(null);

  const generateNewTask = useCallback(() => {
    const type = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    setTask({ type, color, min: 0, max: 9 });
  }, []);

  useEffect(() => {
    generateNewTask();
  }, [generateNewTask]);

  return { task, generateNewTask };
}
