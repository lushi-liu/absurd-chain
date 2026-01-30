'use client';

import GameContainer from '@/components/games/GameContainer';
import GameSelector from '@/components/games/GameSelector';

export default function GamePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 md:gap-12 bg-gradient-to-br from-purple-950 to-indigo-950 p-4 md:p-8">
      <GameContainer className="mt-4 md:mt-8">
        <GameSelector />
      </GameContainer>
    </main>
  );
}
