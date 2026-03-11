import { Link } from "react-router";

export function PsychotherapieSection() {
  return (
    <section className="w-full py-16 lg:py-24 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-1">
            <h2 className="text-white mb-5">Ganzheitliche Psychotherapie</h2>
            <p className="text-white/60 text-[16px] leading-relaxed mb-8">
              Ich arbeite mit klassischen Verfahren wie Entspannungstechniken und
              Verhaltenstherapie sowie mit alternativen Methoden aus den Bereichen
              der Meditation, des Qigong, des Tai Chi und der Ern&auml;hrung nach
              den 5 Elementen.
            </p>
            <Link
              to="/psychotherapie"
              className="inline-flex items-center justify-center border-2 border-white/80 text-white px-7 py-3 rounded-lg text-[15px] hover:bg-white/10 transition-colors"
            >
              Mehr erfahren
            </Link>
          </div>
          <div className="lg:col-span-2">
            <img
              src="https://cdn.prod.website-files.com/image-generation-assets/c79b83fd-d5a5-46a1-8aa0-b49f43616c5e.avif"
              alt="Entspannungsraum mit beruhigender Kunst"
              className="w-full h-auto rounded-lg object-cover aspect-[4/3]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}