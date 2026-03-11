// Real image URLs from CDN
const heroShelf = "https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5371146ec6241e81774b7_Estela-byaylin-52-min.jpg";
const heroPortrait = "https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5370f3e66ed943079d4c6_Estela-byaylin-26-min.jpg";

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
  // Use Storyblok content if available, otherwise fallback to static
  const title = content?.hero_title || "Willkommen im Taoyin Zentrum Ingolstadt";
  const subtitle = content?.hero_subtitle || "Willkommen in deinem Raum für Achtsamkeit, Heilung und innere Balance. Entdecke sanfte taoistische Praktiken, die Körper, Geist und Seele verbinden – für mehr Energie, Gelassenheit und Wohlbefinden im Alltag.";
  const image1 = content?.hero_image_1?.filename || heroShelf;
  const image2 = content?.hero_image_2?.filename || heroPortrait;
  const button1Text = content?.hero_button_1_text || "Mehr erfahren";
  const button1Link = content?.hero_button_1_link || "#Details";
  const button2Text = content?.hero_button_2_text || "Angebote entdecken";
  const button2Link = content?.hero_button_2_link || "#Angebote";

  return (
    <header className="w-full py-12 md:py-16 lg:py-20 overflow-hidden bg-[#eff5f6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            <h1 className="mb-6">
              {title}
            </h1>
            <p className="text-[17px] leading-[1.6] text-foreground/70 mb-8 max-w-lg">
              {subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={button1Link}
                className="inline-flex items-center justify-center bg-secondary text-secondary-foreground px-7 py-3 rounded-lg text-[15px] hover:bg-secondary/90 transition-colors"
              >
                {button1Text}
              </a>
              <a
                href={button2Link}
                className="inline-flex items-center justify-center border border-[var(--wf-inverse-a20)] text-foreground px-7 py-3 rounded-lg text-[15px] hover:border-[var(--wf-inverse-a60)] transition-colors"
              >
                {button2Text}
              </a>
            </div>
          </div>

          {/* Right: Image Composition (slight rotation like original) */}
          <div className="order-1 lg:order-2">
            <div className="lg:rotate-3 transition-transform">
              <div className="flex flex-col gap-3">
                <img
                  src={image1}
                  alt={content?.hero_image_1?.alt || "Zen-Einrichtung mit Vasen und Räucherstäbchen"}
                  className="w-full h-auto object-cover rounded-lg aspect-[3/2]"
                />
                <img
                  src={image2}
                  alt={content?.hero_image_2?.alt || "Estela – Taoyin Zentrum Ingolstadt"}
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