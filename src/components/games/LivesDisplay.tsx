// src/components/games/LivesDisplay.tsx
'use client';

type LivesDisplayProps = {
  lives: number;
  maxLives: number;
};

export default function LivesDisplay({ lives, maxLives }: LivesDisplayProps) {
  return (
    <div className="absolute top-4 right-4 z-30 flex gap-3">
      {Array.from({ length: maxLives }).map((_, i) => (
        <span
          key={i}
          className={`text-4xl md:text-5xl drop-shadow-lg transition-all duration-300 ${
            i < lives ? 'text-red-500 scale-100' : 'text-gray-600 opacity-40 scale-90'
          }`}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
