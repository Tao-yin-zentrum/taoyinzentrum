# Component Adaptation Guide

## Übersicht

Nachdem das Storyblok Setup abgeschlossen ist, müssen alle React Components angepasst werden, um Daten aus Storyblok zu beziehen statt hardcodierte Werte zu verwenden.

## Allgemeines Muster

### Vorher (Hardcoded)
```tsx
export function Hero() {
  return (
    <section>
      <h1>Willkommen im Taoyin Zentrum</h1>
      <p>Ganzheitliche Therapie</p>
    </section>
  );
}
```

### Nachher (Storyblok-basiert)
```tsx
import { type HomeContent } from "../../types/storyblok";

interface HeroProps {
  content: HomeContent;
}

export function Hero({ content }: HeroProps) {
  return (
    <section>
      <h1>{content.hero_title}</h1>
      <p>{content.hero_subtitle}</p>
      <a href={content.hero_cta_link.cached_url}>
        {content.hero_cta_text}
      </a>
    </section>
  );
}
```

## Beispiele für verschiedene Feldtypen

### 1. Text Felder
```tsx
<h1>{content.hero_title}</h1>
<p>{content.hero_subtitle}</p>
```

### 2. Asset Felder (Bilder)
```tsx
import { ImageWithFallback } from "./figma/ImageWithFallback";

<ImageWithFallback
  src={content.hero_background_image.filename}
  alt={content.hero_background_image.alt}
  className="w-full h-auto"
/>
```

### 3. Link Felder
```tsx
import { Link } from "react-router";

// Internal Story Link
<Link to={`/${content.cta_button_link.cached_url}`}>
  {content.cta_button_text}
</Link>

// External URL
{content.cta_button_link.linktype === 'url' && (
  <a href={content.cta_button_link.url} target="_blank" rel="noopener noreferrer">
    {content.cta_button_text}
  </a>
)}
```

### 4. Bloks (Wiederholbare Components)
```tsx
// FAQ Items Beispiel
{content.faq_items.map((item) => (
  <div key={item._uid}>
    <h3>{item.question}</h3>
    <p>{item.answer}</p>
  </div>
))}

// Detail Cards Beispiel
{content.details_sections.map((detail) => (
  <div key={detail._uid}>
    <Icon name={detail.icon} />
    <h3>{detail.title}</h3>
    <p>{detail.description}</p>
  </div>
))}
```

### 5. Rich Text Felder
```tsx
import { storyblokEditable, renderRichText } from "@storyblok/react";

// Einfache Darstellung
<div 
  dangerouslySetInnerHTML={{ 
    __html: renderRichText(content.intro_text) 
  }} 
/>

// Mit Custom Rendering (empfohlen)
function renderRichTextContent(richtext: StoryblokRichText) {
  return renderRichText(richtext, {
    // Custom resolver für spezielle Elemente
    markResolvers: {
      bold: (children) => <strong className="font-bold">{children}</strong>,
    },
    nodeResolvers: {
      paragraph: (children) => <p className="mb-4">{children}</p>,
      heading: (children, { level }) => {
        const Tag = `h${level}` as keyof JSX.IntrinsicElements;
        return <Tag className="font-bold mb-2">{children}</Tag>;
      },
    },
  });
}

<div>{renderRichTextContent(content.intro_text)}</div>
```

## Anpassungen nach Component

### `/src/app/components/Hero.tsx`
```tsx
import { type HomeContent } from "../../types/storyblok";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router";

interface HeroProps {
  content: HomeContent;
}

export function Hero({ content }: HeroProps) {
  return (
    <section className="relative bg-[--hero-bg] py-20">
      {content.hero_background_image && (
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src={content.hero_background_image.filename}
            alt={content.hero_background_image.alt || "Hero background"}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-5xl font-serif italic text-[--primary] mb-4">
          {content.hero_title}
        </h1>
        <p className="text-xl mb-8">{content.hero_subtitle}</p>
        {content.hero_cta_text && content.hero_cta_link && (
          <Link
            to={`/${content.hero_cta_link.cached_url}`}
            className="inline-block bg-[--accent] text-[--secondary-foreground] px-8 py-3 rounded-md hover:opacity-90 transition"
          >
            {content.hero_cta_text}
          </Link>
        )}
      </div>
    </section>
  );
}
```

### `/src/app/components/DetailsSections.tsx`
```tsx
import { type HomeContent } from "../../types/storyblok";
import * as LucideIcons from "lucide-react";

interface DetailsSectionsProps {
  content: HomeContent;
}

export function DetailsSections({ content }: DetailsSectionsProps) {
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-8 h-8 text-[--primary]" /> : null;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {content.details_sections?.map((detail) => (
            <div key={detail._uid} className="text-center">
              <div className="mb-4 flex justify-center">
                {getIcon(detail.icon)}
              </div>
              <h3 className="text-xl font-bold mb-2 text-[--primary]">
                {detail.title}
              </h3>
              <p className="text-gray-600">{detail.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### `/src/app/components/AngeboteSection.tsx`
```tsx
import { type HomeContent } from "../../types/storyblok";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router";

interface AngeboteSectionProps {
  content: HomeContent;
}

export function AngeboteSection({ content }: AngeboteSectionProps) {
  return (
    <section className="py-16 bg-[--section-bg]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif italic text-[--primary] text-center mb-12">
          {content.angebote_title}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {content.angebote_cards?.map((card) => (
            <Link
              key={card._uid}
              to={`/${card.link.cached_url}`}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={card.image.filename}
                  alt={card.image.alt || card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[--primary]">
                  {card.title}
                </h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### `/src/app/components/FaqSection.tsx`
```tsx
import { type HomeContent } from "../../types/storyblok";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface FaqSectionProps {
  content: HomeContent;
}

export function FaqSection({ content }: FaqSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-serif italic text-[--primary] text-center mb-12">
          {content.faq_title}
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {content.faq_items?.map((faq, index) => (
            <AccordionItem key={faq._uid} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-[--primary] font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
```

### `/src/app/components/TestimonialsSection.tsx`
```tsx
import { type HomeContent } from "../../types/storyblok";
import { Star } from "lucide-react";

interface TestimonialsSectionProps {
  content: HomeContent;
}

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  return (
    <section className="py-16 bg-[--section-bg]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-serif italic text-[--primary] text-center mb-12">
          {content.testimonials_title}
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {content.testimonials_items?.map((testimonial) => (
            <div
              key={testimonial._uid}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[--accent] text-[--accent]"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <p className="text-[--primary] font-semibold">
                — {testimonial.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

## Navbar & Footer Integration

### `/src/app/components/Navbar.tsx`
```tsx
import { useStoryblok } from "../../contexts/StoryblokContext";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Navbar() {
  const { globalData, loading, language } = useStoryblok();

  if (loading || !globalData) return null;

  return (
    <nav className="bg-[--hero-bg] border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to={`/${language}/home`}>
            <ImageWithFallback
              src={globalData.navbar_logo.filename}
              alt={globalData.navbar_logo.alt || "Logo"}
              className="h-12"
            />
          </Link>
          <ul className="flex gap-6">
            {globalData.navbar_links?.map((link) => (
              <li key={link._uid}>
                <Link
                  to={`/${link.link.cached_url}`}
                  className="text-[--primary] hover:text-[--accent] transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
```

### `/src/app/components/Footer.tsx`
```tsx
import { useStoryblok } from "../../contexts/StoryblokContext";
import { Link } from "react-router";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  const { globalData, loading } = useStoryblok();

  if (loading || !globalData) return null;

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-[--primary] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold mb-4">Taoyin Zentrum</h3>
            <p className="text-sm opacity-90">{globalData.footer_description}</p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">{globalData.footer_contact_title}</h3>
            <p className="text-sm opacity-90">{globalData.footer_address_line1}</p>
            <p className="text-sm opacity-90">{globalData.footer_address_line2}</p>
            <p className="text-sm opacity-90 mt-2">
              Tel: <a href={`tel:${globalData.footer_phone}`}>{globalData.footer_phone}</a>
            </p>
            <p className="text-sm opacity-90">
              Email: <a href={`mailto:${globalData.footer_email}`}>{globalData.footer_email}</a>
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Folgen Sie uns</h3>
            <div className="flex gap-4">
              {globalData.footer_social_links?.map((social) => (
                <a
                  key={social._uid}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-75 transition"
                  aria-label={social.platform}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-75">
          <p>{globalData.footer_copyright}</p>
        </div>
      </div>
    </footer>
  );
}
```

## Nächste Schritte

1. **Priorität 1:** Passe `Hero`, `Navbar`, und `Footer` an (am wichtigsten für erste Tests)
2. **Priorität 2:** Passe alle Home-Page Sections an
3. **Priorität 3:** Passe alle anderen Pages an (TaoYin, QiGong, etc.)
4. **Testing:** Teste jede angepasste Component einzeln
5. **Refinement:** Verfeinere das Design und füge Visual Editor Support hinzu

## Hinweise

- **Null Checks:** Prüfe immer auf `undefined` oder leere Arrays vor dem Mappen:
  ```tsx
  {content.items?.map(...) || null}
  ```

- **Fallbacks:** Verwende Fallback-Werte für optionale Felder:
  ```tsx
  {content.title || "Default Title"}
  ```

- **Type Safety:** TypeScript hilft dir, fehlende Felder zu finden. Nutze die Auto-Completion!

- **Visual Editor:** Für Live-Editing in Storyblok kannst du später `storyblokEditable` hinzufügen:
  ```tsx
  import { storyblokEditable } from "@storyblok/react";
  
  <div {...storyblokEditable(content)}>
    {/* Content */}
  </div>
  ```
