// Real image URLs from CDN
const heroShelf = "https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5371146ec6241e81774b7_Estela-byaylin-52-min.jpg";
const heroPortrait = "https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5370f3e66ed943079d4c6_Estela-byaylin-26-min.jpg";

export function Hero() {
  return (
    <header className="w-full py-12 md:py-16 lg:py-20 overflow-hidden bg-[#eff5f6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            <h1 className="mb-6">
              Willkommen im Taoyin Zentrum Ingolstadt
            </h1>
            <p className="text-[17px] leading-[1.6] text-foreground/70 mb-8 max-w-lg">
              Willkommen in deinem Raum für Achtsamkeit, Heilung und innere
              Balance. Entdecke sanfte taoistische Praktiken, die Körper, Geist
              und Seele verbinden – für mehr Energie, Gelassenheit und
              Wohlbefinden im Alltag.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#Details"
                className="inline-flex items-center justify-center bg-secondary text-secondary-foreground px-7 py-3 rounded-lg text-[15px] hover:bg-secondary/90 transition-colors"
              >
                Mehr erfahren
              </a>
              <a
                href="#Angebote"
                className="inline-flex items-center justify-center border border-[var(--wf-inverse-a20)] text-foreground px-7 py-3 rounded-lg text-[15px] hover:border-[var(--wf-inverse-a60)] transition-colors"
              >
                Angebote entdecken
              </a>
            </div>
          </div>

          {/* Right: Image Composition (slight rotation like original) */}
          <div className="order-1 lg:order-2">
            <div className="lg:rotate-3 transition-transform">
              <div className="flex flex-col gap-3">
                <img
                  src={heroShelf}
                  alt="Zen-Einrichtung mit Vasen und Räucherstäbchen"
                  className="w-full h-auto object-cover rounded-lg aspect-[3/2]"
                />
                <img
                  src={heroPortrait}
                  alt="Estela – Taoyin Zentrum Ingolstadt"
                  className="w-full h-auto object-cover rounded-lg aspect-[3/2]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}