export default function LoadingAnimation() {
  const messages = [
    "Growing tusks...",
    "Adding snout...",
    "Sprouting coarse fur...",
    "Channeling inner boar...",
    "Oinking intensifies...",
  ];

  return (
    <div className="text-center space-y-8 py-12">
      {/* Bouncing boar */}
      <div className="text-8xl md:text-9xl boar-bounce">🐗</div>

      {/* Spinner ring */}
      <div className="relative mx-auto w-20 h-20">
        <div className="absolute inset-0 border-4 border-[var(--boar-brown)]/20 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-[var(--boar-accent)] rounded-full spin-slow" />
      </div>

      {/* Random message */}
      <div className="space-y-2">
        <p className="text-xl font-bold text-[var(--boar-accent)] animate-pulse">
          Boarifying...
        </p>
        <p className="text-gray-500 text-sm">
          {messages[Math.floor(Math.random() * messages.length)]}
        </p>
        <p className="text-gray-600 text-xs mt-4">
          This usually takes 10-30 seconds
        </p>
      </div>
    </div>
  );
}
