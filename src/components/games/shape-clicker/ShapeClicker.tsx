/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useState, useCallback, useEffect } from 'react';
import { ShapeType } from './useRandomShapeTask';

interface Shape {
  id: string;
  type: ShapeType;
  color: string;
  top: number;
  left: number;
}

interface Props {
  target: { color: string; type: ShapeType };
  onCorrect: () => void;
  onWrong: () => void;
}

const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan'];

export default function ShapeClicker({ target, onCorrect, onWrong }: Props) {
  const [shapes, setShapes] = useState<Shape[]>([]);

  const generateShapes = useCallback(() => {
    const newShapes: Shape[] = [];
    const minDistance = 16;

    const isTooClose = (t: number, l: number, ex = -1) =>
      newShapes.some((s, i) => i !== ex && Math.hypot(t - s.top, l - s.left) < minDistance);

    let top: number,
      left: number,
      attempts = 0;
    do {
      top = 20 + Math.random() * 60;
      left = 20 + Math.random() * 60;
      attempts++;
    } while (isTooClose(top, left) && attempts < 50);

    newShapes.push({ id: crypto.randomUUID(), type: target.type, color: target.color, top, left });

    for (let i = 0; i < 9; i++) {
      attempts = 0;
      do {
        top = 20 + Math.random() * 60;
        left = 20 + Math.random() * 60;
        attempts++;
      } while (isTooClose(top, left) && attempts < 50);

      const wrongType = ['circle', 'square', 'triangle'][
        Math.floor(Math.random() * 3)
      ] as ShapeType;
      const wrongColor = COLORS[Math.floor(Math.random() * COLORS.length)];

      newShapes.push({ id: crypto.randomUUID(), type: wrongType, color: wrongColor, top, left });
    }

    setShapes(newShapes.sort(() => Math.random() - 0.5));
  }, [target]);

  const handleClick = useCallback(
    (shape: Shape) => {
      if (shape.type === target.type && shape.color === target.color) {
        onCorrect();
      } else {
        onWrong();
      }
    },
    [target, onCorrect, onWrong]
  );

  useEffect(() => {
    generateShapes();
  }, [generateShapes]);

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
