# 🎯 Deployment Checklist - Taoyin Zentrum Website

## Phase 1: Vorbereitung ✅

- [ ] Lokaler Code ist bereit und getestet
- [ ] Alle Dependencies sind installiert (`@storyblok/react` hinzugefügt)
- [ ] `.env.example` Datei ist vorhanden
- [ ] Git repository ist initialisiert

## Phase 2: Git & GitHub 🔧

- [ ] GitHub Repository erstellt: `JuliusIngelheim/magdalenajohanna-website`
- [ ] Lokales Git Repository initialisiert
  ```bash
  git init
  git add .
  git commit -m "Initial commit: Storyblok integration"
  ```
- [ ] Remote zu GitHub hinzugefügt
  ```bash
  git remote add origin https://github.com/JuliusIngelheim/magdalenajohanna-website.git
  ```
- [ ] Code zu GitHub gepusht
  ```bash
  git branch -M main
  git push -u origin main
  ```

## Phase 3: Vercel Setup 🚀

- [ ] Vercel Account erstellt/eingeloggt
- [ ] Neues Projekt von GitHub importiert
- [ ] Build Settings überprüft:
  - Framework: Vite ✓
  - Build Command: `npm run build` ✓
  - Output Directory: `dist` ✓
- [ ] Environment Variable angelegt:
  - Name: `VITE_STORYBLOK_ACCESS_TOKEN`
  - Value: `[temporärer Platzhalter]`
  - Environments: Production, Preview, Development
- [ ] Erstes Deployment durchgeführt
- [ ] Deployment erfolgreich: `https://[dein-projekt].vercel.app`

## Phase 4: Storyblok Setup 🎨

- [ ] Storyblok Account erstellt (Free Tier)
- [ ] Neuer Space angelegt: "Taoyin Zentrum"
- [ ] Region gewählt: `eu` oder `us`
- [ ] **Preview Token** kopiert:
  - Settings → Access Tokens → Preview Token
  - Token notiert: `_________________________`
- [ ] **Management Token** erstellt:
  - Settings → Access Tokens → Generate Token
  - Type: Management Token
  - Name: "Google Script Setup"
  - Token notiert: `_________________________`
- [ ] **Space ID** notiert:
  - Settings → General → Space ID
  - Space ID: `_________________________`

## Phase 5: Vercel Token Update 🔄

- [ ] Zurück zu Vercel → Settings → Environment Variables
- [ ] `VITE_STORYBLOK_ACCESS_TOKEN` bearbeitet
- [ ] **Preview Token** aus Storyblok eingetragen
- [ ] Gespeichert
- [ ] Redeploy getriggert (Deployments → ... → Redeploy)
- [ ] Neues Deployment erfolgreich

## Phase 6: Google Apps Script Ausführung 🤖

- [ ] [script.google.com](https://script.google.com) geöffnet
- [ ] Neues Projekt erstellt: "Storyblok Setup - Taoyin"
- [ ] Code aus `STORYBLOK_SETUP_SCRIPT.gs` kopiert und eingefügt
- [ ] CONFIG aktualisiert:
  ```javascript
  const CONFIG = {
    STORYBLOK_SPACE_ID: '[DEINE_SPACE_ID]',
    STORYBLOK_MANAGEMENT_TOKEN: '[DEIN_MANAGEMENT_TOKEN]',
    STORYBLOK_REGION: 'eu'
  };
  ```
- [ ] Funktion `main` ausgewählt
- [ ] Run Button (▶️) geklickt
- [ ] Berechtigungen gewährt (beim ersten Mal)
- [ ] Script läuft (Logs beobachten: View → Logs)
- [ ] Script erfolgreich beendet (✅ SETUP COMPLETE!)

**Script Ausführungszeit:** _____ Minuten (normal: 5-10 Min)

## Phase 7: Verifizierung ✅

### In Storyblok:
- [ ] Folder-Struktur vorhanden:
  - [ ] `de/` Folder
  - [ ] `en/` Folder
  - [ ] `es/` Folder
- [ ] Global Content vorhanden:
  - [ ] `de/global`
  - [ ] `en/global`
  - [ ] `es/global`
- [ ] Deutsche Stories vorhanden:
  - [ ] `de/home`
  - [ ] `de/taoyin`
  - [ ] `de/qi-gong`
  - [ ] `de/chi-nei-tsang`
  - [ ] `de/psychotherapie`
  - [ ] `de/behandlung`
  - [ ] `de/therapien`
  - [ ] `de/about`
  - [ ] `de/kontakt`
  - [ ] `de/impressum`
- [ ] Englische Stories vorhanden (en/)
- [ ] Spanische Stories vorhanden (es/)
- [ ] Testweise eine Story geöffnet (`de/home`)
- [ ] Alle Felder sind befüllt
- [ ] Alle Bloks (wiederholbare Elemente) sind vorhanden

### Auf der Website:
- [ ] Website URL geöffnet: `https://[dein-projekt].vercel.app`
- [ ] Keine Fehler in der Browser Console (F12)
- [ ] Loading Spinner erscheint kurz
- [ ] Home Page lädt erfolgreich
- [ ] Inhalte werden aus Storyblok angezeigt
- [ ] Bilder laden (auch wenn Platzhalter)
- [ ] Navigation funktioniert
- [ ] Footer wird angezeigt

## Phase 8: Content Anpassung (Optional für später) 📝

- [ ] In Storyblok `de/global` geöffnet
- [ ] Navbar Logo aktualisiert
- [ ] Footer Texte angepasst
- [ ] Kontaktdaten aktualisiert
- [ ] `de/home` Story geöffnet
- [ ] Hero Texte angepasst
- [ ] Platzhalter-Bilder durch echte Bilder ersetzt
- [ ] Alle Texte überprüft und finalisiert
- [ ] "Publish" geklickt
- [ ] Website refreshed → Änderungen sichtbar ✓

## Phase 9: Component Anpassungen (Entwicklung) 💻

Siehe `COMPONENT_ADAPTATION_GUIDE.md` für Details.

- [ ] `Hero.tsx` angepasst
- [ ] `Navbar.tsx` angepasst
- [ ] `Footer.tsx` angepasst
- [ ] `DetailsSections.tsx` angepasst
- [ ] `AngeboteSection.tsx` angepasst
- [ ] `PersoenlichesAngebot.tsx` angepasst
- [ ] `PsychotherapieSection.tsx` angepasst
- [ ] `NewsSection.tsx` angepasst
- [ ] `FaqSection.tsx` angepasst
- [ ] `TestimonialsSection.tsx` angepasst
- [ ] `CtaSection.tsx` angepasst
- [ ] Alle Unterseiten (TaoYin, QiGong, etc.) angepasst
- [ ] Änderungen committed und gepusht
- [ ] Vercel auto-deployed
- [ ] Alle Seiten getestet

## Phase 10: Multi-Language Setup 🌍

- [ ] URL-Struktur definiert:
  - Deutsch: `/` oder `/de/...`
  - Englisch: `/en/...`
  - Spanisch: `/es/...`
- [ ] Language Switcher zur Navbar hinzugefügt
- [ ] Alle englischen Inhalte in Storyblok befüllt (`en/`)
- [ ] Alle spanischen Inhalte in Storyblok befüllt (`es/`)
- [ ] Routing für alle Sprachen getestet
- [ ] Sprach-Wechsel funktioniert

## Phase 11: Finalisierung & Go-Live 🎉

- [ ] Alle Seiten auf allen Geräten getestet (Desktop, Tablet, Mobile)
- [ ] SEO Meta Tags hinzugefügt
- [ ] Favicon hinzugefügt
- [ ] robots.txt und sitemap.xml aktualisiert
- [ ] Performance getestet (Lighthouse)
- [ ] Accessibility überprüft
- [ ] DSGVO/Datenschutz Hinweise überprüft
- [ ] Impressum vollständig ausgefüllt
- [ ] Custom Domain mit Vercel verbunden (falls gewünscht)
- [ ] SSL Zertifikat aktiv
- [ ] Analytics eingerichtet (optional)
- [ ] Website offiziell live! 🚀

---

## 📊 Status Tracking

| Phase | Status | Datum | Notizen |
|-------|--------|-------|---------|
| 1. Vorbereitung | ⬜ | | |
| 2. Git & GitHub | ⬜ | | |
| 3. Vercel Setup | ⬜ | | |
| 4. Storyblok Setup | ⬜ | | |
| 5. Token Update | ⬜ | | |
| 6. Script Ausführung | ⬜ | | |
| 7. Verifizierung | ⬜ | | |
| 8. Content Anpassung | ⬜ | | |
| 9. Component Anpassungen | ⬜ | | |
| 10. Multi-Language | ⬜ | | |
| 11. Go-Live | ⬜ | | |

**Status Legende:**
- ⬜ Nicht begonnen
- 🔄 In Arbeit
- ✅ Abgeschlossen
- ❌ Problem/Blockiert

---

## 📞 Support & Ressourcen

- [Quick Start Guide](./QUICK_START.md) - Schnelle Übersicht
- [Ausführliche Anleitung](./STORYBLOK_SETUP.md) - Detaillierte Schritte
- [Component Guide](./COMPONENT_ADAPTATION_GUIDE.md) - Code-Anpassungen
- [Google Script](./STORYBLOK_SETUP_SCRIPT.gs) - Automatisches Setup

**Bei Problemen:**
1. Logs in Google Apps Script überprüfen
2. Browser Console auf Fehler prüfen
3. Vercel Deployment Logs checken
4. Troubleshooting-Abschnitt in `STORYBLOK_SETUP.md` lesen

---

## 🎯 Nächste Schritte nach diesem Setup

1. **Sofort:** Content in Storyblok bearbeiten und echte Texte/Bilder einfügen
2. **Diese Woche:** Alle Components an Storyblok anbinden
3. **Nächste Woche:** Multi-Language Content vervollständigen
4. **Danach:** Visual Editor konfigurieren, SEO optimieren, Go-Live planen
