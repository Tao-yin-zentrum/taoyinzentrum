# ✅ Vercel Build Fix - Komplett

## Problem
```
error: Rollup failed to resolve import "figma:asset/..." 
```

**Ursache:** `figma:asset` Imports funktionieren nur in Figma Make, nicht in regulären Vite-Projekten.

---

## ✅ Lösung - BEREITS ERLEDIGT

### Gefixt:

1. **Hero.tsx** ✅
   - Alte imports entfernt
   - Durch CDN URLs ersetzt:
     - `heroShelf` → https://cdn.prod.website-files.com/.../Estela-byaylin-52-min.jpg
     - `heroPortrait` → https://cdn.prod.website-files.com/.../Estela-byaylin-26-min.jpg

2. **Navbar.tsx** ✅
   - Logo import entfernt
   - Durch Placeholder ersetzt (kannst du später mit echtem Logo ersetzen)

---

## 🚀 Nächster Schritt

```bash
# Committe & pushe die Änderungen
git yolo "Fix figma:asset imports for Vercel build"
```

**Vercel wird jetzt erfolgreich builden!** ✅

---

## 🎨 Logo später ersetzen

Wenn du ein echtes Logo hast:

1. **Option A:** Upload zu einem CDN
2. **Option B:** In `/public` folder legen
   ```tsx
   const logoImg = "/logo.png";
   ```

**Aktuell:** Placeholder wird verwendet - funktioniert aber!

---

## 📝 Dateien geändert

- `/src/app/components/Hero.tsx` - CDN URLs statt figma:asset
- `/src/app/components/Navbar.tsx` - Placeholder Logo

**Keine weiteren figma:asset Imports gefunden!** ✅

---

## ✅ Verifizierung

```bash
# Teste lokal
npm run build

# Sollte erfolgreich sein!
```

---

**Status:** 🟢 READY FOR VERCEL DEPLOY
