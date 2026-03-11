import { SEO } from "../components/SEO";

export default function About() {
  return (
    <>
      <SEO 
        title="Über mich – Psychotherapie & Taoistische Praxis Ingolstadt"
        description="Erfahre mehr über meinen Weg: Psychotherapie, Qi Gong und Taoismus in Ingolstadt. Mit Erfahrung, Mitgefühl und ganzheitlichem Ansatz."
        keywords="Estela Fuchs, Psychotherapie Ingolstadt, Qi Gong, Taoismus, TaoBasis, Heilpraktiker"
        url="/about"
      />
      {/* Hero Header */}
      <header className="w-full py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 items-center">
            {/* Left: Large image */}
            <div className="lg:col-span-3">
              <img
                src="https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5370c877743c4a7999300_Estela-byaylin-3.jpg"
                alt="Estela Fuchs"
                className="w-full object-cover rounded-r-2xl rounded-l-[3rem] aspect-[4/3] lg:aspect-[3/2]"
                loading="lazy"
              />
            </div>

            {/* Right: Text */}
            <div className="lg:col-span-2">
              <h1 className="text-foreground mb-6">Estela Fuchs</h1>
              <p className="text-[17px] leading-[1.7] text-foreground/60">
                Lernen Sie mich kennen und erfahren Sie mehr &uuml;ber mich und
                meinen &Uuml;berzeugungen.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Rich Text Section */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-foreground mb-6">
              &Uuml;ber mich &ndash; mein Weg mit TaoBasis
            </h2>
            <p>
              Nach einer l&auml;ngeren Pause und einer herausfordernden
              Heilungszeit m&ouml;chte ich mich neu vorstellen.
              <br />
              Vor einiger Zeit erlitt ich einen Bruch am Fu&szlig;gelenk. Dieser
              Unfall brachte mich aus dem Gleichgewicht und verlangte viel
              Geduld und Achtsamkeit. Doch gerade in dieser Phase durfte ich
              erfahren, wie tiefgreifend Qi Gong und die taoistischen
              Heilmethoden wirken.
            </p>
            <ul className="space-y-2 my-6 ml-6 list-disc text-foreground/75">
              <li>
                Sie unterst&uuml;tzten meine k&ouml;rperliche Regeneration.
              </li>
              <li>
                Sie gaben mir Kraft, wieder sicher auf meinen Beinen zu stehen.
              </li>
              <li>
                Sie &ouml;ffneten mir die T&uuml;r zu einer noch tieferen
                Erfahrung von Heilung und Vertrauen.
              </li>
            </ul>
            <p>
              Seit &uuml;ber 30 Jahren gehe ich den Weg des Taoismus. Viele
              Jahre habe ich Qi Gong ge&uuml;bt, weitergegeben und Menschen
              begleitet. Doch diese pers&ouml;nliche Erfahrung hat meine
              &Uuml;berzeugung vertieft: Taoistische Praktiken sind nicht nur
              Bewegungen, sondern lebendige Werkzeuge f&uuml;r Heilung, Balance
              und innere St&auml;rke.
            </p>
            <p>
              Parallel dazu habe ich mich intensiv mit Psychotherapie
              besch&auml;ftigt. In meiner heutigen Arbeit flie&szlig;en diese
              beiden Wege zusammen: die tiefgehende innere Arbeit der
              Psychotherapie und die k&ouml;rperlich-seelische Dimension der
              taoistischen Praxis. Diese Verbindung erm&ouml;glicht es, nicht
              nur auf einer geistigen Ebene Themen zu bearbeiten, sondern
              Heilung und Ver&auml;nderung ganzheitlich zu erfahren.
            </p>
            <p>
              Heute m&ouml;chte ich das, was mir selbst so viel geschenkt hat,
              weitergeben &ndash; authentisch, mitf&uuml;hlend und voller
              Hingabe.
            </p>
            <p className="mt-8">
              <strong>Mein Angebot an Sie:</strong>
              <br />
              Nicht nur Techniken zu lernen, sondern eine lebendige Praxis zu
              erfahren, die K&ouml;rper, Geist und Seele verbindet &ndash; und
              die Ihnen im Alltag neue Energie, Vertrauen und innere Ruhe
              schenkt. Gleichzeitig biete ich einen gesch&uuml;tzten
              psychotherapeutischen Raum, in dem pers&ouml;nliche Themen
              angeschaut, verarbeitet und in neue St&auml;rke verwandelt werden
              k&ouml;nnen.
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
            Tauche ein in einen Raum f&uuml;r Achtsamkeit, Heilung und innere
            Balance. Entdecke sanfte taoistische Praktiken, die K&ouml;rper,
            Geist und Seele verbinden. Hier findest du Ruhe, neue Energie und
            Inspiration f&uuml;r deinen Alltag &ndash; unabh&auml;ngig von
            Erfahrung oder Lebensphase. Komm an, atme durch und lass dich
            begleiten auf deinem Weg zu mehr Wohlbefinden.
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