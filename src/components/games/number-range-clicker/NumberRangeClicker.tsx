/* eslint-disable react-hooks/set-state-in-effect */

'use client';

import { useState, useEffect, useCallback } from 'react';

interface NumberItem {
  id: string;
  value: number;
  top: number;
  left: number;
}

interface Props {
  target: { min: number; max: number };
  onCorrect: () => void;
  onWrong: () => void;
}

export default function NumberRangeClicker({ target, onCorrect, onWrong }: Props) {
  const [numbers, setNumbers] = useState<NumberItem[]>([]);

  const generateNumbers = useCallback(() => {
    const allNums = Array.from({ length: 10 }, (_, i) => i);
    const selected = allNums
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 6);
    const minDistance = 18;

    const isTooClose = (t: number, l: number, ex = -1) =>
      numbers.some((n, i) => i !== ex && Math.hypot(t - n.top, l - n.left) < minDistance);

    const newNumbers: NumberItem[] = [];
    for (const value of selected) {
      let attempts = 0;
      let top: number, left: number;
      do {
        top = 20 + Math.random() * 60;
        left = 20 + Math.random() * 60;
        attempts++;
      } while (isTooClose(top, left) && attempts < 50);

      newNumbers.push({ id: crypto.randomUUID(), value, top, left });
    }

    setNumbers(newNumbers.sort(() => Math.random() - 0.5));
  }, [numbers]);

  const handleClick = useCallback(
    (num: NumberItem) => {
      const isCorrect = num.value > target.min && num.value < target.max;
      isCorrect ? onCorrect() : onWrong();
    },
    [target, onCorrect, onWrong]
  );

  useEffect(() => {
    generateNumbers();
  }, [generateNumbers]);

  return (
    <div className="absolute inset-0">
      {numbers.map(num => (
        <div
          key={num.id}
          className="absolute w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 cursor-pointer hover:scale-110 transition-transform duration-150 select-none flex items-center justify-center text-6xl font-black text-white bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full border-4 border-white/30 shadow-2xl"
          style={{ top: `${num.top}%`, left: `${num.left}%`, transform: 'translate(-50%, -50%)' }}
          onClick={() => handleClick(num)}
        >
          {num.value}
        </div>
      ))}
    </div>
  );
}
