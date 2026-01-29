import { ReactNode } from 'react';

interface ArenaProps {
  children: ReactNode;
  className?: string;
}

export default function Arena({ children, className = '' }: ArenaProps) {
  return (
    <div
      className={`w-[600px] h-[600px] bg-black/20 border-4 border-purple-500/80 rounded-2xl shadow-2xl shadow-purple-500/50 backdrop-blur-md flex items-center justify-center relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-pink-900/30 animate-pulse" />
      {children}
    </div>
  );
}
