"use client";

import { useCallback, useState, useRef } from "react";

interface UploadZoneProps {
  onUpload: (file: File) => void;
}

export default function UploadZone({ onUpload }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file (JPG, PNG, WebP)");
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        alert("Image too large. Max 20MB.");
        return;
      }
      onUpload(file);
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => fileInputRef.current?.click()}
      className={`
        relative cursor-pointer rounded-3xl border-2 border-dashed p-16
        transition-all duration-300 text-center
        ${
          isDragging
            ? "border-[var(--boar-accent)] bg-[var(--boar-dark)]/30 scale-[1.02]"
            : "border-gray-600 hover:border-[var(--boar-brown)] upload-zone-idle"
        }
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <div className="space-y-6">
        <div className="text-6xl md:text-8xl">
          {isDragging ? "🐽" : "📸"}
        </div>

        <div className="space-y-2">
          <p className="text-xl md:text-2xl font-bold text-gray-200">
            {isDragging ? "Drop it like it's hot!" : "Drop your photo here"}
          </p>
          <p className="text-gray-500">
            or click to select • JPG, PNG, WebP • Max 20MB
          </p>
        </div>

        <div className="inline-block px-6 py-3 bg-[var(--boar-brown)]/20 border border-[var(--boar-brown)]/40 
                        rounded-xl text-[var(--boar-accent)] font-semibold">
          Choose Photo
        </div>
      </div>
    </div>
  );
}
