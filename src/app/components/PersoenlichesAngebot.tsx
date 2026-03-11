import { Link } from "react-router";

const items = [
  'Individuelle Abstimmung: Ich gehe auf die Bedürfnisse jedes einzelnen Menschen ein – kein "Schema F", sondern eine Begleitung, die wirklich passt.',
  "Ganzheitliche Verbindung: Die Kombination von Qi Gong und Chi Nei Tsang verstärkt die Wirkung und schafft nachhaltige Heilimpulse.",
  "Authentische Begleitung: Ich lebe, was ich unterrichte. Meine Arbeit ist getragen von Achtsamkeit, Liebe zur Berührung und dem Wunsch, Heilung zu fördern.",
];

interface PersoenlichesAngebotProps {
  content?: {
    personal_title?: string;
    personal_features?: any[];
    personal_button_text?: string;
    personal_button_link?: any;
  };
}

export function PersoenlichesAngebot({ content }: PersoenlichesAngebotProps) {
  // Extract text from features if they're objects from Storyblok
  const features = (content?.personal_features || items).map(f => 
    typeof f === 'string' ? f : f.text
  );
  
  return (
    <section className="w-full py-16 lg:py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <h2>
            {content?.personal_title || "✨ Mein persönliches Angebot – das Besondere bei TaoBasis"}
          </h2>
          <div>
            <div className="flex flex-col gap-0">
              {features.map((item, i) => (
                <div key={i}>
                  <div className="flex items-start gap-3 py-4">
                    <ArrowIcon />
                    <p className="text-[14px] text-foreground/70 leading-relaxed">
                      {item}
                    </p>
                  </div>
                  {i < features.length - 1 && <div className="h-px bg-border" />}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                to={content?.personal_button_link?.cached_url || "/kontakt"}
                className="inline-flex items-center justify-center bg-secondary text-secondary-foreground px-7 py-3 rounded-lg text-[15px] hover:bg-secondary/90 transition-colors"
              >
                {content?.personal_button_text || "Kontakt aufnehmen"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="flex-shrink-0 mt-1"
    >
      <path
        d="M2 8H14.5M14.5 8L8.5 2M14.5 8L8.5 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}