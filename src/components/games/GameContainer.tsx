'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GameContainerProps {
  children: ReactNode;
  className?: string;
}

export default function GameContainer({ children, className }: GameContainerProps) {
  return (
    <div
      className={cn(
        'relative w-full max-w-5xl mx-auto',
        'aspect-[4/3] sm:aspect-[16/9]',
        'bg-gradient-to-br from-indigo-950/70 via-purple-950/60 to-black/70',
        'border-8 border-pink-600/60 rounded-3xl',
        'overflow-hidden shadow-2xl backdrop-blur-sm',
        className
      )}
    >
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      {children}
    </div>
  );
}
