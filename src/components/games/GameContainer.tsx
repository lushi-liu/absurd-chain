'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function GameContainer({ children, className = '' }: Props) {
  return (
    <div
      className={`
        relative w-full max-w-5xl mx-auto 
        aspect-[4/3] md:aspect-[16/9] 
        bg-gradient-to-br from-indigo-950/80 to-purple-950/80 
        border-8 border-pink-600/70 rounded-3xl 
        overflow-hidden shadow-2xl backdrop-blur-sm
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-black/20" />
      {children}
    </div>
  );
}
