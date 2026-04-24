export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--boar-dark)] via-transparent to-transparent opacity-60" />

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        {/* Logo / Title */}
        <div className="space-y-2">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter gradient-text">
            BOARIFY
          </h1>
          <div className="text-5xl md:text-7xl">🐗</div>
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Upload your photo. Get <span className="text-[var(--boar-accent)] font-bold">boarified</span>.
          <br />
          <span className="text-gray-500 text-lg">AI-powered human-to-boar transformation</span>
        </p>

        {/* CTA */}
        <a
          href="#upload"
          className="inline-block px-8 py-4 bg-[var(--boar-brown)] hover:bg-[var(--boar-accent)] 
                     rounded-2xl text-lg font-bold transition-all duration-300 
                     hover:scale-105 hover:shadow-lg hover:shadow-[var(--boar-brown)]/30"
        >
          🐽 Transform Me Into a Boar
        </a>

        {/* Stats */}
        <div className="flex justify-center gap-8 pt-4 text-gray-500 text-sm">
          <span>100% Boar Guarantee</span>
          <span>•</span>
          <span>No Humans Left Behind</span>
          <span>•</span>
          <span>Oink Approved</span>
        </div>
      </div>
    </section>
  );
}
