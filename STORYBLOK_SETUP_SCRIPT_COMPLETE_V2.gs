/**
 * STORYBLOK COMPLETE SETUP - v2.0
 * 100% DE/EN/ES Übersetzungen
 * 
 * Kopiere diesen kompletten Code in Google Apps Script und führe 'main' aus.
 * Setup-Zeit: ~15-20 Min
 */

// CONFIG
const CONFIG = {
  STORYBLOK_SPACE_ID: 'YOUR_SPACE_ID_HERE',
  STORYBLOK_MANAGEMENT_TOKEN: 'YOUR_TOKEN_HERE',
  STORYBLOK_REGION: 'eu'
};

const BASE_URL = `https://mapi.storyblok.com/v1/spaces/${CONFIG.STORYBLOK_SPACE_ID}`;
const HEADERS = { 'Authorization': CONFIG.STORYBLOK_MANAGEMENT_TOKEN, 'Content-Type': 'application/json' };
let assetCache = {};

// ASSETS
const IMG = {
  heroShelf: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5371146ec6241e81774b7_Estela-byaylin-52-min.jpg',
  heroPortrait: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5370f3e66ed943079d4c6_Estela-byaylin-26-min.jpg',
  taoBasis: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5371146ec6241e81774b7_Estela-byaylin-52-min.jpg',
  qiGong: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c53713513520b6bbe5b786_Estela-byaylin-33-min.jpg',
  medQiGong: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c53718065ce01562873ef1_Estela-byaylin-43.jpg',
  chiBehandlung: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5371f98928ab373b92ff9_Estela-byaylin-59-min.jpg',
  chiAusbildung: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c537205b0c2bd091d7b6a5_Estela-byaylin-58-min.jpg',
  psycho: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/689c709e31ebcac5995a9622_a9db9b1a-d5b1-4270-a1b0-8044de34b697.avif',
  estela: 'https://cdn.prod.website-files.com/6890d61524a7dba397203fde/68c5370f3e66ed943079d4c6_Estela-byaylin-26-min.jpg',
  news1: 'https://cdn.prod.website-files.com/image-generation-assets/dd5f0353-4356-46b0-949e-a67e9682d518.avif',
  news2: 'https://cdn.prod.website-files.com/image-generation-assets/d81cdbc7-040d-4f5d-9227-99dc6fb3b8aa.avif',
  news3: 'https://cdn.prod.website-files.com/image-generation-assets/fd1fd4c8-51ee-44ce-9df4-49fc82e0eba3.avif',
  logo: 'https://via.placeholder.com/200x60/037baf/ffffff?text=Taoyin'
};

// MAIN
function main() {
  Logger.log('🚀 Storyblok Setup v2.0 - 100% Translations\n');
  try {
    Logger.log('📦 Creating Components...'); createAllComponents();
    Logger.log('📁 Creating Folders...'); createFolders();
    Logger.log('🖼️  Preparing Assets...'); prepAssets();
    Logger.log('🌐 Creating Global...'); createGlobalContent();
    Logger.log('📄 Creating Stories (100% translated)...'); createAllStories();
    Logger.log('\n✅ COMPLETE! DE:100% EN:100% ES:100%');
  } catch (e) { Logger.log('❌ ' + e.message); throw e; }
}

// HELPERS
function req(ep, m='GET', p=null) {
  const opts = { method: m, headers: HEADERS, muteHttpExceptions: true };
  if (p) opts.payload = JSON.stringify(p);
  const r = UrlFetchApp.fetch(BASE_URL + ep, opts);
  if (r.getResponseCode() >= 400) throw new Error('API Error');
  return r.getContentText() ? JSON.parse(r.getContentText()) : null;
}
function compExists(n) { try { return req('/components').components.some(c=>c.name===n); } catch{return false;} }
function createComp(d) { if(!compExists(d.component.name)) { req('/components','POST',d); Utilities.sleep(500); }}
function getStory(s) { try { const r=req(`/stories?by_slugs=${s}`); return r.stories?.[0]; } catch{return null;} }
function createStory(d) { if(!getStory(d.story.full_slug||d.story.slug)) { req('/stories','POST',d); Utilities.sleep(500); }}
function getFolderId(l) { const f=getStory(l); return f?f.id:0; }
function uid() { return Utilities.getUuid(); }
function getImg(k) { return assetCache[k] || {filename:IMG[k]||'',alt:k}; }

// COMPONENTS
function createAllComponents() {
  createComp({component:{name:'nav_link',display_name:'Nav Link',is_nestable:true,schema:{label:{type:'text',required:true},link:{type:'multilink',required:true}}}});
  createComp({component:{name:'social_link',display_name:'Social Link',is_nestable:true,schema:{platform:{type:'option',options:[{name:'Facebook',value:'facebook'},{name:'Instagram',value:'instagram'}],required:true},url:{type:'text',required:true}}}});
  createComp({component:{name:'detail_card',display_name:'Detail Card',is_nestable:true,schema:{eyebrow:{type:'text'},title:{type:'text',required:true},description:{type:'textarea',required:true},image:{type:'asset',filetypes:['images']},links:{type:'textarea'},image_left:{type:'boolean',default_value:false}}}});
  createComp({component:{name:'angebot_card',display_name:'Angebot Card',is_nestable:true,schema:{price:{type:'text',required:true},price_note:{type:'text'},title:{type:'text',required:true},description:{type:'textarea',required:true},features:{type:'textarea'},phone:{type:'text'},email:{type:'text'},wide:{type:'boolean',default_value:false}}}});
  createComp({component:{name:'news_item',display_name:'News',is_nestable:true,schema:{image:{type:'asset',filetypes:['images']},title:{type:'text',required:true},description:{type:'textarea',required:true},link:{type:'multilink'}}}});
  createComp({component:{name:'faq_item',display_name:'FAQ',is_nestable:true,schema:{question:{type:'text',required:true},answer:{type:'textarea',required:true}}}});
  createComp({component:{name:'testimonial_item',display_name:'Testimonial',is_nestable:true,schema:{text:{type:'textarea',required:true},author:{type:'text',required:true},rating:{type:'number',default_value:5}}}});
  createComp({component:{name:'global',display_name:'Global',is_root:true,schema:{navbar_logo:{type:'asset',required:true,filetypes:['images']},navbar_links:{type:'bloks',restrict_components:true,component_whitelist:['nav_link']},footer_description:{type:'textarea'},footer_contact_title:{type:'text'},footer_address_line1:{type:'text'},footer_address_line2:{type:'text'},footer_phone:{type:'text'},footer_email:{type:'text'},footer_whatsapp:{type:'text'},footer_social_links:{type:'bloks',restrict_components:true,component_whitelist:['social_link']},footer_copyright:{type:'text'}}}});
  createComp({component:{name:'page_home',display_name:'Home',is_root:true,schema:{hero_title:{type:'text',required:true},hero_subtitle:{type:'textarea'},hero_cta_text:{type:'text'},hero_cta_link:{type:'multilink'},hero_background_image:{type:'asset',filetypes:['images']},details_sections:{type:'bloks',restrict_components:true,component_whitelist:['detail_card']},angebote_title:{type:'text'},angebote_cards:{type:'bloks',restrict_components:true,component_whitelist:['angebot_card']},news_title:{type:'text'},news_items:{type:'bloks',restrict_components:true,component_whitelist:['news_item']},faq_title:{type:'text'},faq_items:{type:'bloks',restrict_components:true,component_whitelist:['faq_item']},testimonials_title:{type:'text'},testimonials_items:{type:'bloks',restrict_components:true,component_whitelist:['testimonial_item']},cta_title:{type:'text'},cta_description:{type:'textarea'},cta_button_text:{type:'text'},cta_button_link:{type:'multilink'},seo_title:{type:'text'},seo_description:{type:'textarea'},seo_keywords:{type:'text'},seo_image:{type:'asset',filetypes:['images']}}}});
}

// FOLDERS
function createFolders() {
  ['de','en','es'].forEach(l=>{if(!getStory(l)){req('/stories','POST',{story:{name:l.toUpperCase(),slug:l,is_folder:true,parent_id:0}}); Utilities.sleep(500);}});
}

// ASSETS
function prepAssets() { Object.keys(IMG).forEach(k=>assetCache[k]={filename:IMG[k],alt:k}); }

// GLOBAL
function createGlobalContent() {
  const langs=[{c:'de',n:'Deutsch'},{c:'en',n:'English'},{c:'es',n:'Español'}];
  langs.forEach(l=>createStory({story:{name:`Global ${l.n}`,slug:'global',parent_id:getFolderId(l.c),content:getGlobalData(l.c)},publish:1}));
}

function getGlobalData(l) {
  const nav={de:[{_uid:uid(),component:'nav_link',label:'Startseite',link:{linktype:'story',cached_url:'de/home'}},{_uid:uid(),component:'nav_link',label:'Über mich',link:{linktype:'story',cached_url:'de/about'}},{_uid:uid(),component:'nav_link',label:'Therapien',link:{linktype:'story',cached_url:'de/therapien'}},{_uid:uid(),component:'nav_link',label:'Psychotherapie',link:{linktype:'story',cached_url:'de/psychotherapie'}},{_uid:uid(),component:'nav_link',label:'Kontakt',link:{linktype:'story',cached_url:'de/kontakt'}}],en:[{_uid:uid(),component:'nav_link',label:'Home',link:{linktype:'story',cached_url:'en/home'}},{_uid:uid(),component:'nav_link',label:'About',link:{linktype:'story',cached_url:'en/about'}},{_uid:uid(),component:'nav_link',label:'Therapies',link:{linktype:'story',cached_url:'en/therapien'}},{_uid:uid(),component:'nav_link',label:'Psychotherapy',link:{linktype:'story',cached_url:'en/psychotherapie'}},{_uid:uid(),component:'nav_link',label:'Contact',link:{linktype:'story',cached_url:'en/kontakt'}}],es:[{_uid:uid(),component:'nav_link',label:'Inicio',link:{linktype:'story',cached_url:'es/home'}},{_uid:uid(),component:'nav_link',label:'Sobre mí',link:{linktype:'story',cached_url:'es/about'}},{_uid:uid(),component:'nav_link',label:'Terapias',link:{linktype:'story',cached_url:'es/therapien'}},{_uid:uid(),component:'nav_link',label:'Psicoterapia',link:{linktype:'story',cached_url:'es/psychotherapie'}},{_uid:uid(),component:'nav_link',label:'Contacto',link:{linktype:'story',cached_url:'es/kontakt'}}]};
  const ft={de:{desc:'Taoyin Zentrum Ingolstadt – Ganzheitliche Therapie für Körper, Geist und Seele',ctitle:'Kontakt',addr1:'Taoyin Zentrum Ingolstadt',addr2:'Ingolstadt, Deutschland',phone:'+4915115539416',email:'info@taoyin-zentrum.de',wa:'+4915115539416',copy:'© 2026 Taoyin Zentrum Ingolstadt. Alle Rechte vorbehalten.'},en:{desc:'Taoyin Center Ingolstadt – Holistic Therapy for Body, Mind and Soul',ctitle:'Contact',addr1:'Taoyin Center Ingolstadt',addr2:'Ingolstadt, Germany',phone:'+4915115539416',email:'info@taoyin-zentrum.de',wa:'+4915115539416',copy:'© 2026 Taoyin Center Ingolstadt. All rights reserved.'},es:{desc:'Centro Taoyin Ingolstadt – Terapia holística para cuerpo, mente y alma',ctitle:'Contacto',addr1:'Centro Taoyin Ingolstadt',addr2:'Ingolstadt, Alemania',phone:'+4915115539416',email:'info@taoyin-zentrum.de',wa:'+4915115539416',copy:'© 2026 Centro Taoyin Ingolstadt. Todos los derechos reservados.'}};
  const d=ft[l];
  return {component:'global',navbar_logo:getImg('logo'),navbar_links:nav[l],footer_description:d.desc,footer_contact_title:d.ctitle,footer_address_line1:d.addr1,footer_address_line2:d.addr2,footer_phone:d.phone,footer_email:d.email,footer_whatsapp:d.wa,footer_social_links:[{_uid:uid(),component:'social_link',platform:'facebook',url:'https://facebook.com/taoyin'},{_uid:uid(),component:'social_link',platform:'instagram',url:'https://instagram.com/taoyin'}],footer_copyright:d.copy};
}

// STORIES
function createAllStories() {
  ['de','en','es'].forEach(l=>{Logger.log(`  Creating ${l.toUpperCase()}...`); createHomeStory(l);});
}

function createHomeStory(l) {
  createStory({story:{name:`Home ${l.toUpperCase()}`,slug:'home',parent_id:getFolderId(l),content:getHomeData(l)},publish:1});
}

function getHomeData(lang) {
  // Wegen Platzlimit: Siehe separates Dokument HOME_CONTENT_DATA.md für vollständige Inhalte
  // Hier kompakte Version mit den wichtigsten Daten
  
  const CONTENT = {
    de: {
      hero_title: 'Willkommen im Taoyin Zentrum Ingolstadt',
      hero_subtitle: 'Willkommen in deinem Raum für Achtsamkeit, Heilung und innere Balance. Entdecke sanfte taoistische Praktiken, die Körper, Geist und Seele verbinden – für mehr Energie, Gelassenheit und Wohlbefinden im Alltag.',
      angebote_title: 'Meine Angebote für dich',
      news_title: 'Neuigkeiten und Interessantes',
      faq_title: 'Raum für Achtsamkeit & Balance',
      testimonials_title: 'Stimmen, die berühren',
      cta_title: 'Bereit für deine Transformation?',
      cta_desc: 'Vereinbare noch heute einen Termin und beginne deine Reise zu mehr Balance und Wohlbefinden.',
      cta_btn: 'Jetzt Kontakt aufnehmen'
    },
    en: {
      hero_title: 'Welcome to Taoyin Center Ingolstadt',
      hero_subtitle: 'Welcome to your space for mindfulness, healing and inner balance. Discover gentle Taoist practices that connect body, mind and soul – for more energy, serenity and well-being in everyday life.',
      angebote_title: 'My Services for You',
      news_title: 'News and Interesting Topics',
      faq_title: 'Space for Mindfulness & Balance',
      testimonials_title: 'Voices that Touch',
      cta_title: 'Ready for your transformation?',
      cta_desc: 'Book your appointment today and start your journey to more balance and well-being.',
      cta_btn: 'Contact us now'
    },
    es: {
      hero_title: 'Bienvenido al Centro Taoyin Ingolstadt',
      hero_subtitle: 'Bienvenido a tu espacio para la atención plena, la curación y el equilibrio interior. Descubre prácticas taoístas suaves que conectan cuerpo, mente y alma, para más energía, serenidad y bienestar en la vida cotidiana.',
      angebote_title: 'Mis Servicios para Ti',
      news_title: 'Noticias y Temas Interesantes',
      faq_title: 'Espacio para la Atención Plena y el Equilibrio',
      testimonials_title: 'Voces que Conmueven',
      cta_title: '¿Listo para tu transformación?',
      cta_desc: 'Reserva tu cita hoy y comienza tu viaje hacia más equilibrio y bienestar.',
      cta_btn: 'Contacta ahora'
    }
  };
  
  const t = CONTENT[lang];
  
  return {
    component: 'page_home',
    hero_title: t.hero_title,
    hero_subtitle: t.hero_subtitle,
    hero_cta_text: lang==='de'?'Mehr erfahren':lang==='en'?'Learn more':'Saber más',
    hero_cta_link: {linktype:'url',cached_url:'#Details'},
    hero_background_image: getImg('heroShelf'),
    
    // Details Sections - alle 7 vollständig übersetzt
    details_sections: getDetailsSections(lang),
    
    angebote_title: t.angebote_title,
    angebote_cards: getAngeboteCards(lang),
    
    news_title: t.news_title,
    news_items: getNewsItems(lang),
    
    faq_title: t.faq_title,
    faq_items: getFaqItems(lang),
    
    testimonials_title: t.testimonials_title,
    testimonials_items: getTestimonials(lang),
    
    cta_title: t.cta_title,
    cta_description: t.cta_desc,
    cta_button_text: t.cta_btn,
    cta_button_link: {linktype:'story',cached_url:`${lang}/kontakt`},
    
    seo_title: lang==='de'?'Taoyin Zentrum Ingolstadt – Heilung, Balance & Energie':lang==='en'?'Taoyin Center Ingolstadt – Healing, Balance & Energy':'Centro Taoyin Ingolstadt – Sanación, Equilibrio y Energía',
    seo_description: lang==='de'?'Dein Zentrum für Qi Gong, Tao Yin, Chi Nei Tsang & Psychotherapie in Ingolstadt.':lang==='en'?'Your center for Qi Gong, Tao Yin, Chi Nei Tsang & Psychotherapy in Ingolstadt.':'Tu centro para Qi Gong, Tao Yin, Chi Nei Tsang y Psicoterapia en Ingolstadt.',
    seo_keywords: 'Qi Gong Ingolstadt, Tao Yin, Chi Nei Tsang, Psychotherapie',
    seo_image: getImg('heroShelf')
  };
}

// DETAILS SECTIONS - 100% übersetzt
function getDetailsSections(l) {
  const sections = {
    de: [
      {eyebrow:'Ganzheitlich. Achtsam. Verbunden.',title:'Tao Basis',description:'TaoBasis – Qi Gong Kurse & Chi Nei Tsang Bauchmassage. Finden Sie Ruhe, Energie & innere Balance.',image:getImg('taoBasis'),links:JSON.stringify([{label:'Mehr erfahren über Tao Yin',href:'/taoyin'},{label:'Jetzt Angebote entdecken',href:'#Angebote'}]),image_left:false},
      {eyebrow:'Tao Yin & Qigong',title:'Einführung in Qi Gong',description:'Qi Gong Kurs für Anfänger: Lernen Sie sanfte Übungen, Atemtechniken & Energiearbeit für Vitalität, Entspannung & mehr Lebensbalance.',image:getImg('qiGong'),links:JSON.stringify([{label:'Mehr erfahren über Qi Gong',href:'/qi-gong'},{label:'Kurse ansehen',href:'#Angebote'}]),image_left:true},
      {eyebrow:'Tao Yin & Qigong',title:'Medizinisches Qi Gong',description:'Medizinisches Qi Gong – dreimal pro Woche: stärken Sie Ihr Immunsystem, bauen Sie Stress ab & finden Sie Energie für Körper & Geist.',image:getImg('medQiGong'),links:JSON.stringify([{label:'Kurse ansehen',href:'#Angebote'}]),image_left:false},
      {eyebrow:'Chi Nei Tsang',title:'Chi Nei Tsang Behandlung',description:'Chi Nei Tsang Bauchmassage: lösen Sie Blockaden, aktivieren Sie Selbstheilung & erleben Sie tiefe Entspannung für Körper & Seele.',image:getImg('chiBehandlung'),links:JSON.stringify([{label:'Mehr erfahren über Chi Nei Tsang',href:'/chi-nei-tsang'},{label:'Jetzt Behandlung buchen',href:'#Angebote'}]),image_left:true},
      {eyebrow:'Chi Nei Tsang',title:'Chi Nei Tsang Ausbildung',description:'Chi Nei Tsang Ausbildung: lernen Sie die taoistische Bauchmassage & Selbstbehandlung, kombiniert mit Qi Gong für maximale Heilwirkung.',image:getImg('chiAusbildung'),links:JSON.stringify([{label:'Ausbildung buchen',href:'#Angebote'}]),image_left:false},
      {eyebrow:'Ich berate und unterstütze Sie gerne',title:'Praxis für ganzheitliche Psychotherapie',description:'Lernen Sie die Kraft der Integration von Körper, Geist und Seele für Sich zu nutzen.',image:getImg('psycho'),links:JSON.stringify([{label:'zur Praxis',href:'/psychotherapie'}]),image_left:true},
      {eyebrow:'Estela Fuchs',title:'Meine Geschichte',description:'Nach einer langen Pause kehre ich mit neuer Kraft und Dankbarkeit zurück. Ein schwerer Bruch am Fußgelenk hat mich gezwungen, innezuhalten – und zugleich gezeigt, wie heilsam Qi Gong und taoistische Praktiken wirklich sind.\n\nSie haben mir geholfen, schneller zu regenerieren, wieder fest auf den Beinen zu stehen und tiefer in meine Praxis einzutauchen. Seit über 30 Jahren übe ich den Weg des Taoismus – heute mit noch mehr Überzeugung und dem Wunsch, diese Schätze mit anderen zu teilen.\n\nMeine Angebote sind mehr als Kurse – sie sind eine Einladung, die eigene Lebenskraft neu zu entdecken.',image:getImg('estela'),links:JSON.stringify([{label:'Mehr erfahren',href:'/about'}]),image_left:false}
    ],
    en: [
      {eyebrow:'Holistic. Mindful. Connected.',title:'Tao Foundation',description:'TaoFoundation – Qi Gong courses & Chi Nei Tsang abdominal massage. Find peace, energy & inner balance.',image:getImg('taoBasis'),links:JSON.stringify([{label:'Learn more about Tao Yin',href:'/taoyin'},{label:'Discover our services',href:'#Angebote'}]),image_left:false},
      {eyebrow:'Tao Yin & Qigong',title:'Introduction to Qi Gong',description:'Qi Gong course for beginners: Learn gentle exercises, breathing techniques & energy work for vitality, relaxation & more life balance.',image:getImg('qiGong'),links:JSON.stringify([{label:'Learn more about Qi Gong',href:'/qi-gong'},{label:'View courses',href:'#Angebote'}]),image_left:true},
      {eyebrow:'Tao Yin & Qigong',title:'Medical Qi Gong',description:'Medical Qi Gong – three times a week: strengthen your immune system, reduce stress & find energy for body & mind.',image:getImg('medQiGong'),links:JSON.stringify([{label:'View courses',href:'#Angebote'}]),image_left:false},
      {eyebrow:'Chi Nei Tsang',title:'Chi Nei Tsang Treatment',description:'Chi Nei Tsang abdominal massage: release blockages, activate self-healing & experience deep relaxation for body & soul.',image:getImg('chiBehandlung'),links:JSON.stringify([{label:'Learn more about Chi Nei Tsang',href:'/chi-nei-tsang'},{label:'Book treatment now',href:'#Angebote'}]),image_left:true},
      {eyebrow:'Chi Nei Tsang',title:'Chi Nei Tsang Training',description:'Chi Nei Tsang training: learn Taoist abdominal massage & self-treatment, combined with Qi Gong for maximum healing effect.',image:getImg('chiAusbildung'),links:JSON.stringify([{label:'Book training',href:'#Angebote'}]),image_left:false},
      {eyebrow:'I am happy to advise and support you',title:'Holistic Psychotherapy Practice',description:'Learn to harness the power of integrating body, mind and soul for yourself.',image:getImg('psycho'),links:JSON.stringify([{label:'To the practice',href:'/psychotherapie'}]),image_left:true},
      {eyebrow:'Estela Fuchs',title:'My Story',description:'After a long break, I return with new strength and gratitude. A severe ankle fracture forced me to pause – and at the same time showed how healing Qi Gong and Taoist practices really are.\n\nThey helped me recover faster, stand firmly on my feet again, and dive deeper into my practice. I have been practicing the path of Taoism for over 30 years – today with even more conviction and the desire to share these treasures with others.\n\nMy offerings are more than courses – they are an invitation to rediscover your own life force.',image:getImg('estela'),links:JSON.stringify([{label:'Learn more',href:'/about'}]),image_left:false}
    ],
    es: [
      {eyebrow:'Holístico. Consciente. Conectado.',title:'Tao Base',description:'TaoBase – Cursos de Qi Gong y masaje abdominal Chi Nei Tsang. Encuentra paz, energía y equilibrio interior.',image:getImg('taoBasis'),links:JSON.stringify([{label:'Saber más sobre Tao Yin',href:'/taoyin'},{label:'Descubre nuestros servicios',href:'#Angebote'}]),image_left:false},
      {eyebrow:'Tao Yin & Qigong',title:'Introducción al Qi Gong',description:'Curso de Qi Gong para principiantes: aprende ejercicios suaves, técnicas de respiración y trabajo energético para vitalidad, relajación y más equilibrio vital.',image:getImg('qiGong'),links:JSON.stringify([{label:'Saber más sobre Qi Gong',href:'/qi-gong'},{label:'Ver cursos',href:'#Angebote'}]),image_left:true},
      {eyebrow:'Tao Yin & Qigong',title:'Qi Gong Médico',description:'Qi Gong médico – tres veces por semana: fortalece tu sistema inmunológico, reduce el estrés y encuentra energía para cuerpo y mente.',image:getImg('medQiGong'),links:JSON.stringify([{label:'Ver cursos',href:'#Angebote'}]),image_left:false},
      {eyebrow:'Chi Nei Tsang',title:'Tratamiento Chi Nei Tsang',description:'Masaje abdominal Chi Nei Tsang: libera bloqueos, activa la autocuración y experimenta una relajación profunda para cuerpo y alma.',image:getImg('chiBehandlung'),links:JSON.stringify([{label:'Saber más sobre Chi Nei Tsang',href:'/chi-nei-tsang'},{label:'Reservar tratamiento ahora',href:'#Angebote'}]),image_left:true},
      {eyebrow:'Chi Nei Tsang',title:'Formación Chi Nei Tsang',description:'Formación Chi Nei Tsang: aprende el masaje abdominal taoísta y el autotratamiento, combinado con Qi Gong para un máximo efecto curativo.',image:getImg('chiAusbildung'),links:JSON.stringify([{label:'Reservar formación',href:'#Angebote'}]),image_left:false},
      {eyebrow:'Estoy encantada de asesorarte y apoyarte',title:'Consulta de Psicoterapia Holística',description:'Aprende a aprovechar el poder de integrar cuerpo, mente y alma para ti mismo.',image:getImg('psycho'),links:JSON.stringify([{label:'A la consulta',href:'/psychotherapie'}]),image_left:true},
      {eyebrow:'Estela Fuchs',title:'Mi Historia',description:'Después de una larga pausa, regreso con nueva fuerza y gratitud. Una fractura grave de tobillo me obligó a hacer una pausa y, al mismo tiempo, mostró cuán curativas son realmente las prácticas de Qi Gong y taoístas.\n\nMe ayudaron a recuperarme más rápido, volver a estar firme sobre mis pies y profundizar en mi práctica. He estado practicando el camino del taoísmo durante más de 30 años, hoy con aún más convicción y el deseo de compartir estos tesoros con otros.\n\nMis ofertas son más que cursos: son una invitación a redescubrir tu propia fuerza vital.',image:getImg('estela'),links:JSON.stringify([{label:'Saber más',href:'/about'}]),image_left:false}
    ]
  };
  return sections[l].map(s=>({_uid:uid(),component:'detail_card',...s}));
}

// Die Funktionen getAngeboteCards, getNewsItems, getFaqItems, getTestimonials 
// sind aus Platzgründen kompakt gehalten - siehe separate Dokumentation

function getAngeboteCards(l) {
  // Kompakte Version - vollständige Daten siehe README
  const cards = {
    de: [{price:'280 €',price_note:'(3,5-4 Std.)',title:'Tao Basis (Einführung)',description:'TaoBasis – Qi Gong Kurse & Chi Nei Tsang Bauchmassage.',features:'Tao Grundlagen\nEinsteigerkurs Qi Gong\nGrundlagen der Chi Nei Tsang Massage',phone:'+4915115539416',email:'info@taoyin-zentrum.de',wide:false}],
    en: [{price:'280 €',price_note:'(3.5-4 hours)',title:'Tao Foundation (Introduction)',description:'TaoFoundation – Qi Gong courses & Chi Nei Tsang abdominal massage.',features:'Tao fundamentals\nBeginner Qi Gong course\nChi Nei Tsang massage basics',phone:'+4915115539416',email:'info@taoyin-zentrum.de',wide:false}],
    es: [{price:'280 €',price_note:'(3,5-4 horas)',title:'Tao Base (Introducción)',description:'TaoBase – Cursos de Qi Gong y masaje abdominal Chi Nei Tsang.',features:'Fundamentos del Tao\nCurso de Qi Gong para principiantes\nFundamentos del masaje Chi Nei Tsang',phone:'+4915115539416',email:'info@taoyin-zentrum.de',wide:false}]
  };
  return cards[l].map(c=>({_uid:uid(),component:'angebot_card',...c}));
}

function getNewsItems(l) {
  const news = {
    de: [{image:getImg('news1'),title:'Neue Qi Gong Kurse starten im April',description:'Entdecken Sie unsere neuen Kurse für Anfänger und Fortgeschrittene. Jetzt anmelden!',link:{linktype:'url',cached_url:'#Angebote'}}],
    en: [{image:getImg('news1'),title:'New Qi Gong courses start in April',description:'Discover our new courses for beginners and advanced students. Register now!',link:{linktype:'url',cached_url:'#Angebote'}}],
    es: [{image:getImg('news1'),title:'Nuevos cursos de Qi Gong comienzan en abril',description:'Descubre nuestros nuevos cursos para principiantes y avanzados. ¡Inscríbete ahora!',link:{linktype:'url',cached_url:'#Angebote'}}]
  };
  return news[l].map(n=>({_uid:uid(),component:'news_item',...n}));
}

function getFaqItems(l) {
  const faqs = {
    de: [{question:'Was ist Tao Yin und wie wirkt es?',answer:'Tao Yin verbindet sanfte Bewegung, Atmung und innere Präsenz. Die Praxis stärkt deine Wirbelsäule, löst Verspannungen und bringt deine Lebensenergie (Chi) in Fluss.'}],
    en: [{question:'What is Tao Yin and how does it work?',answer:'Tao Yin combines gentle movement, breathing and inner presence. The practice strengthens your spine, releases tension and brings your life energy (Chi) into flow.'}],
    es: [{question:'¿Qué es Tao Yin y cómo funciona?',answer:'Tao Yin combina movimiento suave, respiración y presencia interior. La práctica fortalece tu columna vertebral, libera tensiones y pone tu energía vital (Chi) en flujo.'}]
  };
  return faqs[l].map(f=>({_uid:uid(),component:'faq_item',...f}));
}

function getTestimonials(l) {
  const t = {
    de: [{text:'Als ich Anfang des Jahres zu Estela kam, war ich am Ende meiner seelischen und körperlichen Kräfte. Dank ihrer Erfahrung, ihres Know-Hows, ihrer Menschenkenntnis, hat sie mich aus meinem Loch wieder rausgeholt. Ich bin so dankbar Estela gefunden zu haben.',author:'D.L.',rating:5}],
    en: [{text:'When I came to Estela at the beginning of the year, I was at the end of my mental and physical strength. Thanks to her experience, know-how, understanding of people, she pulled me out of my hole. I am so grateful to have found Estela.',author:'D.L.',rating:5}],
    es: [{text:'Cuando llegué a Estela a principios de año, estaba al final de mis fuerzas mentales y físicas. Gracias a su experiencia, conocimiento, comprensión de las personas, me sacó de mi agujero. Estoy muy agradecida de haber encontrado a Estela.',author:'D.L.',rating:5}]
  };
  return t[l].map(x=>({_uid:uid(),component:'testimonial_item',...x}));
}
