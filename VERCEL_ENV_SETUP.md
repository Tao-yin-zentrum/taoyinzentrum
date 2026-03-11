# Vercel Environment Variables Setup

## 📋 Übersicht

Diese Datei enthält alle notwendigen Environment Variables für dein Vercel-Deployment.

## 🔑 Benötigte Environment Variables

### Production, Preview & Development

Alle folgenden Variables sollten für **alle drei Environments** (Production, Preview, Development) gesetzt werden.

---

## 1️⃣ Storyblok Access Token

**Variable Name:**
```
VITE_STORYBLOK_ACCESS_TOKEN
```

**Value:**
```
Dein_Storyblok_Preview_Token_hier
```

**Wo finden:**
1. Gehe zu [app.storyblok.com](https://app.storyblok.com)
2. Öffne deinen Space "Taoyin Zentrum"
3. Settings → Access Tokens
4. Kopiere den **Preview Token** (sollte bereits vorhanden sein)
   - **NICHT** der Management Token!
   - Der Preview Token ist öffentlich sicher und kann im Frontend verwendet werden

**Beispiel:**
```
VITE_STORYBLOK_ACCESS_TOKEN=AbCdEfGh1234567890IjKlMnOpQr
```

---

## 🛠️ Schritt-für-Schritt Anleitung

### In Vercel

1. Gehe zu deinem Projekt auf [vercel.com](https://vercel.com)
2. Klicke auf **Settings**
3. Im Sidebar: **Environment Variables**
4. Klicke **Add New**

5. Fülle aus:
   - **Name:** `VITE_STORYBLOK_ACCESS_TOKEN`
   - **Value:** `[Dein Storyblok Preview Token]`
   - **Environments:**
     - ✅ Production
     - ✅ Preview
     - ✅ Development

6. Klicke **Save**

7. **Wichtig:** Triggere ein Redeploy
   - Gehe zu **Deployments**
   - Klicke auf das neueste Deployment
   - Klicke auf **... (More)** → **Redeploy**
   - Oder: Push einen neuen Commit zu GitHub

---

## ✅ Verifizierung

Nach dem Deployment:

1. Öffne deine Vercel URL
2. Öffne Browser Developer Tools (F12)
3. Gehe zu **Console**
4. Es sollten **keine** Fehler bezüglich "Storyblok API not initialized" erscheinen
5. Die Seite sollte Inhalte aus Storyblok laden

---

## 🔒 Sicherheit

### ✅ Sichere Tokens (können im Frontend verwendet werden):
- **Preview/Access Token** - Für Read-Only API Calls von der Website
  - Wird in `VITE_STORYBLOK_ACCESS_TOKEN` verwendet
  - Kann öffentlich im Frontend-Code erscheinen
  - Ermöglicht nur Lese-Zugriff auf veröffentlichte/draft Stories

### ❌ Geheime Tokens (NUR server-side verwenden):
- **Management Token** - Für Admin-Operationen
  - Wird NUR im Google Apps Script verwendet
  - NIEMALS im Frontend oder in Vercel Environment Variables speichern
  - Ermöglicht volle Admin-Rechte (Create, Update, Delete)

---

## 📝 Notizen

- **VITE_** Prefix ist wichtig!
  - Vite macht nur Variables mit diesem Prefix im Frontend verfügbar
  - Ohne VITE_ wäre die Variable nicht zugänglich

- **Environment Hinweis:**
  - **Production:** Live-Website (hauptdomain.com)
  - **Preview:** Branch-Deployments (z.B. feature-xyz.vercel.app)
  - **Development:** Lokale Entwicklung (wenn `vercel dev` verwendet wird)

- **Vercel Auto-Redeploy:**
  - Vercel deployed automatisch bei jedem Git Push
  - Environment Variables werden automatisch injiziert
  - Keine manuelle Konfiguration nach dem ersten Setup nötig

---

## 🚨 Häufige Fehler

### ❌ Fehler: "Storyblok API not initialized"
**Ursache:** Token nicht gesetzt oder falsch

**Lösung:**
1. Überprüfe, ob `VITE_STORYBLOK_ACCESS_TOKEN` in Vercel gesetzt ist
2. Stelle sicher, dass du den **Preview Token** verwendest (nicht Management Token)
3. Triggere ein Redeploy

### ❌ Fehler: "403 Forbidden" beim API Call
**Ursache:** Falscher Token oder falsche Space ID

**Lösung:**
1. Überprüfe den Token in Storyblok → Settings → Access Tokens
2. Kopiere den Token nochmal (könnte abgelaufen sein)
3. Stelle sicher, dass der Space korrekt ist

### ❌ Fehler: Environment Variable nicht verfügbar im Code
**Ursache:** Kein VITE_ Prefix oder Redeploy fehlt

**Lösung:**
1. Stelle sicher, dass die Variable `VITE_STORYBLOK_ACCESS_TOKEN` heißt (mit VITE_ Prefix)
2. Triggere einen Redeploy nach dem Setzen der Variable

---

## 🔄 Token erneuern

Falls du den Preview Token erneuern musst:

1. Gehe zu Storyblok → Settings → Access Tokens
2. Lösche den alten Token (optional)
3. Erstelle einen neuen Preview Token
4. Kopiere den neuen Token
5. Gehe zu Vercel → Settings → Environment Variables
6. Bearbeite `VITE_STORYBLOK_ACCESS_TOKEN`
7. Füge den neuen Token ein
8. Speichern
9. Triggere Redeploy

---

## 📚 Weitere Ressourcen

- [Vercel Environment Variables Docs](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vite Environment Variables Docs](https://vitejs.dev/guide/env-and-mode.html)
- [Storyblok Access Tokens Docs](https://www.storyblok.com/docs/api/management#core-resources/spaces/access-tokens)

---

## ✅ Checkliste

- [ ] Storyblok Preview Token kopiert
- [ ] Vercel Projekt geöffnet
- [ ] Settings → Environment Variables
- [ ] `VITE_STORYBLOK_ACCESS_TOKEN` hinzugefügt
- [ ] Token als Value eingefügt
- [ ] Alle 3 Environments ausgewählt (Production, Preview, Development)
- [ ] Gespeichert
- [ ] Redeploy getriggert
- [ ] Website öffnet ohne Fehler
- [ ] Inhalte aus Storyblok werden geladen ✅

---

**Fertig! Deine Vercel Environment Variables sind korrekt konfiguriert.** 🎉
