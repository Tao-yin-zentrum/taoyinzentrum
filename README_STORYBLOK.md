# Storyblok CMS Integration für Taoyin Zentrum

## 📚 Verfügbare Scripts

Es gibt **zwei Versionen** des Setup-Scripts:

### 1. **STORYBLOK_SETUP_SCRIPT.gs** (Original)
- Erstellt Content Types und Folder-Struktur
- Verwendet **Platzhalter-Daten**
- Schneller, einfacher
- ⚠️ **Musst du manuell befüllen**

### 2. **STORYBLOK_SETUP_SCRIPT_COMPLETE.gs** (NEU - EMPFOHLEN!)
- Erstellt Content Types und Folder-Struktur
- Lädt **echte Bilder** als Assets hoch
- Verwendet **echte Texte** aus dem React-Projekt
- Befüllt **alle 3 Sprachen** (DE komplett, EN/ES Basis)
- ✅ **Sofort einsatzbereit!**

## 🚀 Schnellstart (Empfohlen)

**Verwende das neue Complete Script:**

1. Öffne [Google Apps Script](https://script.google.com)
2. Kopiere `/STORYBLOK_SETUP_SCRIPT_COMPLETE.gs`
3. Trage deine Storyblok Credentials ein
4. Führe die `main` Funktion aus
5. Warte 10-15 Minuten
6. **Fertig!** Alle echten Inhalte sind in Storyblok 🎉

**Detaillierte Anleitung:** Siehe `/MIGRATION_CHECKLIST.md`

---

## 📖 Dokumentation

| Datei | Beschreibung |
|-------|--------------|
| `/STORYBLOK_SETUP_SCRIPT.gs` | Original Script (Platzhalter) |
| `/STORYBLOK_SETUP_SCRIPT_COMPLETE.gs` | **Complete Script mit echten Inhalten** ⭐ |
| `/STORYBLOK_MIGRATION_GUIDE.md` | Ausführliche Anleitung & Troubleshooting |
| `/MIGRATION_CHECKLIST.md` | Step-by-step Checklist |
| `/STORYBLOK_SETUP.md` | Original Setup Guide |

---

## ✨ Was das Complete Script macht

### Echte Inhalte die migriert werden:

#### ✅ Home Page (DE)
- **Hero**: Vollständiger Text & Bilder
- **Details Sections**: Alle 7 Sections
  - Tao Basis
  - Einführung in Qi Gong
  - Medizinisches Qi Gong
  - Chi Nei Tsang Behandlung
  - Chi Nei Tsang Ausbildung
  - Praxis für Psychotherapie
  - Estela's Geschichte (kompletter Text!)
- **Angebote**: Alle 4 Pricing Cards
  - Tao Basis (280 €)
  - Medizinisches Qi Gong (150 €)
  - Chi Nei Tsang Behandlung (95 €)
  - Chi Nei Tsang Ausbildung (5.500 €)
- **FAQs**: Alle 4 echten FAQs
- **Testimonials**: Alle 3 echten Testimonials
- **News**: 3 Items (Texte können später angepasst werden)
- **CTA**: Vollständiger Text
- **SEO**: Meta Title, Description, Keywords, OG Image

#### ✅ Global Content
- **Navbar**: Alle Navigation Links
- **Footer**: Kontaktdaten, Social Links, Copyright

#### ✅ Assets
- Hero Images (2)
- Details Section Images (7)
- News Images (3)
- Logo

#### ⚠️ EN/ES
- Basis-Struktur vorhanden
- Hero & wichtigste Texte übersetzt
- Details/FAQs/Testimonials können nachträglich übersetzt werden

---

## 🎯 Welches Script soll ich verwenden?

| Szenario | Empfehlung |
|----------|------------|
| Ich will **sofort starten** mit echten Inhalten | ✅ `STORYBLOK_SETUP_SCRIPT_COMPLETE.gs` |
| Ich will **alles selbst eingeben** | `STORYBLOK_SETUP_SCRIPT.gs` |
| Ich will **Zeit sparen** | ✅ `STORYBLOK_SETUP_SCRIPT_COMPLETE.gs` |
| Ich habe **keine echten Texte** | `STORYBLOK_SETUP_SCRIPT.gs` |

**➡️ 95% der Nutzer sollten das Complete Script verwenden!**

---

## 📝 Nach dem Script-Run

### 1. Git & GitHub (5 Minuten)
```bash
git add .
git commit -m "Add Storyblok CMS integration with SEO optimization"
git push
```

### 2. Vercel Environment Variable (2 Minuten)
In Vercel → Settings → Environment Variables:
- **Name:** `VITE_STORYBLOK_ACCESS_TOKEN`
- **Value:** `[wird nach Storyblok Setup eingetragen]`

### 3. Storyblok Account & Tokens (5 Minuten)
1. Erstelle kostenlosen Account auf [storyblok.com](https://www.storyblok.com)
2. Erstelle Space "Taoyin Zentrum"
3. Kopiere **Preview Token** (Settings → Access Tokens)
4. Erstelle **Management Token** (Settings → Access Tokens)
5. Notiere **Space ID** (Settings → General)

### 4. Google Apps Script ausführen (10 Minuten)
1. Öffne [script.google.com](https://script.google.com)
2. Kopiere Code aus `STORYBLOK_SETUP_SCRIPT_COMPLETE.gs`
3. Trage deine Credentials ein (Space ID, Management Token)
4. Führe Funktion `main` aus
5. **Fertig!** 🎉 Alle Content Types, Folder und Stories werden automatisch angelegt

### 5. Vercel Token aktualisieren & Deployen (2 Minuten)
1. Trage Preview Token in Vercel ein
2. Triggere Redeploy
3. Website ist live mit Storyblok! ✅

**Gesamtzeit: ~30 Minuten**

---

## 📚 Dokumentation

| Dokument | Zweck | Für wen |
|----------|-------|---------|
| [QUICK_START.md](./QUICK_START.md) | Schnellste Übersicht, alle Schritte auf 1 Seite | **Start hier!** |
| [STORYBLOK_SETUP.md](./STORYBLOK_SETUP.md) | Detaillierte Anleitung mit Screenshots-Beschreibungen | Bei Problemen |
| [COMPONENT_ADAPTATION_GUIDE.md](./COMPONENT_ADAPTATION_GUIDE.md) | Code-Beispiele für Component-Anpassungen | Entwicklung |
| [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) | Vollständige Checkliste mit Tracking | Projekt-Management |

---

## 🏗️ Architektur

### Content Types (Storyblok)

Das Google Script erstellt automatisch folgende Content Types:

#### Global Content
- `global` - Navbar & Footer Daten (für jede Sprache)

#### Page Types
- `page_home` - Homepage
- `page_taoyin` - TaoYin Seite
- `page_qigong` - Qi Gong Seite
- `page_chi_nei_tsang` - Chi Nei Tsang Seite
- `page_psychotherapie` - Psychotherapie Seite
- `page_behandlung` - Behandlungsziele Seite
- `page_therapien` - Therapien Übersicht
- `page_about` - Über mich Seite
- `page_kontakt` - Kontakt Seite
- `page_impressum` - Impressum & Datenschutz

#### Nested Components (Bloks)
- `nav_link` - Navigation Links
- `social_link` - Social Media Links
- `detail_card` - Detail Cards (Home)
- `angebot_card` - Angebot Cards
- `feature_item` - Feature Items
- `news_item` - News Einträge
- `faq_item` - FAQ Items
- `testimonial_item` - Testimonials
- `benefit_item` - Benefit/Vorteil Items
- `method_item` - Methoden Items
- `area_item` - Behandlungsbereiche
- `process_step` - Prozess-Schritte
- `goal_item` - Ziele Items
- `therapy_item` - Therapie Items
- `qualification_item` - Qualifikationen
- `hours_item` - Öffnungszeiten
- `legal_section` - Rechtliche Abschnitte
- `info_item` - Info Items

### Folder Struktur (Storyblok)

```
Storyblok Space
├── de/
│   ├── global
│   ├── home
│   ├── taoyin
│   ├── qi-gong
│   ├── chi-nei-tsang
│   ├── psychotherapie
│   ├── behandlung
│   ├── therapien
│   ├── about
│   ├── kontakt
│   └── impressum
├── en/
│   └── [same structure]
└── es/
    └── [same structure]
```

### Code Struktur

```
/src
├── lib/
│   └── storyblok.ts           # API wrapper, helper functions
├── types/
│   └── storyblok.ts           # TypeScript types for all content types
├── contexts/
│   └── StoryblokContext.tsx   # Global data context (navbar, footer)
├── hooks/
│   └── useStoryblokPage.ts    # Hook for loading page stories
└── app/
    ├── App.tsx                # Wrapped with StoryblokProvider
    ├── components/
    │   ├── Navbar.tsx         # Uses global data from context
    │   ├── Footer.tsx         # Uses global data from context
    │   └── [other components] # Receive content as props
    └── pages/
        ├── Home.tsx           # Example: uses useStoryblokPage hook
        └── [other pages]      # Same pattern
```

---

## 🌍 Multi-Language Setup

Die Website unterstützt 3 Sprachen **ohne** Storybloks native Locale-Feature:

- **Deutsch (DE):** Standard, URL: `/` oder `/de/...`
- **Englisch (EN):** URL: `/en/...`
- **Spanisch (ES):** URL: `/es/...`

**So funktioniert es:**
1. Jede Sprache hat einen eigenen Folder in Storyblok (`de/`, `en/`, `es/`)
2. Die `getCurrentLanguage()` Funktion erkennt die Sprache aus der URL
3. Stories werden basierend auf der Sprache geladen: `de/home`, `en/home`, `es/home`
4. Jede Sprache hat separate Global-Content Stories für Navbar/Footer

**Vorteile:**
- Volle Kontrolle über URLs
- Flexibel für Vercel Deployments
- Kein Premium-Feature erforderlich
- Einfach zu verstehen und zu debuggen

---

## 🔧 Environment Variables

### Für Vercel (Production)
```env
VITE_STORYBLOK_ACCESS_TOKEN=your_preview_token_here
```

### Für Lokale Entwicklung (Optional)
Erstelle eine `.env` Datei basierend auf `.env.example`:
```bash
cp .env.example .env
# Trage deinen Preview Token ein
```

**Wichtig:**
- **Preview Token:** Für Website API Calls (öffentlich, kann im Frontend verwendet werden)
- **Management Token:** NUR für Google Script Setup (geheim!)
- ⚠️ Verwechsle die beiden Tokens NICHT!

---

## 🔄 Workflow nach Setup

### Content bearbeiten
1. Gehe zu [app.storyblok.com](https://app.storyblok.com)
2. Navigiere zur gewünschten Story (z.B. `de/home`)
3. Bearbeite die Felder
4. Klicke "Save" und "Publish"
5. Website aktualisiert sich automatisch (CDN Cache ~1 Minute)

### Code ändern
1. Bearbeite deine React Components
2. Commit und push zu GitHub:
   ```bash
   git add .
   git commit -m "Update components"
   git push
   ```
3. Vercel deployed automatisch
4. Änderungen sind live nach ~1-2 Minuten

### Neue Seite hinzufügen
1. **In Storyblok:** Erstelle neue Story mit passendem Content Type
2. **Im Code:** Füge Route in `src/app/routes.ts` hinzu
3. **Im Code:** Erstelle Page Component mit `useStoryblokPage` Hook
4. Deploy

---

## 🎨 Design Tokens (bereits implementiert)

Die Website verwendet folgende Design-Tokens aus `theme.css`:

```css
--primary: #037baf;              /* Blau für Headings, Links */
--accent: #ff8c42;               /* Orange für Buttons */
--secondary-foreground: #1b3153; /* Dunkles Navy für Button-Text */
--section-bg: #f9f6e5;           /* Warmes Cream für Hintergründe */
--hero-bg: #eff5f6;              /* Kühles Blau-Grau für Hero/Navbar */
```

**Fonts:**
- **Petrona** (Serif, italic) - für Headlines
- **Source Sans 3** - für Body Text

---

## 📊 Was das Google Script macht

Das Script (`STORYBLOK_SETUP_SCRIPT.gs`) automatisiert **alles**:

1. ✅ Erstellt alle 19 Content Types mit ~100+ Feldern
2. ✅ Erstellt Folder-Struktur (de/, en/, es/)
3. ✅ Erstellt Global Content für alle 3 Sprachen
4. ✅ Erstellt alle Page Stories (10 Seiten × 3 Sprachen = 30 Stories)
5. ✅ Befüllt Stories mit sinnvollen Platzhalter-Inhalten
6. ✅ Verlinkt Stories untereinander (Navigation, CTAs)
7. ✅ Fügt Platzhalter-Bilder ein (via placeholder URLs)

**Dauer:** ~5-10 Minuten

**Idempotent:** Kann mehrfach ausgeführt werden (überspringt bereits existierende Inhalte)

---

## 🐛 Troubleshooting

### Problem: "Storyblok API not initialized"
**Lösung:** 
- Überprüfe `VITE_STORYBLOK_ACCESS_TOKEN` in Vercel
- Redeploy nach Setzen der Variable

### Problem: "403 Forbidden" beim API Call
**Lösung:**
- Verwende **Preview Token**, NICHT Management Token
- Überprüfe Space ID in Storyblok

### Problem: Google Script Timeout
**Lösung:**
- Script ist idempotent - einfach nochmal ausführen
- Es überspringt bereits erstellte Inhalte

### Problem: Seite lädt nicht / keine Daten
**Lösung:**
1. Browser Console öffnen (F12)
2. Netzwerk-Tab überprüfen
3. Storyblok API Call Status checken
4. Falls 401: Token falsch
5. Falls 404: Story existiert nicht → Script nochmal ausführen

Mehr Troubleshooting → [STORYBLOK_SETUP.md](./STORYBLOK_SETUP.md)

---

## 🎯 Nächste Features (Optional)

Nach erfolgreichem Setup kannst du implementieren:

### Visual Editor
- Ermöglicht Live-Preview in Storyblok
- Erfordert: `storyblokEditable` Wrapper und CORS-Konfiguration

### Webhooks
- Automatisches Deployment bei Content-Änderungen
- Vercel kann auf Storyblok Webhooks reagieren

### Draft/Published Modus
- Preview von Draft-Inhalten vor Veröffentlichung
- Bereits im Code vorbereitet: `version: import.meta.env.DEV ? "draft" : "published"`

### Asset Management
- Echte Bilder hochladen statt Platzhalter
- ImageKit oder Storyblok Asset Manager verwenden

### SEO
- Meta Tags aus Storyblok
- Dynamische `title` und `description` pro Seite

---

## 📞 Support

Bei Fragen:
1. Lies die [ausführliche Anleitung](./STORYBLOK_SETUP.md)
2. Checke die [Troubleshooting-Sektion](./STORYBLOK_SETUP.md#troubleshooting)
3. Schaue in Google Apps Script Logs
4. Überprüfe Browser Console und Vercel Logs

---

## ✅ Zusammenfassung

**Was du bekommen hast:**
- ✅ Vollständig vorbereiteter Code für Storyblok
- ✅ TypeScript Types für alle Content Types
- ✅ Google Script für automatisches Setup
- ✅ Umfassende Dokumentation
- ✅ Multi-Language Support (DE/EN/ES)
- ✅ React Hooks und Context für einfache Nutzung

**Was du noch tun musst:**
1. 🔧 Git → GitHub → Vercel Setup
2. 🎨 Storyblok Account erstellen & Tokens kopieren
3. 🤖 Google Script ausführen (5-10 Min)
4. 🚀 Website ist live mit CMS!

**Zeitaufwand gesamt: ~30 Minuten**

🎉 **Viel Erfolg!**