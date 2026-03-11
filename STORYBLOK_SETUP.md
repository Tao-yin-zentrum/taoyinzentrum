# Storyblok CMS Integration - Setup Anleitung

## 📋 Übersicht

Diese Anleitung führt dich Schritt für Schritt durch die Integration von Storyblok CMS in dein Taoyin Zentrum Projekt.

## 🔧 Schritt 1: Git Repository vorbereiten

### 1.1 Lokales Repository initialisieren (falls noch nicht geschehen)

```bash
git init
git add .
git commit -m "Initial commit: Taoyin Zentrum Website"
```

### 1.2 GitHub Repository verbinden

```bash
# Füge dein GitHub Remote hinzu (ersetze mit deiner URL)
git remote add origin https://github.com/JuliusIngelheim/magdalenajohanna-website.git

# Push zu GitHub
git branch -M main
git push -u origin main
```

## 🚀 Schritt 2: Vercel Deployment

### 2.1 Vercel Projekt erstellen

1. Gehe zu [vercel.com](https://vercel.com) und logge dich ein
2. Klicke auf "Add New" → "Project"
3. Importiere dein GitHub Repository `JuliusIngelheim/magdalenajohanna-website`
4. Vercel erkennt automatisch Vite als Framework

### 2.2 Build Settings in Vercel

- **Framework Preset:** Vite
- **Build Command:** `npm run build` (Standard)
- **Output Directory:** `dist` (Standard)
- **Install Command:** `npm install` (Standard)

### 2.3 Environment Variables in Vercel anlegen

Gehe zu deinem Vercel Projekt → Settings → Environment Variables

Lege folgende Variable an:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_STORYBLOK_ACCESS_TOKEN` | `[DEIN_PREVIEW_TOKEN]` | Production, Preview, Development |

**Wichtig:** 
- Den `VITE_STORYBLOK_ACCESS_TOKEN` erhältst du aus Storyblok (siehe Schritt 3)
- Dieser Token ist der **Preview Token** (nicht der Management Token!)
- Du kannst die Variable jetzt mit einem Platzhalter anlegen und später aktualisieren

### 2.4 Deploy

Klicke auf "Deploy" - Vercel wird dein Projekt automatisch bauen und deployen.

## 🎨 Schritt 3: Storyblok Space erstellen

### 3.1 Storyblok Account erstellen

1. Gehe zu [storyblok.com](https://www.storyblok.com)
2. Registriere dich für einen kostenlosen Account (Free Tier)
3. Erstelle einen neuen Space mit dem Namen "Taoyin Zentrum"

### 3.2 Access Tokens abrufen

1. Gehe in deinem Storyblok Space zu **Settings** → **Access Tokens**
2. Kopiere den **Preview Token** (dieser ist der Access Token für die Delivery API)
3. Erstelle einen **Management Token**:
   - Gehe zu **Settings** → **Access Tokens**
   - Klicke auf "Generate Token"
   - Wähle **Management Token**
   - Gib ihm einen Namen wie "Google Script Setup"
   - Kopiere den Token und speichere ihn sicher (wird nur einmal angezeigt!)

### 3.3 Space ID notieren

1. In Storyblok, gehe zu **Settings** → **General**
2. Kopiere die **Space ID** (numerischer Wert)

## 📝 Schritt 4: Vercel Environment Variable aktualisieren

1. Gehe zurück zu Vercel → dein Projekt → Settings → Environment Variables
2. Bearbeite `VITE_STORYBLOK_ACCESS_TOKEN`
3. Trage deinen **Preview Token** aus Storyblok ein
4. Speichern
5. Triggere ein Redeploy (Deployments → ... → Redeploy)

## 🤖 Schritt 5: Google Apps Script ausführen

### 5.1 Google Apps Script Projekt erstellen

1. Gehe zu [script.google.com](https://script.google.com)
2. Klicke auf "New Project"
3. Benenne das Projekt "Storyblok Setup - Taoyin"

### 5.2 Script Code einfügen

1. Lösche den vorhandenen Code
2. Kopiere den gesamten Code aus `STORYBLOK_SETUP_SCRIPT.gs` (wird als nächstes bereitgestellt)
3. Füge ihn in den Script Editor ein

### 5.3 Konfiguration anpassen

Im Script Code, passe die Konfiguration an (oben im Script):

```javascript
const CONFIG = {
  STORYBLOK_SPACE_ID: 'DEINE_SPACE_ID',  // Aus Schritt 3.3
  STORYBLOK_MANAGEMENT_TOKEN: 'DEIN_MANAGEMENT_TOKEN',  // Aus Schritt 3.2
  STORYBLOK_REGION: 'eu'  // oder 'us'
};
```

### 5.4 Script ausführen

1. Wähle die Funktion `main` aus dem Dropdown
2. Klicke auf "Run" (▶️ Play Button)
3. Beim ersten Mal musst du die Berechtigungen gewähren
4. Das Script wird nun:
   - Alle Content Types anlegen
   - Alle Folder (de/, en/, es/) erstellen
   - Alle Stories mit Inhalten befüllen
   - Assets hochladen und verknüpfen
5. Schaue in die Logs (View → Logs) für Fortschritt und eventuelle Fehler

### 5.5 Ausführungszeit

Das Script kann 5-10 Minuten dauern, da es:
- ~15 Content Types anlegt
- ~100+ Felder definiert
- 3 Folder (de/en/es) erstellt
- ~30+ Stories erstellt
- ~50+ Assets hochlädt

**Tipp:** Google Scripts haben ein 6-Minuten Execution Limit. Falls das Script abbricht, ist es so konzipiert, dass es sicher fortgesetzt werden kann (es prüft, ob Inhalte bereits existieren).

## ✅ Schritt 6: Verifizierung

### 6.1 In Storyblok prüfen

1. Gehe zu deinem Storyblok Space
2. Im Sidebar solltest du sehen:
   - Folder: `de/`, `en/`, `es/`
   - Unter `de/` alle deutschen Pages (home, about, kontakt, etc.)
   - Global-Content: `de/global`, `en/global`, `es/global`
3. Klicke auf eine Story und überprüfe, ob alle Felder befüllt sind

### 6.2 Website testen

1. Gehe zu deiner Vercel URL (z.B. `https://your-project.vercel.app`)
2. Die Website sollte nun Daten aus Storyblok laden
3. Teste verschiedene Seiten

### 6.3 Live-Editing testen

1. Öffne eine Story in Storyblok
2. Aktiviere "Visual Editor" (wenn konfiguriert)
3. Oder: Ändere einen Text und speichere
4. Gehe zu deiner Website und refreshe → Änderungen sollten sichtbar sein

## 🌍 Schritt 7: Multi-Language Setup

### 7.1 Sprach-URLs

Die Website unterstützt nun folgende URL-Struktur:

- Deutsch (Standard): `/` oder `/de/...`
- Englisch: `/en/...`
- Spanisch: `/es/...`

### 7.2 Content in anderen Sprachen bearbeiten

1. In Storyblok, navigiere zu `en/home` für die englische Homepage
2. Bearbeite die Texte
3. Wiederhole für `es/home` (Spanisch)

## 🔄 Schritt 8: Workflow

### 8.1 Content aktualisieren

1. Gehe zu Storyblok
2. Navigiere zur gewünschten Story (z.B. `de/home`)
3. Bearbeite die Felder
4. Klicke "Save" und dann "Publish"
5. Die Website aktualisiert sich automatisch (CDN Cache ~1 Minute)

### 8.2 Neue Seiten hinzufügen

1. In Storyblok, erstelle eine neue Story im entsprechenden Folder
2. Wähle den passenden Content Type
3. Fülle die Felder aus
4. In deinem Code, füge eine neue Route in `src/app/routes.ts` hinzu

### 8.3 Code-Änderungen deployen

```bash
git add .
git commit -m "Beschreibung der Änderungen"
git push
```

Vercel deployed automatisch bei jedem Push zu `main`.

## 📚 Wichtige Dateien

- `/src/lib/storyblok.ts` - Storyblok API Wrapper
- `/src/types/storyblok.ts` - TypeScript Typen für alle Content Types
- `/src/contexts/StoryblokContext.tsx` - React Context für globale Daten
- `/src/hooks/useStoryblokPage.ts` - Hook zum Laden von Page-Daten
- `/STORYBLOK_SETUP_SCRIPT.gs` - Google Apps Script für automatisches Setup

## 🆘 Troubleshooting

### Problem: "Storyblok API not initialized"

- Überprüfe, ob `VITE_STORYBLOK_ACCESS_TOKEN` in Vercel gesetzt ist
- Redeploy nach dem Setzen der Environment Variable

### Problem: "403 Forbidden" beim API Call

- Überprüfe, ob der Access Token korrekt ist
- Stelle sicher, dass du den **Preview Token** verwendest (nicht Management Token)

### Problem: Google Script Timeout

- Das Script ist idempotent - führe es einfach nochmal aus
- Es überspringt bereits existierende Inhalte

### Problem: Assets werden nicht angezeigt

- Überprüfe in Storyblok, ob die Assets hochgeladen wurden
- Prüfe die Asset-URLs in den Stories
- Stelle sicher, dass die Image-Komponenten die richtigen Props erhalten

## 📞 Support

Bei Fragen oder Problemen:
1. Überprüfe die Logs in Google Apps Script
2. Überprüfe die Browser Console für Fehler
3. Schaue in Vercel → Deployments → Logs für Build-Fehler

## 🎉 Nächste Schritte

Nach erfolgreichem Setup kannst du:
1. Visual Editor in Storyblok konfigurieren
2. Webhooks für automatische Deployments einrichten
3. Preview-Modus aktivieren
4. Weitere Content Types hinzufügen
