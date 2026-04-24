"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import ContractAddress from "@/components/ContractAddress";
import Gallery from "@/components/Gallery";
import UploadZone from "@/components/UploadZone";
import ResultView from "@/components/ResultView";
import LoadingAnimation from "@/components/LoadingAnimation";

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [boarifiedImage, setBoarifiedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setError(null);
    setIsLoading(true);
    setBoarifiedImage(null);

    // Show original preview
    const reader = new FileReader();
    reader.onload = (e) => setOriginalImage(e.target?.result as string);
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/transform", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Boarification failed!");
      }

      const data = await response.json();
      setBoarifiedImage(data.image);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. The boar gods are displeased.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setBoarifiedImage(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen">
      <Hero />

      <ContractAddress />

      {/* Upload / Result Section */}
      <section id="upload" className="max-w-4xl mx-auto px-4 py-16">
        {!originalImage && !isLoading && (
          <UploadZone onUpload={handleUpload} />
        )}

        {isLoading && <LoadingAnimation />}

        {error && (
          <div className="text-center space-y-4">
            <div className="glass rounded-2xl p-6 max-w-md mx-auto">
              <p className="text-red-400 text-lg">⚠️ {error}</p>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-[var(--boar-brown)] hover:bg-[var(--boar-accent)] rounded-xl transition-colors font-semibold"
            >
              Try Again
            </button>
          </div>
        )}

        {boarifiedImage && originalImage && (
          <ResultView
            original={originalImage}
            boarified={boarifiedImage}
            onReset={handleReset}
          />
        )}
      </section>

      <Gallery />

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm border-t border-gray-800">
        <p>BOARIFY 🐗 — No boars were harmed in the making of this app</p>
        <p className="mt-1">Powered by AI & questionable life choices</p>
      </footer>
    </main>
  );
}
