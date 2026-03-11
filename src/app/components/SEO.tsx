import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  locale?: 'de_DE' | 'en_US' | 'es_ES';
  publishedTime?: string;
  modifiedTime?: string;
  canonical?: string;
  noindex?: boolean;
}

const DEFAULT_IMAGE = 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68a58efe38dc7923d3429fdd_Taoyin_Image%202.png';
const SITE_NAME = 'Taoyin Zentrum Ingolstadt';
const BASE_URL = 'https://taoyin-zentrum-ingolstadt.de';

export function SEO({
  title,
  description,
  keywords,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  author = 'Magdalena Johanna',
  locale = 'de_DE',
  publishedTime,
  modifiedTime,
  canonical,
  noindex = false,
}: SEOProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;
  const canonicalUrl = canonical || fullUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={SITE_NAME} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter / WhatsApp */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Language Alternatives */}
      <link rel="alternate" hreflang="de" href={`${BASE_URL}/`} />
      <link rel="alternate" hreflang="en" href={`${BASE_URL}/en`} />
      <link rel="alternate" hreflang="es" href={`${BASE_URL}/es`} />
      <link rel="alternate" hreflang="x-default" href={`${BASE_URL}/`} />
    </Helmet>
  );
}

// Utility function to extract SEO data from Storyblok story
export function extractSEOFromStory(story: any) {
  const content = story?.content || {};
  
  return {
    title: content.seo_title || content.title || story.name,
    description: content.seo_description || content.description || '',
    keywords: content.seo_keywords || '',
    image: content.seo_image?.filename || content.hero_image?.filename || DEFAULT_IMAGE,
    url: story.full_slug ? `/${story.full_slug}` : undefined,
    publishedTime: story.published_at,
    modifiedTime: story.published_at || story.created_at,
  };
}
