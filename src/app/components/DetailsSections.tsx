import { ContentSection } from "./ContentSection";

const fallbackSections = [
  {
    eyebrow: "Ganzheitlich. Achtsam. Verbunden.",
    heading: "Tao Basis",
    paragraph:
      '"TaoBasis – Qi Gong Kurse & Chi Nei Tsang Bauchmassage. Finden Sie Ruhe, Energie & innere Balance."',
    links: [
      { label: "Mehr erfahren über Tao Yin", href: "/taoyin" },
      { label: "Jetzt Angebote entdecken", href: "#Angebote" },
    ],
    imageSrc:
      "https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5371146ec6241e81774b7_Estela-byaylin-52-min.jpg",
    imageAlt: "Estela in Meditation – Tao Basis",
    imageLeft: false,
  },
  {
    eyebrow: "Tao Yin & Qigong",
    heading: "Einführung in Qi Gong",
    paragraph:
      '"Qi Gong Kurs für Anfänger: Lernen Sie sanfte Übungen, Atemtechniken & Energiearbeit für Vitalität, Entspannung & mehr Lebensbalance."',
    links: [
      { label: "Mehr erfahren über Qi Gong", href: "/qi-gong" },
      { label: "Kurse ansehen", href: "#Angebote" },
    ],
    imageSrc:
      "https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c53713513520b6bbe5b786_Estela-byaylin-33-min.jpg",
    imageAlt: "Estela – Qi Gong Praxis",
    imageLeft: true,
  },
  {
    eyebrow: "Tao Yin & Qigong",
    heading: "Medizinisches Qi Gong",
    paragraph:
      '"Medizinisches Qi Gong – dreimal pro Woche: stärken Sie Ihr Immunsystem, bauen Sie Stress ab & finden Sie Energie für Körper & Geist."',
    links: [{ label: "Kurse ansehen", href: "#Angebote" }],
    imageSrc:
      "https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c53718065ce01562873ef1_Estela-byaylin-43.jpg",
    imageAlt: "Medizinisches Qi Gong Übung",
    imageLeft: false,
  },
  {
    eyebrow: "Chi Nei Tsang",
    heading: "Chi Nei Tsang Behandlung",
    paragraph:
      '"Chi Nei Tsang Bauchmassage: lösen Sie Blockaden, aktivieren Sie Selbstheilung & erleben Sie tiefe Entspannung für Körper & Seele."',
    links: [
      { label: "Mehr erfahren über Chi Nei Tsang", href: "/chi-nei-tsang" },
      { label: "Jetzt Behandlung buchen", href: "#Angebote" },
    ],
    imageSrc:
      "https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5371f98928ab373b92ff9_Estela-byaylin-59-min.jpg",
    imageAlt: "Chi Nei Tsang Behandlung",
    imageLeft: true,
  },
  {
    eyebrow: "Chi Nei Tsang",
    heading: "Chi Nei Tsang Ausbildung",
    paragraph:
      '"Chi Nei Tsang Ausbildung: lernen Sie die taoistische Bauchmassage & Selbstbehandlung, kombiniert mit Qi Gong für maximale Heilwirkung."',
    links: [{ label: "Ausbildung buchen", href: "#Angebote" }],
    imageSrc:
      "https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c537205b0c2bd091d7b6a5_Estela-byaylin-58-min.jpg",
    imageAlt: "Chi Nei Tsang Ausbildung",
    imageLeft: false,
  },
  {
    eyebrow: "Ich berate und unterstütze Sie gerne",
    heading: "Praxis für ganzheitliche Psychotherapie",
    paragraph:
      "Lernen Sie die Kraft der Integration von Körper, Geist und Seele für Sich zu nutzen.",
    links: [{ label: "zur Praxis", href: "/psychotherapie" }],
    imageSrc:
      "https://cdn.prod.website-files.com/6890d61524a7dba397203fde/689c709e31ebcac5995a9622_a9db9b1a-d5b1-4270-a1b0-8044de34b697.avif",
    imageAlt: "Praxis für Psychotherapie",
    imageLeft: true,
  },
  {
    eyebrow: "Estela Fuchs",
    heading: "Meine Geschichte",
    paragraph:
      "Nach einer langen Pause kehre ich mit neuer Kraft und Dankbarkeit zurück. Ein schwerer Bruch am Fußgelenk hat mich gezwungen, innezuhalten – und zugleich gezeigt, wie heilsam Qi Gong und taoistische Praktiken wirklich sind.\n\nSie haben mir geholfen, schneller zu regenerieren, wieder fest auf den Beinen zu stehen und tiefer in meine Praxis einzutauchen. Seit über 30 Jahren übe ich den Weg des Taoismus – heute mit noch mehr Überzeugung und dem Wunsch, diese Schätze mit anderen zu teilen.\n\nMeine Angebote sind mehr als Kurse – sie sind eine Einladung, die eigene Lebenskraft neu zu entdecken.",
    links: [{ label: "Mehr erfahren", href: "/about" }],
    imageSrc:
      "https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5370f3e66ed943079d4c6_Estela-byaylin-26-min.jpg",
    imageAlt: "Estela Fuchs – Meine Geschichte",
    imageLeft: false,
  },
];

interface DetailsSectionsProps {
  content?: {
    details_sections?: Array<{
      _uid: string;
      eyebrow?: string;
      title: string;
      description: string;
      image?: { filename: string; alt?: string };
      button_text_1?: string;
      button_link_1?: { cached_url?: string };
      button_text_2?: string;
      button_link_2?: { cached_url?: string };
      image_left?: boolean;
    }>;
  };
}

export function DetailsSections({ content }: DetailsSectionsProps) {
  // Map Storyblok content to ContentSection format
  const sections = content?.details_sections?.map(section => ({
    eyebrow: section.eyebrow || "",
    heading: section.title,
    paragraph: section.description,
    links: [
      ...(section.button_text_1 ? [{ 
        label: section.button_text_1, 
        href: section.button_link_1?.cached_url || "#" 
      }] : []),
      ...(section.button_text_2 ? [{ 
        label: section.button_text_2, 
        href: section.button_link_2?.cached_url || "#" 
      }] : []),
    ],
    imageSrc: section.image?.filename || "",
    imageAlt: section.image?.alt || section.title,
    imageLeft: section.image_left || false,
  })) || fallbackSections;

  return (
    <section id="Details" className="w-full py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-20 lg:gap-28">
          {sections.map((section, index) => (
            <ContentSection key={index} {...section} />
          ))}
        </div>
      </div>
    </section>
  );
}