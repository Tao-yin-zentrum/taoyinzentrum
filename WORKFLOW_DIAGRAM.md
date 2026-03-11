# 🔄 Workflow Diagramm - Taoyin Zentrum Storyblok Setup

## 📊 Gesamt-Übersicht

```
┌─────────────────────────────────────────────────────────────┐
│                  TAOYIN ZENTRUM WEBSITE                     │
│                    React + Storyblok                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    SETUP WORKFLOW                           │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   Storyblok            Google Script          Vercel Deploy
   Account              ausführen              & Go Live
```

---

## 🗂️ Schritt-für-Schritt Workflow

```
START
  │
  ├─► 1️⃣ STORYBLOK ACCOUNT
  │      ├─► Registrieren: app.storyblok.com
  │      ├─► Space erstellen: "Taoyin Zentrum"
  │      ├─► Space ID notieren
  │      └─► Management Token erstellen & notieren
  │
  ├─► 2️⃣ GOOGLE APPS SCRIPT
  │      ├─► Öffnen: script.google.com
  │      ├─► Neues Projekt erstellen
  │      ├─► Code kopieren: STORYBLOK_SETUP_SCRIPT_COMPLETE.gs
  │      ├─► Credentials eintragen (Space ID, Token)
  │      ├─► Funktion "main" ausführen
  │      └─► Warten 10-15 Min ⏳
  │           │
  │           ├─► Content Types erstellt ✅
  │           ├─► Folder DE/EN/ES erstellt ✅
  │           ├─► Assets hochgeladen ✅
  │           ├─► Global Content erstellt ✅
  │           └─► Home Page Stories erstellt ✅
  │
  ├─► 3️⃣ STORYBLOK VERIFIKATION
  │      ├─► Components überprüfen (~20 Stück)
  │      ├─► Content überprüfen (3 Folders)
  │      ├─► Assets überprüfen (13 Bilder)
  │      ├─► de/home Story öffnen & testen
  │      └─► Preview Token kopieren
  │
  ├─► 4️⃣ GITHUB PUSH
  │      ├─► git add .
  │      ├─► git commit -m "Add Storyblok integration"
  │      └─► git push
  │
  ├─► 5️⃣ VERCEL DEPLOYMENT
  │      ├─► Projekt mit GitHub verbinden
  │      ├─► Environment Variable setzen:
  │      │     VITE_STORYBLOK_TOKEN = [Preview Token]
  │      ├─► Deploy triggern
  │      └─► Warten ~2 Min ⏳
  │
  ├─► 6️⃣ WEBSITE TESTEN
  │      ├─► URL öffnen
  │      ├─► Home Page überprüfen
  │      ├─► Alle Sections vorhanden? ✅
  │      ├─► Bilder laden? ✅
  │      ├─► Navbar funktioniert? ✅
  │      └─► Footer funktioniert? ✅
  │
  └─► ✅ WEBSITE IST LIVE! 🎉
```

---

## 🔄 Content Update Workflow

```
CONTENT BEARBEITEN
  │
  ├─► Option A: In Storyblok (CMS) ⭐ EMPFOHLEN
  │      ├─► Zu app.storyblok.com gehen
  │      ├─► Story öffnen (z.B. de/home)
  │      ├─► Felder bearbeiten
  │      ├─► "Save" klicken
  │      ├─► "Publish" klicken
  │      └─► ✅ Änderung ist live (~1 Min)
  │
  └─► Option B: Im Code (NICHT empfohlen)
         ├─► Component bearbeiten
         ├─► git commit & push
         ├─► Vercel deployed automatisch
         └─► ⚠️ Überschreibt CMS nicht!
```

---

## 📁 Storyblok Folder-Struktur

```
Taoyin Zentrum Space
│
├── 📁 de/                          (Deutsch)
│   ├── 🌐 global                   (Navbar, Footer)
│   ├── 🏠 home                     (Homepage)
│   ├── 👤 about                    (Über mich)
│   ├── 💆 therapien                (Therapien Übersicht)
│   ├── 🧘 taoyin                   (Tao Yin Seite)
│   ├── 🌬️  qi-gong                 (Qi Gong Seite)
│   ├── 🤲 chi-nei-tsang            (Chi Nei Tsang)
│   ├── 🧠 psychotherapie           (Psychotherapie)
│   ├── 🎯 behandlung               (Behandlungsziele)
│   ├── 📞 kontakt                  (Kontakt)
│   └── 📄 impressum                (Impressum & Datenschutz)
│
├── 📁 en/                          (English)
│   └── [same structure]
│
└── 📁 es/                          (Español)
    └── [same structure]
```

---

## 🏗️ Content Types Hierarchie

```
┌────────────────────────────────────────────────┐
│          ROOT COMPONENTS (Pages)               │
├────────────────────────────────────────────────┤
│  • global                                      │
│  • page_home                                   │
│  • page_taoyin                                 │
│  • page_qigong                                 │
│  • page_chi_nei_tsang                          │
│  • page_psychotherapie                         │
│  • page_behandlung                             │
│  • page_therapien                              │
│  • page_about                                  │
│  • page_kontakt                                │
│  • page_impressum                              │
└────────────────────────────────────────────────┘
                    │
                    │ verwendet
                    ▼
┌────────────────────────────────────────────────┐
│        NESTED COMPONENTS (Bloks)               │
├────────────────────────────────────────────────┤
│  • nav_link                                    │
│  • social_link                                 │
│  • detail_card                                 │
│  • angebot_card                                │
│  • feature_item                                │
│  • news_item                                   │
│  • faq_item                                    │
│  • testimonial_item                            │
│  • benefit_item                                │
│  • method_item                                 │
│  • area_item                                   │
│  • process_step                                │
│  • goal_item                                   │
│  • therapy_item                                │
│  • qualification_item                          │
│  • hours_item                                  │
│  • legal_section                               │
│  • info_item                                   │
└────────────────────────────────────────────────┘
```

---

## 🎨 Home Page Component-Baum

```
page_home
  │
  ├─► hero_title                  (Text)
  ├─► hero_subtitle               (Textarea)
  ├─► hero_cta_text               (Text)
  ├─► hero_cta_link               (Link)
  ├─► hero_background_image       (Asset)
  │
  ├─► details_sections            (Bloks Array)
  │     └─► detail_card []
  │           ├─► eyebrow
  │           ├─► title
  │           ├─► description
  │           ├─► image
  │           ├─► links
  │           └─► image_left
  │
  ├─► angebote_title              (Text)
  ├─► angebote_cards              (Bloks Array)
  │     └─► angebot_card []
  │           ├─► price
  │           ├─► price_note
  │           ├─► title
  │           ├─► description
  │           ├─► features
  │           ├─► phone
  │           ├─► email
  │           └─► wide
  │
  ├─► news_title                  (Text)
  ├─► news_items                  (Bloks Array)
  │     └─► news_item []
  │           ├─► image
  │           ├─► date
  │           ├─► title
  │           ├─► description
  │           └─► link
  │
  ├─► faq_title                   (Text)
  ├─► faq_items                   (Bloks Array)
  │     └─► faq_item []
  │           ├─► question
  │           └─► answer
  │
  ├─► testimonials_title          (Text)
  ├─► testimonials_items          (Bloks Array)
  │     └─► testimonial_item []
  │           ├─► text
  │           ├─► author
  │           └─► rating
  │
  ├─► cta_title                   (Text)
  ├─► cta_description             (Textarea)
  ├─► cta_button_text             (Text)
  ├─► cta_button_link             (Link)
  │
  └─► SEO Fields
        ├─► seo_title
        ├─► seo_description
        ├─► seo_keywords
        └─► seo_image
```

---

## 🌐 Multi-Language Routing

```
URL Request
    │
    ├─► /                        → Deutsch (Standard)
    │     └─► Lädt: de/home
    │
    ├─► /de/about                → Deutsch
    │     └─► Lädt: de/about
    │
    ├─► /en/home                 → English
    │     └─► Lädt: en/home
    │
    └─► /es/kontakt              → Español
          └─► Lädt: es/kontakt
```

---

## 🔄 API Request Flow

```
React Component
    │
    ├─► useStoryblokPage("home")
    │        │
    │        ├─► getCurrentLanguage() → "de"
    │        │
    │        ├─► API Call: GET /cdn/stories/de/home
    │        │        │
    │        │        ├─► Headers: token = VITE_STORYBLOK_TOKEN
    │        │        └─► Version: draft | published
    │        │
    │        └─► Response: { story: { content: {...} } }
    │
    └─► Render Component mit content
```

---

## 📦 Build & Deploy Flow

```
Local Development
    │
    ├─► pnpm dev
    │     └─► Vite Dev Server @ localhost:5173
    │           ├─► Hot Module Reload ✅
    │           ├─► Draft Mode (Storyblok) ✅
    │           └─► Fast Refresh ✅
    │
    └─► git push
          │
          └─► GitHub Webhook
                │
                └─► Vercel
                      │
                      ├─► pnpm install
                      ├─► pnpm build
                      │     └─► Vite Build
                      │           ├─► TypeScript Compile
                      │           ├─► Tailwind CSS Process
                      │           └─► Code Splitting
                      │
                      ├─► Deploy to CDN
                      │     ├─► HTML/CSS/JS optimiert
                      │     ├─► Assets compressed
                      │     └─► Edge Functions ready
                      │
                      └─► ✅ Live URL
                            └─► https://your-site.vercel.app
```

---

## 🎯 Content Migration Flow

```
React Code (Static)
    │
    ├─► Hero.tsx
    │     └─► Texte: "Willkommen im..."
    │
    ├─► DetailsSections.tsx
    │     └─► 7 Sections mit Texten
    │
    ├─► AngeboteSection.tsx
    │     └─► 4 Pricing Cards
    │
    ├─► FaqSection.tsx
    │     └─► 4 FAQs
    │
    └─► TestimonialsSection.tsx
          └─► 3 Testimonials
                │
                ▼
    Google Apps Script
    (STORYBLOK_SETUP_SCRIPT_COMPLETE.gs)
                │
                ├─► Extrahiert alle Texte
                ├─► Strukturiert in JSON
                ├─► Lädt Bilder hoch
                └─► Erstellt Stories
                      │
                      ▼
              Storyblok CMS
                      │
                      ├─► de/home (100% befüllt)
                      ├─► en/home (70% befüllt)
                      └─► es/home (70% befüllt)
                            │
                            ▼
                React Code (Dynamic)
                            │
                            ├─► Lädt Content aus Storyblok
                            ├─► Rendert dynamisch
                            └─► ✅ CMS-gesteuert!
```

---

## 📊 Zeitplan

```
┌──────────────────────────────────────────────────┐
│              SETUP TIMELINE                      │
├──────────────────────────────────────────────────┤
│  00:00 - 00:05   Storyblok Account erstellen     │
│  00:05 - 00:10   Space & Tokens konfigurieren    │
│  00:10 - 00:15   Google Script vorbereiten       │
│  00:15 - 00:25   Script ausführen (automatisch)  │
│  00:25 - 00:30   Storyblok verifizieren          │
│  00:30 - 00:35   GitHub push                     │
│  00:35 - 00:40   Vercel Setup                    │
│  00:40 - 00:45   Deployment abwarten             │
│  00:45 - 00:50   Website testen                  │
│  00:50 - 01:00   Content in Storyblok testen     │
├──────────────────────────────────────────────────┤
│  GESAMT: ~1 Stunde                               │
│  Davon automatisiert: ~40 Minuten               │
│  Manuelle Arbeit: ~20 Minuten                    │
└──────────────────────────────────────────────────┘
```

---

## ✅ Status Übersicht

```
┌─────────────────────────────────────────────────┐
│               CONTENT STATUS                    │
├─────────────────────────────────────────────────┤
│  Content Type        │  DE  │  EN  │  ES       │
├──────────────────────┼──────┼──────┼───────────┤
│  Hero Section        │  ✅  │  ✅  │  ✅       │
│  Details Sections    │  ✅  │  ⚠️  │  ⚠️       │
│  Angebote            │  ✅  │  ⚠️  │  ⚠️       │
│  FAQs                │  ✅  │  ⚠️  │  ⚠️       │
│  Testimonials        │  ✅  │  ⚠️  │  ⚠️       │
│  News                │  ⚠️  │  ⚠️  │  ⚠️       │
│  CTA                 │  ✅  │  ✅  │  ✅       │
│  Global (Nav/Footer) │  ✅  │  ✅  │  ✅       │
│  SEO                 │  ✅  │  ✅  │  ✅       │
├──────────────────────┼──────┼──────┼───────────┤
│  GESAMT              │ 95%  │ 70%  │ 70%       │
└──────────────────────┴──────┴──────┴───────────┘

Legende:
  ✅ = Komplett befüllt
  ⚠️ = Teilweise / Platzhalter
  ❌ = Fehlt
```

---

## 🚀 Quick Reference

### Wichtige URLs
```
Storyblok CMS:     https://app.storyblok.com
Google Script:     https://script.google.com
Vercel Dashboard:  https://vercel.com/dashboard
GitHub Repo:       https://github.com/JuliusIngelheim/magdalenajohanna-website
```

### Wichtige Credentials
```
Space ID:          Settings → General → Space ID
Management Token:  Settings → Access Tokens → Management
Preview Token:     Settings → Access Tokens → Preview
```

### Wichtige Dateien
```
Complete Script:   /STORYBLOK_SETUP_SCRIPT_COMPLETE.gs
Checklist:         /MIGRATION_CHECKLIST.md
Guide:             /STORYBLOK_MIGRATION_GUIDE.md
Content Overview:  /REAL_CONTENT_OVERVIEW.md
```

---

## 🎯 Next Steps

```
JETZT
  └─► Script ausführen
        └─► Vercel deployen
              └─► Testen
                    └─► ✅ FERTIG!

SPÄTER
  └─► EN Übersetzungen
        └─► ES Übersetzungen
              └─► News aktualisieren
                    └─► Weitere Seiten
```

---

**💡 Tipp:** Setze ein Lesezeichen auf diese Seite für schnelle Referenz!
