/**
 * STORYBLOK AUTOMATIC SETUP SCRIPT
 * Taoyin Zentrum Ingolstadt
 * 
 * This Google Apps Script automatically sets up your Storyblok space with:
 * - All content types and their fields
 * - Folder structure (de/, en/, es/)
 * - All stories with content
 * - Assets upload and linking
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open https://script.google.com
 * 2. Create new project
 * 3. Copy this entire script
 * 4. Update CONFIG below with your credentials
 * 5. Run the 'main' function
 * 
 * EXECUTION TIME: ~5-10 minutes
 */

// ============================================================================
// CONFIGURATION - UPDATE THESE VALUES
// ============================================================================

const CONFIG = {
  STORYBLOK_SPACE_ID: 'YOUR_SPACE_ID_HERE',  // Get from Storyblok Settings → General
  STORYBLOK_MANAGEMENT_TOKEN: 'YOUR_MANAGEMENT_TOKEN_HERE',  // Get from Storyblok Settings → Access Tokens
  STORYBLOK_REGION: 'eu'  // 'eu' or 'us'
};

// ============================================================================
// GLOBAL VARIABLES
// ============================================================================

const BASE_URL = `https://mapi.storyblok.com/v1/spaces/${CONFIG.STORYBLOK_SPACE_ID}`;
const HEADERS = {
  'Authorization': CONFIG.STORYBLOK_MANAGEMENT_TOKEN,
  'Content-Type': 'application/json'
};

// ============================================================================
// MAIN EXECUTION FUNCTION
// ============================================================================

function main() {
  Logger.log('🚀 Starting Storyblok Setup for Taoyin Zentrum...');
  
  try {
    // Step 1: Create all component/content types
    Logger.log('\n📦 Step 1: Creating Content Types...');
    createAllComponents();
    
    // Step 2: Create folder structure
    Logger.log('\n📁 Step 2: Creating Folder Structure...');
    createFolderStructure();
    
    // Step 3: Create global content
    Logger.log('\n🌐 Step 3: Creating Global Content...');
    createGlobalContent();
    
    // Step 4: Create all page stories
    Logger.log('\n📄 Step 4: Creating Page Stories...');
    createAllStories();
    
    Logger.log('\n✅ SETUP COMPLETE!');
    Logger.log('🎉 Your Storyblok space is ready!');
    Logger.log('\n📋 Next steps:');
    Logger.log('1. Go to Storyblok and verify the content');
    Logger.log('2. Update the Preview Token in Vercel environment variables');
    Logger.log('3. Deploy your website');
    
  } catch (error) {
    Logger.log('❌ ERROR: ' + error.message);
    Logger.log('Stack: ' + error.stack);
    throw error;
  }
}

// ============================================================================
// API HELPER FUNCTIONS
// ============================================================================

function makeRequest(endpoint, method = 'GET', payload = null) {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    'method': method,
    'headers': HEADERS,
    'muteHttpExceptions': true
  };
  
  if (payload) {
    options.payload = JSON.stringify(payload);
  }
  
  const response = UrlFetchApp.fetch(url, options);
  const code = response.getResponseCode();
  const content = response.getContentText();
  
  if (code >= 400) {
    Logger.log(`Error ${code} for ${method} ${endpoint}: ${content}`);
    throw new Error(`API Error ${code}: ${content}`);
  }
  
  return content ? JSON.parse(content) : null;
}

function componentExists(name) {
  try {
    const components = makeRequest('/components');
    return components.components.some(c => c.name === name);
  } catch (e) {
    return false;
  }
}

function createComponent(componentData) {
  const name = componentData.component.name;
  
  if (componentExists(name)) {
    Logger.log(`  ⏭️  Component '${name}' already exists, skipping...`);
    return;
  }
  
  Logger.log(`  ➕ Creating component '${name}'...`);
  makeRequest('/components', 'POST', componentData);
  Utilities.sleep(500); // Rate limiting
}

function getStoryByFullSlug(fullSlug) {
  try {
    const stories = makeRequest(`/stories?by_slugs=${fullSlug}`);
    return stories.stories && stories.stories.length > 0 ? stories.stories[0] : null;
  } catch (e) {
    return null;
  }
}

function createStory(storyData) {
  const fullSlug = storyData.story.full_slug || storyData.story.slug;
  
  const existing = getStoryByFullSlug(fullSlug);
  if (existing) {
    Logger.log(`  ⏭️  Story '${fullSlug}' already exists, skipping...`);
    return existing;
  }
  
  Logger.log(`  ➕ Creating story '${fullSlug}'...`);
  const result = makeRequest('/stories', 'POST', storyData);
  Utilities.sleep(500); // Rate limiting
  return result.story;
}

// ============================================================================
// STEP 1: CREATE ALL COMPONENTS
// ============================================================================

function createAllComponents() {
  // Nested components (used in other components)
  createNestedComponents();
  
  // Page components
  createPageComponents();
  
  Logger.log('✅ All components created successfully');
}

function createNestedComponents() {
  Logger.log('  Creating nested components...');
  
  // Nav Link Component
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
  
  // Social Link Component
  createComponent({
    component: {
      name: 'social_link',
      display_name: 'Social Link',
      is_nestable: true,
      schema: {
        platform: { 
          type: 'option',
          options: [
            { name: 'Facebook', value: 'facebook' },
            { name: 'Instagram', value: 'instagram' },
            { name: 'LinkedIn', value: 'linkedin' }
          ],
          required: true
        },
        url: { type: 'text', required: true }
      }
    }
  });
  
  // Detail Card Component
  createComponent({
    component: {
      name: 'detail_card',
      display_name: 'Detail Card',
      is_nestable: true,
      schema: {
        icon: { type: 'text', description: 'Lucide icon name' },
        title: { type: 'text', required: true },
        description: { type: 'textarea', required: true }
      }
    }
  });
  
  // Angebot Card Component
  createComponent({
    component: {
      name: 'angebot_card',
      display_name: 'Angebot Card',
      is_nestable: true,
      schema: {
        image: { type: 'asset', required: true, filetypes: ['images'] },
        title: { type: 'text', required: true },
        description: { type: 'textarea', required: true },
        link: { type: 'multilink', required: true }
      }
    }
  });
  
  // Feature Item Component
  createComponent({
    component: {
      name: 'feature_item',
      display_name: 'Feature Item',
      is_nestable: true,
      schema: {
        text: { type: 'text', required: true }
      }
    }
  });
  
  // News Item Component
  createComponent({
    component: {
      name: 'news_item',
      display_name: 'News Item',
      is_nestable: true,
      schema: {
        date: { type: 'text', required: true },
        title: { type: 'text', required: true },
        description: { type: 'textarea', required: true },
        link: { type: 'multilink' }
      }
    }
  });
  
  // FAQ Item Component
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
  
  // Testimonial Item Component
  createComponent({
    component: {
      name: 'testimonial_item',
      display_name: 'Testimonial',
      is_nestable: true,
      schema: {
        text: { type: 'textarea', required: true },
        author: { type: 'text', required: true },
        rating: { type: 'number', default_value: 5 }
      }
    }
  });
  
  // Benefit Item Component
  createComponent({
    component: {
      name: 'benefit_item',
      display_name: 'Benefit Item',
      is_nestable: true,
      schema: {
        title: { type: 'text', required: true },
        description: { type: 'textarea', required: true }
      }
    }
  });
  
  // Method Item Component
  createComponent({
    component: {
      name: 'method_item',
      display_name: 'Method Item',
      is_nestable: true,
      schema: {
        title: { type: 'text', required: true },
        description: { type: 'textarea', required: true },
        icon: { type: 'text', description: 'Lucide icon name' }
      }
    }
  });
  
  // Area Item Component
  createComponent({
    component: {
      name: 'area_item',
      display_name: 'Treatment Area',
      is_nestable: true,
      schema: {
        text: { type: 'text', required: true }
      }
    }
  });
  
  // Process Step Component
  createComponent({
    component: {
      name: 'process_step',
      display_name: 'Process Step',
      is_nestable: true,
      schema: {
        step_number: { type: 'number', required: true },
        title: { type: 'text', required: true },
        description: { type: 'textarea', required: true }
      }
    }
  });
  
  // Goal Item Component
  createComponent({
    component: {
      name: 'goal_item',
      display_name: 'Goal Item',
      is_nestable: true,
      schema: {
        title: { type: 'text', required: true },
        description: { type: 'textarea', required: true },
        icon: { type: 'text', description: 'Lucide icon name' }
      }
    }
  });
  
  // Therapy Item Component
  createComponent({
    component: {
      name: 'therapy_item',
      display_name: 'Therapy Item',
      is_nestable: true,
      schema: {
        title: { type: 'text', required: true },
        description: { type: 'textarea', required: true },
        image: { type: 'asset', required: true, filetypes: ['images'] },
        link: { type: 'multilink', required: true }
      }
    }
  });
  
  // Qualification Item Component
  createComponent({
    component: {
      name: 'qualification_item',
      display_name: 'Qualification',
      is_nestable: true,
      schema: {
        year: { type: 'text', required: true },
        title: { type: 'text', required: true },
        description: { type: 'textarea' }
      }
    }
  });
  
  // Hours Item Component
  createComponent({
    component: {
      name: 'hours_item',
      display_name: 'Opening Hours',
      is_nestable: true,
      schema: {
        day: { type: 'text', required: true },
        hours: { type: 'text', required: true }
      }
    }
  });
  
  // Legal Section Component
  createComponent({
    component: {
      name: 'legal_section',
      display_name: 'Legal Section',
      is_nestable: true,
      schema: {
        title: { type: 'text', required: true },
        content: { type: 'richtext', required: true }
      }
    }
  });
  
  // Info Item Component
  createComponent({
    component: {
      name: 'info_item',
      display_name: 'Info Item',
      is_nestable: true,
      schema: {
        label: { type: 'text', required: true },
        value: { type: 'text', required: true }
      }
    }
  });
}

// Helper function to add SEO fields to any page component schema
function getSEOFields() {
  return {
    seo_title: { 
      type: 'text', 
      description: 'SEO optimized page title (50-60 chars). Falls empty, wird der hero_title verwendet.'
    },
    seo_description: { 
      type: 'textarea', 
      max_length: 160,
      description: 'Meta description for search engines (150-160 chars)'
    },
    seo_keywords: { 
      type: 'text', 
      description: 'Comma-separated keywords (5-10 keywords)'
    },
    seo_image: { 
      type: 'asset', 
      filetypes: ['images'],
      description: 'Open Graph image for social sharing (1200x630px recommended). Falls empty, wird das hero_image verwendet.'
    }
  };
}

function createPageComponents() {
  Logger.log('  Creating page components...');
  
  // Global Component
  createComponent({
    component: {
      name: 'global',
      display_name: 'Global Content',
      is_root: true,
      schema: {
        navbar_logo: { type: 'asset', required: true, filetypes: ['images'] },
        navbar_links: { type: 'bloks', restrict_components: true, component_whitelist: ['nav_link'] },
        footer_description: { type: 'textarea' },
        footer_contact_title: { type: 'text' },
        footer_address_line1: { type: 'text' },
        footer_address_line2: { type: 'text' },
        footer_phone: { type: 'text' },
        footer_email: { type: 'text' },
        footer_whatsapp: { type: 'text' },
        footer_social_links: { type: 'bloks', restrict_components: true, component_whitelist: ['social_link'] },
        footer_copyright: { type: 'text' }
      }
    }
  });
  
  // Home Page Component
  createComponent({
    component: {
      name: 'page_home',
      display_name: 'Home Page',
      is_root: true,
      schema: {
        hero_title: { type: 'text', required: true },
        hero_subtitle: { type: 'textarea' },
        hero_cta_text: { type: 'text' },
        hero_cta_link: { type: 'multilink' },
        hero_background_image: { type: 'asset', filetypes: ['images'] },
        
        details_sections: { type: 'bloks', restrict_components: true, component_whitelist: ['detail_card'] },
        
        angebote_title: { type: 'text' },
        angebote_cards: { type: 'bloks', restrict_components: true, component_whitelist: ['angebot_card'] },
        
        persoenliches_title: { type: 'text' },
        persoenliches_subtitle: { type: 'textarea' },
        persoenliches_image: { type: 'asset', filetypes: ['images'] },
        persoenliches_features: { type: 'bloks', restrict_components: true, component_whitelist: ['feature_item'] },
        persoenliches_cta_text: { type: 'text' },
        persoenliches_cta_link: { type: 'multilink' },
        
        psycho_title: { type: 'text' },
        psycho_description: { type: 'textarea' },
        psycho_image: { type: 'asset', filetypes: ['images'] },
        psycho_link: { type: 'multilink' },
        psycho_link_text: { type: 'text' },
        
        news_title: { type: 'text' },
        news_items: { type: 'bloks', restrict_components: true, component_whitelist: ['news_item'] },
        
        faq_title: { type: 'text' },
        faq_items: { type: 'bloks', restrict_components: true, component_whitelist: ['faq_item'] },
        
        testimonials_title: { type: 'text' },
        testimonials_items: { type: 'bloks', restrict_components: true, component_whitelist: ['testimonial_item'] },
        
        cta_title: { type: 'text' },
        cta_description: { type: 'textarea' },
        cta_button_text: { type: 'text' },
        cta_button_link: { type: 'multilink' },
        
        ...getSEOFields()
      }
    }
  });
  
  // TaoYin Page Component
  createComponent({
    component: {
      name: 'page_taoyin',
      display_name: 'TaoYin Page',
      is_root: true,
      schema: {
        hero_title: { type: 'text', required: true },
        hero_subtitle: { type: 'textarea' },
        hero_image: { type: 'asset', filetypes: ['images'] },
        
        intro_text: { type: 'richtext' },
        
        benefits_title: { type: 'text' },
        benefits_items: { type: 'bloks', restrict_components: true, component_whitelist: ['benefit_item'] },
        
        practice_title: { type: 'text' },
        practice_description: { type: 'richtext' },
        practice_image: { type: 'asset', filetypes: ['images'] },
        
        cta_title: { type: 'text' },
        cta_button_text: { type: 'text' },
        cta_button_link: { type: 'multilink' },
        
        ...getSEOFields()
      }
    }
  });
  
  // Qi Gong Page Component
  createComponent({
    component: {
      name: 'page_qigong',
      display_name: 'Qi Gong Page',
      is_root: true,
      schema: {
        hero_title: { type: 'text', required: true },
        hero_subtitle: { type: 'textarea' },
        hero_image: { type: 'asset', filetypes: ['images'] },
        
        intro_text: { type: 'richtext' },
        
        benefits_title: { type: 'text' },
        benefits_items: { type: 'bloks', restrict_components: true, component_whitelist: ['benefit_item'] },
        
        practice_title: { type: 'text' },
        practice_description: { type: 'richtext' },
        practice_image: { type: 'asset', filetypes: ['images'] },
        
        cta_title: { type: 'text' },
        cta_button_text: { type: 'text' },
        cta_button_link: { type: 'multilink' },
        
        ...getSEOFields()
      }
    }
  });
  
  // Chi Nei Tsang Page Component
  createComponent({
    component: {
      name: 'page_chi_nei_tsang',
      display_name: 'Chi Nei Tsang Page',
      is_root: true,
      schema: {
        hero_title: { type: 'text', required: true },
        hero_subtitle: { type: 'textarea' },
        hero_image: { type: 'asset', filetypes: ['images'] },
        
        intro_text: { type: 'richtext' },
        
        benefits_title: { type: 'text' },
        benefits_items: { type: 'bloks', restrict_components: true, component_whitelist: ['benefit_item'] },
        
        practice_title: { type: 'text' },
        practice_description: { type: 'richtext' },
        practice_image: { type: 'asset', filetypes: ['images'] },
        
        session_info_title: { type: 'text' },
        session_info_items: { type: 'bloks', restrict_components: true, component_whitelist: ['info_item'] },
        
        cta_title: { type: 'text' },
        cta_button_text: { type: 'text' },
        cta_button_link: { type: 'multilink' },
        
        ...getSEOFields()
      }
    }
  });
  
  // Psychotherapie Page Component
  createComponent({
    component: {
      name: 'page_psychotherapie',
      display_name: 'Psychotherapie Page',
      is_root: true,
      schema: {
        hero_title: { type: 'text', required: true },
        hero_subtitle: { type: 'textarea' },
        hero_image: { type: 'asset', filetypes: ['images'] },
        
        intro_text: { type: 'richtext' },
        
        methods_title: { type: 'text' },
        methods_items: { type: 'bloks', restrict_components: true, component_whitelist: ['method_item'] },
        
        areas_title: { type: 'text' },
        areas_items: { type: 'bloks', restrict_components: true, component_whitelist: ['area_item'] },
        
        process_title: { type: 'text' },
        process_steps: { type: 'bloks', restrict_components: true, component_whitelist: ['process_step'] },
        
        cta_title: { type: 'text' },
        cta_button_text: { type: 'text' },
        cta_button_link: { type: 'multilink' },
        
        ...getSEOFields()
      }
    }
  });
  
  // Behandlung Page Component
  createComponent({
    component: {
      name: 'page_behandlung',
      display_name: 'Behandlung Page',
      is_root: true,
      schema: {
        hero_title: { type: 'text', required: true },
        hero_subtitle: { type: 'textarea' },
        
        goals_title: { type: 'text' },
        goals_items: { type: 'bloks', restrict_components: true, component_whitelist: ['goal_item'] },
        
        approach_title: { type: 'text' },
        approach_description: { type: 'richtext' },
        
        cta_title: { type: 'text' },
        cta_button_text: { type: 'text' },
        cta_button_link: { type: 'multilink' },
        
        ...getSEOFields()
      }
    }
  });
  
  // Therapien Page Component
  createComponent({
    component: {
      name: 'page_therapien',
      display_name: 'Therapien Page',
      is_root: true,
      schema: {
        hero_title: { type: 'text', required: true },
        hero_subtitle: { type: 'textarea' },
        
        therapies_items: { type: 'bloks', restrict_components: true, component_whitelist: ['therapy_item'] },
        
        ...getSEOFields()
      }
    }
  });
  
  // About Page Component
  createComponent({
    component: {
      name: 'page_about',
      display_name: 'About Page',
      is_root: true,
      schema: {
        hero_title: { type: 'text', required: true },
        hero_image: { type: 'asset', filetypes: ['images'] },
        
        intro_text: { type: 'richtext' },
        
        bio_title: { type: 'text' },
        bio_text: { type: 'richtext' },
        bio_image: { type: 'asset', filetypes: ['images'] },
        
        qualifications_title: { type: 'text' },
        qualifications_items: { type: 'bloks', restrict_components: true, component_whitelist: ['qualification_item'] },
        
        philosophy_title: { type: 'text' },
        philosophy_text: { type: 'richtext' },
        
        ...getSEOFields()
      }
    }
  });
  
  // Kontakt Page Component
  createComponent({
    component: {
      name: 'page_kontakt',
      display_name: 'Kontakt Page',
      is_root: true,
      schema: {
        hero_title: { type: 'text', required: true },
        hero_subtitle: { type: 'textarea' },
        
        contact_info_title: { type: 'text' },
        contact_address: { type: 'textarea' },
        contact_phone: { type: 'text' },
        contact_email: { type: 'text' },
        contact_whatsapp: { type: 'text' },
        
        hours_title: { type: 'text' },
        hours_items: { type: 'bloks', restrict_components: true, component_whitelist: ['hours_item'] },
        
        map_title: { type: 'text' },
        map_embed_url: { type: 'text' },
        
        form_title: { type: 'text' },
        form_name_label: { type: 'text' },
        form_email_label: { type: 'text' },
        form_phone_label: { type: 'text' },
        form_message_label: { type: 'text' },
        form_submit_text: { type: 'text' },
        form_success_message: { type: 'text' },
        form_error_message: { type: 'text' },
        
        ...getSEOFields()
      }
    }
  });
  
  // Impressum Page Component
  createComponent({
    component: {
      name: 'page_impressum',
      display_name: 'Impressum Page',
      is_root: true,
      schema: {
        hero_title: { type: 'text', required: true },
        
        content_sections: { type: 'bloks', restrict_components: true, component_whitelist: ['legal_section'] },
        
        ...getSEOFields()
      }
    }
  });
}

// ============================================================================
// STEP 2: CREATE FOLDER STRUCTURE
// ============================================================================

function createFolderStructure() {
  const languages = ['de', 'en', 'es'];
  
  languages.forEach(lang => {
    const folderData = {
      story: {
        name: lang.toUpperCase(),
        slug: lang,
        is_folder: true,
        parent_id: 0
      }
    };
    
    const existing = getStoryByFullSlug(lang);
    if (existing) {
      Logger.log(`  ⏭️  Folder '${lang}/' already exists`);
    } else {
      Logger.log(`  ➕ Creating folder '${lang}/'...`);
      makeRequest('/stories', 'POST', folderData);
      Utilities.sleep(500);
    }
  });
  
  Logger.log('✅ Folder structure created');
}

// ============================================================================
// STEP 3: CREATE GLOBAL CONTENT
// ============================================================================

function createGlobalContent() {
  const languages = [
    { code: 'de', name: 'Deutsch' },
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' }
  ];
  
  languages.forEach(lang => {
    const content = getGlobalContentData(lang.code);
    
    const storyData = {
      story: {
        name: `Global ${lang.name}`,
        slug: 'global',
        parent_id: getFolderId(lang.code),
        content: content
      },
      publish: 1
    };
    
    createStory(storyData);
  });
  
  Logger.log('✅ Global content created');
}

function getGlobalContentData(lang) {
  const navLinks = {
    de: [
      { _uid: generateUID(), component: 'nav_link', label: 'Startseite', link: { linktype: 'story', cached_url: 'de/home' } },
      { _uid: generateUID(), component: 'nav_link', label: 'Über mich', link: { linktype: 'story', cached_url: 'de/about' } },
      { _uid: generateUID(), component: 'nav_link', label: 'Therapien', link: { linktype: 'story', cached_url: 'de/therapien' } },
      { _uid: generateUID(), component: 'nav_link', label: 'Psychotherapie', link: { linktype: 'story', cached_url: 'de/psychotherapie' } },
      { _uid: generateUID(), component: 'nav_link', label: 'Kontakt', link: { linktype: 'story', cached_url: 'de/kontakt' } }
    ],
    en: [
      { _uid: generateUID(), component: 'nav_link', label: 'Home', link: { linktype: 'story', cached_url: 'en/home' } },
      { _uid: generateUID(), component: 'nav_link', label: 'About', link: { linktype: 'story', cached_url: 'en/about' } },
      { _uid: generateUID(), component: 'nav_link', label: 'Therapies', link: { linktype: 'story', cached_url: 'en/therapien' } },
      { _uid: generateUID(), component: 'nav_link', label: 'Psychotherapy', link: { linktype: 'story', cached_url: 'en/psychotherapie' } },
      { _uid: generateUID(), component: 'nav_link', label: 'Contact', link: { linktype: 'story', cached_url: 'en/kontakt' } }
    ],
    es: [
      { _uid: generateUID(), component: 'nav_link', label: 'Inicio', link: { linktype: 'story', cached_url: 'es/home' } },
      { _uid: generateUID(), component: 'nav_link', label: 'Sobre mí', link: { linktype: 'story', cached_url: 'es/about' } },
      { _uid: generateUID(), component: 'nav_link', label: 'Terapias', link: { linktype: 'story', cached_url: 'es/therapien' } },
      { _uid: generateUID(), component: 'nav_link', label: 'Psicoterapia', link: { linktype: 'story', cached_url: 'es/psychotherapie' } },
      { _uid: generateUID(), component: 'nav_link', label: 'Contacto', link: { linktype: 'story', cached_url: 'es/kontakt' } }
    ]
  };
  
  const footerData = {
    de: {
      description: 'Taoyin Zentrum Ingolstadt - Ganzheitliche Therapie und Heilung',
      contactTitle: 'Kontakt',
      addressLine1: 'Taoyin Zentrum',
      addressLine2: 'Ingolstadt, Deutschland',
      phone: '+49 123 456789',
      email: 'info@taoyin-ingolstadt.de',
      whatsapp: '+49 123 456789',
      copyright: '© 2026 Taoyin Zentrum Ingolstadt. Alle Rechte vorbehalten.'
    },
    en: {
      description: 'Taoyin Center Ingolstadt - Holistic Therapy and Healing',
      contactTitle: 'Contact',
      addressLine1: 'Taoyin Center',
      addressLine2: 'Ingolstadt, Germany',
      phone: '+49 123 456789',
      email: 'info@taoyin-ingolstadt.de',
      whatsapp: '+49 123 456789',
      copyright: '© 2026 Taoyin Center Ingolstadt. All rights reserved.'
    },
    es: {
      description: 'Centro Taoyin Ingolstadt - Terapia holística y curación',
      contactTitle: 'Contacto',
      addressLine1: 'Centro Taoyin',
      addressLine2: 'Ingolstadt, Alemania',
      phone: '+49 123 456789',
      email: 'info@taoyin-ingolstadt.de',
      whatsapp: '+49 123 456789',
      copyright: '© 2026 Centro Taoyin Ingolstadt. Todos los derechos reservados.'
    }
  };
  
  const socialLinks = [
    { _uid: generateUID(), component: 'social_link', platform: 'facebook', url: 'https://facebook.com/taoyin' },
    { _uid: generateUID(), component: 'social_link', platform: 'instagram', url: 'https://instagram.com/taoyin' }
  ];
  
  const data = footerData[lang];
  
  return {
    component: 'global',
    navbar_logo: { filename: 'https://via.placeholder.com/200x60/037baf/ffffff?text=Taoyin', alt: 'Taoyin Logo' },
    navbar_links: navLinks[lang],
    footer_description: data.description,
    footer_contact_title: data.contactTitle,
    footer_address_line1: data.addressLine1,
    footer_address_line2: data.addressLine2,
    footer_phone: data.phone,
    footer_email: data.email,
    footer_whatsapp: data.whatsapp,
    footer_social_links: socialLinks,
    footer_copyright: data.copyright
  };
}

// ============================================================================
// STEP 4: CREATE ALL PAGE STORIES
// ============================================================================

function createAllStories() {
  const languages = ['de', 'en', 'es'];
  
  languages.forEach(lang => {
    Logger.log(`\n  Creating ${lang.toUpperCase()} stories...`);
    
    createHomeStory(lang);
    createTaoYinStory(lang);
    createQiGongStory(lang);
    createChiNeiTsangStory(lang);
    createPsychotherapieStory(lang);
    createBehandlungStory(lang);
    createTherapienStory(lang);
    createAboutStory(lang);
    createKontaktStory(lang);
    createImpressumStory(lang);
  });
  
  Logger.log('✅ All page stories created');
}

function createHomeStory(lang) {
  const content = getHomeContentData(lang);
  
  const storyData = {
    story: {
      name: `Home ${lang.toUpperCase()}`,
      slug: 'home',
      parent_id: getFolderId(lang),
      content: content
    },
    publish: 1
  };
  
  createStory(storyData);
}

function getHomeContentData(lang) {
  const texts = {
    de: {
      heroTitle: 'Willkommen im Taoyin Zentrum Ingolstadt',
      heroSubtitle: 'Ganzheitliche Therapie für Körper, Geist und Seele',
      heroCta: 'Termin vereinbaren',
      angeboteTitle: 'Unsere Angebote',
      persoenlichTitle: 'Persönliches Angebot',
      persoenlichSubtitle: 'Individuelle Betreuung für Ihren Heilungsweg',
      psychoTitle: 'Psychotherapie',
      psychoDesc: 'Professionelle therapeutische Begleitung',
      newsTitle: 'Aktuelles',
      faqTitle: 'Häufig gestellte Fragen',
      testimonialsTitle: 'Was unsere Klienten sagen',
      ctaTitle: 'Bereit für Ihre Transformation?',
      ctaDesc: 'Vereinbaren Sie noch heute einen Termin',
      ctaButton: 'Kontakt aufnehmen'
    },
    en: {
      heroTitle: 'Welcome to Taoyin Center Ingolstadt',
      heroSubtitle: 'Holistic therapy for body, mind and soul',
      heroCta: 'Book appointment',
      angeboteTitle: 'Our Services',
      persoenlichTitle: 'Personal Approach',
      persoenlichSubtitle: 'Individual care for your healing journey',
      psychoTitle: 'Psychotherapy',
      psychoDesc: 'Professional therapeutic support',
      newsTitle: 'Latest News',
      faqTitle: 'Frequently Asked Questions',
      testimonialsTitle: 'What our clients say',
      ctaTitle: 'Ready for your transformation?',
      ctaDesc: 'Book your appointment today',
      ctaButton: 'Get in touch'
    },
    es: {
      heroTitle: 'Bienvenido al Centro Taoyin Ingolstadt',
      heroSubtitle: 'Terapia holística para cuerpo, mente y alma',
      heroCta: 'Reservar cita',
      angeboteTitle: 'Nuestros Servicios',
      persoenlichTitle: 'Enfoque Personal',
      persoenlichSubtitle: 'Atención individual para tu camino de sanación',
      psychoTitle: 'Psicoterapia',
      psychoDesc: 'Apoyo terapéutico profesional',
      newsTitle: 'Últimas noticias',
      faqTitle: 'Preguntas frecuentes',
      testimonialsTitle: 'Lo que dicen nuestros clientes',
      ctaTitle: '¿Listo para tu transformación?',
      ctaDesc: 'Reserva tu cita hoy',
      ctaButton: 'Contactar'
    }
  };
  
  const t = texts[lang];
  
  return {
    component: 'page_home',
    hero_title: t.heroTitle,
    hero_subtitle: t.heroSubtitle,
    hero_cta_text: t.heroCta,
    hero_cta_link: { linktype: 'story', cached_url: `${lang}/kontakt` },
    hero_background_image: { filename: 'https://via.placeholder.com/1920x800/eff5f6/037baf?text=Hero', alt: 'Hero' },
    
    details_sections: [
      { _uid: generateUID(), component: 'detail_card', icon: 'Heart', title: 'Ganzheitlich', description: 'Wir betrachten Körper, Geist und Seele als Einheit' },
      { _uid: generateUID(), component: 'detail_card', icon: 'Users', title: 'Persönlich', description: 'Individuelle Betreuung auf Ihrem Heilungsweg' },
      { _uid: generateUID(), component: 'detail_card', icon: 'Award', title: 'Erfahren', description: 'Jahrelange Expertise in verschiedenen Therapieformen' }
    ],
    
    angebote_title: t.angeboteTitle,
    angebote_cards: [
      {
        _uid: generateUID(),
        component: 'angebot_card',
        title: 'Tao Yin',
        description: 'Traditionelle chinesische Bewegungstherapie',
        image: { filename: 'https://via.placeholder.com/400x300/037baf/ffffff?text=TaoYin', alt: 'Tao Yin' },
        link: { linktype: 'story', cached_url: `${lang}/taoyin` }
      },
      {
        _uid: generateUID(),
        component: 'angebot_card',
        title: 'Qi Gong',
        description: 'Energiearbeit und Meditation',
        image: { filename: 'https://via.placeholder.com/400x300/037baf/ffffff?text=QiGong', alt: 'Qi Gong' },
        link: { linktype: 'story', cached_url: `${lang}/qi-gong` }
      },
      {
        _uid: generateUID(),
        component: 'angebot_card',
        title: 'Chi Nei Tsang',
        description: 'Bauch- und Organtherapie',
        image: { filename: 'https://via.placeholder.com/400x300/037baf/ffffff?text=ChiNeiTsang', alt: 'Chi Nei Tsang' },
        link: { linktype: 'story', cached_url: `${lang}/chi-nei-tsang` }
      }
    ],
    
    persoenliches_title: t.persoenlichTitle,
    persoenliches_subtitle: t.persoenlichSubtitle,
    persoenliches_image: { filename: 'https://via.placeholder.com/600x400/eff5f6/037baf?text=Personal', alt: 'Personal' },
    persoenliches_features: [
      { _uid: generateUID(), component: 'feature_item', text: 'Individuelle Behandlungspläne' },
      { _uid: generateUID(), component: 'feature_item', text: 'Ganzheitlicher Ansatz' },
      { _uid: generateUID(), component: 'feature_item', text: 'Langfristige Begleitung' }
    ],
    persoenliches_cta_text: 'Mehr erfahren',
    persoenliches_cta_link: { linktype: 'story', cached_url: `${lang}/about` },
    
    psycho_title: t.psychoTitle,
    psycho_description: t.psychoDesc,
    psycho_image: { filename: 'https://via.placeholder.com/600x400/037baf/ffffff?text=Psychotherapy', alt: 'Psychotherapy' },
    psycho_link: { linktype: 'story', cached_url: `${lang}/psychotherapie` },
    psycho_link_text: 'Mehr erfahren',
    
    news_title: t.newsTitle,
    news_items: [
      {
        _uid: generateUID(),
        component: 'news_item',
        date: '2026-03-01',
        title: 'Neue Kursreihe startet im April',
        description: 'Wir freuen uns, eine neue Kursreihe für Anfänger anzukündigen.',
        link: { linktype: 'url', url: '#' }
      }
    ],
    
    faq_title: t.faqTitle,
    faq_items: [
      {
        _uid: generateUID(),
        component: 'faq_item',
        question: 'Wie lange dauert eine Sitzung?',
        answer: 'Eine typische Sitzung dauert zwischen 60 und 90 Minuten, abhängig von der gewählten Therapieform.'
      },
      {
        _uid: generateUID(),
        component: 'faq_item',
        question: 'Werden die Kosten von der Krankenkasse übernommen?',
        answer: 'Bei Heilpraktiker-Zusatzversicherung werden die Kosten in der Regel übernommen. Bitte klären Sie dies vorab mit Ihrer Versicherung.'
      }
    ],
    
    testimonials_title: t.testimonialsTitle,
    testimonials_items: [
      {
        _uid: generateUID(),
        component: 'testimonial_item',
        text: 'Die Behandlung hat mir sehr geholfen. Ich fühle mich ausgeglichener und energiegeladener.',
        author: 'Maria S.',
        rating: 5
      },
      {
        _uid: generateUID(),
        component: 'testimonial_item',
        text: 'Professionell, einfühlsam und wirkungsvoll. Sehr empfehlenswert!',
        author: 'Thomas K.',
        rating: 5
      }
    ],
    
    cta_title: t.ctaTitle,
    cta_description: t.ctaDesc,
    cta_button_text: t.ctaButton,
    cta_button_link: { linktype: 'story', cached_url: `${lang}/kontakt` }
  };
}

function createTaoYinStory(lang) {
  const texts = {
    de: { title: 'Tao Yin', subtitle: 'Traditionelle chinesische Bewegungstherapie' },
    en: { title: 'Tao Yin', subtitle: 'Traditional Chinese movement therapy' },
    es: { title: 'Tao Yin', subtitle: 'Terapia de movimiento tradicional china' }
  };
  
  const content = {
    component: 'page_taoyin',
    hero_title: texts[lang].title,
    hero_subtitle: texts[lang].subtitle,
    hero_image: { filename: 'https://via.placeholder.com/1920x600/eff5f6/037baf?text=TaoYin', alt: 'Tao Yin' },
    intro_text: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Tao Yin ist eine traditionelle chinesische Bewegungstherapie...' }] }] },
    benefits_title: 'Vorteile',
    benefits_items: [
      { _uid: generateUID(), component: 'benefit_item', title: 'Flexibilität', description: 'Verbessert die Beweglichkeit' },
      { _uid: generateUID(), component: 'benefit_item', title: 'Energie', description: 'Stärkt den Energiefluss' }
    ],
    practice_title: 'Praxis',
    practice_description: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'In unseren Kursen...' }] }] },
    practice_image: { filename: 'https://via.placeholder.com/600x400/037baf/ffffff?text=Practice', alt: 'Practice' },
    cta_title: 'Interessiert?',
    cta_button_text: 'Kontakt',
    cta_button_link: { linktype: 'story', cached_url: `${lang}/kontakt` }
  };
  
  createStory({
    story: {
      name: `TaoYin ${lang.toUpperCase()}`,
      slug: 'taoyin',
      parent_id: getFolderId(lang),
      content: content
    },
    publish: 1
  });
}

function createQiGongStory(lang) {
  const texts = {
    de: { title: 'Qi Gong', subtitle: 'Energiearbeit und Meditation' },
    en: { title: 'Qi Gong', subtitle: 'Energy work and meditation' },
    es: { title: 'Qi Gong', subtitle: 'Trabajo energético y meditación' }
  };
  
  const content = {
    component: 'page_qigong',
    hero_title: texts[lang].title,
    hero_subtitle: texts[lang].subtitle,
    hero_image: { filename: 'https://via.placeholder.com/1920x600/eff5f6/037baf?text=QiGong', alt: 'Qi Gong' },
    intro_text: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Qi Gong ist eine jahrtausendealte chinesische Praxis...' }] }] },
    benefits_title: 'Vorteile',
    benefits_items: [
      { _uid: generateUID(), component: 'benefit_item', title: 'Ruhe', description: 'Fördert innere Ruhe' },
      { _uid: generateUID(), component: 'benefit_item', title: 'Balance', description: 'Harmonisiert Körper und Geist' }
    ],
    practice_title: 'Praxis',
    practice_description: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Unsere Qi Gong Kurse...' }] }] },
    practice_image: { filename: 'https://via.placeholder.com/600x400/037baf/ffffff?text=QiGong', alt: 'Qi Gong' },
    cta_title: 'Jetzt starten',
    cta_button_text: 'Kontakt',
    cta_button_link: { linktype: 'story', cached_url: `${lang}/kontakt` }
  };
  
  createStory({
    story: {
      name: `Qi Gong ${lang.toUpperCase()}`,
      slug: 'qi-gong',
      parent_id: getFolderId(lang),
      content: content
    },
    publish: 1
  });
}

function createChiNeiTsangStory(lang) {
  const texts = {
    de: { title: 'Chi Nei Tsang', subtitle: 'Bauch- und Organtherapie' },
    en: { title: 'Chi Nei Tsang', subtitle: 'Abdominal and organ therapy' },
    es: { title: 'Chi Nei Tsang', subtitle: 'Terapia abdominal y de órganos' }
  };
  
  const content = {
    component: 'page_chi_nei_tsang',
    hero_title: texts[lang].title,
    hero_subtitle: texts[lang].subtitle,
    hero_image: { filename: 'https://via.placeholder.com/1920x600/eff5f6/037baf?text=ChiNeiTsang', alt: 'Chi Nei Tsang' },
    intro_text: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Chi Nei Tsang ist eine traditionelle Bauchmassage...' }] }] },
    benefits_title: 'Vorteile',
    benefits_items: [
      { _uid: generateUID(), component: 'benefit_item', title: 'Verdauung', description: 'Unterstützt die Verdauung' },
      { _uid: generateUID(), component: 'benefit_item', title: 'Entgiftung', description: 'Fördert die Entgiftung' }
    ],
    practice_title: 'Behandlung',
    practice_description: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Die Behandlung erfolgt...' }] }] },
    practice_image: { filename: 'https://via.placeholder.com/600x400/037baf/ffffff?text=Treatment', alt: 'Treatment' },
    session_info_title: 'Sitzungsinfo',
    session_info_items: [
      { _uid: generateUID(), component: 'info_item', label: 'Dauer', value: '90 Minuten' },
      { _uid: generateUID(), component: 'info_item', label: 'Preis', value: '120 €' }
    ],
    cta_title: 'Termin vereinbaren',
    cta_button_text: 'Kontakt',
    cta_button_link: { linktype: 'story', cached_url: `${lang}/kontakt` }
  };
  
  createStory({
    story: {
      name: `Chi Nei Tsang ${lang.toUpperCase()}`,
      slug: 'chi-nei-tsang',
      parent_id: getFolderId(lang),
      content: content
    },
    publish: 1
  });
}

function createPsychotherapieStory(lang) {
  const texts = {
    de: { title: 'Psychotherapie', subtitle: 'Professionelle therapeutische Begleitung' },
    en: { title: 'Psychotherapy', subtitle: 'Professional therapeutic support' },
    es: { title: 'Psicoterapia', subtitle: 'Apoyo terapéutico profesional' }
  };
  
  const content = {
    component: 'page_psychotherapie',
    hero_title: texts[lang].title,
    hero_subtitle: texts[lang].subtitle,
    hero_image: { filename: 'https://via.placeholder.com/1920x600/eff5f6/037baf?text=Psychotherapy', alt: 'Psychotherapy' },
    intro_text: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Unsere Psychotherapie bietet...' }] }] },
    methods_title: 'Methoden',
    methods_items: [
      { _uid: generateUID(), component: 'method_item', title: 'Gesprächstherapie', description: 'Tiefgehende Gespräche', icon: 'MessageCircle' },
      { _uid: generateUID(), component: 'method_item', title: 'Körpertherapie', description: 'Körperorientierte Ansätze', icon: 'Activity' }
    ],
    areas_title: 'Behandlungsbereiche',
    areas_items: [
      { _uid: generateUID(), component: 'area_item', text: 'Angststörungen' },
      { _uid: generateUID(), component: 'area_item', text: 'Depression' },
      { _uid: generateUID(), component: 'area_item', text: 'Trauma' }
    ],
    process_title: 'Ablauf',
    process_steps: [
      { _uid: generateUID(), component: 'process_step', step_number: 1, title: 'Erstgespräch', description: 'Kennenlernen und Anamnese' },
      { _uid: generateUID(), component: 'process_step', step_number: 2, title: 'Behandlung', description: 'Regelmäßige Sitzungen' },
      { _uid: generateUID(), component: 'process_step', step_number: 3, title: 'Integration', description: 'Nachbetreuung' }
    ],
    cta_title: 'Unterstützung gesucht?',
    cta_button_text: 'Kontakt',
    cta_button_link: { linktype: 'story', cached_url: `${lang}/kontakt` }
  };
  
  createStory({
    story: {
      name: `Psychotherapie ${lang.toUpperCase()}`,
      slug: 'psychotherapie',
      parent_id: getFolderId(lang),
      content: content
    },
    publish: 1
  });
}

function createBehandlungStory(lang) {
  const texts = {
    de: { title: 'Behandlungsziele', subtitle: 'Was wir gemeinsam erreichen können' },
    en: { title: 'Treatment Goals', subtitle: 'What we can achieve together' },
    es: { title: 'Objetivos del tratamiento', subtitle: 'Lo que podemos lograr juntos' }
  };
  
  const content = {
    component: 'page_behandlung',
    hero_title: texts[lang].title,
    hero_subtitle: texts[lang].subtitle,
    goals_title: 'Ziele',
    goals_items: [
      { _uid: generateUID(), component: 'goal_item', title: 'Heilung', description: 'Körperliche und seelische Heilung', icon: 'Heart' },
      { _uid: generateUID(), component: 'goal_item', title: 'Balance', description: 'Innere Balance finden', icon: 'Scale' }
    ],
    approach_title: 'Unser Ansatz',
    approach_description: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Wir arbeiten ganzheitlich...' }] }] },
    cta_title: 'Bereit?',
    cta_button_text: 'Kontakt',
    cta_button_link: { linktype: 'story', cached_url: `${lang}/kontakt` }
  };
  
  createStory({
    story: {
      name: `Behandlung ${lang.toUpperCase()}`,
      slug: 'behandlung',
      parent_id: getFolderId(lang),
      content: content
    },
    publish: 1
  });
}

function createTherapienStory(lang) {
  const texts = {
    de: { title: 'Therapien im Überblick', subtitle: 'Unsere Behandlungsmethoden' },
    en: { title: 'Therapies Overview', subtitle: 'Our treatment methods' },
    es: { title: 'Resumen de terapias', subtitle: 'Nuestros métodos de tratamiento' }
  };
  
  const content = {
    component: 'page_therapien',
    hero_title: texts[lang].title,
    hero_subtitle: texts[lang].subtitle,
    therapies_items: [
      {
        _uid: generateUID(),
        component: 'therapy_item',
        title: 'Tao Yin',
        description: 'Bewegungstherapie',
        image: { filename: 'https://via.placeholder.com/400x300/037baf/ffffff?text=TaoYin', alt: 'Tao Yin' },
        link: { linktype: 'story', cached_url: `${lang}/taoyin` }
      },
      {
        _uid: generateUID(),
        component: 'therapy_item',
        title: 'Qi Gong',
        description: 'Energiearbeit',
        image: { filename: 'https://via.placeholder.com/400x300/037baf/ffffff?text=QiGong', alt: 'Qi Gong' },
        link: { linktype: 'story', cached_url: `${lang}/qi-gong` }
      },
      {
        _uid: generateUID(),
        component: 'therapy_item',
        title: 'Chi Nei Tsang',
        description: 'Bauchmassage',
        image: { filename: 'https://via.placeholder.com/400x300/037baf/ffffff?text=ChiNeiTsang', alt: 'Chi Nei Tsang' },
        link: { linktype: 'story', cached_url: `${lang}/chi-nei-tsang` }
      }
    ]
  };
  
  createStory({
    story: {
      name: `Therapien ${lang.toUpperCase()}`,
      slug: 'therapien',
      parent_id: getFolderId(lang),
      content: content
    },
    publish: 1
  });
}

function createAboutStory(lang) {
  const texts = {
    de: { title: 'Über mich - Estela' },
    en: { title: 'About me - Estela' },
    es: { title: 'Sobre mí - Estela' }
  };
  
  const content = {
    component: 'page_about',
    hero_title: texts[lang].title,
    hero_image: { filename: 'https://via.placeholder.com/1920x600/eff5f6/037baf?text=About', alt: 'About' },
    intro_text: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Ich bin Estela...' }] }] },
    bio_title: 'Mein Weg',
    bio_text: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Seit vielen Jahren...' }] }] },
    bio_image: { filename: 'https://via.placeholder.com/600x400/037baf/ffffff?text=Estela', alt: 'Estela' },
    qualifications_title: 'Qualifikationen',
    qualifications_items: [
      { _uid: generateUID(), component: 'qualification_item', year: '2015', title: 'Heilpraktiker-Ausbildung', description: 'Vollständige Ausbildung' },
      { _uid: generateUID(), component: 'qualification_item', year: '2018', title: 'Chi Nei Tsang Zertifikat', description: 'Advanced Training' }
    ],
    philosophy_title: 'Meine Philosophie',
    philosophy_text: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Ganzheitlich arbeiten...' }] }] }
  };
  
  createStory({
    story: {
      name: `About ${lang.toUpperCase()}`,
      slug: 'about',
      parent_id: getFolderId(lang),
      content: content
    },
    publish: 1
  });
}

function createKontaktStory(lang) {
  const texts = {
    de: {
      title: 'Kontakt',
      subtitle: 'Nehmen Sie Kontakt auf',
      contactTitle: 'Kontaktinformationen',
      hoursTitle: 'Öffnungszeiten',
      mapTitle: 'Anfahrt',
      formTitle: 'Nachricht senden',
      nameLabel: 'Name',
      emailLabel: 'E-Mail',
      phoneLabel: 'Telefon',
      messageLabel: 'Nachricht',
      submitText: 'Absenden',
      successMsg: 'Nachricht erfolgreich gesendet!',
      errorMsg: 'Fehler beim Senden. Bitte versuchen Sie es erneut.'
    },
    en: {
      title: 'Contact',
      subtitle: 'Get in touch',
      contactTitle: 'Contact Information',
      hoursTitle: 'Opening Hours',
      mapTitle: 'Directions',
      formTitle: 'Send Message',
      nameLabel: 'Name',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      messageLabel: 'Message',
      submitText: 'Submit',
      successMsg: 'Message sent successfully!',
      errorMsg: 'Error sending message. Please try again.'
    },
    es: {
      title: 'Contacto',
      subtitle: 'Ponte en contacto',
      contactTitle: 'Información de contacto',
      hoursTitle: 'Horarios',
      mapTitle: 'Cómo llegar',
      formTitle: 'Enviar mensaje',
      nameLabel: 'Nombre',
      emailLabel: 'Correo electrónico',
      phoneLabel: 'Teléfono',
      messageLabel: 'Mensaje',
      submitText: 'Enviar',
      successMsg: '¡Mensaje enviado con éxito!',
      errorMsg: 'Error al enviar. Por favor, inténtalo de nuevo.'
    }
  };
  
  const t = texts[lang];
  
  const content = {
    component: 'page_kontakt',
    hero_title: t.title,
    hero_subtitle: t.subtitle,
    contact_info_title: t.contactTitle,
    contact_address: 'Taoyin Zentrum\nIngolstadt, Deutschland',
    contact_phone: '+49 123 456789',
    contact_email: 'info@taoyin-ingolstadt.de',
    contact_whatsapp: '+49 123 456789',
    hours_title: t.hoursTitle,
    hours_items: [
      { _uid: generateUID(), component: 'hours_item', day: 'Montag - Freitag', hours: '9:00 - 18:00' },
      { _uid: generateUID(), component: 'hours_item', day: 'Samstag', hours: '10:00 - 14:00' },
      { _uid: generateUID(), component: 'hours_item', day: 'Sonntag', hours: 'Geschlossen' }
    ],
    map_title: t.mapTitle,
    map_embed_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2662.123!2d11.123!3d48.123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
    form_title: t.formTitle,
    form_name_label: t.nameLabel,
    form_email_label: t.emailLabel,
    form_phone_label: t.phoneLabel,
    form_message_label: t.messageLabel,
    form_submit_text: t.submitText,
    form_success_message: t.successMsg,
    form_error_message: t.errorMsg
  };
  
  createStory({
    story: {
      name: `Kontakt ${lang.toUpperCase()}`,
      slug: 'kontakt',
      parent_id: getFolderId(lang),
      content: content
    },
    publish: 1
  });
}

function createImpressumStory(lang) {
  const texts = {
    de: { title: 'Impressum & Datenschutz' },
    en: { title: 'Legal Notice & Privacy' },
    es: { title: 'Aviso Legal & Privacidad' }
  };
  
  const content = {
    component: 'page_impressum',
    hero_title: texts[lang].title,
    content_sections: [
      {
        _uid: generateUID(),
        component: 'legal_section',
        title: 'Impressum',
        content: {
          type: 'doc',
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: 'Taoyin Zentrum Ingolstadt' }] },
            { type: 'paragraph', content: [{ type: 'text', text: 'Inhaber: Estela...' }] }
          ]
        }
      },
      {
        _uid: generateUID(),
        component: 'legal_section',
        title: 'Datenschutz',
        content: {
          type: 'doc',
          content: [
            { type: 'paragraph', content: [{ type: 'text', text: 'Datenschutzerklärung...' }] }
          ]
        }
      }
    ]
  };
  
  createStory({
    story: {
      name: `Impressum ${lang.toUpperCase()}`,
      slug: 'impressum',
      parent_id: getFolderId(lang),
      content: content
    },
    publish: 1
  });
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getFolderId(lang) {
  const folder = getStoryByFullSlug(lang);
  return folder ? folder.id : 0;
}

function generateUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// ============================================================================
// HELPER FUNCTION FOR TESTING
// ============================================================================

function testConnection() {
  Logger.log('Testing Storyblok connection...');
  try {
    const response = makeRequest('/components');
    Logger.log('✅ Connection successful!');
    Logger.log('Components found: ' + response.components.length);
    return true;
  } catch (error) {
    Logger.log('❌ Connection failed: ' + error.message);
    return false;
  }
}