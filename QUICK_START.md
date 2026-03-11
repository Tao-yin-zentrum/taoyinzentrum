# 🚀 Quick Start - Storyblok Integration

## Schritt-für-Schritt Zusammenfassung

### 1️⃣ Git & GitHub (5 Minuten)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/JuliusIngelheim/magdalenajohanna-website.git
git branch -M main
git push -u origin main
```

### 2️⃣ Vercel Setup (5 Minuten)
1. Gehe zu [vercel.com](https://vercel.com)
2. Importiere dein GitHub Repository
3. Füge Environment Variable hinzu:
   - Name: `VITE_STORYBLOK_ACCESS_TOKEN`
   - Value: `[wird später eingetragen]`
4. Deploy

### 3️⃣ Storyblok Account (5 Minuten)
1. Registriere dich auf [storyblok.com](https://www.storyblok.com)
2. Erstelle einen neuen Space "Taoyin Zentrum"
3. Kopiere **Preview Token** (Settings → Access Tokens)
4. Erstelle **Management Token** (Settings → Access Tokens → Generate Token)
5. Notiere deine **Space ID** (Settings → General)

### 4️⃣ Vercel Token aktualisieren (2 Minuten)
1. Gehe zu Vercel → Settings → Environment Variables
2. Bearbeite `VITE_STORYBLOK_ACCESS_TOKEN`
3. Trage deinen **Preview Token** ein
4. Triggere Redeploy

### 5️⃣ Google Apps Script (10 Minuten)
1. Öffne [script.google.com](https://script.google.com)
2. Neues Projekt erstellen
3. Kopiere den kompletten Code aus `STORYBLOK_SETUP_SCRIPT.gs`
4. Aktualisiere die CONFIG:
   ```javascript
   const CONFIG = {
     STORYBLOK_SPACE_ID: 'DEINE_SPACE_ID',
     STORYBLOK_MANAGEMENT_TOKEN: 'DEIN_MANAGEMENT_TOKEN',
     STORYBLOK_REGION: 'eu'
   };
   ```
5. Wähle Funktion `main` und klicke Run ▶️
6. Berechtigungen gewähren
7. Warte ~5-10 Minuten

### 6️⃣ Verifizierung (2 Minuten)
1. Gehe zu Storyblok → Content
2. Überprüfe Folder: `de/`, `en/`, `es/`
3. Öffne `de/home` und schaue die Felder an
4. Gehe zu deiner Vercel URL
5. Die Website sollte jetzt Daten aus Storyblok laden! 🎉

---

## 📌 Wichtige Tokens

| Token | Verwendung | Wo zu finden |
|-------|------------|--------------|
| **Preview Token** | Website API Calls (öffentlich) | Storyblok → Settings → Access Tokens |
| **Management Token** | Google Script Setup (geheim!) | Storyblok → Settings → Access Tokens → Generate Token |
| **Space ID** | Identifikation deines Spaces | Storyblok → Settings → General |

---

## 🔗 Nützliche Links

- 📖 [Ausführliche Anleitung](./STORYBLOK_SETUP.md)
- 🤖 [Google Apps Script Code](./STORYBLOK_SETUP_SCRIPT.gs)
- 🌐 [Storyblok Dashboard](https://app.storyblok.com)
- 🚀 [Vercel Dashboard](https://vercel.com/dashboard)

---

## ❓ Probleme?

Lies die [ausführliche Anleitung](./STORYBLOK_SETUP.md) im Abschnitt **Troubleshooting**.
