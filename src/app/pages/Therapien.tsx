export default function Therapien() {
  return (
    <>
      {/* Hero Header */}
      <header className="w-full py-12 lg:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Left: 3 images in grid */}
            <div className="grid grid-cols-2 gap-2">
              <img
                src="https://cdn.prod.website-files.com/image-generation-assets/ec1e1865-4371-4deb-b640-940bfd2c1974.avif"
                alt="Ruhige Landschaft"
                className="w-full object-cover rounded-lg aspect-[2/3]"
                loading="lazy"
              />
              <img
                src="https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5371895543153b432f2fa_Estela-byaylin-35-min.jpg"
                alt="Estela in der Praxis"
                className="w-full object-cover rounded-lg aspect-[2/3]"
                loading="lazy"
              />
              <img
                src="https://cdn.prod.website-files.com/image-generation-assets/ee125b47-41aa-4ec5-a593-18b12a1fca27.avif"
                alt="Hintergrund"
                className="w-full object-cover rounded-lg aspect-[2/3] col-span-2 max-h-[280px]"
                loading="lazy"
              />
            </div>

            {/* Right: Text */}
            <div>
              <h1 className="text-foreground mb-6">
                Meine Therapien im Detail
              </h1>
              <p className="text-[17px] leading-[1.7] text-foreground/60">
                Erfahren Sie mehr zu meinen therapeutischen Ans&auml;tzen und
                verstehen Sie meinen ganzheitlichen Ansatz.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 1. Autogenes Training */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-foreground mb-6">Autogenes Training</h2>
            <p>
              <strong>Autogenes Training</strong> ist ein auf Autosuggestion
              basierendes Entspannungsverfahren. Es wurde vom Berliner
              Psychiater Johannes Heinrich Schultz aus der Hypnose entwickelt,
              1926 erstmals vorgestellt und 1932 in seinem Buch{" "}
              <em>Das autogene Training</em> publiziert. Heute ist das autogene
              Training eine weit verbreitete und &ndash; beispielsweise in
              Deutschland und &Ouml;sterreich sogar gesetzlich &ndash;
              anerkannte Psychotherapiemethode.
            </p>
          </article>
        </div>
      </section>

      {/* 2. Kognitive Verhaltenstherapie */}
      <section className="w-full py-16 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-foreground mb-6">
              Kognitive Verhaltenstherapie
            </h2>
            <p>
              Im Mittelpunkt der kognitiven Therapieverfahren stehen
              Kognitionen. Kognitionen umfassen Einstellungen, Gedanken,
              Bewertungen und &Uuml;berzeugungen. Die kognitiven
              Therapieverfahren, zu denen die kognitive Therapie (KT) und die
              Rational-Emotive Verhaltenstherapie (REVT) geh&ouml;ren, gehen
              davon aus, dass die Art und Weise, wie wir denken, bestimmt, wie
              wir uns f&uuml;hlen und verhalten und wie wir k&ouml;rperlich
              reagieren. Schwerpunkte der Therapie sind
            </p>
            <ul className="space-y-2 my-6 ml-6 list-disc text-foreground/75">
              <li>die Bewusstmachung von Kognitionen,</li>
              <li>
                die &Uuml;berpr&uuml;fung von Kognitionen und
                Schlussfolgerungen auf ihre Angemessenheit,
              </li>
              <li>die Korrektur von irrationalen Einstellungen und</li>
              <li>
                der Transfer der korrigierten Einstellungen ins konkrete
                Verhalten.
              </li>
            </ul>
            <p>
              Die kognitive Therapie stellt somit die aktive Gestaltung des
              Wahrnehmungsprozesses in den Vordergrund, weil in letzter Instanz
              nicht die objektive Realit&auml;t, sondern die subjektive Sicht
              des Betrachtenden &uuml;ber das Verhalten entscheidet. Ist die
              Kognition inad&auml;quat (z.&nbsp;B. durch Wahrnehmungsselektion
              und -bewertung), ist auch die M&ouml;glichkeit
              beeintr&auml;chtigt, Affekt und Verhalten zu korrigieren. Vor
              allem spontanes und emotional getriebenes Verhalten sind sehr von
              der Art beeinflusst, wie ein Mensch sein Modell der Umwelt
              gedanklich strukturiert hat.
            </p>
          </article>
        </div>
      </section>

      {/* 3. Massage */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-foreground mb-6">Massage</h2>
            <p>
              Die <strong>Massage</strong> (von &bdquo;massieren;
              ber&uuml;hren; betasten; kneten&ldquo;) dient zur mechanischen
              Beeinflussung von Haut, Bindegewebe und Muskulatur durch
              Dehnungs-, Zug- und Druckreiz. Die Wirkung der Massage erstreckt
              sich von der behandelten Stelle des K&ouml;rpers &uuml;ber den
              gesamten Organismus und schlie&szlig;t auch die Psyche mit ein.
            </p>
            <h3 className="text-foreground mt-8 mb-4">
              Wie wirkt die Massage auf die Gesundheit?
            </h3>
            <ul className="space-y-2 my-6 ml-6 list-disc text-foreground/75">
              <li>Lokale Steigerung der Durchblutung</li>
              <li>Senkung von Blutdruck und Pulsfrequenz</li>
              <li>Entspannung der Muskulatur</li>
              <li>L&ouml;sen von Verklebungen und Narben</li>
              <li>Verbesserte Wundheilung</li>
              <li>Schmerzlinderung</li>
              <li>Einwirken auf innere Organe &uuml;ber Reflexb&ouml;gen</li>
              <li>Psychische Entspannung</li>
              <li>Reduktion von Stress</li>
              <li>Verbesserung des Zellstoffwechsels im Gewebe</li>
              <li>Entspannung von Haut und Bindegewebe</li>
              <li>Beeinflussung des vegetativen Nervensystems</li>
            </ul>
            <p>
              Der Hautkontakt, die Stoffwechselanregung und die Entspannung
              wirken sich positiv auf die psychische Verfassung aus. Die Massage
              eignet sich hervorragend daf&uuml;r, die eigene
              K&ouml;rperwahrnehmung zu verbessern und kann zur Vorbeugung bei
              Stress und erg&auml;nzend zur Therapie von Angstst&ouml;rungen
              oder Depressionen eingesetzt werden.
            </p>
          </article>
        </div>
      </section>

      {/* 4. Meditation */}
      <section className="w-full py-16 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-foreground mb-6">Meditation</h2>
            <p>
              <strong>Meditation</strong> (von &bdquo;nachdenken, nachsinnen,
              &uuml;berlegen&ldquo;) ist eine in vielen Religionen und Kulturen
              ausge&uuml;bte spirituelle Praxis. Durch Achtsamkeits- oder
              Konzentrations&uuml;bungen soll sich der Geist beruhigen und
              sammeln. In &ouml;stlichen Kulturen gilt sie als eine
              grundlegende und zentrale bewusstseinserweiternde &Uuml;bung.
            </p>

            <h3 className="text-foreground mt-8 mb-4">
              Wie wirkt die Meditation?
            </h3>
            <p>
              Die Wirkung von Meditation ist vielschichtig. Studien belegen die
              positiven Effekte der Meditation auf die Gesundheit in folgenden
              Bereichen:
            </p>

            <p className="text-foreground mt-6 mb-3">
              <strong>
                Meditation st&auml;rkt die physische Gesundheit
              </strong>
            </p>
            <ul className="space-y-2 my-4 ml-6 list-disc text-foreground/75">
              <li>
                Reduzierung von Bluthochdruck, der Herzschlag wird verlangsamt,
                die Atmung vertieft, Muskelspannungen reduziert.
              </li>
              <li>
                Verbesserten Umgang mit chronischem und Spannungs-Schmerzen
              </li>
              <li>St&auml;rkung des Immunsystems und der Gesundheit</li>
              <li>Reduzierung von Kopfschmerzen</li>
              <li>Entspannende Wirkung bei Stress</li>
            </ul>

            <p className="text-foreground mt-6 mb-3">
              <strong>
                Meditation st&auml;rkt die psychische Gesundheit
              </strong>
            </p>
            <ul className="space-y-2 my-4 ml-6 list-disc text-foreground/75">
              <li>Reduzierung von Angstzust&auml;nden</li>
              <li>
                Reduzierung und bessere Erholung bei Burnout und Depression
              </li>
              <li>Minimierung von Schlafst&ouml;rungen</li>
              <li>
                Reduzierung von Stress, Tinnitus, Zwangsst&ouml;rung
              </li>
            </ul>

            <p className="text-foreground mt-6 mb-3">
              <strong>
                Meditation unterst&uuml;tzt Verhaltens&auml;nderungen, bzw.
                hilft bei Verhaltensst&ouml;rungen
              </strong>
            </p>
            <ul className="space-y-2 my-4 ml-6 list-disc text-foreground/75">
              <li>Reduzierung von Aggression</li>
              <li>Genesung von Alkoholsucht</li>
              <li>Minderung von Essst&ouml;rungen</li>
              <li>&Uuml;berwindung von Lernschwierigkeiten</li>
              <li>Verbesserter Umgang mit Sucht</li>
            </ul>
          </article>
        </div>
      </section>

      {/* 5. Paartherapie */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-foreground mb-6">Paartherapie</h2>
            <p>
              Gemeinsam einen Schritt vorw&auml;rts machen &ndash; in Einzel-
              und Paargespr&auml;chen, erg&auml;nzt mit Elementen der
              taoistischen Traditionen in Meditation, Yoga und Qigong,
              verfolgen wir folgende Ziele:
            </p>
            <ul className="space-y-2 my-6 ml-6 list-disc text-foreground/75">
              <li>
                Beziehungsprobleme verstehen und herausfinden, wie Ihre
                Liebesbeziehung funktionieren kann
              </li>
              <li>
                Sich selbst und den Partner besser erkennen und verstehen
              </li>
              <li>
                Neue Werkzeuge in die Hand bekommen, die in allen Lebenslagen
                n&uuml;tzlich sind
              </li>
            </ul>
          </article>
        </div>
      </section>

      {/* 6. Sokratischer Dialog */}
      <section className="w-full py-16 lg:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-foreground mb-6">Sokratischer Dialog</h2>
            <p>
              Der Sokratische Dialog ist eine Fragetechnik, derer sich
              Therapeuten bedienen, wenn es im therapeutisch-beratenden
              Gespr&auml;ch um Begriffserkl&auml;rung und Entscheidungsfindung
              geht. Es ist ein Prozess des kritischen Hinterfragens von
              Argumenten. So sollen Strukturen und Verhaltensmuster sichtbar,
              das eigene Denken und Handeln verstehbar und damit auch
              ver&auml;nderbar werden.
            </p>
          </article>
        </div>
      </section>

      {/* 7. Yoga, Qigong, Tai Chi */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-foreground mb-6">Yoga, Qigong, Tai Chi</h2>
            <p>
              <strong>Yoga, Qigong</strong> und <strong>Tai Chi</strong> sind
              Techniken, die an der K&ouml;rperstruktur und an der
              K&ouml;rperwahrnehmung arbeiten. In Verbindung mit Meditation und
              Massage f&uuml;hren diese Praktiken zu einem neuen
              Selbstbewu&szlig;tsein, eine positivere und annehmendere Haltung
              zu sich selbst und zum eigenen K&ouml;rper und ein zunehmendes
              Gef&uuml;hl f&uuml;r die eigene Gesundheit.
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
