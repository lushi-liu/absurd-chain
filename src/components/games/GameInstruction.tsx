interface GameInstructionProps {
  text: string;
}

export default function GameInstruction({ text }: GameInstructionProps) {
  return (
    <div className="absolute top-8 left-0 right-0 z-20 text-center px-6">
      <div
        className="
          inline-block px-10 py-5 
          bg-black/60 backdrop-blur-md 
          rounded-2xl border-4 border-pink-500/50 
          shadow-2xl
        "
      >
        <h2
          className="
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
          font-black uppercase tracking-wider 
          bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 
          bg-clip-text text-transparent
          drop-shadow-[0_4px_12px_rgba(236,72,153,0.7)]
        "
        >
          {text}
        </h2>
      </div>
    </div>
  );
}
