const testimonials = [
  {
    name: "D.L.",
    text: "Als ich Anfang des Jahres zu Estela kam, war ich am Ende meiner seelischen und körperlichen Kräfte. Ich suchte überall um Rat oder Antworten. Jedoch ohne Erfolg. Eine psychosomatische Belastungsstörung wurde bei mir diagnostiziert. Dann... Zu meinem Glück, traf ich auf Estelas Taoyin Zentrum. Dank ihrer Erfahrung, ihres Know-Hows, ihrer Menschenkenntnis, ihres ganzen Wesens, hat sich mich aus meinem Loch wieder rausgeholt. Ich bin so dankbar Estela gefunden zu haben.",
  },
  {
    name: "Petra S.",
    text: "Als es mir richtig mies ging und ich mich fühlte, als würde ich bald in eine waschechte Depression rutschen, hat mir Estela geholfen, wieder in die Kraft und in den Flow zu kommen. Hauptsächlich mit ihrer unglaublich kraftvollen Chi Nei Tsang Massage. Und das in relativer kurzer Zeit und mit so wenig Aufwand! Wie von Zauberhand und ohne viel Reden zu müssen. Estela ist mit ganzem Herzen dabei und beherrscht ihr Handwerk auf allen Ebenen.",
  },
  {
    name: "Valeria A.",
    text: "Estela ist ein unglaublicher Mensch, ich bin bereits seit einem Jahr bei ihr und ich habe ihr so viel zu verdanken. Ihre Art, ihre Energie, ihr Wissen und ihr Können halfen mir extrem. Ich kann niemanden so sehr empfehlen wie Sie. Einfach toll diese Frau.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="w-full py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-primary mb-3">
              Erfahrungen aus unserer Gemeinschaft
            </p>
            <h2>Stimmen, die berühren</h2>
          </div>
          <p className="text-[16px] text-foreground/60 leading-relaxed lg:pt-8">
            Unsere Teilnehmer*innen teilen, wie die taoistischen Praktiken ihr
            Leben bereichern – mit mehr Ruhe, innerer Balance und neuer
            Lebensenergie. Lass dich inspirieren und finde deinen eigenen Weg in
            die Mitte.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-xl p-7 text-center"
            >
              <p className="text-[14px] text-foreground mb-4">{t.name}</p>
              <p className="text-[14px] text-foreground/60 leading-relaxed">
                {t.text}
              </p>
            </div>
          ))}
        </div>

        {/* Google Link */}
        <div className="text-center">
          <a
            href="https://www.google.com/search?q=Taoyin+Zentrum+Rezensionen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-secondary text-secondary-foreground px-7 py-3 rounded-lg text-[15px] hover:bg-secondary/90 transition-colors"
          >
            Mehr Rezensionen auf Google
          </a>
        </div>
      </div>
    </section>
  );
}
