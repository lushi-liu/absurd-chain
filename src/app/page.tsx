'use client';

import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);

  const handleStart = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!name.trim()) {
      e.preventDefault();
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="text-6xl font-black uppercase tracking-widest animate-pulse mb-8 bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl">
        Absurd Chain
      </h1>
      <p className="text-xl mb-12 max-w-md opacity-90">
        Survive the chain of stupidity. One absurd game at a time.
      </p>

      <div className="w-full max-w-md space-y-6">
        <div>
          <input
            type="text"
            value={name}
            onChange={e => {
              setName(e.target.value);
              if (error) setError(false);
            }}
            placeholder="Enter your name..."
            className={`
              w-full px-6 py-4 text-xl bg-black/40 border-2 rounded-xl text-white placeholder-gray-400 
              focus:outline-none focus:border-purple-500 transition-all
              ${error ? 'border-red-500 animate-shake' : 'border-purple-500/50'}
            `}
          />
          {error && <p className="mt-2 text-red-400 text-sm font-medium">Please enter a name</p>}
        </div>

        <a
          href={`/game/1${name.trim() ? `?name=${encodeURIComponent(name.trim())}` : ''}`}
          onClick={handleStart}
          className={`
            inline-block px-12 py-6 text-2xl font-bold rounded-2xl shadow-2xl transition-all duration-300
            ${
              name.trim()
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:scale-105'
                : 'bg-gray-700 cursor-not-allowed opacity-60'
            }
          `}
        >
          Start the Absurdity →
        </a>

        <p className="text-sm opacity-70">Warning: Highly addictive pointlessness</p>
      </div>
    </main>
  );
}
