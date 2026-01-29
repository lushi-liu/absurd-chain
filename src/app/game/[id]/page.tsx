'use client';

import { useSearchParams } from 'next/navigation';
import GameContainer from '@/components/games/GameContainer';

export default function GamePage() {
  const searchParams = useSearchParams();
  const gameId = parseInt(searchParams.get('id') || '1');
  const chainScore = parseInt(searchParams.get('score') || '0');

  return (
    <main className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-purple-950 to-indigo-950">
      <GameContainer>
        <p>
          {gameId} and {chainScore}
        </p>
      </GameContainer>
    </main>
  );
}
