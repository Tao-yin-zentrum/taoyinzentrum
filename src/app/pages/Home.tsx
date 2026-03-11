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

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Fehler beim Laden der Seite</p>
          <p className="text-gray-600 mt-2">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Taoyin Zentrum Ingolstadt – Heilung, Balance & Energie"
        description="Dein Zentrum für Qi Gong, Tao Yin, Chi Nei Tsang & Psychotherapie in Ingolstadt. Für mehr innere Ruhe, Vitalität und Lebensbalance."
        keywords="Qi Gong Ingolstadt, Tao Yin, Chi Nei Tsang, Psychotherapie Ingolstadt, Taoistische Praxis"
        url="/"
        {...(story ? extractSEOFromStory(story) : {})}
      />
      <Hero content={content} />
      <DetailsSections content={content} />
      <AngeboteSection content={content} />
      <PersoenlichesAngebot content={content} />
      <PsychotherapieSection content={content} />
      <NewsSection content={content} />
      <FaqSection content={content} />
      <TestimonialsSection content={content} />
      <CtaSection content={content} />
    </>
  );
}