'use client';

import { useState } from 'react';
import GameContainer from '@/components/games/GameContainer';
import GameInstruction from '@/components/games/GameInstruction';
import GameSelector from '@/components/games/GameSelector';

export default function GamePage() {
  const [instructionText, setInstructionText] = useState('Preparing absurdity...');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 md:gap-12 bg-gradient-to-br from-purple-950 to-indigo-950 p-4 md:p-8">
      <GameInstruction text={instructionText} />

      <GameContainer className="mt-6 md:mt-12 lg:mt-16">
        <GameSelector setInstructionText={setInstructionText} />
      </GameContainer>
    </main>
  );
}
