/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ShapeType, COLORS, SHAPES } from './useRandomOddOneTask';

interface ShapeItem {
  id: string;
  type: ShapeType;
  color: string;
  top: number;
  left: number;
}

interface Props {
  roundKey: number | string;
  onCorrect: () => void;
  onWrong: () => void;
}

export default function OddOneOutClicker({ roundKey, onCorrect, onWrong }: Props) {
  const [shapes, setShapes] = useState<ShapeItem[]>([]);

  const generateShapes = useCallback(() => {
    const pairsCount = 3;
    const newShapes: ShapeItem[] = [];

    for (let i = 0; i < pairsCount; i++) {
      const type = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      let top: number,
        left: number,
        attempts = 0;
      do {
        top = 15 + Math.random() * 70;
        left = 15 + Math.random() * 70;
        attempts++;
      } while (newShapes.some(s => Math.hypot(top - s.top, left - s.left) < 18) && attempts < 100);

      newShapes.push({ id: crypto.randomUUID(), type, color, top, left });

      attempts = 0;
      do {
        top = top + (Math.random() - 0.5) * 20;
        left = left + (Math.random() - 0.5) * 20;
        attempts++;
      } while (newShapes.some(s => Math.hypot(top - s.top, left - s.left) < 12) && attempts < 100);

      newShapes.push({ id: crypto.randomUUID(), type, color, top, left });
    }

    let oddType: ShapeType, oddColor: string;
    do {
      oddType = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      oddColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    } while (newShapes.some(s => s.type === oddType && s.color === oddColor));

    let top: number,
      left: number,
      attempts = 0;
    do {
      top = 15 + Math.random() * 70;
      left = 15 + Math.random() * 70;
      attempts++;
    } while (newShapes.some(s => Math.hypot(top - s.top, left - s.left) < 18) && attempts < 100);

    newShapes.push({ id: crypto.randomUUID(), type: oddType, color: oddColor, top, left });

    setShapes(newShapes.sort(() => Math.random() - 0.5));
  }, []);

  const handleClick = useCallback(
    (clicked: ShapeItem) => {
      const matches = shapes.filter(
        s => s.id !== clicked.id && s.type === clicked.type && s.color === clicked.color
      ).length;
      if (matches === 0) {
        onCorrect();
      } else {
        onWrong();
      }
    },
    [shapes, onCorrect, onWrong]
  );

  useEffect(() => {
    generateShapes();
  }, [generateShapes, roundKey]);

  return (
    <div className="absolute inset-0">
      {shapes.map(shape => (
        <div
          key={shape.id}
          className="absolute w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 cursor-pointer hover:scale-110 transition-transform duration-150 select-none"
          style={{
            top: `${shape.top}%`,
            left: `${shape.left}%`,
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => handleClick(shape)}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
            {shape.type === 'circle' && (
              <circle cx="50" cy="50" r="45" fill={shape.color} stroke="white" strokeWidth="4" />
            )}
            {shape.type === 'square' && (
              <rect
                x="8"
                y="8"
                width="84"
                height="84"
                rx="12"
                fill={shape.color}
                stroke="white"
                strokeWidth="4"
              />
            )}
            {shape.type === 'triangle' && (
              <polygon
                points="50,12 12,88 88,88"
                fill={shape.color}
                stroke="white"
                strokeWidth="4"
              />
            )}
          </svg>
        </div>
      ))}
    </div>
  );
}
