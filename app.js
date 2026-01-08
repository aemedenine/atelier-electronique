document.addEventListener('DOMContentLoaded', () => {
  let currentLang = document.documentElement.lang.startsWith('ar') ? 'ar' : 'fr';
  const ticker = document.getElementById('live-news');
  const toggleBtn = document.getElementById('toggle-lang-btn');
  const timeEl = document.getElementById('current-time');
  const faqContainer = document.getElementById('faqContainer');
  const radio = document.getElementById('radio-stream');
  const radioBtn = document.getElementById('radio-btn');
  const equalizer = document.getElementById('equalizer');
  const visitEl = document.getElementById('visit-count');

  // Time
  const updateTime = () => {
    const now = new Date();
    const daysAr = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const monthsAr = ['جانفي','فيفري','مارس','أفريل','ماي','جوان','جويلية','أوت','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    const daysFr = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const monthsFr = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

    let day = currentLang === 'ar' ? daysAr[now.getDay()] : daysFr[now.getDay()];
    let month = currentLang === 'ar' ? monthsAr[now.getMonth()] : monthsFr[now.getMonth()];

    const date = now.getDate();
    const hours = now.getHours().toString().padStart(2,'0');
    const minutes = now.getMinutes().toString().padStart(2,'0');
    const seconds = now.getSeconds().toString().padStart(2,'0');

    if(timeEl) timeEl.textContent = `${currentLang==='ar'? `${day}، ${date} ${month}`: `${day}, ${date} ${month}`} - ${hours}:${minutes}:${seconds}`;
  };

  // Visits
  const updateVisits = () => {
    if(!visitEl) return;
    const key = 'aem-visit-count';
    let count = parseInt(localStorage.getItem(key)) || 0;
    count++;
    localStorage.setItem(key, count);
    visitEl.textContent = currentLang==='ar'? `عدد زياراتك: ${count}`:`Nombre de visites: ${count}`;
  };

  updateVisits();

  // News
  const newsAr = [
    "📢 ورشة إلكترونيك الرحماني تفتح أبوابها لجميع الولايات.",
    "🔧 خدمات تصليح الأجهزة الإلكترونية بجودة عالية وبأسعار منافسة.",
    "🌍 التوصيل عبر البريد متوفر لكل أنحاء تونس.",
    "📱 تواصل معنا عبر واتساب لأي استفسار."
  ];
  const newsFr = [
    "📢 Atelier Electronique Médenine ouvre ses portes pour toutes les régions.",
    "🔧 Services de réparation électronique de haute qualité à prix compétitifs.",
    "🌍 Livraison par courrier disponible dans toute la Tunisie.",
    "📱 Contactez-nous via WhatsApp pour toute question."
  ];

  let newsIndex = 0;
  let newsInterval = null;

  const updateNews = () => {
    if(!ticker) return;
    const news = currentLang==='ar'? newsAr : newsFr;
    ticker.classList.remove('fade');
    void ticker.offsetWidth;
    ticker.textContent = news[newsIndex];
    ticker.classList.add('fade');
    newsIndex = (newsIndex + 1) % news.length;
  };

  const startNewsRotation = () => {
    if(newsInterval) clearInterval(newsInterval);
    updateNews();
    newsInterval = setInterval(updateNews, 5000);
  };

  // FAQ
  const initFAQ = () => {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => item.addEventListener('click', () => item.classList.toggle('open')));
  };

  // Equalizer
  const updateEqualizerVisibility = () => {
    if(!equalizer) return;
    equalizer.style.opacity = radio.paused ? '0.25':'1';
    equalizer.style.pointerEvents = radio.paused ? 'none':'auto';
  };

  // Radio
  if(radioBtn && radio){
    radioBtn.addEventListener('click', () => {
      if(radio.paused){
        radio.play().catch(e=>console.warn('Radio play failed:', e));
        radioBtn.textContent = currentLang==='ar'? 'أوقف الراديو' : 'Arrêter la radio';
      } else {
        radio.pause();
        radioBtn.textContent = currentLang==='ar'? 'شغّل الراديو' : 'Écouter la radio';
      }
      updateEqualizerVisibility();
    });
    radio.addEventListener('play', updateEqualizerVisibility);
    radio.addEventListener('pause', updateEqualizerVisibility);
  }

  // Language toggle
  const setLanguage = (lang) => {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang==='ar'? 'rtl':'ltr';

    const expBadge = document.querySelector('.experience-badge');
    if(expBadge) expBadge.textContent = lang==='ar'? 'أكثر من 10 سنوات خبرة':'Plus de 10 ans d\'expérience';

    if(toggleBtn) toggleBtn.textContent = lang==='ar'? 'تبديل اللغة':'Changer la langue';
    startNewsRotation();
    updateTime();
    initFAQ();
    updateEqualizerVisibility();
  };

  if(toggleBtn) toggleBtn.addEventListener('click', ()=> setLanguage(currentLang==='ar'? 'fr':'ar'));

  setInterval(updateTime,1000);
  updateTime();
  startNewsRotation();
  initFAQ();
  updateEqualizerVisibility();
});
