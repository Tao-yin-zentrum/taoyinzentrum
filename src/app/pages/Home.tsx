import { Hero } from "../components/Hero";
import { DetailsSections } from "../components/DetailsSections";
import { AngeboteSection } from "../components/AngeboteSection";
import { PersoenlichesAngebot } from "../components/PersoenlichesAngebot";
import { PsychotherapieSection } from "../components/PsychotherapieSection";
import { NewsSection } from "../components/NewsSection";
import { FaqSection } from "../components/FaqSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { CtaSection } from "../components/CtaSection";
import { SEO, extractSEOFromStory } from "../components/SEO";
import { useStoryblokPage } from "../../hooks/useStoryblokPage";
import { type HomeContent } from "../../types/storyblok";

export default function Home() {
  const { content, loading, error, story } = useStoryblokPage<HomeContent>("home");

  // Show loading only briefly, then show static content if Storyblok unavailable
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[--primary] mx-auto mb-4"></div>
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  // If error or no content, use static fallback (components have their own data)
  // This allows the site to work without Storyblok CMS
  return (
    <>
      <SEO 
        title={content?.seo_title || "Taoyin Zentrum Ingolstadt – Heilung, Balance & Energie"}
        description={content?.seo_description || "Dein Zentrum für Qi Gong, Tao Yin, Chi Nei Tsang & Psychotherapie in Ingolstadt. Für mehr innere Ruhe, Vitalität und Lebensbalance."}
        keywords={content?.seo_keywords || "Qi Gong Ingolstadt, Tao Yin, Chi Nei Tsang, Psychotherapie Ingolstadt, Taoistische Praxis"}
        url="/"
        {...(story ? extractSEOFromStory(story) : {})}
      />
      <Hero content={content} />
      <DetailsSections content={content} />
      <AngeboteSection content={content} />
      <PersoenlichesAngebot content={content} />
      <PsychotherapieSection content={content} />
      <NewsSection />
      <FaqSection content={content} />
      <TestimonialsSection content={content} />
      <CtaSection content={content} />
    </>
  );
}