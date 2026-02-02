'use client';
interface GameOverScreenProps {
  finalScore: number;
  onRetry: () => void;
  onHome: () => void;
}

export default function GameOverScreen({ finalScore, onRetry, onHome }: GameOverScreenProps) {
  return (
    <div className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-gradient-to-br from-black/90 to-purple-950/90 backdrop-blur-2xl p-8">
      <div className="text-center space-y-8 max-w-md mx-auto">
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase bg-gradient-to-r from-red-500 via-pink-600 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(239,68,68,0.8)] animate-pulse">
          GAME OVER
        </h2>
        <div className="space-y-4">
          <div className="text-4xl md:text-5xl font-bold text-yellow-400 drop-shadow-2xl">
            Final Score: {finalScore}
          </div>
          <p className="text-xl md:text-2xl opacity-90 italic">Absurdity wins again.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 pt-8">
          <button
            onClick={onRetry}
            className="px-12 py-6 text-2xl bg-emerald-600 hover:bg-emerald-700 rounded-2xl shadow-2xl transition-all hover:scale-105 font-bold border-4 border-emerald-400/50 cursor-pointer"
          >
            RETRY
          </button>
          <button
            onClick={onHome}
            className="px-12 py-6 text-2xl bg-gray-700 hover:bg-gray-800 rounded-2xl shadow-2xl transition-all hover:scale-105 font-bold border-4 border-gray-500/50 cursor-pointer"
          >
            HOME
          </button>
        </div>
      </div>
    </div>
  );
}
