import Image from "next/image";

const samples = [
  { src: "/samples/sample_01.png", alt: "Boarified human 1" },
  { src: "/samples/sample_02.png", alt: "Boarified human 2" },
  { src: "/samples/sample_03.png", alt: "Boarified human 3" },
  { src: "/samples/sample_04.png", alt: "Boarified human 4" },
];

export default function Gallery() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black gradient-text mb-4">
          Hall of Boars
        </h2>
        <p className="text-gray-400 text-lg">
          Previous victims — er, satisfied customers
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {samples.map((sample, i) => (
          <div
            key={i}
            className="group relative aspect-square rounded-2xl overflow-hidden glass 
                       hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <Image
              src={sample.src}
              alt={sample.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 
                            transition-opacity duration-300">
              <span className="text-sm font-semibold text-white">🐗 Boarified #{i + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
