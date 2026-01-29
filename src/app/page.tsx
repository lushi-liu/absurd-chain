export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="text-6xl font-black uppercase tracking-widest animate-pulse mb-8 bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
        Absurd Chain
      </h1>
      <p className="text-xl mb-12 max-w-md opacity-90">
        Survive the chain of stupidity. One absurd game at a time.
      </p>
      <div className="space-y-4">
        <a className="px-12 py-6 text-2xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 block mx-auto">
          Start the Absurdity →
        </a>
        <p className="text-sm opacity-70">Warning: Highly addictive pointlessness</p>
      </div>
    </main>
  );
}
