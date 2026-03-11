// Base Storyblok story interface
export interface StoryblokStory<T = any> {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  full_slug: string;
  created_at: string;
  published_at: string;
  content: T;
  lang: string;
}

// Asset type for images
export interface StoryblokAsset {
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  filename: string;
  copyright: string;
  fieldtype: "asset";
}

// Rich text type
export interface StoryblokRichText {
  type: "doc";
  content: any[];
}

// Link type
export interface StoryblokLink {
  id: string;
  url: string;
  linktype: "story" | "url" | "email";
  fieldtype: "multilink";
  cached_url: string;
}

// Global content (navbar, footer)
export interface GlobalContent {
  navbar_logo: StoryblokAsset;
  navbar_links: Array<{
    _uid: string;
    label: string;
    link: StoryblokLink;
    component: "nav_link";
  }>;
  footer_description: string;
  footer_contact_title: string;
  footer_address_line1: string;
  footer_address_line2: string;
  footer_phone: string;
  footer_email: string;
  footer_whatsapp: string;
  footer_social_links: Array<{
    _uid: string;
    platform: string;
    url: string;
    component: "social_link";
  }>;
  footer_copyright: string;
}

// Home page content
export interface HomeContent {
  component: "page_home";
  hero_title: string;
  hero_subtitle: string;
  hero_cta_text: string;
  hero_cta_link: StoryblokLink;
  hero_background_image: StoryblokAsset;
  
  // Details Section
  details_sections: Array<{
    _uid: string;
    icon: string;
    title: string;
    description: string;
    component: "detail_card";
  }>;
  
  // Angebote Section
  angebote_title: string;
  angebote_cards: Array<{
    _uid: string;
    image: StoryblokAsset;
    title: string;
    description: string;
    link: StoryblokLink;
    component: "angebot_card";
  }>;
  
  // Persönliches Angebot Section
  persoenliches_title: string;
  persoenliches_subtitle: string;
  persoenliches_image: StoryblokAsset;
  persoenliches_features: Array<{
    _uid: string;
    text: string;
    component: "feature_item";
  }>;
  persoenliches_cta_text: string;
  persoenliches_cta_link: StoryblokLink;
  
  // Psychotherapie Section
  psycho_title: string;
  psycho_description: string;
  psycho_image: StoryblokAsset;
  psycho_link: StoryblokLink;
  psycho_link_text: string;
  
  // News Section
  news_title: string;
  news_items: Array<{
    _uid: string;
    date: string;
    title: string;
    description: string;
    link: StoryblokLink;
    component: "news_item";
  }>;
  
  // FAQ Section
  faq_title: string;
  faq_items: Array<{
    _uid: string;
    question: string;
    answer: string;
    component: "faq_item";
  }>;
  
  // Testimonials Section
  testimonials_title: string;
  testimonials_items: Array<{
    _uid: string;
    text: string;
    author: string;
    rating: number;
    component: "testimonial_item";
  }>;
  
  // CTA Section
  cta_title: string;
  cta_description: string;
  cta_button_text: string;
  cta_button_link: StoryblokLink;
}

// TaoYin page content
export interface TaoYinContent {
  component: "page_taoyin";
  hero_title: string;
  hero_subtitle: string;
  hero_image: StoryblokAsset;
  
  intro_text: StoryblokRichText;
  
  benefits_title: string;
  benefits_items: Array<{
    _uid: string;
    title: string;
    description: string;
    component: "benefit_item";
  }>;
  
  practice_title: string;
  practice_description: StoryblokRichText;
  practice_image: StoryblokAsset;
  
  cta_title: string;
  cta_button_text: string;
  cta_button_link: StoryblokLink;
}

// Qi Gong page content
export interface QiGongContent {
  component: "page_qigong";
  hero_title: string;
  hero_subtitle: string;
  hero_image: StoryblokAsset;
  
  intro_text: StoryblokRichText;
  
  benefits_title: string;
  benefits_items: Array<{
    _uid: string;
    title: string;
    description: string;
    component: "benefit_item";
  }>;
  
  practice_title: string;
  practice_description: StoryblokRichText;
  practice_image: StoryblokAsset;
  
  cta_title: string;
  cta_button_text: string;
  cta_button_link: StoryblokLink;
}

// Chi Nei Tsang page content
export interface ChiNeiTsangContent {
  component: "page_chi_nei_tsang";
  hero_title: string;
  hero_subtitle: string;
  hero_image: StoryblokAsset;
  
  intro_text: StoryblokRichText;
  
  benefits_title: string;
  benefits_items: Array<{
    _uid: string;
    title: string;
    description: string;
    component: "benefit_item";
  }>;
  
  practice_title: string;
  practice_description: StoryblokRichText;
  practice_image: StoryblokAsset;
  
  session_info_title: string;
  session_info_items: Array<{
    _uid: string;
    label: string;
    value: string;
    component: "info_item";
  }>;
  
  cta_title: string;
  cta_button_text: string;
  cta_button_link: StoryblokLink;
}

// Psychotherapie page content
export interface PsychotherapieContent {
  component: "page_psychotherapie";
  hero_title: string;
  hero_subtitle: string;
  hero_image: StoryblokAsset;
  
  intro_text: StoryblokRichText;
  
  methods_title: string;
  methods_items: Array<{
    _uid: string;
    title: string;
    description: string;
    icon: string;
    component: "method_item";
  }>;
  
  areas_title: string;
  areas_items: Array<{
    _uid: string;
    text: string;
    component: "area_item";
  }>;
  
  process_title: string;
  process_steps: Array<{
    _uid: string;
    step_number: number;
    title: string;
    description: string;
    component: "process_step";
  }>;
  
  cta_title: string;
  cta_button_text: string;
  cta_button_link: StoryblokLink;
}

// Behandlung page content
export interface BehandlungContent {
  component: "page_behandlung";
  hero_title: string;
  hero_subtitle: string;
  
  goals_title: string;
  goals_items: Array<{
    _uid: string;
    title: string;
    description: string;
    icon: string;
    component: "goal_item";
  }>;
  
  approach_title: string;
  approach_description: StoryblokRichText;
  
  cta_title: string;
  cta_button_text: string;
  cta_button_link: StoryblokLink;
}

// Therapien page content
export interface TherapienContent {
  component: "page_therapien";
  hero_title: string;
  hero_subtitle: string;
  
  therapies_items: Array<{
    _uid: string;
    title: string;
    description: string;
    image: StoryblokAsset;
    link: StoryblokLink;
    component: "therapy_item";
  }>;
}

// About page content
export interface AboutContent {
  component: "page_about";
  hero_title: string;
  hero_image: StoryblokAsset;
  
  intro_text: StoryblokRichText;
  
  bio_title: string;
  bio_text: StoryblokRichText;
  bio_image: StoryblokAsset;
  
  qualifications_title: string;
  qualifications_items: Array<{
    _uid: string;
    year: string;
    title: string;
    description: string;
    component: "qualification_item";
  }>;
  
  philosophy_title: string;
  philosophy_text: StoryblokRichText;
}

// Kontakt page content
export interface KontaktContent {
  component: "page_kontakt";
  hero_title: string;
  hero_subtitle: string;
  
  contact_info_title: string;
  contact_address: string;
  contact_phone: string;
  contact_email: string;
  contact_whatsapp: string;
  
  hours_title: string;
  hours_items: Array<{
    _uid: string;
    day: string;
    hours: string;
    component: "hours_item";
  }>;
  
  map_title: string;
  map_embed_url: string;
  
  form_title: string;
  form_name_label: string;
  form_email_label: string;
  form_phone_label: string;
  form_message_label: string;
  form_submit_text: string;
  form_success_message: string;
  form_error_message: string;
}

// Impressum page content
export interface ImpressumContent {
  component: "page_impressum";
  hero_title: string;
  
  content_sections: Array<{
    _uid: string;
    title: string;
    content: StoryblokRichText;
    component: "legal_section";
  }>;
}
