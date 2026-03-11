import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router";

// Logo placeholder - replace with your actual logo
const logoImg = "https://via.placeholder.com/200x60/037baf/ffffff?text=Taoyin+Zentrum";

const angeboteItems = [
  {
    category: "Tao Yin & Qigong",
    items: [
      { label: "Tao Yin", desc: "Sanfte Bewegung, tiefe Entspannung.", href: "/taoyin" },
      { label: "Qigong", desc: "Lebensenergie stärken, Balance finden.", href: "/qi-gong" },
      { label: "Chi Nei Tsang", desc: "Bauchmassage für innere Harmonie.", href: "/chi-nei-tsang" },
    ],
  },
  {
    category: "Ganzheitliche Psychotherapie",
    items: [
      { label: "Zur Praxis", desc: "Ganzheitliche Praxis für Psychotherapie", href: "/psychotherapie" },
      { label: "Therapien", desc: "Meine verschiedenen Therapie Angebote", href: "/therapien" },
      { label: "Behandlung", desc: "Welche Möglichkeiten gibt es", href: "/psychotherapie/ziele" },
    ],
  },
];

const DocIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
    <path d="m25.7 9.3l-7-7A.9.9 0 0 0 18 2H8a2.006 2.006 0 0 0-2 2v24a2.006 2.006 0 0 0 2 2h16a2.006 2.006 0 0 0 2-2V10a.9.9 0 0 0-.3-.7M18 4.4l5.6 5.6H18ZM24 28H8V4h8v6a2.006 2.006 0 0 0 2 2h6Z" strokeLinejoin="round" />
  </svg>
);

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [angeboteOpen, setAngeboteOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileAngeboteOpen, setMobileAngeboteOpen] = useState(false);
  const location = useLocation();
  const angeboteRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on route change
  useEffect(() => {
    setAngeboteOpen(false);
    setLangOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav className="w-full bg-[#eff5f6] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center h-[72px]">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 mr-8">
          <img src={logoImg} alt="Taoyin Zentrum" className="h-14 w-auto" />
        </Link>

        {/* Desktop Nav - left aligned */}
        <div className="hidden lg:flex items-center gap-7 flex-1">
          {/* Angebote Dropdown */}
          <div
            ref={angeboteRef}
            className="relative"
            onMouseEnter={() => setAngeboteOpen(true)}
            onMouseLeave={() => setAngeboteOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-[15px] text-primary/80 hover:text-primary transition-colors py-2">
              Angebote
              <svg className={`w-3 h-3 transition-transform ${angeboteOpen ? "rotate-180" : ""}`} viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            {angeboteOpen && (
              <div className="absolute top-full left-0 pt-2 z-50" style={{ left: `-${angeboteRef.current?.getBoundingClientRect().left ?? 0}px`, width: '100vw' }}>
                <div className="max-w-7xl mx-auto px-6">
                  <div className="bg-background rounded-xl shadow-xl border border-secondary/30 p-6 grid grid-cols-[1fr_1fr_minmax(220px,auto)] gap-6">
                    {/* Left two columns */}
                    {angeboteItems.map((group) => (
                      <div key={group.category}>
                        <p className="text-[11px] tracking-[0.15em] uppercase text-primary/60 mb-4">
                          {group.category}
                        </p>
                        <div className="space-y-1">
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/60 transition-colors group"
                            >
                              <div className="text-primary/50 mt-0.5 group-hover:text-primary transition-colors">
                                <DocIcon />
                              </div>
                              <div>
                                <div className="text-[14px] text-primary">{item.label}</div>
                                <div className="text-[12px] text-foreground/50">{item.desc}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    {/* Right: Individuelle Anfragen card */}
                    <div className="bg-primary text-white rounded-xl p-6 flex flex-col justify-between">
                      <div>
                        <div className="text-[18px] mb-2">Individuelle Anfragen</div>
                        <p className="text-[13px] text-white/70 leading-relaxed">
                          Das passende Angebot für dich, individuell abgestimmt auf deine Bedürfnisse
                        </p>
                      </div>
                      <Link to="/kontakt" className="inline-flex items-center gap-2 text-[14px] text-white/80 hover:text-white transition-colors mt-6">
                        Jetzt anfragen
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2 8H14.5M14.5 8L8.5 2M14.5 8L8.5 14" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/about"
            className={`text-[15px] py-2 transition-colors ${
              location.pathname === "/about" ? "text-primary" : "text-primary/80 hover:text-primary"
            }`}
          >
            Über mich
          </Link>

          <Link
            to="/kontakt"
            className={`text-[15px] py-2 transition-colors ${
              location.pathname === "/kontakt" ? "text-primary" : "text-primary/80 hover:text-primary"
            }`}
          >
            Kontakt
          </Link>

          {/* Language Dropdown */}
          <div
            ref={langRef}
            className="relative"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-[15px] text-primary/80 hover:text-primary transition-colors py-2">
              Sprache
              <svg className={`w-3 h-3 transition-transform ${langOpen ? "rotate-180" : ""}`} viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 pt-2 z-50">
                <div className="bg-white rounded-lg shadow-lg border border-border py-1 min-w-[80px]">
                  {["DE", "EN", "ES"].map((lang) => (
                    <button
                      key={lang}
                      className="block w-full text-left px-4 py-2 text-[14px] text-foreground/70 hover:text-foreground hover:bg-background/50 transition-colors"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Spacer to push CTA right */}
          <div className="flex-1" />

          {/* CTA */}
          <Link
            to="/kontakt"
            className="bg-secondary text-secondary-foreground px-6 py-2.5 rounded-lg text-[14px] hover:bg-secondary/90 transition-colors"
          >
            Kontakt & Anfahrt
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="1" y1="5" x2="23" y2="5" />
              <line x1="1" y1="12" x2="23" y2="12" />
              <line x1="1" y1="19" x2="23" y2="19" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <div className="px-6 py-4 space-y-1">
            <button
              onClick={() => setMobileAngeboteOpen(!mobileAngeboteOpen)}
              className="flex items-center justify-between w-full py-3 text-[15px] text-foreground/70"
            >
              Angebote
              <svg className={`w-3 h-3 transition-transform ${mobileAngeboteOpen ? "rotate-180" : ""}`} viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            {mobileAngeboteOpen && (
              <div className="pl-4 space-y-1 pb-2">
                {angeboteItems.flatMap((group) =>
                  group.items.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-[14px] text-foreground/60 hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ))
                )}
              </div>
            )}

            <Link to="/about" onClick={() => setMobileOpen(false)} className="block py-3 text-[15px] text-foreground/70">
              Über mich
            </Link>
            <Link to="/kontakt" onClick={() => setMobileOpen(false)} className="block py-3 text-[15px] text-foreground/70">
              Kontakt
            </Link>
            <Link
              to="/kontakt"
              onClick={() => setMobileOpen(false)}
              className="block mt-4 bg-secondary text-secondary-foreground text-center px-6 py-3 rounded-lg text-[14px]"
            >
              Kontakt & Anfahrt
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}