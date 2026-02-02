'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackHomeButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/')}
      className="
        absolute top-4 left-4 z-40 
        flex items-center gap-2 px-5 py-3 
        bg-black/60 backdrop-blur-md rounded-xl 
        border-2 border-purple-500/60 text-purple-300 
        hover:bg-black/80 hover:text-purple-200 
        transition-all duration-200 shadow-lg
        text-lg font-semibold
        cursor-pointer
      "
    >
      <ArrowLeft size={20} />
      Back Home
    </button>
  );
}
