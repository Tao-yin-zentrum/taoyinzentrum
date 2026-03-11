# ✅ SEO Pre-Launch Checklist
## Taoyin Zentrum Ingolstadt

Verwende diese Checkliste **vor dem Go-Live**, um sicherzustellen, dass deine Website für Suchmaschinen und Social Media optimiert ist.

---

## 📱 Social Sharing

### Facebook & WhatsApp
- [ ] **Open Graph Bild** ist hochgeladen (1200x630px, < 1MB, JPG/PNG)
- [ ] **OG Title** ist korrekt in `index.html` (max. 60 Zeichen)
- [ ] **OG Description** ist korrekt in `index.html` (max. 160 Zeichen)
- [ ] **OG Image URL** ist korrekt in `index.html`
- [ ] **Facebook Sharing Debugger** getestet: https://developers.facebook.com/tools/debug/
- [ ] WhatsApp-Link an dich selbst geschickt und Preview geprüft

### Twitter/X
- [ ] **Twitter Card** auf "summary_large_image" gesetzt
- [ ] **Twitter Image** ist korrekt (gleich wie OG-Image)
- [ ] **Twitter Card Validator** getestet: https://cards-dev.twitter.com/validator

---

## 🔍 On-Page SEO

### Meta-Tags
- [ ] **Title Tag** in `index.html` ist optimiert (50-60 Zeichen)
- [ ] **Meta Description** in `index.html` ist optimiert (150-160 Zeichen)
- [ ] **Keywords** sind gesetzt (5-10 relevante Keywords)
- [ ] **Canonical URL** zeigt auf korrekte Domain
- [ ] **Hreflang Tags** für DE/EN/ES sind korrekt

### Page-spezifische SEO
- [ ] **Home Page** hat `<SEO>` Komponente
- [ ] **About Page** hat `<SEO>` Komponente
- [ ] **Psychotherapie Page** hat `<SEO>` Komponente
- [ ] **TaoYin, QiGong, ChiNeiTsang Pages** haben `<SEO>` Komponenten
- [ ] **Kontakt Page** hat `<SEO>` Komponente
- [ ] Alle Seiten haben **unique titles** und **descriptions**

### Storyblok SEO-Felder
- [ ] In Storyblok: **seo_title** für Home-Page befüllt
- [ ] In Storyblok: **seo_description** für Home-Page befüllt
- [ ] In Storyblok: **seo_keywords** für Home-Page befüllt
- [ ] In Storyblok: **seo_image** für Home-Page hochgeladen
- [ ] Für alle wichtigen Pages wiederholen

---

## 🏢 Local SEO (Schema.org)

### Schema.org Markup (in `index.html`)
- [ ] **Business Name** ist korrekt ("Taoyin Zentrum Ingolstadt")
- [ ] **@type** ist passend (aktuell: "HealthAndBeautyBusiness")
- [ ] **Address** ist vollständig (Straße, PLZ, Stadt, Land)
- [ ] **Telefonnummer** ist eingetragen (Format: +49-XXX-XXXXXXX)
- [ ] **E-Mail** ist eingetragen
- [ ] **Öffnungszeiten** sind eingetragen (Format: "Mo-Fr 09:00-18:00")
- [ ] **Geo-Koordinaten** sind eingetragen (Längen-/Breitengrad)
- [ ] **Bild der Praxis** ist hochgeladen und URL eingetragen
- [ ] **Google Rich Results Test** durchgeführt: https://search.google.com/test/rich-results

---

## 📄 Robots & Sitemap

### Robots.txt
- [ ] `/public/robots.txt` existiert
- [ ] Sitemap-URL ist eingetragen
- [ ] Keine wichtigen Seiten blockiert
- [ ] Erreichbar unter: `https://deine-domain.de/robots.txt`

### Sitemap
- [ ] `/public/sitemap.xml` existiert
- [ ] Alle wichtigen Seiten sind eingetragen
- [ ] URLs sind korrekt (mit echter Domain, nicht `example.com`)
- [ ] `lastmod` Daten sind gesetzt
- [ ] Erreichbar unter: `https://deine-domain.de/sitemap.xml`
- [ ] Bei **Google Search Console** eingereicht

---

## ⚡ Performance & Core Web Vitals

### Bilder
- [ ] Alle Hero-Images sind **komprimiert** (< 500KB)
- [ ] OG-Images sind **optimiert** (< 1MB)
- [ ] `loading="lazy"` für alle Bilder außer Hero
- [ ] **WebP-Format** wo möglich (statt JPG/PNG)
- [ ] Bilder haben **Alt-Texte**

### Schriften & Assets
- [ ] `preconnect` für Google Fonts in `index.html`
- [ ] Keine blockierenden Scripts im `<head>`
- [ ] **Lighthouse Score** > 90 für Performance

### Core Web Vitals
- [ ] **LCP** (Largest Contentful Paint) < 2.5s
- [ ] **FID** (First Input Delay) < 100ms
- [ ] **CLS** (Cumulative Layout Shift) < 0.1
- [ ] Mit **PageSpeed Insights** getestet: https://pagespeed.web.dev/

---

## 🌐 Multi-Language

### Hreflang Tags
- [ ] Hreflang-Tags in `SEO.tsx` sind korrekt
- [ ] **DE** Version zeigt auf `/` und `/de/...`
- [ ] **EN** Version zeigt auf `/en/...`
- [ ] **ES** Version zeigt auf `/es/...`
- [ ] **x-default** zeigt auf DE-Version

### Content
- [ ] Alle 3 Sprachen (DE/EN/ES) sind in Storyblok befüllt
- [ ] Navigation funktioniert in allen Sprachen
- [ ] Sprachumschalter ist sichtbar (falls implementiert)

---

## 🔗 URLs & Links

### Canonical URLs
- [ ] `BASE_URL` in `SEO.tsx` ist auf **echte Domain** gesetzt
- [ ] Canonical URL zeigt auf korrekte Version (nicht `localhost`)
- [ ] Keine doppelten Canonical Tags

### Internal Links
- [ ] Alle Links funktionieren (keine 404s)
- [ ] Links verwenden **relative Pfade** für interne Navigation
- [ ] Links zu Social Media sind korrekt

### External Links
- [ ] Alle externen Links haben `rel="noopener"` (Sicherheit)
- [ ] Links zu externen Seiten öffnen in neuem Tab (`target="_blank"`)

---

## 📊 Analytics & Tracking

### Google Analytics (optional)
- [ ] Google Analytics 4 (GA4) eingerichtet
- [ ] Tracking Code in `index.html` eingefügt
- [ ] Cookie-Consent implementiert (DSGVO)
- [ ] Datenschutzerklärung verlinkt

### Google Search Console
- [ ] Property für Domain erstellt
- [ ] Ownership verifiziert (z.B. via HTML-Tag)
- [ ] Sitemap eingereicht
- [ ] Indexierung überwacht

### Google My Business (optional)
- [ ] Google My Business Profil erstellt
- [ ] Adresse, Telefon, Öffnungszeiten eingetragen
- [ ] Fotos hochgeladen
- [ ] Kategorie "Heilpraktiker" oder ähnlich gewählt

---

## 🔒 Security & Privacy

### HTTPS
- [ ] Website ist über **HTTPS** erreichbar
- [ ] HTTP → HTTPS Redirect ist aktiv
- [ ] SSL-Zertifikat ist gültig

### Privacy
- [ ] **Datenschutzerklärung** ist vorhanden und verlinkt
- [ ] **Impressum** ist vorhanden und verlinkt
- [ ] Cookie-Consent Banner (falls Cookies verwendet werden)
- [ ] DSGVO-konform (z.B. Google Fonts lokal hosten)

---

## 🎯 Content Quality

### Texte
- [ ] Alle Texte sind **fehlerfrei** (Rechtschreibung, Grammatik)
- [ ] **Keywords** sind natürlich im Text eingebaut
- [ ] **Überschriften-Hierarchie** ist korrekt (H1 > H2 > H3)
- [ ] **Meta-Descriptions** sind unique und ansprechend
- [ ] Texte sind **lesbar** und **strukturiert** (Absätze, Listen)

### Bilder
- [ ] Alle Bilder haben **beschreibende Alt-Texte**
- [ ] Dateinamen sind **sprechend** (z.B. `qi-gong-kurs-ingolstadt.jpg`)
- [ ] Keine "image-123.jpg" Dateinamen

---

## 📞 Contact & Trust

### Kontaktinformationen
- [ ] **Telefonnummer** ist überall korrekt
- [ ] **E-Mail-Adresse** ist überall korrekt
- [ ] **Adresse** ist überall korrekt
- [ ] **WhatsApp-Link** funktioniert

### Trustsignale
- [ ] **Qualifikationen** sind erwähnt (auf About-Seite)
- [ ] **Testimonials** sind vorhanden (falls verfügbar)
- [ ] **Zertifikate** sind sichtbar (falls vorhanden)
- [ ] **Datenschutz** und **Impressum** sind professionell

---

## 🚀 Technical SEO

### HTML-Struktur
- [ ] **Semantisches HTML** (header, nav, main, footer, article, section)
- [ ] **Nur ein H1** pro Seite
- [ ] **Überschriften-Hierarchie** logisch (keine H4 ohne H3)
- [ ] **Listen** wo sinnvoll (`<ul>`, `<ol>`)

### Accessibility (A11y)
- [ ] Alle Bilder haben **Alt-Texte**
- [ ] Links haben **sprechende Texte** (kein "Hier klicken")
- [ ] **Farbkontraste** sind ausreichend (WCAG AA)
- [ ] **Keyboard-Navigation** funktioniert

### Mobile
- [ ] Website ist **responsive**
- [ ] **Mobile Usability** in Google Search Console geprüft
- [ ] Keine horizontalen Scrollbalken
- [ ] Touch-Targets sind groß genug (min. 44x44px)

---

## 🧪 Testing

### Pre-Launch Tests
- [ ] **Desktop**: Chrome, Firefox, Safari getestet
- [ ] **Mobile**: iOS Safari, Android Chrome getestet
- [ ] **Tablet**: iPad getestet
- [ ] Alle Links funktionieren
- [ ] Formular funktioniert (Kontaktformular)
- [ ] WhatsApp-Button funktioniert
- [ ] Telefon-Links funktionieren auf Mobile

### SEO Tools
- [ ] **Google Lighthouse** Score > 90
- [ ] **PageSpeed Insights** geprüft
- [ ] **Facebook Sharing Debugger** geprüft
- [ ] **Twitter Card Validator** geprüft
- [ ] **Google Rich Results Test** geprüft
- [ ] **Mobile-Friendly Test** geprüft: https://search.google.com/test/mobile-friendly

---

## 📝 Post-Launch

### Nach Go-Live (Woche 1)
- [ ] Google Search Console → URL-Inspektion für Homepage
- [ ] Google Analytics → Echtzeit-Tracking prüfen
- [ ] Sitemap in Search Console erneut einreichen
- [ ] Erste Indexierung in Google überprüfen (Search: `site:deine-domain.de`)

### Nach Go-Live (Woche 2-4)
- [ ] **Keywords überwachen** (Google Search Console)
- [ ] **Backlinks aufbauen** (Verzeichnisse, Partner)
- [ ] **Content aktualisieren** (News, Blog, Events)
- [ ] **Local Citations** erstellen (Gelbe Seiten, Yelp, etc.)

---

## 🎯 Priority Checklist (Minimal Viable SEO)

Falls du wenig Zeit hast, konzentriere dich auf diese Must-Haves:

### Kritisch (Must-Have)
- [ ] `index.html` → Title, Description, OG-Tags korrekt
- [ ] Alle Pages haben `<SEO>` Komponente
- [ ] OG-Image hochgeladen (1200x630px)
- [ ] Facebook Debugger getestet
- [ ] Robots.txt und Sitemap online
- [ ] Google Search Console eingerichtet
- [ ] HTTPS aktiviert

### Wichtig (Should-Have)
- [ ] Schema.org Markup komplett
- [ ] Performance-Score > 90
- [ ] Mobile-optimiert
- [ ] Google Analytics eingerichtet
- [ ] Alle Bilder optimiert

### Nice-to-Have
- [ ] Google My Business
- [ ] Local Citations
- [ ] Backlinks
- [ ] Twitter Cards
- [ ] Content Marketing

---

## ✅ Final Sign-Off

**Datum:** _____________

**Reviewer:** _____________

**Notizen:**


---

**🎉 Bereit für den Launch!**

Nach Abschluss dieser Checkliste ist deine Website SEO-optimiert und bereit für Suchmaschinen und Social Media.

**Nächste Schritte:**
1. Website live schalten
2. Woche 1: Monitoring
3. Woche 2-4: Content & Backlinks
4. Monat 2+: Keyword-Optimierung & Ranking-Verbesserung

Viel Erfolg! 🚀
