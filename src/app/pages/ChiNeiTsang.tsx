import { AngeboteSection } from "../components/AngeboteSection";

export default function ChiNeiTsang() {
  return (
    <>
      {/* Hero Header */}
      <header className="w-full py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-center">
            {/* Left: Large image with soft mask */}
            <div className="lg:col-span-3">
              <img
                src="https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5371e7929cdfb71466f5a_Estela-byaylin-60-min.jpg"
                alt="Chi Nei Tsang Behandlung"
                className="w-full object-cover rounded-r-2xl rounded-l-[3rem] aspect-[4/3] lg:aspect-[3/2]"
                loading="lazy"
              />
            </div>

            {/* Right: Text */}
            <div className="lg:col-span-2">
              <h1 className="text-foreground mb-6">Chi Nei Tsang Massage</h1>
              <p className="text-[17px] leading-[1.7] text-foreground/60">
                Chi Nei Tsang ist eine traditionelle taoistische Bauchmassage,
                die innere Organe sanft löst und energetisch harmonisiert.
                Sie arbeitet mit tiefen, achtsamen Berührungen im
                Bauchraum, um Blockaden zu lösen und den Energiefluss zu
                fördern. Diese Technik unterstützt Verdauung,
                Entgiftung und emotionales Gleichgewicht.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Section: Tiefe Bauchmassage */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-foreground mb-6">
              Tiefe Bauchmassage für Wohlbefinden und innere Balance
            </h2>
            <p>
              Chi Nei Tsang ist eine sanfte, aber wirkungsvolle Massageform aus
              der taoistischen Heiltradition Chinas. Der Name bedeutet
              übersetzt „die inneren Organe pflegen" und
              beschreibt den Kern dieser Methode: Durch achtsame, tiefgehende
              Berührungen im Bauchraum werden Verspannungen gelöst,
              die Organe entspannt und der Energiefluss im Körper
              harmonisiert.
            </p>
            <p>
              Unser Bauch wird oft als „zweites Gehirn" bezeichnet
              – hier sitzen nicht nur wichtige Organe, sondern auch viele
              Nervenbahnen und emotionale Erinnerungen. Stress, falsche
              Ernährung oder ungelöste Emotionen können dazu
              führen, dass sich Anspannung und Blockaden in diesem Bereich
              festsetzen. Chi Nei Tsang hilft, diese sanft zu lösen und den
              Körper von innen heraus zu regenerieren.
            </p>
            <p>
              Während einer Behandlung liegst du entspannt auf einer Liege.
              Mit gezielten, kreisenden und drückenden Bewegungen arbeite
              ich an deinem Bauchbereich, immer im Einklang mit deinem
              Atemrhythmus. Dabei kann sich ein Gefühl von tiefer
              Entspannung, innerer Leichtigkeit und mehr Energie einstellen.
            </p>
          </article>
        </div>
      </section>

      {/* Section: Mögliche Wirkungen */}
      <section className="w-full py-16 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-foreground mb-6">
              Mögliche Wirkungen von Chi Nei Tsang:
            </h2>
            <ul className="space-y-3 my-6 list-none pl-0">
              {[
                "Verbesserung der Verdauung und Entgiftung",
                "Lösen von körperlichen und emotionalen Spannungen",
                "Stärkung des Immunsystems",
                "Förderung von innerer Ruhe und Ausgeglichenheit",
                "Unterstützung des Energieflusses (Qi) im gesamten Körper",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-foreground/75"
                >
                  <span className="text-primary mt-[2px] shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p>
              Chi Nei Tsang ist für Menschen jeden Alters geeignet und kann
              sowohl präventiv als auch begleitend zu anderen Gesundheits-
              und Entspannungsmethoden angewendet werden. Die Behandlung ist
              sanft, achtsam und immer auf deine individuellen Bedürfnisse
              abgestimmt.
            </p>
            <p>
              Gönne dir diese besondere Form der Selbstfürsorge und
              erlebe, wie sich dein Bauch – und damit dein ganzes
              Wohlbefinden – entspannen kann.
            </p>
          </article>
        </div>
      </section>

      {/* Section: 1-Jährige Ausbildung */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-foreground mb-6">1-Jährige Ausbildung</h2>
            <p>
              Der Darm! das Organ, das wir am wenigsten wertschätzen –
              Übergewicht, Burn-Out, Probleme mit der Haut –
              Alltagsbeschwerden, deren Verbindung zur Darmflora werden von Tag
              zu Tag offensichtlicher. Wir fühlen uns wohl, leben
              länger und glücklicher und gesünder, nur wenn wir
              auch unseren Darm entsprechend pflegen und im Gleichgewicht halten.
            </p>
            <p>
              Ich freue mich, Ihnen die Chi Nei Tsang (Bauch-)Massage in Form
              einer Ausbildung zum CNT Practitioner nach Mantak Chia näher
              bringen zu können. Der Darm steht im Fokus genauso wie alle
              damit verbundenen und davon beeinflussten Organe.
            </p>
            <p>
              Chi Nei Tsang ist eine besondere Form der Massage, mit Grundlagen
              in der Traditionellen Chinesischen Medizin, dem Taoismus und damit
              auch dem Medizinischen Qigong. Anatomie spielt eine genauso
              wichtige Rolle wie Fokus und Achtsamkeit auf die involvierten
              Organe und Energiekreise.
            </p>
            <p>
              Die Ausbildung ist geeignet für Therapeuten, Heilpraktiker
              (Allgemein oder der Psychotherapie), Masseure jeglicher
              Fachrichtung oder Personen mit einer besonderen Affinität zur
              Massage. Der Kursplan beruht auf dem Studienplan von
              Großmeister Mantak Chia und läuft über 10
              Wochenenden mit Theorie gefolgt von intensiver Praxis.
            </p>
            <p>
              In der Ausbildung wird deshalb sehr viel Fokus auf die Praxis der
              Massagetechniken und der Meditation als auch auf die medizinische
              Theorie und Anatomie gelegt.
            </p>

            <p className="text-foreground mt-8 mb-4">
              <strong>Inhalte der Ausbildung:</strong>
            </p>
            <ul className="space-y-3 my-6 list-none pl-0">
              {[
                "Grundlagen des Chi Nei Tsang",
                "Anatomie der Bauchregion, der inneren Organe, des Lymphsystems, des kardiovaskulären Systems und des Bewegungsapparates",
                "Aktivierung, Entgiftung und Ausgleichen der inneren Organe",
                "Entgiftung des Gewebes und des Lymphsystems",
                "Verarbeitung von emotionalen Spannungen",
                "Wirbelsäule, Rückenmuskulatur und Kreuzbein",
                "Ernährung",
                "Energiearbeit",
                "Vorbereitungen für die Praxis",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-foreground/75"
                >
                  <span className="text-primary mt-[2px] shrink-0">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {/* Angebote (reused from homepage) */}
      <AngeboteSection />
    </>
  );
}
