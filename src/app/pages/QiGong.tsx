import { AngeboteSection } from "../components/AngeboteSection";

export default function QiGong() {
  return (
    <>
      {/* Hero Header */}
      <header className="w-full py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: 4 images in a 2x2 grid */}
            <div className="grid grid-cols-2 gap-3">
              <img
                src="https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5370e9aba7881ec031049_Estela-byaylin-13.jpg"
                alt="Estela bei der Praxis"
                className="w-full object-cover rounded-lg aspect-[2/3]"
                loading="lazy"
              />
              <img
                src="https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c53719850089c1594b1703_Estela-byaylin-42.jpg"
                alt="Gemeinschaftliche Qi Gong Übung"
                className="w-full object-cover rounded-lg aspect-[2/3]"
                loading="lazy"
              />
              <img
                src="https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5370bf7333a00c99cc3e1_Estela-byaylin-14.jpg"
                alt="Qi Gong Einzelbegleitung"
                className="w-full object-cover rounded-lg aspect-[2/3]"
                loading="lazy"
              />
              <img
                src="https://cdn.prod.website-files.com/image-generation-assets/d38b1252-bc48-440f-9886-7d0d97209543.avif"
                alt="Entspannende Qi Gong Sitzung"
                className="w-full object-cover rounded-lg aspect-[2/3]"
                loading="lazy"
              />
            </div>

            {/* Right: Text */}
            <div>
              <h1 className="text-foreground mb-6">Was ist Qigong?</h1>
              <p className="text-[17px] leading-[1.7] text-foreground/60 max-w-lg">
                Qigong ist eine traditionelle chinesische Praxis zur Pflege von
                Gesundheit, Energie und innerer Ruhe. Sie verbindet sanfte
                Bewegungen, Atem&uuml;bungen und meditative Konzentration zu
                einem harmonischen Ganzen. Regelm&auml;&szlig;iges &Uuml;ben
                st&auml;rkt das Qi, f&ouml;rdert Vitalit&auml;t und
                unterst&uuml;tzt seelisches Gleichgewicht.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Section: Medizinisches Qigong */}
      <section className="w-full py-16 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-foreground mb-6">Medizinisches Qigong</h2>
            <p>
              Medizinisches Qigong wurde nicht nur im alten China, sondern auch
              heute in China eingesetzt, um eine Vielzahl von Krankheiten zu
              behandeln. Es wird oft in Verbindung mit Kr&auml;utern aus der
              chinesischen Medizin und mittlerweile auch in der westlichen
              Medizin verwendet. Es konzentriert sich auf Meridianwege und
              innere Organe des K&ouml;rpers. Es wird in chinesischen
              Krankenh&auml;usern in ganz China und seit Jahrhunderten im Osten
              verwendet.
            </p>

            <h2 className="text-foreground mt-10 mb-6">
              Wann medizinisches Qigong angewendet werden kann
            </h2>
            <p>
              Diese Praktiken wurden in China seit jeher und noch bis heute
              verwendet, um verschiedene Erkrankungen zu behandeln wie:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 my-6 list-none pl-0">
              {[
                "Krebs (alle Arten)",
                "Sportverletzungen",
                "Gastrointestinale Störungen",
                "Orthopädische Erkrankungen",
                "Gebrochene Knochen",
                "Verstauchungen",
                "Erkältung",
                "Grippe",
                "Emotionale Störungen",
                "Depression",
                "ADHS",
                "Bipolare Störung",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-foreground/75"
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

            <h3 className="text-foreground mt-10 mb-4">
              M&ouml;chten Sie zertifizierter Qigong-Praktiker werden? Wir
              k&ouml;nnen helfen!
            </h3>
            <p>
              Interessiert an einer Ausbildung zum zertifizierten Praktiker?
            </p>
            <p>
              Unser einzigartiges Programm geht tief in Qigong Entwicklung. Wir
              lehren und begleiten Dich, wie Du Dich selbst und andere durch
              regelm&auml;&szlig;ige Qigong-Praktiken heilen kannst. Du lernst
              spezifische &Uuml;bungen f&uuml;r verschiedene Organprobleme,
              Krankheiten und andere Leiden.
            </p>

            <h3 className="text-foreground mt-10 mb-4">
              Wer kann an unseren medizinischen Qigong-Kursen teilnehmen?
            </h3>
            <p>Es ist nie zu sp&auml;t oder zu fr&uuml;h, um Qigong zu lernen!</p>
            <p>
              Ob Du neu bei Qigong oder ein fortgeschrittener Praktiker bist, Du
              kannst von unserem vollen Kurs Curriculum lernen und profitieren.
              Wir haben pers&ouml;nlich Medical Qigong f&uuml;r Studenten im
              Jugendalter bis hin zu Patienten und Studenten in den 80igern
              unterrichtet.
            </p>
            <p>
              Dies ist offen f&uuml;r jede Ebene der Qigong-Praktiker:
              Anf&auml;nger oder Fortgeschrittene. Anmeldung gerne im Taoyin
              Zentrum oder telefonisch.
            </p>
          </article>
        </div>
      </section>

      {/* Angebote (reused from homepage) */}
      <AngeboteSection />
    </>
  );
}