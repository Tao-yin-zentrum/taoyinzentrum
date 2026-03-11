import { Link } from "react-router";

const items = [
  'Individuelle Abstimmung: Ich gehe auf die Bedürfnisse jedes einzelnen Menschen ein – kein "Schema F", sondern eine Begleitung, die wirklich passt.',
  "Ganzheitliche Verbindung: Die Kombination von Qi Gong und Chi Nei Tsang verstärkt die Wirkung und schafft nachhaltige Heilimpulse.",
  "Authentische Begleitung: Ich lebe, was ich unterrichte. Meine Arbeit ist getragen von Achtsamkeit, Liebe zur Berührung und dem Wunsch, Heilung zu fördern.",
];

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

export function PersoenlichesAngebot() {
  return (
    <section className="w-full py-16 lg:py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <h2>
            Mein persönliches Angebot – das Besondere bei TaoBasis
          </h2>
          <div>
            <div className="flex flex-col gap-0">
              {items.map((item, i) => (
                <div key={i}>
                  <div className="flex items-start gap-3 py-4">
                    <ArrowIcon />
                    <p className="text-[14px] text-foreground/70 leading-relaxed">
                      {item}
                    </p>
                  </div>
                  {i < items.length - 1 && <div className="h-px bg-border" />}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/kontakt"
                className="inline-flex items-center justify-center bg-secondary text-secondary-foreground px-7 py-3 rounded-lg text-[15px] hover:bg-secondary/90 transition-colors"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}