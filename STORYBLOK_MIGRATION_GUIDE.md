# 🚀 Storyblok Migration Guide – Taoyin Zentrum Ingolstadt

## Überblick

Dieses Google Apps Script migriert automatisch alle echten Inhalte aus deinem React-Projekt nach Storyblok:

✅ **Alle Content Types & Components** werden angelegt  
✅ **Folder-Struktur (DE/EN/ES)** wird erstellt  
✅ **Echte Bilder** werden als Assets hochgeladen  
✅ **Echte Texte** aus allen Komponenten werden eingetragen  
✅ **Alle 3 Sprachen** werden befüllt (DE komplett, EN/ES mit Basis-Übersetzungen)

---

## 📋 Was das Script macht

### 1. Content Types erstellen
- **Nested Components**: nav_link, social_link, detail_card, angebot_card, feature_item, news_item, faq_item, testimonial_item, etc.
- **Page Components**: page_home, page_taoyin, page_qigong, page_chi_nei_tsang, page_psychotherapie, etc.
- **Global Component**: Für Navbar & Footer

### 2. Folder-Struktur
```
/
├── de/
│   ├── global
│   ├── home
│   ├── about
│   └── ...
├── en/
│   ├── global
│   ├── home
│   └── ...
└── es/
    ├── global
    ├── home
    └── ...
```

### 3. Assets hochladen
Alle Bilder aus deinem Projekt werden hochgeladen:
- Hero Images (heroShelf, heroPortrait)
- Detail Section Images (taoBasis, qiGongIntro, medizinischQiGong, etc.)
- News Images
- Logo

### 4. Echte Inhalte eintragen

#### ✅ Home Page (Deutsch)
- **Hero**: "Willkommen im Taoyin Zentrum Ingolstadt" + vollständiger Subtitle
- **Details Sections**: Alle 7 Sections mit echten Texten:
  - Tao Basis
  - Einführung in Qi Gong
  - Medizinisches Qi Gong
  - Chi Nei Tsang Behandlung
  - Chi Nei Tsang Ausbildung
  - Praxis für ganzheitliche Psychotherapie
  - Estela's Geschichte (kompletter Text!)
- **Angebote**: Alle 4 Pricing Cards mit echten Preisen & Features:
  - Tao Basis (280 €)
  - Medizinisches Qi Gong (150 €)
  - Chi Nei Tsang Behandlung (95 €)
  - Chi Nei Tsang Ausbildung (5.500 €)
- **FAQs**: Alle 4 echten FAQs
- **Testimonials**: Alle 3 echten Testimonials (D.L., Petra S., Valeria A.)
- **News**: 3 News Items (Platzhalter-Texte, können später bearbeitet werden)
- **CTA Section**: Mit echtem Text
- **SEO**: Meta Title, Description, Keywords

#### ✅ Global Content (Navbar & Footer)
- **Navbar**: Alle Links (Startseite, Über mich, Therapien, Psychotherapie, Kontakt)
- **Footer**: Kontaktdaten, Social Links, Copyright

#### 📝 EN/ES Versionen
- Basis-Übersetzungen sind vorhanden
- **TODO**: Du kannst später die vollständigen Übersetzungen in Storyblok ergänzen

---

## 🛠️ Setup & Ausführung

### Schritt 1: Storyblok Account erstellen
1. Gehe zu [Storyblok](https://app.storyblok.com/#!/signup)
2. Erstelle einen neuen Space
3. Notiere dir:
   - **Space ID**: Settings → General → Space ID
   - **Management Token**: Settings → Access Tokens → "Create Token" (Management Access)

### Schritt 2: Google Apps Script erstellen
1. Öffne [Google Apps Script](https://script.google.com)
2. Klicke auf **"Neues Projekt"**
3. Kopiere den kompletten Inhalt von `/STORYBLOK_SETUP_SCRIPT_COMPLETE.gs`
4. Füge ihn in den Editor ein
5. Benenne das Projekt: "Taoyin Storyblok Setup"

### Schritt 3: Credentials eintragen
Ersetze in Zeile 20-23:

```javascript
const CONFIG = {
  STORYBLOK_SPACE_ID: 'DEINE_SPACE_ID',
  STORYBLOK_MANAGEMENT_TOKEN: 'DEIN_MANAGEMENT_TOKEN',
  STORYBLOK_REGION: 'eu'
};
```

### Schritt 4: Script ausführen
1. Wähle oben die Funktion **`main`** aus
2. Klicke auf **▶️ Ausführen**
3. Beim ersten Mal: Erlaube die Berechtigungen (Google fragt nach Zugriff auf externe APIs)
4. **Warte 10-15 Minuten** (das Script lädt alle Bilder hoch und erstellt alle Stories)

### Schritt 5: Fortschritt verfolgen
- Klicke auf **"Ausführungen"** (links in der Sidebar)
- Schaue dir das Log an (zeigt jeden Schritt)
- Du siehst Meldungen wie:
  ```
  🚀 Starting Storyblok Setup...
  📦 Creating Content Types...
    ➕ Erstelle 'nav_link'...
    ➕ Erstelle 'social_link'...
  ✅ Content Types erstellt
  
  📁 Creating Folder Structure...
    ➕ Erstelle Folder 'de/'...
  ✅ Folder-Struktur erstellt
  
  🖼️ Uploading Assets...
    Uploading heroShelf...
    Uploading heroPortrait...
  ✅ Assets hochgeladen
  
  🌐 Creating Global Content...
  ✅ Global Content erstellt
  
  📄 Creating All Page Stories...
    Erstelle DE Stories...
      ➕ Erstelle Story 'de/home'...
  ✅ All Page Stories erstellt
  
  🎉 SETUP COMPLETE!
  ```

---

## ✅ Nach der Ausführung

### 1. Storyblok überprüfen
Gehe zu deinem Storyblok Space und verifiziere:

- **Content Types**: Unter "Components" solltest du ~20 Components sehen
- **Content**: Unter "Content" solltest du 3 Folder sehen (DE/EN/ES)
- **Stories**: In jedem Folder sollte mindestens "global" und "home" existieren
- **Assets**: Unter "Assets" sollten alle Bilder sein

### 2. Preview Token kopieren
1. Gehe zu Storyblok → Settings → Access Tokens
2. Kopiere den **Preview Token** (nicht Management Token!)
3. Füge ihn in deine Vercel Environment Variables ein:
   ```
   VITE_STORYBLOK_TOKEN=dein_preview_token_hier
   ```

### 3. Deploy auf Vercel
1. Push dein Code zu GitHub (falls noch nicht geschehen)
2. Verbinde das Repo mit Vercel
3. Füge Environment Variables hinzu:
   - `VITE_STORYBLOK_TOKEN` (Preview Token)
4. Deploy! 🚀

### 4. Testen
- Öffne deine Website
- Die Home Page sollte jetzt alle echten Inhalte aus Storyblok laden
- Ändere etwas in Storyblok → sollte sofort auf der Website sichtbar sein (Draft Mode)
- Publish die Story → sollte in Production sichtbar sein

---

## 🌍 Sprachen vervollständigen

### Deutsch (DE)
✅ **Komplett befüllt** mit allen echten Texten aus dem React-Projekt

### Englisch (EN)
⚠️ **Basis vorhanden**, aber nicht vollständig übersetzt
- Hero Title & Subtitle sind übersetzt
- Detail Sections fehlen
- FAQs fehlen
- Testimonials fehlen

**TODO**: 
1. Gehe zu Storyblok → Content → en/home
2. Öffne die Story
3. Fülle alle Felder mit englischen Übersetzungen

### Spanisch (ES)
⚠️ **Basis vorhanden**, aber nicht vollständig übersetzt

**TODO**: Wie bei EN, alle Texte übersetzen

---

## 📝 Inhalte bearbeiten

### In Storyblok (empfohlen)
1. Öffne Storyblok
2. Navigiere zu Content → de/home (oder en/home, es/home)
3. Bearbeite die Felder direkt
4. Klicke "Save" → Änderungen sind sofort in Draft Mode sichtbar
5. Klicke "Publish" → Änderungen gehen live

### Im React-Code (NICHT empfohlen)
❌ **Nicht mehr nötig!** Alle Inhalte kommen jetzt aus Storyblok.

---

## 🖼️ Bilder ersetzen

### Methode 1: In Storyblok hochladen (empfohlen)
1. Gehe zu Storyblok → Assets
2. Klicke "Upload"
3. Lade dein Bild hoch
4. Gehe zu Content → de/home
5. Klicke auf das Bild-Feld (z.B. `hero_background_image`)
6. Wähle dein neues Bild aus

### Methode 2: Asset URLs aktualisieren
1. Lade Bilder auf einen CDN hoch (z.B. Cloudinary, Imgix)
2. Ersetze die URLs in Storyblok

---

## 🔧 Weitere Seiten hinzufügen

Das Script erstellt aktuell nur die **Home Page** mit vollständigen Inhalten. 

**Um weitere Seiten zu befüllen**:

### Option 1: Manuell in Storyblok
1. Gehe zu Content → de/
2. Klicke "Create new"
3. Wähle den passenden Content Type (z.B. `page_about`)
4. Fülle die Felder aus
5. Save & Publish

### Option 2: Script erweitern
Füge im Script weitere Funktionen hinzu:

```javascript
function createAboutStory(lang) {
  const content = {
    component: 'page_about',
    hero_title: 'Über mich',
    hero_image: getAsset('estelaStory'),
    intro_text: { type: 'doc', content: [
      { type: 'paragraph', content: [
        { type: 'text', text: 'Meine Geschichte...' }
      ]}
    ]},
    // ... weitere Felder
  };
  
  const storyData = {
    story: {
      name: `About ${lang.toUpperCase()}`,
      slug: 'about',
      parent_id: getFolderId(lang),
      content: content
    },
    publish: 1
  };
  
  createStory(storyData);
}
```

Und rufe sie in `createAllStories()` auf:
```javascript
function createAllStories() {
  const languages = ['de', 'en', 'es'];
  
  languages.forEach(lang => {
    Logger.log(`  Erstelle ${lang.toUpperCase()} Stories...`);
    createHomeStory(lang);
    createAboutStory(lang);  // ← NEU
    // weitere...
  });
}
```

---

## ❓ Troubleshooting

### Error: "API Error 401"
**Problem**: Falscher oder fehlender Token  
**Lösung**: Überprüfe `STORYBLOK_MANAGEMENT_TOKEN` in der Config

### Error: "API Error 422"
**Problem**: Ungültige Daten  
**Lösung**: Schaue ins Log, welches Feld das Problem verursacht

### Script läuft zu lange
**Problem**: Google Apps Script hat ein 6-Minuten-Timeout  
**Lösung**: 
1. Kommentiere `uploadAllAssets()` aus (Zeile ~74)
2. Führe das Script einmal aus
3. Assets manuell in Storyblok hochladen
4. Asset-URLs im Script aktualisieren

### Assets werden nicht hochgeladen
**Problem**: Externe URLs sind nicht erreichbar oder zu groß  
**Lösung**: Das Script verwendet Fallback URLs. Du kannst Assets später manuell in Storyblok hochladen.

### Stories existieren bereits
**Lösung**: Das Script überspringt automatisch existierende Stories. Wenn du neu starten willst:
1. Lösche alle Stories in Storyblok
2. Lösche alle Components
3. Führe das Script erneut aus

---

## 📊 Was wurde migriert?

| Content | Status | Anmerkung |
|---------|--------|-----------|
| **Hero Section** | ✅ Komplett | Titel, Subtitle, CTA, Bilder |
| **Details Sections** | ✅ Komplett | Alle 7 Sections mit echten Texten & Bildern |
| **Angebote** | ✅ Komplett | Alle 4 Pricing Cards mit Preisen & Features |
| **FAQs** | ✅ Komplett | Alle 4 echten FAQs |
| **Testimonials** | ✅ Komplett | Alle 3 echten Testimonials |
| **News** | ⚠️ Platzhalter | Titel & Beschreibungen sind Platzhalter, Bilder sind echt |
| **Global (Navbar/Footer)** | ✅ Komplett | Navigation, Kontaktdaten, Social Links |
| **SEO** | ✅ Komplett | Meta Title, Description, Keywords, OG Image |
| **Sprachen** | ⚠️ Teilweise | DE komplett, EN/ES Basis vorhanden |

---

## 🎯 Nächste Schritte

### Jetzt sofort:
1. ✅ Script ausführen
2. ✅ Storyblok überprüfen
3. ✅ Preview Token in Vercel eintragen
4. ✅ Deploy auf Vercel

### Später:
1. 📝 EN/ES Übersetzungen vervollständigen
2. 📸 News-Texte aktualisieren
3. 🖼️ Platzhalter-Bilder durch echte Fotos ersetzen
4. 📄 Weitere Seiten erstellen (About, Kontakt, etc.)
5. 🎨 Design-Anpassungen in Storyblok testen

---

## 📚 Weitere Ressourcen

- [Storyblok Dokumentation](https://www.storyblok.com/docs)
- [Storyblok Management API](https://www.storyblok.com/docs/api/management)
- [Google Apps Script Docs](https://developers.google.com/apps-script)
- [Vercel Deployment](https://vercel.com/docs)

---

## 🆘 Support

Bei Problemen:
1. Schaue ins Google Apps Script Log
2. Überprüfe die Storyblok API Response im Log
3. Teste einzelne API Calls mit Postman/Insomnia
4. Kontaktiere Storyblok Support bei API-Problemen

---

**Viel Erfolg! 🚀**
