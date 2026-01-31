'use client';

type ScoreDisplayProps = {
  score: number;
};

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="absolute top-4 left-4 z-30 px-6 py-3 bg-black/60 backdrop-blur-md rounded-2xl border-4 border-yellow-500/60 shadow-2xl">
      <div className="text-3xl md:text-4xl font-black text-yellow-400 tracking-wider drop-shadow-lg">
        SCORE: {score}
      </div>
    </div>
  );
}
