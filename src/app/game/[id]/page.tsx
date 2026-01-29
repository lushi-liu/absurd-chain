'use client';

import { useSearchParams } from 'next/navigation';
import GameContainer from '@/components/games/GameContainer';
import GameInstruction from '@/components/games/GameInstruction';

export default function GamePage() {
  const searchParams = useSearchParams();
  const gameId = parseInt(searchParams.get('id') || '1');
  const chainScore = parseInt(searchParams.get('score') || '0');

  const currentInstruction = 'Click the RED CIRCLE';

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 md:gap-12 bg-gradient-to-br from-purple-950 to-indigo-950 p-4 md:p-8">
      <div>
        <GameInstruction text={currentInstruction} />
      </div>
      <GameContainer>
        <p>
          {gameId} and {chainScore}
        </p>
      </GameContainer>
    </main>
  );
}
