'use client';

type ScoreDisplayProps = {
  score: number;
};

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="absolute top-4 left-1 md:left-3 z-30 px-3 py-2 bg-black/70 backdrop-blur-md rounded-xl border-2 border-yellow-500/70 shadow-xl">
      <div className="text-xl md:text-3xl font-black text-yellow-300 tracking-wide drop-shadow-md">
        {score}
      </div>
    </div>
  );
}
