export default function Behandlung() {
  return (
    <>
      {/* Hero Header */}
      <header className="w-full py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left: Text */}
            <div>
              <h1 className="text-foreground mb-6">
                Ihr Ziel, meine Behandlung
              </h1>
              <p className="text-[17px] leading-[1.7] text-foreground/60">
                Erfahren Sie mehr &uuml;ber das Ziel der Behandlung und mein
                Vorgehen. Damit wir zusammen den richtigen Ansatz finden
                k&ouml;nnen.
              </p>
            </div>

            {/* Right: 3 images */}
            <div className="grid grid-cols-2 gap-2">
              <img
                src="https://cdn.prod.website-files.com/image-generation-assets/b745265f-4158-4a26-82c2-6957d4c4e11e.avif"
                alt="Natur und Heilung"
                className="w-full object-cover rounded-lg aspect-[3/2]"
                loading="lazy"
              />
              <img
                src="https://cdn.prod.website-files.com/image-generation-assets/490e72ce-966a-433d-96d3-28f46b7a18a1.avif"
                alt="Praxisraum"
                className="w-full object-cover rounded-lg aspect-[3/2]"
                loading="lazy"
              />
              <img
                src="https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c537114c0ae0a617d65064_Estela-byaylin-29-min.jpg"
                alt="Estela Fuchs"
                className="w-full object-cover rounded-lg aspect-[3/2] col-span-2"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Section: Ihr Ziel */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-foreground mb-8">Ihr Ziel</h2>

            <h2 className="text-foreground mt-10 mb-4">Orientierung</h2>
            <p>
              Sie stehen an einem Scheideweg? Wichtige{" "}
              <strong>Entscheidungen</strong> liegen vor Ihnen? Sie suchen nach
              Halt und Orientierung? nach innerer Ruhe und{" "}
              <strong>Sicherheit</strong>, ohne von externen Faktoren getrieben
              und beeinflu&szlig;t zu werden? Sie suchen nach Distanz vom
              t&auml;glichen <strong>Alltag</strong>? Sie sind auf der Suche
              nach Ihrem inneren Selbst?
            </p>

            <h2 className="text-foreground mt-10 mb-4">Stabilisierung</h2>
            <p>
              Sie befinden sich in einer Krise? Ihr <strong>Leben</strong> hat
              sich in beabsichtigter oder unbeabsichtigter Weise ver&auml;ndert
              und Sie f&uuml;hlen sich &uuml;berfordert? Sie finden keine{" "}
              <strong>Erholung</strong> und sehen wenig Alternativen? Sie
              f&uuml;hlen sich krank oder schwach obwohl der Arzt Ihnen keinen
              Befund nennen kann? Sie suchen Hilfe &uuml;ber das Gespr&auml;ch
              mit Anderen?
            </p>

            <h2 className="text-foreground mt-10 mb-4">
              Unterst&uuml;tzung
            </h2>
            <p>
              Sie f&uuml;hlen sich unwohl? Sie leiden unter psychischen oder
              k&ouml;rperlichen Symptomen und machen sich Gedanken dazu? Sie
              suchen <strong>Heilpraktiker</strong> der Psychotherapie als
              Ansprechpartner und Berater? Sie suchen nach konkreten
              psychotherapeutischen{" "}
              <strong>Behandlungsm&ouml;glichkeiten</strong>?
            </p>
          </article>
        </div>
      </section>

      {/* Section: Die Behandlung */}
      <section className="w-full py-16 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-foreground mb-8">Die Behandlung</h2>

            <h4 className="text-foreground mt-8 mb-3">
              <strong>Beratung</strong>
            </h4>
            <p>
              Lernen Sie uns kennen. Im Gespr&auml;ch tasten wir uns an Ihr
              ganz pers&ouml;nliches Bed&uuml;rfnis heran und entscheiden
              gemeinsam die f&uuml;r Sie beste Vorgehensweise. Das erste
              Gespr&auml;ch ist unverbindlich und kostenfrei und erlaubt Ihnen,
              Einblick in unser Denken und Handeln zu gewinnen.
            </p>

            <h4 className="text-foreground mt-8 mb-3">
              <strong>Einzelsitzungen</strong>
            </h4>
            <p>
              In einzelnen Sitzungen gehen wir Schritt f&uuml;r Schritt auf
              Ihre Bed&uuml;rfnisse ein und arbeiten an den f&uuml;r Sie
              wichtigen Themen. Gerne k&ouml;nnen die verschiedenen Methoden
              auch nur zum Kennenlernen ausprobiert werden.
            </p>
            <p>
              Unser Ziel ist es, dass Sie die Verantwortung f&uuml;r Ihre
              eigene Gesundheit &uuml;bernehmen k&ouml;nnen und selbst
              entscheiden, was Ihnen gut tut.
            </p>

            <h4 className="text-foreground mt-8 mb-3">
              <strong>K&ouml;rperorientierte Psychotherapie</strong>
            </h4>
            <p>
              Wir verbinden die Elemente der Meditation und der Massage in eine
              wirksame Behandlungsform nach den Leitlinien des Universal
              Healing Tao und des Chi Nei Tsang nach Gro&szlig;meister Mantak
              Chia. Diese lassen sich sehr gut mit den bestehenden klassischen
              Psychotherapieformen integrieren. Wir unterst&uuml;tzen Sie sehr
              gerne auf dem Weg zu Ihrer Genesung.
            </p>
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-white">
        <img
          src="https://cdn.prod.website-files.com/image-generation-assets/ee125b47-41aa-4ec5-a593-18b12a1fca27.avif"
          alt="Hintergrund"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center py-20">
          <h2
            className="text-white mb-4"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Finde deine Mitte. Sp&uuml;re dein Chi.
          </h2>
          <p className="text-white/80 text-[17px] leading-[1.7] mb-10">
            Lernen Sie die Kraft der Integration von K&ouml;rper, Geist und
            Seele f&uuml;r Sich zu nutzen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+4915115539416"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
            >
              Telefon
            </a>
            <a
              href="mailto:info@taoyin-zentrum.de?subject=Neue%20Anfrage%20Taoyin%20Zentrum"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
            >
              E-Mail
            </a>
            <a
              href="https://wa.me/4915115539416"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}