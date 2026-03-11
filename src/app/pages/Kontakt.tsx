export default function Kontakt() {
  return (
    <>
      {/* Kontakt & Anfahrt Section */}
      <section className="w-full py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-foreground mb-6">Anfahrt &amp; Kontakt</h2>
            <p>
              Sie erreichen mich telefonisch unter der Nummer:{" "}
              <a
                href="tel:+4915115539416"
                className="text-primary hover:underline"
              >
                015115539416
              </a>
            </p>
            <p>
              Anfragen f&uuml;r das Taoyin Zentrum schicken Sie an:{" "}
              <a
                href="mailto:info@taoyin-zentrum.de"
                className="text-primary hover:underline"
              >
                info@taoyin-zentrum.de
              </a>{" "}
              und f&uuml;r meine Praxis f&uuml;r Psychotherapie an:{" "}
              <a
                href="mailto:info@estela-fuchs.com"
                className="text-primary hover:underline"
              >
                info@estela-fuchs.com
              </a>
            </p>
            <p>
              Sie k&ouml;nnen mich auch &uuml;ber{" "}
              <a
                href="https://wa.me/4915115539416"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                WhatsApp
              </a>{" "}
              erreichen.
            </p>
            <p>
              So finden Sie in unser Taoyin Zentrum in Ingolstadt (Bei der
              Schleifm&uuml;hle 34b, 85049 Ingolstadt).
            </p>
          </article>

          {/* Google Maps Embed */}
          <div className="mt-10 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2630.0624516720795!2d11.420049176458845!3d48.76160367131921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479efe56d8b8cd61%3A0x3dc999cc772d6329!2sTaoyin%20Zentrum!5e0!3m2!1sde!2sde!4v1755087424680!5m2!1sde!2sde"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Taoyin Zentrum Ingolstadt auf Google Maps"
            />
          </div>
        </div>
      </section>
    </>
  );
}
