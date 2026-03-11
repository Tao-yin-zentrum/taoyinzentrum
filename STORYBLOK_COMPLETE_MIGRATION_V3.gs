/**
 * STORYBLOK COMPLETE MIGRATION v3.1 (FIXED)
 * 
 * Vollstaendige Migration der Taoyin Zentrum Website zu Storyblok
 * - Alle Components/Blocks (nested FIRST, then root)
 * - Alle Pages mit 100% echten Inhalten (DE/EN/ES)
 * - Alle Assets (Logo, Bilder)
 * - Preview-URL Konfiguration
 * 
 * ANLEITUNG:
 * 1. Oeffne https://script.google.com
 * 2. Neues Projekt erstellen
 * 3. Diesen Code einfuegen
 * 4. CONFIG ausfuellen (Space ID + Management Token)
 * 5. Optional: testConnection() ausfuehren zum Testen
 * 6. Optional: cleanup() ausfuehren um alten Content zu loeschen
 * 7. Funktion 'main' ausfuehren
 * 
 * FIXES in v3.1:
 * - Component-Reihenfolge: nested zuerst, dann root
 * - configurePreviewUrls: korrekter API-Endpoint (keine doppelte Space-ID)
 * - testConnection: korrekter API-Endpoint
 * - Caching fuer componentExists, getFolderId (weniger API-Calls, kein Rate-Limit)
 * - Cleanup: robustere Reihenfolge (Stories -> Child-Folders -> Root-Folders -> Components)
 */

// ============================================
// 1. CONFIGURATION
// ============================================
const CONFIG = {
  STORYBLOK_SPACE_ID: 'YOUR_SPACE_ID_HERE',
  STORYBLOK_MANAGEMENT_TOKEN: 'YOUR_MANAGEMENT_TOKEN_HERE',
  STORYBLOK_REGION: 'eu',
  PREVIEW_URL: 'https://your-app.vercel.app/',
};

const BASE_URL = `https://mapi.storyblok.com/v1/spaces/${CONFIG.STORYBLOK_SPACE_ID}`;
const HEADERS = {
  'Authorization': CONFIG.STORYBLOK_MANAGEMENT_TOKEN,
  'Content-Type': 'application/json'
};

// ============================================
// 2. CACHES (avoid repeated API calls)
// ============================================
let assetCache = {};
let componentCache = null;
let folderIdCache = {};

// ============================================
// 3. ASSET URLs (CDN)
// ============================================
const ASSETS = {
  logo: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/6890d6bafdd0696561be5520_tao_logo.png',
  logoWhite: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/6890d8b72344be05aef5a64a_tao_logo_white.png',
  favicon: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68a58dae9b1679b0e041e820_Favicon_Tao.png',
  heroSpa: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/6890d6745cc734423847d58b_9ae3166a-4496-49f1-9d77-c97f40759bdb.avif',
  heroMassage: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5370c877743c4a7999300_Estela-byaylin-3.jpg',
  taoBasis: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5371146ec6241e81774b7_Estela-byaylin-52-min.jpg',
  qiGongIntro: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c53713513520b6bbe5b786_Estela-byaylin-33-min.jpg',
  medQiGong: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c53718065ce01562873ef1_Estela-byaylin-43.jpg',
  chiBehandlung: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5371f98928ab373b92ff9_Estela-byaylin-59-min.jpg',
  chiAusbildung: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c537205b0c2bd091d7b6a5_Estela-byaylin-58-min.jpg',
  psycho: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/689c709e31ebcac5995a9622_a9db9b1a-d5b1-4270-a1b0-8044de34b697.avif',
  estela: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5370f3e66ed943079d4c6_Estela-byaylin-26-min.jpg',
  whatsapp: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/689c835a8e0044c154a36077_WhatsApp.svg.webp',
  psychoRelax: 'https://cdn.prod.website-files.com/image-generation-assets/c79b83fd-d5a5-46a1-8aa0-b49f43616c5e.avif',
  ctaBackground: 'https://cdn.prod.website-files.com/image-generation-assets/ee125b47-41aa-4ec5-a593-18b12a1fca27.avif',
};

// ============================================
// 4. MAIN EXECUTION
// ============================================

function main() {
  Logger.log('STORYBLOK MIGRATION v3.1 STARTING...\n');
  Logger.log('Space ID: ' + CONFIG.STORYBLOK_SPACE_ID);
  Logger.log('Preview URL: ' + CONFIG.PREVIEW_URL + '\n');
  
  // Reset caches
  componentCache = null;
  folderIdCache = {};
  
  try {
    // Step 1: Create all Components/Blocks
    Logger.log('Step 1/6: Creating Components...');
    createAllComponents();
    Logger.log('   Done.\n');
    
    // Step 2: Create Folder Structure
    Logger.log('Step 2/6: Creating Folder Structure (DE/EN/ES)...');
    createFolders();
    Logger.log('   Done.\n');
    
    // Step 3: Cache Assets
    Logger.log('Step 3/6: Caching Assets...');
    uploadAllAssets();
    Logger.log('   Done.\n');
    
    // Step 4: Create Global Content
    Logger.log('Step 4/6: Creating Global Content (Navbar/Footer)...');
    createGlobalContent();
    Logger.log('   Done.\n');
    
    // Step 5: Create All Pages
    Logger.log('Step 5/6: Creating All Pages (DE/EN/ES)...');
    createAllStories();
    Logger.log('   Done.\n');
    
    // Step 6: Configure Preview URLs
    Logger.log('Step 6/6: Configuring Preview URLs...');
    configurePreviewUrls();
    Logger.log('   Done.\n');
    
    Logger.log('=======================================');
    Logger.log('MIGRATION COMPLETE!');
    Logger.log('=======================================');
    Logger.log('\nNEXT STEPS:');
    Logger.log('1. Go to Storyblok Dashboard');
    Logger.log('2. Check Content > Stories');
    Logger.log('3. Verify all DE/EN/ES folders exist');
    Logger.log('4. Test Preview in Visual Editor');
    
  } catch (e) {
    Logger.log('\nERROR: ' + e.message);
    Logger.log('Stack: ' + e.stack);
    throw e;
  }
}

// ============================================
// 5. HELPER FUNCTIONS
// ============================================

function makeRequest(endpoint, method, payload) {
  method = method || 'GET';
  var options = {
    method: method,
    headers: HEADERS,
    muteHttpExceptions: true
  };
  
  if (payload) {
    options.payload = JSON.stringify(payload);
  }
  
  var response = UrlFetchApp.fetch(BASE_URL + endpoint, options);
  var code = response.getResponseCode();
  
  if (code >= 400) {
    var error = response.getContentText();
    Logger.log('API Error ' + code + ': ' + error);
    throw new Error('API Error ' + code + ': ' + error);
  }
  
  var text = response.getContentText();
  return text ? JSON.parse(text) : null;
}

function componentExists(name) {
  try {
    if (!componentCache) {
      var response = makeRequest('/components');
      componentCache = response.components || [];
    }
    return componentCache.some(function(c) { return c.name === name; });
  } catch (e) {
    return false;
  }
}

function createComponent(data) {
  if (!componentExists(data.component.name)) {
    Logger.log('   Creating component: ' + data.component.name);
    var result = makeRequest('/components', 'POST', data);
    if (componentCache && result && result.component) {
      componentCache.push(result.component);
    }
    Utilities.sleep(500);
  } else {
    Logger.log('   Skipping existing: ' + data.component.name);
  }
}

function getStory(slug) {
  try {
    var response = makeRequest('/stories?by_slugs=' + slug);
    return response.stories && response.stories.length > 0 ? response.stories[0] : null;
  } catch (e) {
    return null;
  }
}

function createStory(data) {
  var slug = data.story.full_slug || data.story.slug;
  if (!getStory(slug)) {
    Logger.log('   Creating story: ' + slug);
    makeRequest('/stories', 'POST', data);
    Utilities.sleep(500);
  } else {
    Logger.log('   Skipping existing: ' + slug);
  }
}

function getFolderId(lang) {
  if (folderIdCache[lang]) {
    return folderIdCache[lang];
  }
  var folder = getStory(lang);
  var id = folder ? folder.id : 0;
  folderIdCache[lang] = id;
  return id;
}

function uid() {
  return Utilities.getUuid();
}

function getAsset(key) {
  return assetCache[key] || { filename: ASSETS[key] || '', alt: key };
}

// ============================================
// 6. CREATE COMPONENTS (NESTED FIRST, THEN ROOT)
// ============================================
function createAllComponents() {
  Logger.log('   -> Creating nested components first...');
  
  createComponent({
    component: {
      name: 'nav_link',
      display_name: 'Navigation Link',
      is_nestable: true,
      schema: {
        label: { type: 'text', required: true },
        link: { type: 'multilink', required: true }
      }
    }
  });
  
  createComponent({
    component: {
      name: 'detail_card',
      display_name: 'Detail Card',
      is_nestable: true,
      schema: {
        eyebrow: { type: 'text' },
        title: { type: 'text', required: true },
        description: { type: 'textarea', required: true },
        image: { type: 'asset', filetypes: ['images'] },
        button_text_1: { type: 'text' },
        button_link_1: { type: 'multilink' },
        button_text_2: { type: 'text' },
        button_link_2: { type: 'multilink' },
        image_left: { type: 'boolean', default_value: false }
      }
    }
  });
  
  createComponent({
    component: {
      name: 'angebot_card',
      display_name: 'Angebot Card',
      is_nestable: true,
      schema: {
        price: { type: 'text', required: true },
        price_note: { type: 'text' },
        title: { type: 'text', required: true },
        description: { type: 'textarea', required: true },
        features: { type: 'textarea' },
        phone: { type: 'text' },
        email: { type: 'text' },
        wide: { type: 'boolean', default_value: false }
      }
    }
  });
  
  createComponent({
    component: {
      name: 'faq_item',
      display_name: 'FAQ Item',
      is_nestable: true,
      schema: {
        question: { type: 'text', required: true },
        answer: { type: 'textarea', required: true }
      }
    }
  });
  
  createComponent({
    component: {
      name: 'testimonial_item',
      display_name: 'Testimonial',
      is_nestable: true,
      schema: {
        author: { type: 'text', required: true },
        text: { type: 'textarea', required: true },
        rating: { type: 'number', default_value: 5 }
      }
    }
  });
  
  createComponent({
    component: {
      name: 'feature_item',
      display_name: 'Feature Item',
      is_nestable: true,
      schema: {
        text: { type: 'textarea', required: true }
      }
    }
  });
  
  Logger.log('   -> Now creating root components...');
  
  createComponent({
    component: {
      name: 'global',
      display_name: 'Global Settings',
      is_root: true,
      schema: {
        logo: { type: 'asset', filetypes: ['images'], required: true },
        logo_white: { type: 'asset', filetypes: ['images'] },
        navbar_links: {
          type: 'bloks',
          restrict_components: true,
          component_whitelist: ['nav_link']
        },
        footer_description: { type: 'textarea' },
        footer_email_1: { type: 'text' },
        footer_email_2: { type: 'text' },
        footer_instagram_url: { type: 'text' },
        footer_copyright: { type: 'text' },
        whatsapp_number: { type: 'text' },
        contact_phone: { type: 'text' },
        contact_email: { type: 'text' }
      }
    }
  });
  
  createComponent({
    component: {
      name: 'page_home',
      display_name: 'Page: Home',
      is_root: true,
      schema: {
        seo_title: { type: 'text' },
        seo_description: { type: 'textarea' },
        seo_keywords: { type: 'text' },
        seo_image: { type: 'asset', filetypes: ['images'] },
        hero_title: { type: 'text', required: true },
        hero_subtitle: { type: 'textarea' },
        hero_image_1: { type: 'asset', filetypes: ['images'] },
        hero_image_2: { type: 'asset', filetypes: ['images'] },
        hero_button_1_text: { type: 'text' },
        hero_button_1_link: { type: 'text' },
        hero_button_2_text: { type: 'text' },
        hero_button_2_link: { type: 'text' },
        details_sections: {
          type: 'bloks',
          restrict_components: true,
          component_whitelist: ['detail_card']
        },
        angebote_title: { type: 'text' },
        angebote_cards: {
          type: 'bloks',
          restrict_components: true,
          component_whitelist: ['angebot_card']
        },
        personal_title: { type: 'text' },
        personal_features: {
          type: 'bloks',
          restrict_components: true,
          component_whitelist: ['feature_item']
        },
        personal_button_text: { type: 'text' },
        personal_button_link: { type: 'multilink' },
        psycho_title: { type: 'text' },
        psycho_description: { type: 'textarea' },
        psycho_image: { type: 'asset', filetypes: ['images'] },
        psycho_button_text: { type: 'text' },
        psycho_button_link: { type: 'multilink' },
        faq_title: { type: 'text' },
        faq_subtitle: { type: 'textarea' },
        faq_items: {
          type: 'bloks',
          restrict_components: true,
          component_whitelist: ['faq_item']
        },
        testimonials_eyebrow: { type: 'text' },
        testimonials_title: { type: 'text' },
        testimonials_subtitle: { type: 'textarea' },
        testimonials_items: {
          type: 'bloks',
          restrict_components: true,
          component_whitelist: ['testimonial_item']
        },
        cta_title: { type: 'text' },
        cta_description: { type: 'textarea' },
        cta_background: { type: 'asset', filetypes: ['images'] },
        cta_buttons: { type: 'textarea' }
      }
    }
  });
  
  createComponent({
    component: {
      name: 'page_about',
      display_name: 'Page: About',
      is_root: true,
      schema: {
        seo_title: { type: 'text' },
        seo_description: { type: 'textarea' },
        title: { type: 'text', required: true },
        subtitle: { type: 'textarea' },
        image: { type: 'asset', filetypes: ['images'] },
        content_html: { type: 'textarea' }
      }
    }
  });
  
  createComponent({
    component: {
      name: 'page_service',
      display_name: 'Page: Service',
      is_root: true,
      schema: {
        seo_title: { type: 'text' },
        seo_description: { type: 'textarea' },
        hero_title: { type: 'text', required: true },
        hero_subtitle: { type: 'textarea' },
        hero_image: { type: 'asset', filetypes: ['images'] },
        content_html: { type: 'textarea' },
        sidebar_info: { type: 'textarea' }
      }
    }
  });
  
  createComponent({
    component: {
      name: 'page_kontakt',
      display_name: 'Page: Kontakt',
      is_root: true,
      schema: {
        seo_title: { type: 'text' },
        seo_description: { type: 'textarea' },
        title: { type: 'text', required: true },
        subtitle: { type: 'textarea' },
        address_html: { type: 'textarea' },
        phone: { type: 'text' },
        email: { type: 'text' },
        whatsapp: { type: 'text' },
        map_embed: { type: 'textarea' }
      }
    }
  });
}

// ============================================
// 7. CREATE FOLDER STRUCTURE
// ============================================
function createFolders() {
  var languages = ['de', 'en', 'es'];
  
  languages.forEach(function(lang) {
    if (!getStory(lang)) {
      Logger.log('   Creating folder: ' + lang.toUpperCase());
      makeRequest('/stories', 'POST', {
        story: {
          name: lang.toUpperCase(),
          slug: lang,
          is_folder: true,
          parent_id: 0
        }
      });
      Utilities.sleep(500);
    } else {
      Logger.log('   Folder exists: ' + lang.toUpperCase());
    }
  });
}

// ============================================
// 8. CACHE ASSETS
// ============================================
function uploadAllAssets() {
  Object.keys(ASSETS).forEach(function(key) {
    assetCache[key] = {
      filename: ASSETS[key],
      alt: key,
      title: key
    };
  });
  Logger.log('   ' + Object.keys(assetCache).length + ' assets cached');
}

// ============================================
// 9. CREATE GLOBAL CONTENT
// ============================================
function createGlobalContent() {
  var languages = [
    { code: 'de', name: 'Deutsch' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Espanol' }
  ];
  
  languages.forEach(function(lang) {
    createStory({
      story: {
        name: 'Global ' + lang.name,
        slug: 'global',
        parent_id: getFolderId(lang.code),
        content: getGlobalData(lang.code)
      },
      publish: 1
    });
  });
}

function getGlobalData(lang) {
  var navLinks = {
    de: [
      { _uid: uid(), component: 'nav_link', label: 'Startseite', link: { linktype: 'story', cached_url: 'de/home' }},
      { _uid: uid(), component: 'nav_link', label: 'Ueber mich', link: { linktype: 'story', cached_url: 'de/about' }},
      { _uid: uid(), component: 'nav_link', label: 'Kontakt', link: { linktype: 'story', cached_url: 'de/kontakt' }}
    ],
    en: [
      { _uid: uid(), component: 'nav_link', label: 'Home', link: { linktype: 'story', cached_url: 'en/home' }},
      { _uid: uid(), component: 'nav_link', label: 'About', link: { linktype: 'story', cached_url: 'en/about' }},
      { _uid: uid(), component: 'nav_link', label: 'Contact', link: { linktype: 'story', cached_url: 'en/kontakt' }}
    ],
    es: [
      { _uid: uid(), component: 'nav_link', label: 'Inicio', link: { linktype: 'story', cached_url: 'es/home' }},
      { _uid: uid(), component: 'nav_link', label: 'Sobre mi', link: { linktype: 'story', cached_url: 'es/about' }},
      { _uid: uid(), component: 'nav_link', label: 'Contacto', link: { linktype: 'story', cached_url: 'es/kontakt' }}
    ]
  };
  
  var footer = {
    de: {
      desc: 'Raum fuer Achtsamkeit & Balance',
      copyright: '2026 Taoyin Zentrum Ingolstadt. Alle Rechte vorbehalten.'
    },
    en: {
      desc: 'Space for Mindfulness & Balance',
      copyright: '2026 Taoyin Center Ingolstadt. All rights reserved.'
    },
    es: {
      desc: 'Espacio para la Atencion Plena y el Equilibrio',
      copyright: '2026 Centro Taoyin Ingolstadt. Todos los derechos reservados.'
    }
  };
  
  return {
    component: 'global',
    logo: getAsset('logo'),
    logo_white: getAsset('logoWhite'),
    navbar_links: navLinks[lang],
    footer_description: footer[lang].desc,
    footer_email_1: 'info@taoyin-zentrum.de',
    footer_email_2: 'info@estela-fuchs.com',
    footer_instagram_url: 'https://www.instagram.com/taoyin_zentrum/',
    footer_copyright: footer[lang].copyright,
    whatsapp_number: '+4915115539416',
    contact_phone: '+4915115539416',
    contact_email: 'info@taoyin-zentrum.de'
  };
}

// ============================================
// 10. CREATE ALL STORIES/PAGES
// ============================================
function createAllStories() {
  var languages = ['de', 'en', 'es'];
  
  languages.forEach(function(lang) {
    Logger.log('   Creating stories for: ' + lang.toUpperCase());
    createHomeStory(lang);
    createAboutStory(lang);
    createKontaktStory(lang);
    createTaoYinStory(lang);
    createQiGongStory(lang);
    createChiNeiTsangStory(lang);
    createPsychotherapieStory(lang);
  });
}

// HOME PAGE
function createHomeStory(lang) {
  createStory({
    story: {
      name: 'Home ' + lang.toUpperCase(),
      slug: 'home',
      parent_id: getFolderId(lang),
      content: getHomeContent(lang),
      is_startpage: true
    },
    publish: 1
  });
}

function getHomeContent(lang) {
  var content = {
    de: {
      seo_title: 'Taoyin Zentrum Ingolstadt - Heilung, Balance & Energie',
      seo_description: 'Dein Zentrum fuer Qi Gong, Tao Yin, Chi Nei Tsang & Psychotherapie in Ingolstadt. Fuer mehr innere Ruhe, Vitalitaet und Lebensbalance.',
      hero_title: 'Willkommen im Taoyin Zentrum Ingolstadt',
      hero_subtitle: 'Willkommen in deinem Raum fuer Achtsamkeit, Heilung und innere Balance. Entdecke sanfte taoistische Praktiken, die Koerper, Geist und Seele verbinden - fuer mehr Energie, Gelassenheit und Wohlbefinden im Alltag.',
      angebote_title: 'Meine Angebote fuer dich',
      personal_title: 'Mein persoenliches Angebot - das Besondere bei TaoBasis',
      psycho_title: 'Ganzheitliche Psychotherapie',
      psycho_desc: 'Ich arbeite mit klassischen Verfahren wie Entspannungstechniken und Verhaltenstherapie sowie mit alternativen Methoden aus den Bereichen der Meditation, des Qigong, des Tai Chi und der Ernaehrung nach den 5 Elementen.',
      faq_title: 'Raum fuer Achtsamkeit & Balance',
      faq_subtitle: 'Antworten auf haeufige Fragen zu unseren taoistischen Angeboten, Methoden und deinem Weg zu mehr Wohlbefinden.',
      testimonials_eyebrow: 'Erfahrungen aus unserer Gemeinschaft',
      testimonials_title: 'Stimmen, die beruehren',
      testimonials_subtitle: 'Unsere Teilnehmer*innen teilen, wie die taoistischen Praktiken ihr Leben bereichern - mit mehr Ruhe, innerer Balance und neuer Lebensenergie.',
      cta_title: 'Finde deine Mitte. Spuere dein Chi.',
      cta_desc: 'Tauche ein in einen Raum fuer Achtsamkeit, Heilung und innere Balance. Entdecke sanfte taoistische Praktiken, die Koerper, Geist und Seele verbinden.'
    },
    en: {
      seo_title: 'Taoyin Center Ingolstadt - Healing, Balance & Energy',
      seo_description: 'Your center for Qi Gong, Tao Yin, Chi Nei Tsang & Psychotherapy in Ingolstadt. For more inner peace, vitality and life balance.',
      hero_title: 'Welcome to Taoyin Center Ingolstadt',
      hero_subtitle: 'Welcome to your space for mindfulness, healing and inner balance. Discover gentle Taoist practices that connect body, mind and soul - for more energy, serenity and well-being in everyday life.',
      angebote_title: 'My Services for You',
      personal_title: 'My Personal Offer - What Makes TaoBasis Special',
      psycho_title: 'Holistic Psychotherapy',
      psycho_desc: 'I work with classical methods such as relaxation techniques and behavioral therapy as well as alternative methods from the areas of meditation, Qigong, Tai Chi and nutrition according to the 5 elements.',
      faq_title: 'Space for Mindfulness & Balance',
      faq_subtitle: 'Answers to frequently asked questions about our Taoist offerings, methods and your path to more well-being.',
      testimonials_eyebrow: 'Experiences from our community',
      testimonials_title: 'Voices that Touch',
      testimonials_subtitle: 'Our participants share how Taoist practices enrich their lives - with more peace, inner balance and new life energy.',
      cta_title: 'Find your center. Feel your Chi.',
      cta_desc: 'Immerse yourself in a space for mindfulness, healing and inner balance. Discover gentle Taoist practices that connect body, mind and soul.'
    },
    es: {
      seo_title: 'Centro Taoyin Ingolstadt - Curacion, Equilibrio y Energia',
      seo_description: 'Tu centro para Qi Gong, Tao Yin, Chi Nei Tsang y Psicoterapia en Ingolstadt. Para mas paz interior, vitalidad y equilibrio vital.',
      hero_title: 'Bienvenido al Centro Taoyin Ingolstadt',
      hero_subtitle: 'Bienvenido a tu espacio para la atencion plena, la curacion y el equilibrio interior. Descubre practicas taoistas suaves que conectan cuerpo, mente y alma.',
      angebote_title: 'Mis Servicios para Ti',
      personal_title: 'Mi Oferta Personal - Lo Especial de TaoBasis',
      psycho_title: 'Psicoterapia Holistica',
      psycho_desc: 'Trabajo con metodos clasicos como tecnicas de relajacion y terapia conductual, asi como con metodos alternativos de las areas de meditacion, Qigong, Tai Chi y nutricion segun los 5 elementos.',
      faq_title: 'Espacio para la Atencion Plena y el Equilibrio',
      faq_subtitle: 'Respuestas a preguntas frecuentes sobre nuestras ofertas taoistas, metodos y tu camino hacia mas bienestar.',
      testimonials_eyebrow: 'Experiencias de nuestra comunidad',
      testimonials_title: 'Voces que Conmueven',
      testimonials_subtitle: 'Nuestros participantes comparten como las practicas taoistas enriquecen sus vidas: con mas paz, equilibrio interior y nueva energia vital.',
      cta_title: 'Encuentra tu centro. Siente tu Chi.',
      cta_desc: 'Sumergete en un espacio para la atencion plena, la curacion y el equilibrio interior. Descubre practicas taoistas suaves que conectan cuerpo, mente y alma.'
    }
  };
  
  var t = content[lang];
  
  var detailCards = [
    {
      _uid: uid(),
      component: 'detail_card',
      eyebrow: lang === 'de' ? 'Ganzheitlich. Achtsam. Verbunden.' : lang === 'en' ? 'Holistic. Mindful. Connected.' : 'Holistico. Consciente. Conectado.',
      title: 'Tao Basis',
      description: lang === 'de' ? 'TaoBasis - Qi Gong Kurse & Chi Nei Tsang Bauchmassage. Finden Sie Ruhe, Energie & innere Balance.' : lang === 'en' ? 'TaoBasis - Qi Gong courses & Chi Nei Tsang abdominal massage. Find peace, energy & inner balance.' : 'TaoBasis - Cursos de Qi Gong y masaje abdominal Chi Nei Tsang. Encuentra paz, energia y equilibrio interior.',
      image: getAsset('taoBasis'),
      button_text_1: lang === 'de' ? 'Mehr erfahren ueber Tao Yin' : lang === 'en' ? 'Learn more about Tao Yin' : 'Mas informacion sobre Tao Yin',
      button_link_1: { linktype: 'story', cached_url: lang + '/taoyin' }
    },
    {
      _uid: uid(),
      component: 'detail_card',
      eyebrow: 'Tao Yin & Qigong',
      title: lang === 'de' ? 'Einfuehrung in Qi Gong' : lang === 'en' ? 'Introduction to Qi Gong' : 'Introduccion al Qi Gong',
      description: lang === 'de' ? 'Qi Gong Kurs fuer Anfaenger: Lernen Sie sanfte Uebungen, Atemtechniken & Energiearbeit fuer Vitalitaet, Entspannung & mehr Lebensbalance.' : lang === 'en' ? 'Qi Gong course for beginners: Learn gentle exercises, breathing techniques & energy work for vitality, relaxation & more life balance.' : 'Curso de Qi Gong para principiantes: Aprende ejercicios suaves, tecnicas de respiracion y trabajo energetico para vitalidad, relajacion y mas equilibrio vital.',
      image: getAsset('qiGongIntro'),
      button_text_1: lang === 'de' ? 'Mehr erfahren ueber Qi Gong' : lang === 'en' ? 'Learn more about Qi Gong' : 'Mas informacion sobre Qi Gong',
      button_link_1: { linktype: 'story', cached_url: lang + '/qi-gong' }
    },
    {
      _uid: uid(),
      component: 'detail_card',
      eyebrow: 'Chi Nei Tsang',
      title: lang === 'de' ? 'Chi Nei Tsang Behandlung' : lang === 'en' ? 'Chi Nei Tsang Treatment' : 'Tratamiento Chi Nei Tsang',
      description: lang === 'de' ? 'Chi Nei Tsang Bauchmassage: loesen Sie Blockaden, aktivieren Sie Selbstheilung & erleben Sie tiefe Entspannung fuer Koerper & Seele.' : lang === 'en' ? 'Chi Nei Tsang abdominal massage: release blockages, activate self-healing & experience deep relaxation for body & soul.' : 'Masaje abdominal Chi Nei Tsang: libera bloqueos, activa la autocuracion y experimenta una relajacion profunda para cuerpo y alma.',
      image: getAsset('chiBehandlung'),
      button_text_1: lang === 'de' ? 'Mehr erfahren' : lang === 'en' ? 'Learn more' : 'Mas informacion',
      button_link_1: { linktype: 'story', cached_url: lang + '/chi-nei-tsang' }
    }
  ];
  
  var angeboteCards = [
    {
      _uid: uid(),
      component: 'angebot_card',
      price: '280 EUR',
      price_note: lang === 'de' ? '(3,5 - 4 Std.)' : lang === 'en' ? '(3.5 - 4 hrs)' : '(3,5 - 4 horas)',
      title: lang === 'de' ? 'Tao Basis (Einfuehrung)' : lang === 'en' ? 'Tao Basis (Introduction)' : 'Tao Basis (Introduccion)',
      description: lang === 'de' ? 'TaoBasis - Qi Gong Kurse & Chi Nei Tsang Bauchmassage. Finden Sie Ruhe, Energie & innere Balance.' : lang === 'en' ? 'TaoBasis - Qi Gong courses & Chi Nei Tsang abdominal massage. Find peace, energy & inner balance.' : 'TaoBasis - Cursos de Qi Gong y masaje abdominal Chi Nei Tsang. Encuentra paz, energia y equilibrio interior.',
      features: lang === 'de' ? 'Tao Grundlagen\nEinsteigerkurs Qi Gong\nGrundlagen der Chi Nei Tsang Massage' : lang === 'en' ? 'Tao Basics\nQi Gong Beginner Course\nChi Nei Tsang Massage Basics' : 'Fundamentos del Tao\nCurso de Qi Gong para principiantes\nFundamentos del masaje Chi Nei Tsang',
      phone: '+4915115539416',
      email: 'info@taoyin-zentrum.de'
    },
    {
      _uid: uid(),
      component: 'angebot_card',
      price: '150 EUR',
      price_note: lang === 'de' ? '(Zehnerkarte)' : lang === 'en' ? '(10-session card)' : '(Tarjeta de 10 sesiones)',
      title: lang === 'de' ? 'Medizinisches Qi Gong' : lang === 'en' ? 'Medical Qi Gong' : 'Qi Gong Medico',
      description: lang === 'de' ? 'Dreimal pro Woche treffen wir uns zur gemeinsamen Uebungsstunde. Regelmaessiges Qi Gong wirkt wie Medizin fuer Koerper und Geist.' : lang === 'en' ? 'We meet three times a week for joint practice sessions. Regular Qi Gong works like medicine for body and mind.' : 'Nos reunimos tres veces por semana para sesiones de practica conjunta. El Qi Gong regular actua como medicina para el cuerpo y la mente.',
      features: lang === 'de' ? 'Staerkung des Immunsystems\nVerbesserung von Haltung und Beweglichkeit\nReduzierung von Stress, Muedigkeit und Schmerzen\nmehr Energie im Alltag' : lang === 'en' ? 'Strengthening the immune system\nImproving posture and mobility\nReducing stress, fatigue and pain\nMore energy in everyday life' : 'Fortalecimiento del sistema inmunologico\nMejora de la postura y la movilidad\nReduccion del estres, la fatiga y el dolor\nMas energia en la vida cotidiana',
      phone: '+4915115539416',
      email: 'info@taoyin-zentrum.de'
    }
  ];
  
  var personalFeatures = [
    {
      _uid: uid(),
      component: 'feature_item',
      text: lang === 'de' ? 'Individuelle Abstimmung: Ich gehe auf die Beduerfnisse jedes einzelnen Menschen ein - kein Schema F, sondern eine Begleitung, die wirklich passt.' : lang === 'en' ? 'Individual Adaptation: I respond to the needs of each individual - no one size fits all, but support that really fits.' : 'Adaptacion Individual: Respondo a las necesidades de cada individuo, sin talla unica, sino un acompanamiento que realmente se ajusta.'
    },
    {
      _uid: uid(),
      component: 'feature_item',
      text: lang === 'de' ? 'Ganzheitliche Verbindung: Die Kombination von Qi Gong und Chi Nei Tsang verstaerkt die Wirkung und schafft nachhaltige Heilimpulse.' : lang === 'en' ? 'Holistic Connection: The combination of Qi Gong and Chi Nei Tsang enhances the effect and creates sustainable healing impulses.' : 'Conexion Holistica: La combinacion de Qi Gong y Chi Nei Tsang potencia el efecto y crea impulsos de curacion sostenibles.'
    }
  ];
  
  var faqItems = [
    {
      _uid: uid(),
      component: 'faq_item',
      question: lang === 'de' ? 'Was ist Tao Yin und wie wirkt es?' : lang === 'en' ? 'What is Tao Yin and how does it work?' : 'Que es Tao Yin y como funciona?',
      answer: lang === 'de' ? 'Tao Yin verbindet sanfte Bewegung, Atmung und innere Praesenz. Die Praxis staerkt deine Wirbelsaeule, loest Verspannungen und bringt deine Lebensenergie (Chi) in Fluss. Du findest so zu mehr Ruhe, Flexibilitaet und innerer Balance.' : lang === 'en' ? 'Tao Yin combines gentle movement, breathing and inner presence. The practice strengthens your spine, releases tension and brings your life energy (Chi) into flow. This way you find more peace, flexibility and inner balance.' : 'Tao Yin combina movimiento suave, respiracion y presencia interior. La practica fortalece tu columna vertebral, libera tensiones y pone en flujo tu energia vital (Chi). Asi encuentras mas paz, flexibilidad y equilibrio interior.'
    },
    {
      _uid: uid(),
      component: 'faq_item',
      question: lang === 'de' ? 'Fuer wen sind die Kurse geeignet?' : lang === 'en' ? 'Who are the courses suitable for?' : 'Para quien son adecuados los cursos?',
      answer: lang === 'de' ? 'Unsere Angebote richten sich an alle - egal ob Anfaenger, Fortgeschrittene, jung oder alt. Besonders profitieren Menschen mit Stress, Rueckenschmerzen oder dem Wunsch nach mehr innerer Ruhe und Selbstfuersorge.' : lang === 'en' ? 'Our offerings are aimed at everyone - whether beginner, advanced, young or old. People with stress, back pain or the desire for more inner peace and self-care benefit especially.' : 'Nuestras ofertas estan dirigidas a todos, ya sean principiantes, avanzados, jovenes o mayores. Las personas con estres, dolor de espalda o el deseo de mas paz interior y autocuidado se benefician especialmente.'
    }
  ];
  
  var testimonials = [
    {
      _uid: uid(),
      component: 'testimonial_item',
      author: 'D.L.',
      text: lang === 'de' ? 'Als ich Anfang des Jahres zu Estela kam, war ich am Ende meiner seelischen und koerperlichen Kraefte. Dank ihrer Erfahrung, ihres Know-Hows, ihrer Menschenkenntnis, ihres ganzen Wesens, hat sie mich aus meinem Loch wieder rausgeholt. Ich bin so dankbar Estela gefunden zu haben.' : lang === 'en' ? 'When I came to Estela at the beginning of the year, I was at the end of my mental and physical strength. Thanks to her experience, her know-how, her knowledge of people, her whole being, she pulled me out of my hole. I am so grateful to have found Estela.' : 'Cuando llegue a Estela a principios de ano, estaba al final de mis fuerzas mentales y fisicas. Gracias a su experiencia, su conocimiento, todo su ser, me saco de mi agujero. Estoy muy agradecido de haber encontrado a Estela.',
      rating: 5
    },
    {
      _uid: uid(),
      component: 'testimonial_item',
      author: 'Petra S.',
      text: lang === 'de' ? 'Als es mir richtig mies ging, hat mir Estela geholfen, wieder in die Kraft und in den Flow zu kommen. Hauptsaechlich mit ihrer unglaublich kraftvollen Chi Nei Tsang Massage. Estela ist mit ganzem Herzen dabei und beherrscht ihr Handwerk auf allen Ebenen.' : lang === 'en' ? 'When I was really down, Estela helped me get back into power and flow. Mainly with her incredibly powerful Chi Nei Tsang massage. Estela is in it with all her heart and masters her craft on all levels.' : 'Cuando estaba realmente mal, Estela me ayudo a recuperar el poder y el flujo. Principalmente con su increiblemente poderoso masaje Chi Nei Tsang. Estela esta en esto con todo su corazon y domina su oficio en todos los niveles.',
      rating: 5
    }
  ];
  
  return {
    component: 'page_home',
    seo_title: t.seo_title,
    seo_description: t.seo_description,
    hero_title: t.hero_title,
    hero_subtitle: t.hero_subtitle,
    hero_image_1: getAsset('heroSpa'),
    hero_image_2: getAsset('heroMassage'),
    hero_button_1_text: lang === 'de' ? 'Mehr erfahren' : lang === 'en' ? 'Learn more' : 'Mas informacion',
    hero_button_1_link: '#Details',
    hero_button_2_text: lang === 'de' ? 'Angebote entdecken' : lang === 'en' ? 'Discover services' : 'Descubrir servicios',
    hero_button_2_link: '#Angebote',
    details_sections: detailCards,
    angebote_title: t.angebote_title,
    angebote_cards: angeboteCards,
    personal_title: t.personal_title,
    personal_features: personalFeatures,
    personal_button_text: lang === 'de' ? 'Kontakt aufnehmen' : lang === 'en' ? 'Get in touch' : 'Contactar',
    personal_button_link: { linktype: 'story', cached_url: lang + '/kontakt' },
    psycho_title: t.psycho_title,
    psycho_description: t.psycho_desc,
    psycho_image: getAsset('psychoRelax'),
    psycho_button_text: lang === 'de' ? 'Mehr erfahren' : lang === 'en' ? 'Learn more' : 'Mas informacion',
    psycho_button_link: { linktype: 'story', cached_url: lang + '/psychotherapie' },
    faq_title: t.faq_title,
    faq_subtitle: t.faq_subtitle,
    faq_items: faqItems,
    testimonials_eyebrow: t.testimonials_eyebrow,
    testimonials_title: t.testimonials_title,
    testimonials_subtitle: t.testimonials_subtitle,
    testimonials_items: testimonials,
    cta_title: t.cta_title,
    cta_description: t.cta_desc,
    cta_background: getAsset('ctaBackground'),
    cta_buttons: lang === 'de' ? 'Telefon|E-Mail|WhatsApp' : lang === 'en' ? 'Phone|Email|WhatsApp' : 'Telefono|Correo|WhatsApp'
  };
}

// ABOUT PAGE
function createAboutStory(lang) {
  createStory({
    story: {
      name: 'About ' + lang.toUpperCase(),
      slug: 'about',
      parent_id: getFolderId(lang),
      content: {
        component: 'page_about',
        seo_title: lang === 'de' ? 'Ueber mich - Estela Fuchs' : lang === 'en' ? 'About me - Estela Fuchs' : 'Sobre mi - Estela Fuchs',
        title: lang === 'de' ? 'Meine Geschichte' : lang === 'en' ? 'My Story' : 'Mi Historia',
        subtitle: lang === 'de' ? 'Nach einer langen Pause kehre ich mit neuer Kraft und Dankbarkeit zurueck.' : lang === 'en' ? 'After a long break, I return with new strength and gratitude.' : 'Despues de una larga pausa, regreso con nueva fuerza y gratitud.',
        image: getAsset('estela'),
        content_html: lang === 'de' ? '<p>Ein schwerer Bruch am Fussgelenk hat mich gezwungen, innezuhalten - und zugleich gezeigt, wie heilsam Qi Gong und taoistische Praktiken wirklich sind.</p><p>Sie haben mir geholfen, schneller zu regenerieren, wieder fest auf den Beinen zu stehen und tiefer in meine Praxis einzutauchen.</p><p>Seit ueber 30 Jahren uebe ich den Weg des Taoismus - heute mit noch mehr Ueberzeugung und dem Wunsch, diese Schaetze mit anderen zu teilen.</p>' : lang === 'en' ? '<p>A severe ankle fracture forced me to pause - and at the same time showed me how healing Qi Gong and Taoist practices really are.</p><p>They helped me recover faster, stand firmly on my feet again and dive deeper into my practice.</p><p>I have been practicing the Taoist path for over 30 years - today with even more conviction and the desire to share these treasures with others.</p>' : '<p>Una fractura severa de tobillo me obligo a hacer una pausa, y al mismo tiempo me mostro cuan sanadores son realmente el Qi Gong y las practicas taoistas.</p><p>Me ayudaron a recuperarme mas rapido, a volver a estar firme sobre mis pies y a profundizar en mi practica.</p><p>He estado practicando el camino taoista durante mas de 30 anos, hoy con aun mas conviccion y el deseo de compartir estos tesoros con otros.</p>'
      }
    },
    publish: 1
  });
}

// KONTAKT PAGE
function createKontaktStory(lang) {
  createStory({
    story: {
      name: 'Kontakt ' + lang.toUpperCase(),
      slug: 'kontakt',
      parent_id: getFolderId(lang),
      content: {
        component: 'page_kontakt',
        seo_title: lang === 'de' ? 'Kontakt & Anfahrt' : lang === 'en' ? 'Contact & Directions' : 'Contacto y Direcciones',
        title: lang === 'de' ? 'Kontakt aufnehmen' : lang === 'en' ? 'Get in Touch' : 'Contactar',
        subtitle: lang === 'de' ? 'Ich freue mich auf Ihre Nachricht!' : lang === 'en' ? 'I look forward to your message!' : 'Espero tu mensaje!',
        address_html: '<p><strong>Taoyin Zentrum Ingolstadt</strong><br/>Ingolstadt, Deutschland</p>',
        phone: '+4915115539416',
        email: 'info@taoyin-zentrum.de',
        whatsapp: '+4915115539416',
        map_embed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.1!2d11.4!3d48.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDQyJzAwLjAiTiAxMcKwMjQnMDAuMCJF!5e0!3m2!1sde!2sde!4v1234567890123!5m2!1sde!2sde" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
      }
    },
    publish: 1
  });
}

// SERVICE PAGES
function createTaoYinStory(lang) {
  createStory({
    story: {
      name: 'Tao Yin ' + lang.toUpperCase(),
      slug: 'taoyin',
      parent_id: getFolderId(lang),
      content: {
        component: 'page_service',
        seo_title: lang === 'de' ? 'Tao Yin - Sanfte Bewegung, tiefe Entspannung' : lang === 'en' ? 'Tao Yin - Gentle Movement, Deep Relaxation' : 'Tao Yin - Movimiento Suave, Relajacion Profunda',
        hero_title: 'Tao Yin',
        hero_subtitle: lang === 'de' ? 'Sanfte Bewegung, tiefe Entspannung.' : lang === 'en' ? 'Gentle movement, deep relaxation.' : 'Movimiento suave, relajacion profunda.',
        hero_image: getAsset('taoBasis'),
        content_html: lang === 'de' ? '<p>Tao Yin ist eine sanfte, meditative Praxis, die Bewegung, Atmung und innere Achtsamkeit verbindet.</p><p>Die fliessenden Uebungen staerken die Wirbelsaeule, loesen Verspannungen und bringen deine Lebensenergie (Chi) in Fluss.</p>' : lang === 'en' ? '<p>Tao Yin is a gentle, meditative practice that combines movement, breathing and inner mindfulness.</p><p>The flowing exercises strengthen the spine, release tension and bring your life energy (Chi) into flow.</p>' : '<p>Tao Yin es una practica suave y meditativa que combina movimiento, respiracion y atencion interior.</p><p>Los ejercicios fluidos fortalecen la columna vertebral, liberan tensiones y ponen en flujo tu energia vital (Chi).</p>'
      }
    },
    publish: 1
  });
}

function createQiGongStory(lang) {
  createStory({
    story: {
      name: 'Qi Gong ' + lang.toUpperCase(),
      slug: 'qi-gong',
      parent_id: getFolderId(lang),
      content: {
        component: 'page_service',
        seo_title: lang === 'de' ? 'Qi Gong - Lebensenergie staerken, Balance finden' : lang === 'en' ? 'Qi Gong - Strengthen Life Energy, Find Balance' : 'Qi Gong - Fortalecer la Energia Vital, Encontrar Equilibrio',
        hero_title: 'Qi Gong',
        hero_subtitle: lang === 'de' ? 'Lebensenergie staerken, Balance finden.' : lang === 'en' ? 'Strengthen life energy, find balance.' : 'Fortalecer la energia vital, encontrar equilibrio.',
        hero_image: getAsset('qiGongIntro'),
        content_html: lang === 'de' ? '<p>Qi Gong ist eine alte chinesische Praxis zur Kultivierung der Lebensenergie (Qi).</p><p>Durch sanfte Bewegungen, Atemtechniken und Meditation staerken Sie Ihr Immunsystem, verbessern Ihre Haltung und finden mehr innere Ruhe.</p>' : lang === 'en' ? '<p>Qi Gong is an ancient Chinese practice for cultivating life energy (Qi).</p><p>Through gentle movements, breathing techniques and meditation, you strengthen your immune system, improve your posture and find more inner peace.</p>' : '<p>Qi Gong es una antigua practica china para cultivar la energia vital (Qi).</p><p>A traves de movimientos suaves, tecnicas de respiracion y meditacion, fortaleces tu sistema inmunologico, mejoras tu postura y encuentras mas paz interior.</p>'
      }
    },
    publish: 1
  });
}

function createChiNeiTsangStory(lang) {
  createStory({
    story: {
      name: 'Chi Nei Tsang ' + lang.toUpperCase(),
      slug: 'chi-nei-tsang',
      parent_id: getFolderId(lang),
      content: {
        component: 'page_service',
        seo_title: lang === 'de' ? 'Chi Nei Tsang - Bauchmassage fuer innere Harmonie' : lang === 'en' ? 'Chi Nei Tsang - Abdominal Massage for Inner Harmony' : 'Chi Nei Tsang - Masaje Abdominal para Armonia Interior',
        hero_title: 'Chi Nei Tsang',
        hero_subtitle: lang === 'de' ? 'Bauchmassage fuer innere Harmonie.' : lang === 'en' ? 'Abdominal massage for inner harmony.' : 'Masaje abdominal para armonia interior.',
        hero_image: getAsset('chiBehandlung'),
        content_html: lang === 'de' ? '<p>Chi Nei Tsang ist eine tiefgehende Bauchmassage, die emotionale und energetische Blockaden loest.</p><p>Sie unterstuetzt die Verdauung, staerkt die Organe und hilft dir, dich mit deinem Zentrum zu verbinden.</p>' : lang === 'en' ? '<p>Chi Nei Tsang is a deep abdominal massage that releases emotional and energetic blockages.</p><p>It supports digestion, strengthens organs and helps you connect with your center.</p>' : '<p>Chi Nei Tsang es un masaje abdominal profundo que libera bloqueos emocionales y energeticos.</p><p>Apoya la digestion, fortalece los organos y te ayuda a conectarte con tu centro.</p>'
      }
    },
    publish: 1
  });
}

function createPsychotherapieStory(lang) {
  createStory({
    story: {
      name: 'Psychotherapie ' + lang.toUpperCase(),
      slug: 'psychotherapie',
      parent_id: getFolderId(lang),
      content: {
        component: 'page_service',
        seo_title: lang === 'de' ? 'Ganzheitliche Psychotherapie' : lang === 'en' ? 'Holistic Psychotherapy' : 'Psicoterapia Holistica',
        hero_title: lang === 'de' ? 'Ganzheitliche Psychotherapie' : lang === 'en' ? 'Holistic Psychotherapy' : 'Psicoterapia Holistica',
        hero_subtitle: lang === 'de' ? 'Lernen Sie die Kraft der Integration von Koerper, Geist und Seele fuer Sich zu nutzen.' : lang === 'en' ? 'Learn to harness the power of integrating body, mind and soul for yourself.' : 'Aprende a aprovechar el poder de integrar cuerpo, mente y alma para ti mismo.',
        hero_image: getAsset('psycho'),
        content_html: lang === 'de' ? '<p>Ich arbeite mit klassischen Verfahren wie Entspannungstechniken und Verhaltenstherapie sowie mit alternativen Methoden aus den Bereichen der Meditation, des Qigong, des Tai Chi und der Ernaehrung nach den 5 Elementen.</p>' : lang === 'en' ? '<p>I work with classical methods such as relaxation techniques and behavioral therapy as well as alternative methods from the areas of meditation, Qigong, Tai Chi and nutrition according to the 5 elements.</p>' : '<p>Trabajo con metodos clasicos como tecnicas de relajacion y terapia conductual, asi como con metodos alternativos de las areas de meditacion, Qigong, Tai Chi y nutricion segun los 5 elementos.</p>'
      }
    },
    publish: 1
  });
}

// ============================================
// 11. CONFIGURE PREVIEW URLS
// ============================================
function configurePreviewUrls() {
  try {
    // BASE_URL already = .../spaces/SPACE_ID, so endpoint is '' (empty)
    makeRequest('', 'PUT', {
      space: {
        domain: CONFIG.PREVIEW_URL.replace(/^https?:\/\//, '').replace(/\/$/, '')
      }
    });
    Logger.log('   Preview URL set: ' + CONFIG.PREVIEW_URL);
  } catch (e) {
    Logger.log('   Could not set preview URL (non-critical): ' + e.message);
    Logger.log('   -> Set it manually in Storyblok > Settings > Visual Editor');
  }
}

// ============================================
// 12. TEST & CLEANUP FUNCTIONS
// ============================================
function testConnection() {
  Logger.log('Testing Storyblok connection...');
  try {
    // BASE_URL already = .../spaces/SPACE_ID, so endpoint is '' (empty)
    var response = makeRequest('');
    Logger.log('Connection successful!');
    Logger.log('Space Name: ' + response.space.name);
    return true;
  } catch (e) {
    Logger.log('Connection failed: ' + e.message);
    return false;
  }
}

function cleanup() {
  Logger.log('CLEANUP: Deleting all stories and components...\n');
  
  componentCache = null;
  folderIdCache = {};
  
  try {
    Logger.log('Deleting all stories...');
    var storiesResponse = makeRequest('/stories?per_page=100');
    if (storiesResponse.stories) {
      var nonFolders = storiesResponse.stories.filter(function(s) { return !s.is_folder; });
      var folders = storiesResponse.stories.filter(function(s) { return s.is_folder; });
      
      nonFolders.forEach(function(story) {
        Logger.log('   Deleting story: ' + story.full_slug);
        makeRequest('/stories/' + story.id, 'DELETE');
        Utilities.sleep(300);
      });
      
      Logger.log('Deleting all folders...');
      var childFolders = folders.filter(function(s) { return s.parent_id !== 0; });
      var rootFolders = folders.filter(function(s) { return s.parent_id === 0; });
      
      childFolders.forEach(function(story) {
        Logger.log('   Deleting folder: ' + story.full_slug);
        makeRequest('/stories/' + story.id, 'DELETE');
        Utilities.sleep(300);
      });
      
      rootFolders.forEach(function(story) {
        Logger.log('   Deleting folder: ' + story.slug);
        makeRequest('/stories/' + story.id, 'DELETE');
        Utilities.sleep(300);
      });
    }
    
    Logger.log('Deleting all components...');
    var componentsResponse = makeRequest('/components');
    if (componentsResponse.components) {
      componentsResponse.components.forEach(function(comp) {
        try {
          Logger.log('   Deleting: ' + comp.name);
          makeRequest('/components/' + comp.id, 'DELETE');
          Utilities.sleep(300);
        } catch (e) {
          Logger.log('   Could not delete ' + comp.name + ' (might be default)');
        }
      });
    }
    
    Logger.log('\nCLEANUP COMPLETE! Now run main() to create everything fresh.');
    
  } catch (e) {
    Logger.log('\nCLEANUP ERROR: ' + e.message);
    throw e;
  }
}

function deleteAllComponents() {
  Logger.log('WARNING: Deleting all components!');
  try {
    var response = makeRequest('/components');
    response.components.forEach(function(comp) {
      Logger.log('   Deleting: ' + comp.name);
      makeRequest('/components/' + comp.id, 'DELETE');
      Utilities.sleep(300);
    });
    Logger.log('All components deleted');
  } catch (e) {
    Logger.log('Error: ' + e.message);
  }
}

function deleteAllStories() {
  Logger.log('WARNING: Deleting all stories!');
  try {
    var response = makeRequest('/stories');
    response.stories.forEach(function(story) {
      if (!story.is_folder) {
        Logger.log('   Deleting: ' + story.name);
        makeRequest('/stories/' + story.id, 'DELETE');
        Utilities.sleep(300);
      }
    });
    Logger.log('All stories deleted');
  } catch (e) {
    Logger.log('Error: ' + e.message);
  }
}
