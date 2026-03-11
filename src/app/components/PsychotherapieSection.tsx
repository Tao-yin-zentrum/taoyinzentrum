import { Link } from "react-router";

interface PsychotherapieSectionProps {
  content?: {
    psycho_title?: string;
    psycho_description?: string;
    psycho_image?: { filename: string; alt?: string };
    psycho_button_text?: string;
    psycho_button_link?: { cached_url?: string };
  };
}

export function PsychotherapieSection({ content }: PsychotherapieSectionProps) {
  const defaultTitle = "Ganzheitliche Psychotherapie";
  const defaultDesc = "Ich arbeite mit klassischen Verfahren wie Entspannungstechniken und Verhaltenstherapie sowie mit alternativen Methoden aus den Bereichen der Meditation, des Qigong, des Tai Chi und der Ernährung nach den 5 Elementen.";
  const defaultImage = "https://cdn.prod.website-files.com/image-generation-assets/c79b83fd-d5a5-46a1-8aa0-b49f43616c5e.avif";
  const defaultButtonText = "Mehr erfahren";
  
  return (
    <section className="w-full py-16 lg:py-24 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1">
            <h2 className="text-white mb-5">{content?.psycho_title || defaultTitle}</h2>
            <p className="text-white/60 text-[16px] leading-relaxed mb-8">
              {content?.psycho_description || defaultDesc}
            </p>
            <Link
              to={content?.psycho_button_link?.cached_url || "/psychotherapie"}
              className="inline-flex items-center justify-center border-2 border-white/80 text-white px-7 py-3 rounded-lg text-[15px] hover:bg-white/10 transition-colors"
            >
              {content?.psycho_button_text || defaultButtonText}
            </Link>
          </div>
          <div className="lg:col-span-2">
            <img
              src={content?.psycho_image?.filename || defaultImage}
              alt={content?.psycho_image?.alt || "Psychotherapie"}
              className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}