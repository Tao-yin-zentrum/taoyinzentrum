import { useLocation } from "react-router";

const pageTitles: Record<string, string> = {
  "/taoyin": "Taoyin",
  "/qi-gong": "Qi Gong",
  "/chi-nei-tsang": "Chi Nei Tsang",
  "/psychotherapie": "Praxis für Psychotherapie",
  "/about": "Über mich",
  "/kontakt": "Anfahrt & Kontakt",
  "/psychotherapie/ziele": "Ziele der Behandlung",
  "/therapien": "Therapien",
  "/impressum": "Impressum & Datenschutz",
};

export default function Placeholder() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Seite";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <h1 className="text-[2.5rem] text-foreground mb-4">{title}</h1>
      <p className="text-foreground/50 text-[15px]">
        Diese Seite wird bald mit Inhalten gefüllt.
      </p>
    </div>
  );
}
