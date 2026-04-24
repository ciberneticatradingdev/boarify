"use client";

import Image from "next/image";

interface ResultViewProps {
  original: string;
  boarified: string;
  onReset: () => void;
}

export default function ResultView({ original, boarified, onReset }: ResultViewProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = boarified;
    link.download = "boarified.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-black gradient-text">
          You&apos;ve Been Boarified! 🐗
        </h2>
        <p className="text-gray-400 mt-2">Before & After</p>
      </div>

      {/* Side by side comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original */}
        <div className="space-y-3">
          <p className="text-center text-gray-400 font-semibold text-sm uppercase tracking-wider">
            👤 Human (boring)
          </p>
          <div className="relative aspect-square rounded-2xl overflow-hidden glass">
            <Image
              src={original}
              alt="Original photo"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* Boarified */}
        <div className="space-y-3">
          <p className="text-center text-[var(--boar-accent)] font-semibold text-sm uppercase tracking-wider">
            🐗 Boarified (superior)
          </p>
          <div className="relative aspect-square rounded-2xl overflow-hidden glass ring-2 ring-[var(--boar-accent)]/50">
            <Image
              src={boarified}
              alt="Boarified result"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4 flex-wrap">
        <button
          onClick={handleDownload}
          className="px-8 py-3 bg-[var(--boar-brown)] hover:bg-[var(--boar-accent)] 
                     rounded-xl font-bold transition-all duration-300 hover:scale-105
                     flex items-center gap-2"
        >
          ⬇️ Download Boarified
        </button>
        <button
          onClick={onReset}
          className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-bold 
                     transition-all duration-300 border border-gray-600"
        >
          🔄 Boarify Another
        </button>
      </div>
    </div>
  );
}
