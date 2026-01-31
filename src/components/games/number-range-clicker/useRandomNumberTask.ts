/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from 'react';
import { GameTask } from '@/types/game-tasks';

export type ShapeType = 'circle' | 'square' | 'triangle';

export function useRandomNumberTask() {
  const [task, setTask] = useState<GameTask | null>(null);

  const generateNewTask = useCallback(() => {
    const min = Math.floor(Math.random() * 8);
    const max = min + Math.floor(Math.random() * 4) + 2;
    setTask({ color: 'red', type: 'circle', min, max });
  }, []);

  useEffect(() => {
    generateNewTask();
  }, [generateNewTask]);

  return { task, generateNewTask };
}
