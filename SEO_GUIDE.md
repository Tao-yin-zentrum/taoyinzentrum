# SEO-Optimierung für Taoyin Zentrum Ingolstadt

## Überblick

Deine Website ist jetzt vollständig SEO-optimiert mit:
- ✅ **Statische Meta-Tags** in `index.html` für Social Sharing
- ✅ **Dynamische SEO-Komponente** für alle Pages
- ✅ **Open Graph Tags** für Facebook/WhatsApp Shares
- ✅ **Twitter Card Tags** für Twitter/X Shares
- ✅ **Structured Data (Schema.org)** für Google Rich Results
- ✅ **Canonical URLs** und Hreflang Tags für Mehrsprachigkeit

## 1. Statische SEO (index.html)

Die `index.html` im Root-Verzeichnis enthält die Fallback-Meta-Tags, die verwendet werden, wenn:
- Social Media Bots die Seite crawlen (WhatsApp, Facebook, Twitter, etc.)
- Suchmaschinen die Seite das erste Mal indexieren
- JavaScript deaktiviert ist

**Wichtig:** Diese Tags werden von der SEO-Komponente überschrieben, sobald die React-App lädt.

## 2. Dynamische SEO-Komponente

Die `<SEO>`-Komponente in `/src/app/components/SEO.tsx` ermöglicht es, für jede Seite individuelle Meta-Tags zu setzen.

### Verwendung in Pages

```tsx
import { SEO } from "../components/SEO";

export default function MyPage() {
  return (
    <>
      <SEO 
        title="Dein Seitentitel"
        description="Deine Meta-Beschreibung (max. 160 Zeichen)"
        keywords="keyword1, keyword2, keyword3"
        url="/my-page"
      />
      {/* Rest der Seite */}
    </>
  );
}
```

### SEO-Props

| Prop | Typ | Pflicht | Beschreibung |
|------|-----|---------|--------------|
| `title` | string | ✅ | Seitentitel (max. 60 Zeichen) |
| `description` | string | ✅ | Meta-Beschreibung (max. 160 Zeichen) |
| `keywords` | string | ❌ | SEO Keywords (kommasepariert) |
| `image` | string | ❌ | OG-Image URL (Standard: Taoyin Logo) |
| `url` | string | ❌ | Relative URL der Seite (z.B. "/about") |
| `type` | string | ❌ | OG-Type ("website" oder "article") |
| `locale` | string | ❌ | Sprache ("de_DE", "en_US", "es_ES") |
| `noindex` | boolean | ❌ | Seite von Suchmaschinen ausschließen |

## 3. Integration mit Storyblok

Die SEO-Komponente kann automatisch SEO-Daten aus Storyblok Stories extrahieren:

```tsx
import { SEO, extractSEOFromStory } from "../components/SEO";
import { useStoryblokPage } from "../../hooks/useStoryblokPage";

export default function Home() {
  const { story } = useStoryblokPage<HomeContent>("home");

  return (
    <>
      <SEO 
        title="Fallback Titel"
        description="Fallback Beschreibung"
        {...(story ? extractSEOFromStory(story) : {})}
      />
      {/* Rest der Seite */}
    </>
  );
}
```

### Storyblok SEO-Felder

Das Google Apps Script erstellt automatisch folgende SEO-Felder in allen Content Types:

- `seo_title` (Text) - SEO-optimierter Titel
- `seo_description` (Textarea) - Meta-Beschreibung
- `seo_keywords` (Text) - Keywords (kommasepariert)
- `seo_image` (Asset) - Open Graph Bild

Die `extractSEOFromStory()` Funktion sucht automatisch nach diesen Feldern und nutzt Fallbacks:

1. `seo_title` → `title` → `story.name`
2. `seo_description` → `description` → ""
3. `seo_image` → `hero_image` → Default Image

## 4. Social Sharing Optimierung

### WhatsApp & Facebook

WhatsApp und Facebook nutzen Open Graph Tags:

```html
<meta property="og:title" content="Dein Titel" />
<meta property="og:description" content="Deine Beschreibung" />
<meta property="og:image" content="https://..." />
<meta property="og:url" content="https://..." />
```

**Wichtig für WhatsApp:**
- Bild sollte mindestens 1200x630px sein
- Format: JPG oder PNG
- Maximale Dateigröße: 8MB
- Die Tags in `index.html` werden beim ersten Share gecached

### Twitter/X

Twitter nutzt eigene `twitter:` Tags (werden automatisch gesetzt):

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Dein Titel" />
<meta name="twitter:description" content="Deine Beschreibung" />
<meta name="twitter:image" content="https://..." />
```

## 5. Best Practices

### Title Tags
- **Länge:** 50-60 Zeichen (Google zeigt ~60 an)
- **Format:** "Hauptkeyword – Nebenkeyword | Markenname"
- **Beispiel:** "Qi Gong Ingolstadt – Kurse & Workshops | Taoyin Zentrum"

### Meta Descriptions
- **Länge:** 150-160 Zeichen (Google zeigt ~160 an)
- **Call-to-Action:** Nutzer zur Aktion animieren
- **Keywords:** Wichtigste Keywords natürlich einbauen
- **Beispiel:** "Entdecke die heilende Kraft von Qi Gong in Ingolstadt. Professionelle Kurse für Anfänger & Fortgeschrittene. Jetzt Schnupperstunde buchen!"

### Keywords
- **Anzahl:** 5-10 relevante Keywords
- **Format:** Kommasepariert, nach Wichtigkeit sortiert
- **Beispiel:** "Qi Gong Ingolstadt, Tao Yin, Chi Nei Tsang, Psychotherapie, Meditation"

### OG Images
- **Größe:** 1200x630px (optimal für alle Plattformen)
- **Format:** JPG oder PNG
- **Inhalt:** Branding + kurzer Text
- **Dateigröße:** < 1MB für schnelles Laden

## 6. Testing & Validation

### Facebook Sharing Debugger
1. Gehe zu: https://developers.facebook.com/tools/debug/
2. URL eingeben und "Debug" klicken
3. "Scrape Again" für Cache-Refresh

### WhatsApp Link Preview Tester
1. Sende die URL an dich selbst in WhatsApp
2. Prüfe ob Titel, Beschreibung und Bild korrekt angezeigt werden
3. Falls nicht: Facebook Debugger nutzen (WhatsApp nutzt FB's Cache)

### Twitter Card Validator
1. Gehe zu: https://cards-dev.twitter.com/validator
2. URL eingeben und prüfen

### Google Rich Results Test
1. Gehe zu: https://search.google.com/test/rich-results
2. URL eingeben für Structured Data Validierung

## 7. Lokale SEO Optimierung

Die `index.html` enthält bereits **Schema.org LocalBusiness** Markup:

```json
{
  "@type": "HealthAndBeautyBusiness",
  "name": "Taoyin Zentrum Ingolstadt",
  "address": {
    "addressLocality": "Ingolstadt",
    "addressCountry": "DE"
  },
  "priceRange": "€€"
}
```

**TODO:** Vervollständige die Daten in `index.html`:
- `telephone`: Telefonnummer hinzufügen
- `address`: Vollständige Adresse mit Straße & PLZ
- `openingHours`: Öffnungszeiten im Format "Mo-Fr 09:00-18:00"
- `geo`: Koordinaten für Google Maps
- `image`: Hochauflösendes Bild der Praxis

## 8. Robots.txt & Sitemap

### Robots.txt
Bereits vorhanden in `/public/robots.txt`. Prüfe und passe an.

### Sitemap
Bereits vorhanden in `/public/sitemap.xml`. 

**TODO nach Deployment:**
1. Ersetze `https://example.com` mit echter Domain
2. Füge alle Seiten hinzu (auch Unterseiten)
3. Setze korrekte `lastmod` Daten
4. Bei Google Search Console einreichen

## 9. Mehrsprachigkeit (i18n)

Die SEO-Komponente setzt automatisch `hreflang` Tags für alle Sprachen:

```html
<link rel="alternate" hreflang="de" href="https://..." />
<link rel="alternate" hreflang="en" href="https://..." />
<link rel="alternate" hreflang="es" href="https://..." />
<link rel="alternate" hreflang="x-default" href="https://..." />
```

**Für neue Sprachen:**
1. Passe die URLs in `SEO.tsx` an
2. Setze `locale` Prop entsprechend

## 10. Performance & Core Web Vitals

SEO-relevante Performance-Faktoren:
- ✅ Lazy Loading für Bilder (`loading="lazy"`)
- ✅ Font Preconnect für schnellere Schriftarten
- ⚠️ **TODO:** Bilder komprimieren (WebP statt PNG/JPG)
- ⚠️ **TODO:** OG-Images optimieren (< 500KB)

## 11. Checkliste vor Launch

- [ ] `index.html`: Domain, Telefon, Adresse aktualisieren
- [ ] `SEO.tsx`: `BASE_URL` auf echte Domain setzen
- [ ] Alle Pages haben `<SEO>` Komponente
- [ ] OG-Images sind optimiert (1200x630px, < 1MB)
- [ ] `robots.txt` und `sitemap.xml` aktualisiert
- [ ] Google Search Console eingerichtet
- [ ] Facebook Debugger gecheckt
- [ ] WhatsApp Preview getestet
- [ ] Schema.org Markup validiert

## 12. Nächste Schritte

Nach dem Launch:
1. **Google Analytics** einbinden (GA4)
2. **Google Search Console** Ownership verifizieren
3. **Bing Webmaster Tools** hinzufügen
4. **Google My Business** Profil erstellen
5. **Backlinks** aufbauen (Verzeichnisse, Partner, etc.)
6. **Content Marketing** (Blog für Keywords)
7. **Local Citations** (Gelbe Seiten, Yelp, etc.)

---

**Fragen?** Alle SEO-relevanten Dateien:
- `/index.html` - Statische Meta-Tags
- `/src/app/components/SEO.tsx` - Dynamische SEO-Komponente
- `/public/robots.txt` - Crawler-Anweisungen
- `/public/sitemap.xml` - Sitemap
- `/STORYBLOK_SETUP_SCRIPT.gs` - Google Script mit SEO-Feldern
