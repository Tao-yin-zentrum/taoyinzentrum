import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react";

// Debug: Check if token is loaded
const accessToken = import.meta.env.VITE_STORYBLOK_ACCESS_TOKEN;
if (!accessToken) {
  console.error("❌ VITE_STORYBLOK_ACCESS_TOKEN is not set!");
  console.error("Please add it to your Vercel Environment Variables and redeploy.");
} else {
  console.log("✅ Storyblok token loaded:", accessToken.substring(0, 10) + "...");
}

// Initialize Storyblok
storyblokInit({
  accessToken: accessToken,
  use: [apiPlugin],
  apiOptions: {
    region: "eu", // or "us", depending on your space
  },
});

// Get the API instance after initialization
export const storyblokApi = getStoryblokApi();

// Language paths for our custom multi-language setup
export const LANGUAGES = ["de", "en", "es"] as const;
export type Language = typeof LANGUAGES[number];

// Get current language from URL path
export function getCurrentLanguage(): Language {
  const path = window.location.pathname;
  const langMatch = path.match(/^\/(de|en|es)\//);
  return langMatch ? (langMatch[1] as Language) : "de";
}

// Build story slug based on language and page
export function getStorySlug(page: string, lang?: Language): string {
  const language = lang || getCurrentLanguage();
  return `${language}/${page}`;
}

// Fetch a story by slug
export async function fetchStory(slug: string) {
  if (!storyblokApi) {
    console.warn("Storyblok API not initialized - using fallback data");
    console.warn("Check if VITE_STORYBLOK_ACCESS_TOKEN is set in environment variables");
    return null;
  }

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: import.meta.env.DEV ? "draft" : "published",
    });
    return data.story;
  } catch (error) {
    console.error(`Error fetching story ${slug}:`, error);
    return null;
  }
}

// Fetch global data (navbar, footer, etc.)
export async function fetchGlobalData(lang: Language = "de") {
  if (!storyblokApi) {
    console.warn("Storyblok API not initialized - using fallback data");
    return null;
  }

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${lang}/global`, {
      version: import.meta.env.DEV ? "draft" : "published",
    });
    return data.story;
  } catch (error) {
    console.error(`Error fetching global data for ${lang}:`, error);
    return null;
  }
}