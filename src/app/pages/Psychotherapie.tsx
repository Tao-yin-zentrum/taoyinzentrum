import { Link } from "react-router";
import { SEO } from "../components/SEO";

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M2 8H14.5M14.5 8L8.5 2M14.5 8L8.5 14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const therapies = [
  {
    title: "Autogenes Training",
    text: "Autogenes Training ist ein auf Autosuggestion basierendes Entspannungsverfahren. Es wurde vom Berliner Psychiater Johannes Heinrich Schultz aus der Hypnose entwickelt, 1926 erstmals vorgestellt und 1932 in seinem Buch Das autogene Training publiziert. Heute ist das autogene Training eine weit verbreitete und – beispielsweise in Deutschland und Österreich sogar gesetzlich – anerkannte Psychotherapiemethode.",
  },
  {
    title: "Kognitive Verhaltenstherapie",
    text: "Im Mittelpunkt der kognitiven Therapieverfahren stehen Kognitionen. Kognitionen umfassen Einstellungen, Gedanken, Bewertungen und Überzeugungen. Die kognitiven Therapieverfahren, zu denen die kognitive Therapie (KT) und die Rational-Emotive Verhaltenstherapie (REVT) gehören, gehen davon aus, dass die Art und Weise, wie wir denken, bestimmt, wie wir uns fühlen und verhalten und wie wir körperlich reagieren.",
  },
  {
    title: "Massage",
    text: 'Die Massage (von "massieren; berühren; betasten; kneten") dient zur mechanischen Beeinflussung von Haut, Bindegewebe und Muskulatur durch Dehnungs-, Zug- und Druckreiz. Die Wirkung der Massage erstreckt sich von der behandelten Stelle des Körpers über den gesamten Organismus und schließt auch die Psyche mit ein.',
  },
  {
    title: "Meditation",
    text: 'Meditation (von "nachdenken, nachsinnen, überlegen") ist eine in vielen Religionen und Kulturen ausgeübte spirituelle Praxis. Durch Achtsamkeits- oder Konzentrationsübungen soll sich der Geist beruhigen und sammeln. In östlichen Kulturen gilt sie als eine grundlegende und zentrale bewusstseinserweiternde Übung.',
  },
  {
    title: "Paartherapie",
    text: "Gemeinsam einen Schritt vorwärts machen – in Einzel- und Paargesprächen, ergänzt mit Elementen der taoistischen Traditionen in Meditation, Yoga und Qigong, verfolgen wir folgende Ziele: Beziehungsprobleme verstehen und herausfinden, wie Ihre Liebesbeziehung funktionieren kann. Sich selbst und den Partner besser erkennen und verstehen. Neue Werkzeuge in die Hand bekommen, die in allen Lebenslagen nützlich sind.",
  },
  {
    title: "Progressive Muskelentspannung nach Jacobson",
    text: "Bei der progressiven Muskelentspannung (kurz PME; auch progressive Muskelrelaxation, kurz PMR, progressive Relaxation, kurz PR, oder Tiefenmuskelentspannung) nach Edmund Jacobson handelt es sich um ein Entspannungsverfahren, bei dem durch die willentliche und bewusste An- und Entspannung bestimmter Muskelgruppen ein Zustand tiefer Entspannung des ganzen Körpers erreicht werden soll.",
  },
  {
    title: "Sokratischer Dialog",
    text: "Der Sokratische Dialog ist eine Fragetechnik, derer sich Therapeuten bedienen, wenn es im therapeutisch-beratenden Gespräch um Begriffserklärung und Entscheidungsfindung geht. Es ist ein Prozess des kritischen Hinterfragens von Argumenten. So sollen Strukturen und Verhaltensmuster sichtbar, das eigene Denken und Handeln verstehbar und damit auch veränderbar werden.",
  },
  {
    title: "Yoga, Qigong, Tai Chi",
    text: "Yoga, Qigong und Tai Chi sind Techniken, die an der Körperstruktur und an der Körperwahrnehmung arbeiten. In Verbindung mit Meditation und Massage führen diese Praktiken zu einem neuen Selbstbewußtsein, eine positivere und annehmendere Haltung zu sich selbst und zum eigenen Körper und ein zunehmendes Gefühl für die eigene Gesundheit.",
  },
];

export default function Psychotherapie() {
  return (
    <>
      <SEO 
        title="Psychotherapie Ingolstadt – Heilung & Begleitung"
        description="Psychotherapeutische Praxis in Ingolstadt: Professionelle Begleitung bei Krisen, Belastungen & persönlicher Entwicklung. Achtsam & ganzheitlich."
        keywords="Psychotherapie Ingolstadt, Verhaltenstherapie, Autogenes Training, Paartherapie, Meditation, Entspannung"
        url="/psychotherapie"
      />
      {/* Hero Header */}
      <header className="w-full py-12 lg:py-20 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Text */}
            <div>
              <h1 className="text-foreground mb-6">
                Willkommen in meiner Praxis für ganzheitliche
                Psychotherapie
              </h1>
              <p className="text-[17px] leading-[1.7] text-foreground/60 mb-8 max-w-lg">
                Ich arbeite mit klassischen Verfahren wie
                Entspannungstechniken und Verhaltenstherapie sowie mit
                alternativen Methoden aus den Bereichen der Meditation, des
                Qigong, des Tai Chi und der Ernährung nach den 5
                Elementen.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#details"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Mehr erfahren
                </a>
                <a
                  href="#therapien"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary/5 transition-colors"
                >
                  Therapien entdecken
                </a>
              </div>
            </div>

            {/* Right: 2 stacked images with slight rotation */}
            <div className="lg:rotate-[6deg] flex flex-col gap-4">
              <img
                src="https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5370c877743c4a7999300_Estela-byaylin-3.jpg"
                alt="Estela in der Praxis"
                className="w-full object-cover rounded-lg aspect-[3/2]"
                loading="lazy"
              />
              <img
                src="https://cdn.prod.website-files.com/6890d61524a7dba397203fde/689c709e31ebcac5995a9622_a9db9b1a-d5b1-4270-a1b0-8044de34b697.avif"
                alt="Massage Therapie"
                className="w-full object-cover rounded-lg aspect-[3/2]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Details Section: 3 alternating text/image blocks */}
      <section id="details" className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-16 lg:gap-24">
          {/* Block 1: Text left, Image right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="text-[11px] tracking-[0.15em] uppercase text-primary mb-3 block">
                Orientierung. Stabilisierung. Unterstützung
              </span>
              <h2 className="text-foreground mb-4">
                Ihr Ziel &amp; die Behandlung
              </h2>
              <p className="text-[17px] leading-[1.7] text-foreground/60 mb-6">
                Sie stehen an einem Scheideweg? Sie befinden sich in einer
                Krise? Sie fühlen sich unwohl? Egal was das aktuelle
                Problem ist, gemeinsam finden wir eine Lösung und die
                passende Therapie. Ob Beratung, Einzelsitzungen oder eine
                körperorientierte Psychotherapie. Mein ganzheitlicher
                Ansatz bringt den Körper und Geist wieder in Einklang.
              </p>
              <Link
                to="/psychotherapie/ziele"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                Mehr erfahren <ArrowIcon />
              </Link>
            </div>
            <img
              src="https://cdn.prod.website-files.com/6890d61524a7dba397203fde/6890d6745cc734423847d58b_9ae3166a-4496-49f1-9d77-c97f40759bdb.avif"
              alt="Ruhige Landschaft"
              className="w-full object-cover rounded-lg aspect-[4/3]"
              loading="lazy"
            />
          </div>

          {/* Block 2: Image left, Text right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <img
              src="https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c537114c0ae0a617d65064_Estela-byaylin-29-min.jpg"
              alt="Estela Fuchs"
              className="w-full object-cover rounded-lg aspect-[4/3]"
              loading="lazy"
            />
            <div>
              <span className="text-[11px] tracking-[0.15em] uppercase text-primary mb-3 block">
                Estela Fuchs
              </span>
              <h2 className="text-foreground mb-4">Über mich</h2>
              <p className="text-[17px] leading-[1.7] text-foreground/60 mb-6">
                Seit vielen Jahren begleite ich Menschen psychotherapeutisch auf
                ihrem Weg zu mehr Klarheit, innerer Stabilität und
                Selbstvertrauen. In meiner Arbeit verbinde ich bewährte
                Methoden der Psychotherapie mit achtsamen Körper- und
                Atemübungen sowie taoistischen Praktiken, die das seelische
                Wachstum unterstützen und vertiefen.
              </p>
              <p className="text-[17px] leading-[1.7] text-foreground/60 mb-6">
                Diese Kombination ermöglicht es, nicht nur über
                Gedanken und Gefühle zu sprechen, sondern auch den
                Körper einzubeziehen – und damit Heilung auf mehreren
                Ebenen zu fördern.
              </p>
              <p className="text-[17px] leading-[1.7] text-foreground/60 mb-6">
                Mein Anliegen ist es, Menschen dabei zu unterstützen, ihre
                eigenen Ressourcen zu entdecken, Krisen zu bewältigen und
                einen liebevollen Zugang zu sich selbst zu finden.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                Mehr erfahren <ArrowIcon />
              </Link>
            </div>
          </div>

          {/* Block 3: Image left, Text right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <img
              src="https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5371146ec6241e81774b7_Estela-byaylin-52-min.jpg"
              alt="Taoyin Zentrum"
              className="w-full object-cover rounded-lg aspect-[4/3]"
              loading="lazy"
            />
            <div>
              <span className="text-[11px] tracking-[0.15em] uppercase text-primary mb-3 block">
                Ich berate und unterstütze Sie gerne
              </span>
              <h2 className="text-foreground mb-4">
                Taoyin Zentrum Ingolstadt
              </h2>
              <p className="text-[17px] leading-[1.7] text-foreground/60 mb-6">
                Entdecke sanfte taoistische Praktiken, die Körper, Geist
                und Seele verbinden – für mehr Energie,
                Gelassenheit und Wohlbefinden im Alltag.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                zum Taoyin Zentrum <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Therapien Section */}
      <section
        id="therapien"
        className="w-full py-16 lg:py-24 bg-background"
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-foreground text-center mb-12">
            Meine Therapie-Angebote
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {therapies.map((therapy) => (
              <div
                key={therapy.title}
                className="bg-white rounded-xl p-6 lg:p-8 shadow-sm"
              >
                <h3 className="text-foreground mb-3">{therapy.title}</h3>
                <p className="text-[15px] leading-[1.7] text-foreground/60">
                  {therapy.text}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              to="/therapien"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Mehr Details
            </Link>
            <a
              href="#anfrage"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary/5 transition-colors"
            >
              Therapie Anfragen
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section with background image */}
      <section id="anfrage" className="relative min-h-[80vh] flex items-center justify-center text-white">
        <img
          src="https://cdn.prod.website-files.com/image-generation-assets/ee125b47-41aa-4ec5-a593-18b12a1fca27.avif"
          alt="Hintergrund"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center py-20">
          <h2 className="text-white mb-4" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}>
            Finde deine Mitte. Spüre dein Chi.
          </h2>
          <p className="text-white/80 text-[17px] leading-[1.7] mb-10">
            Lernen Sie die Kraft der Integration von Körper, Geist und
            Seele für Sich zu nutzen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+4915115539416"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Telefon
            </a>
            <a
              href="mailto:info@estela-fuchs.com?subject=Neue%20Therapieanfrage"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              E-Mail
            </a>
            <a
              href="https://wa.me/4915115539416"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}