# ✅ Migration Checklist – Storyblok Setup

## Vorbereitung

- [ ] Storyblok Account erstellt
- [ ] Neuen Space in Storyblok erstellt
- [ ] Space ID notiert
- [ ] Management Token erstellt und notiert

## Script Setup

- [ ] [Google Apps Script](https://script.google.com) geöffnet
- [ ] Neues Projekt erstellt
- [ ] `/STORYBLOK_SETUP_SCRIPT_COMPLETE.gs` kopiert und eingefügt
- [ ] Space ID in Config eingetragen (Zeile 21)
- [ ] Management Token in Config eingetragen (Zeile 22)
- [ ] Region korrekt gesetzt (Zeile 23: 'eu' oder 'us')

## Script Ausführung

- [ ] Funktion `main` ausgewählt
- [ ] Script ausgeführt (▶️ Button)
- [ ] Berechtigungen erteilt (beim ersten Mal)
- [ ] Warte 10-15 Minuten...
- [ ] Log überprüft (sollte "🎉 SETUP COMPLETE!" zeigen)

## Storyblok Verifikation

- [ ] Content Types erstellt (ca. 20 Components unter "Components")
- [ ] Folder-Struktur vorhanden (de/, en/, es/ unter "Content")
- [ ] Global Content vorhanden (in jedem Folder)
- [ ] Home Story vorhanden (in jedem Folder)
- [ ] Assets hochgeladen (unter "Assets")
- [ ] DE/home Story geöffnet und Inhalte überprüft

## Vercel Setup

- [ ] Repository auf GitHub gepusht
- [ ] Vercel Account erstellt/eingeloggt
- [ ] Neues Projekt aus GitHub Repo erstellt
- [ ] Environment Variables hinzugefügt:
  - [ ] `VITE_STORYBLOK_TOKEN` = Preview Token aus Storyblok
- [ ] Build Command: `pnpm run build` (oder `npm run build`)
- [ ] Output Directory: `dist`
- [ ] Deploy gestartet

## Website Testen

- [ ] Website URL von Vercel kopiert
- [ ] Website aufgerufen
- [ ] Home Page lädt korrekt
- [ ] Alle Sections werden angezeigt:
  - [ ] Hero mit echtem Text
  - [ ] Details Sections (7 Stück)
  - [ ] Angebote (4 Pricing Cards)
  - [ ] FAQs (4 Stück)
  - [ ] Testimonials (3 Stück)
  - [ ] News (3 Items)
  - [ ] CTA Section
- [ ] Navbar wird korrekt angezeigt
- [ ] Footer wird korrekt angezeigt
- [ ] Bilder werden geladen

## Storyblok CMS Testen

- [ ] In Storyblok: Story de/home geöffnet
- [ ] Einen Text geändert (z.B. Hero Title)
- [ ] "Save" geklickt
- [ ] Website neu geladen (mit `?_storyblok=` Draft Mode)
- [ ] Änderung ist sichtbar ✅
- [ ] "Publish" geklickt
- [ ] Website neu geladen (ohne Draft Mode)
- [ ] Änderung ist live ✅

## Inhalte vervollständigen

- [ ] News-Texte aktualisieren
  - [ ] News Item 1: Titel & Beschreibung
  - [ ] News Item 2: Titel & Beschreibung
  - [ ] News Item 3: Titel & Beschreibung
- [ ] Englische Übersetzung (en/home)
  - [ ] Details Sections übersetzen
  - [ ] FAQs übersetzen
  - [ ] Testimonials übersetzen (oder entfernen)
- [ ] Spanische Übersetzung (es/home)
  - [ ] Details Sections übersetzen
  - [ ] FAQs übersetzen
  - [ ] Testimonials übersetzen (oder entfernen)

## Weitere Seiten erstellen

- [ ] About Page (de/about)
- [ ] About Page (en/about)
- [ ] About Page (es/about)
- [ ] Kontakt Page (de/kontakt)
- [ ] Kontakt Page (en/kontakt)
- [ ] Kontakt Page (es/kontakt)
- [ ] Impressum Page (de/impressum)
- [ ] Impressum Page (en/impressum)
- [ ] Impressum Page (es/impressum)
- [ ] Weitere Therapy Pages...

## Bilder optimieren

- [ ] Hero Bilder überprüfen
- [ ] Details Section Bilder überprüfen
- [ ] News Bilder durch echte Bilder ersetzen
- [ ] Logo durch echtes Logo ersetzen
- [ ] Alle Bilder in WebP konvertieren (optional, für Performance)

## SEO optimieren

- [ ] Meta Titles für alle Seiten setzen
- [ ] Meta Descriptions für alle Seiten setzen
- [ ] Keywords für alle Seiten setzen
- [ ] OG Images für Social Sharing hochladen
- [ ] robots.txt überprüfen
- [ ] sitemap.xml generieren

## Domain Setup

- [ ] Custom Domain in Vercel hinzufügen
- [ ] DNS Records konfigurieren
- [ ] SSL Zertifikat verifizieren
- [ ] www → non-www Redirect einrichten (oder umgekehrt)

## Performance & Analytics

- [ ] Google Analytics einrichten (optional)
- [ ] Google Search Console einrichten
- [ ] Performance mit Lighthouse testen
- [ ] Core Web Vitals überprüfen

## Go Live! 🚀

- [ ] Alle Inhalte final überprüfen
- [ ] Alle Links testen
- [ ] Kontaktformular testen
- [ ] Mobile Ansicht testen
- [ ] Desktop Ansicht testen
- [ ] Cross-Browser Test (Chrome, Firefox, Safari)
- [ ] Social Sharing testen (WhatsApp, Facebook, etc.)
- [ ] **Website ist LIVE!** 🎉

---

## 📊 Fortschritt

| Phase | Status |
|-------|--------|
| **Script Setup** | ⬜ Offen / ✅ Erledigt |
| **Storyblok Basis** | ⬜ Offen / ✅ Erledigt |
| **Vercel Deployment** | ⬜ Offen / ✅ Erledigt |
| **Inhalte DE** | ⬜ Offen / ✅ Erledigt |
| **Inhalte EN** | ⬜ Offen / ✅ Erledigt |
| **Inhalte ES** | ⬜ Offen / ✅ Erledigt |
| **SEO** | ⬜ Offen / ✅ Erledigt |
| **Go Live** | ⬜ Offen / ✅ Erledigt |

---

## 🎯 Quick Start (TL;DR)

```bash
1. Storyblok Account → Space erstellen → Credentials kopieren
2. Google Apps Script → Script kopieren → Credentials eintragen → Run
3. Storyblok → Content überprüfen → Preview Token kopieren
4. GitHub → Code pushen
5. Vercel → Projekt erstellen → Env Vars eintragen → Deploy
6. Website testen → 🎉
```

---

**Geschätzte Dauer**: 1-2 Stunden für komplettes Setup
