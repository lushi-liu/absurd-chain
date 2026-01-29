/* eslint-disable react-hooks/set-state-in-effect */
// src/components/games/shape-clicker/useRandomShapeTask.ts
import { useState, useEffect, useCallback } from 'react';

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
  const [task, setTask] = useState<{ color: string; type: ShapeType } | null>(null);

  const generateNewTask = useCallback(() => {
    const type = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    setTask({ type, color });
  }, []);

  useEffect(() => {
    generateNewTask();
  }, [generateNewTask]);

  return { task, generateNewTask };
}
