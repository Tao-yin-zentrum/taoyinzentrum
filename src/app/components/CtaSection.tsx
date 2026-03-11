interface CtaSectionProps {
  content?: {
    cta_title?: string;
    cta_description?: string;
    cta_background?: { filename: string };
    cta_buttons?: string;
  };
}

export function CtaSection({ content }: CtaSectionProps) {
  const defaultTitle = "Finde deine Mitte. Spüre dein Chi.";
  const defaultDesc = "Tauche ein in einen Raum für Achtsamkeit, Heilung und innere Balance. Entdecke sanfte taoistische Praktiken, die Körper, Geist und Seele verbinden. Hier findest du Ruhe, neue Energie und Inspiration für deinen Alltag – unabhängig von Erfahrung oder Lebensphase. Komm an, atme durch und lass dich begleiten auf deinem Weg zu mehr Wohlbefinden.";
  const defaultImage = "https://cdn.prod.website-files.com/image-generation-assets/ee125b47-41aa-4ec5-a593-18b12a1fca27.avif";
  
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={content?.cta_background?.filename || defaultImage}
        alt="Hintergrund"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center py-20">
        <h2 className="text-white text-[2.5rem] lg:text-[3rem] mb-6 !not-italic" style={{ fontStyle: 'italic' }}>
          {content?.cta_title || defaultTitle}
        </h2>
        <p className="text-white/70 text-[16px] leading-relaxed mb-10 max-w-2xl mx-auto">
          {content?.cta_description || defaultDesc}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="tel:+4915115539416"
            className="bg-secondary text-secondary-foreground px-7 py-3 rounded-lg text-[15px] hover:bg-secondary/90 transition-colors"
          >
            Telefon
          </a>
          <a
            href="mailto:info@taoyin-zentrum.de?subject=Neue%20Anfrage%20Taoyin%20Zentrum"
            className="bg-secondary text-secondary-foreground px-7 py-3 rounded-lg text-[15px] hover:bg-secondary/90 transition-colors"
          >
            E-Mail
          </a>
          <a
            href="https://wa.me/4915115539416"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary text-secondary-foreground px-7 py-3 rounded-lg text-[15px] hover:bg-secondary/90 transition-colors"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}