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
    <section className="relative w-full min-h-dvh grid grid-rows-1 overflow-hidden">
      {/* Background image + overlay — Webflow: position_relative > image_cover + overlay_opacity-middle mask_top */}
      <div className="absolute inset-0">
        <img
          src={content?.cta_background?.filename || defaultImage}
          alt="Hintergrund"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* overlay_opacity-middle mask_top: gradient from transparent (top) to dark (bottom) */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, rgba(3, 123, 175, 0.45) 40%, rgba(3, 123, 175, 0.7) 100%)",
          }}
        />
      </div>

      {/* Content — Webflow: container > card_body > header.is-align-center */}
      <div className="relative z-10 flex items-end pb-[var(--section-padding)] max-w-[var(--container-width)] mx-auto px-[var(--container-padding)] w-full">
        <div className="w-full">
          <div className="text-center max-w-[var(--container-sm-width)] mx-auto">
            <h2 className="text-white mb-[var(--space-1x)]" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              {content?.cta_title || defaultTitle}
            </h2>
            <p className="text-white/70 text-[var(--text-lg-size)] leading-[1.6] mb-[var(--space-2x)] max-w-[48rem] mx-auto">
              {content?.cta_description || defaultDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-[var(--space-0-5x)]">
              <a
                href="tel:+4915115539416"
                className="inline-flex items-center justify-center bg-secondary text-secondary-foreground py-[1em] px-[1.5em] rounded-[var(--radius-button)] text-[1rem] leading-[1.2] hover:opacity-90 transition-all"
              >
                Telefon
              </a>
              <a
                href="mailto:info@taoyin-zentrum.de?subject=Neue%20Anfrage%20Taoyin%20Zentrum"
                className="inline-flex items-center justify-center bg-secondary text-secondary-foreground py-[1em] px-[1.5em] rounded-[var(--radius-button)] text-[1rem] leading-[1.2] hover:opacity-90 transition-all"
              >
                E-Mail
              </a>
              <a
                href="https://wa.me/4915115539416"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-secondary text-secondary-foreground py-[1em] px-[1.5em] rounded-[var(--radius-button)] text-[1rem] leading-[1.2] hover:opacity-90 transition-all"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
