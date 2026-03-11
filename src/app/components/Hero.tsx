// Correct hero images from Webflow live site
const heroImage1 = "https://cdn.prod.website-files.com/6890d61524a7dba397203fde/6890d6745cc734423847d58b_9ae3166a-4496-49f1-9d77-c97f40759bdb.avif";
const heroImage2 = "https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5370c877743c4a7999300_Estela-byaylin-3.jpg";

interface HeroProps {
  content?: {
    hero_title?: string;
    hero_subtitle?: string;
    hero_image_1?: { filename: string; alt?: string };
    hero_image_2?: { filename: string; alt?: string };
    hero_button_1_text?: string;
    hero_button_1_link?: string;
    hero_button_2_text?: string;
    hero_button_2_link?: string;
  };
}

export function Hero({ content }: HeroProps) {
  const title = content?.hero_title || "Willkommen im Taoyin Zentrum Ingolstadt";
  const subtitle = content?.hero_subtitle || "Willkommen in deinem Raum für Achtsamkeit, Heilung und innere Balance. Entdecke sanfte taoistische Praktiken, die Körper, Geist und Seele verbinden \u2013 f\u00fcr mehr Energie, Gelassenheit und Wohlbefinden im Alltag.";
  const image1 = content?.hero_image_1?.filename || heroImage1;
  const image2 = content?.hero_image_2?.filename || heroImage2;
  const button1Text = content?.hero_button_1_text || "Mehr erfahren";
  const button1Link = content?.hero_button_1_link || "#Details";
  const button2Text = content?.hero_button_2_text || "Angebote entdecken";
  const button2Link = content?.hero_button_2_link || "#Angebote";

  return (
    <header className="w-full bg-[var(--background-secondary)] overflow-hidden lg:max-h-dvh">
      <div className="max-w-[1280px] mx-auto px-[1rem] py-[var(--section-padding-mobile-p)] md:py-[var(--section-padding-tablet)] lg:py-[var(--section-padding)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--gap-lg)] items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1 flex flex-col items-stretch">
            <h1>{title}</h1>
            <p className="text-[var(--text-lg-size)] leading-[1.6] text-current/70 mb-[var(--space-1-25x)] max-w-[var(--container-sm-width)]" style={{ textWrap: 'balance' }}>
              {subtitle}
            </p>
            <div className="flex flex-wrap gap-[var(--space-0-5x)] mt-[var(--space-2x)]">
              <a
                href={button1Link}
                className="inline-flex items-center justify-center bg-secondary text-secondary-foreground py-[1em] px-[1.5em] rounded-[var(--radius-button)] text-[1rem] font-normal leading-[1.2] hover:opacity-90 transition-all"
              >
                {button1Text}
              </a>
              <a
                href={button2Link}
                className="inline-flex items-center justify-center bg-transparent text-foreground py-[1em] px-[1.5em] rounded-[var(--radius-button)] text-[1rem] font-normal leading-[1.2] shadow-[inset_0_0_0_1px_var(--wf-inverse-a20)] hover:shadow-[inset_0_0_0_1px_var(--wf-inverse-a40)] transition-all"
              >
                {button2Text}
              </a>
            </div>
          </div>

          {/* Right: Image Composition – 12deg rotation like Webflow original */}
          <div className="order-1 lg:order-2">
            <div className="rotate-0 lg:rotate-[12deg]">
              <div className="grid grid-cols-1 gap-[var(--gap-sm)]">
                <img
                  src={image1}
                  alt={content?.hero_image_1?.alt || "Spa-Ambiente im Taoyin Zentrum"}
                  className="w-full object-cover rounded-[var(--radius-image)] aspect-[3/2]"
                />
                <img
                  src={image2}
                  alt={content?.hero_image_2?.alt || "Estela \u2013 Taoyin Zentrum Ingolstadt"}
                  className="w-full object-cover rounded-[var(--radius-image)] aspect-[3/2]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}