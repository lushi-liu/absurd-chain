'use client';

import { useSearchParams } from 'next/navigation';
import GameContainer from '@/components/games/GameContainer';
import GameInstruction from '@/components/games/GameInstruction';
import ShapeClicker from '@/components/games/shape-clicker/ShapeClicker';

export default function GamePage() {
  const searchParams = useSearchParams();
  const gameId = parseInt(searchParams.get('id') || '1');
  const chainScore = parseInt(searchParams.get('score') || '0');

  const fixedTarget = {
    color: 'red',
    type: 'circle' as const,
  };

  const currentInstruction = 'CLICK THE RED CIRCLE';

  const handleCorrect = () => {
    console.log('Correct! (red circle clicked)');
  };

  const handleWrong = () => {
    console.log('Wrong!');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 md:gap-12 bg-gradient-to-br from-purple-950 to-indigo-950 p-4 md:p-8">
      <div>
        <GameInstruction text={currentInstruction} />
      </div>
      <GameContainer>
        <p>
          <ShapeClicker target={fixedTarget} onCorrect={handleCorrect} onWrong={handleWrong} />
        </p>
      </GameContainer>
    </main>
  );
}
