interface GameInstructionProps {
  text: string;
}

export default function GameInstruction({ text }: GameInstructionProps) {
  return (
    <div className="absolute top-8 left-0 right-0 z-20 text-center px-6">
      <div
        className="
          mx-auto w-full max-w-5xl
          px-6 py-2 sm:px-10 sm:py-3
          bg-black/60 backdrop-blur-md 
          rounded-2xl border-4 border-pink-500/50 
          shadow-2xl text-center
        "
      >
        <h2
          className="
          text-4xl sm:text-1xl md:text-2xl lg:text-3xl 
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
