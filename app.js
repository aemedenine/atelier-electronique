// app.js
// ===============================
// Atelier Electronique Médenine
// جميع وظائف الواجهة: الوقت، الزيارات، الأخبار، الراديو، toggle اللغة، FAQ، PCB animated background، slider، rating stars، Weather
// ===============================

document.addEventListener('DOMContentLoaded', () => {
  // ======= Variables =======
  let currentLang = document.documentElement.lang && document.documentElement.lang.startsWith('ar') ? 'ar' : 'fr';

  const ticker = document.getElementById('live-news');
  const toggleBtn = document.getElementById('toggle-lang-btn');
  const visitEl = document.getElementById('visit-count');
  const timeEl = document.getElementById('current-time');
  const faqContainer = document.querySelector('.faq');
  const radio = document.getElementById('radio-stream');
  const radioBtn = document.getElementById('radio-btn');
  const equalizer = document.getElementById('equalizer');
  const ratingStars = document.querySelectorAll('.rating-star');
  const sliderContainer = document.querySelector('.slider-container');
  const sliderItems = document.querySelectorAll('.slider-item');

  // ======= Time =======
  function updateTime() {
    const now = new Date();
    const daysAr = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const monthsAr = ['جانفي','فيفري','مارس','أفريل','ماي','جوان','جويلية','أوت','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    const daysFr = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const monthsFr = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

    let day, month;
    if(currentLang === 'ar'){
      day = daysAr[now.getDay()];
      month = monthsAr[now.getMonth()];
    } else {
      day = daysFr[now.getDay()];
      month = monthsFr[now.getMonth()];
    }

    const date = now.getDate();
    const hours = now.getHours().toString().padStart(2,'0');
    const minutes = now.getMinutes().toString().padStart(2,'0');
    const seconds = now.getSeconds().toString().padStart(2,'0');

    const timeStr = `${hours}:${minutes}:${seconds}`;
    const dateStr = currentLang === 'ar' 
      ? `${day}، ${date} ${month}` 
      : `${day}, ${date} ${month}`;

    if(timeEl) timeEl.textContent = `${dateStr} - ${timeStr}`;
  }

  // ======= Visits =======
  function updateVisits() {
    const key = 'aem-visit-count';
    let count = parseInt(localStorage.getItem(key)) || 0;
    count++;
    localStorage.setItem(key, count);
    if(visitEl) visitEl.textContent = currentLang === 'ar' ? `عدد زياراتك: ${count}` : `Nombre de visites: ${count}`;
  }

  // ======= News rotation =======
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

  function updateNews() {
    if(!ticker) return;
    const news = currentLang === 'ar' ? newsAr : newsFr;
    ticker.classList.remove('fade');
    void ticker.offsetWidth;
    ticker.textContent = news[newsIndex];
    ticker.classList.add('fade');
    newsIndex = (newsIndex + 1) % news.length;
  }

  function startNewsRotation() {
    if (newsInterval) clearInterval(newsInterval);
    updateNews();
    newsInterval = setInterval(updateNews, 5000);
  }

  // ======= FAQ =======
  function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('open');
      });
    });
  }

  // ======= Radio & Equalizer =======
  function updateEqualizerVisibility() {
    if (!equalizer) return;
    if (!radio || radio.paused) {
      equalizer.style.opacity = '0.25';
      equalizer.style.pointerEvents = 'none';
    } else {
      equalizer.style.opacity = '1';
      equalizer.style.pointerEvents = 'auto';
    }
  }

  if(radioBtn) {
    radioBtn.addEventListener('click', () => {
      if (radio.paused) {
        radio.play().catch(e => console.warn('Radio play failed:', e));
        radioBtn.textContent = currentLang === 'ar' ? 'أوقف الراديو' : 'Arrêter la radio';
      } else {
        radio.pause();
        radioBtn.textContent = currentLang === 'ar' ? 'شغّل الراديو' : 'Écouter la radio';
      }
      updateEqualizerVisibility();
    });
  }

  if(radio) {
    radio.addEventListener('play', updateEqualizerVisibility);
    radio.addEventListener('pause', updateEqualizerVisibility);
  }

  // ======= Language toggle =======
  function setLanguage(lang) {
    currentLang = lang;
    if(lang === 'ar'){
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
      document.querySelector('header h1').textContent = 'Atelier Electronique Médenine';
      document.querySelector('.experience-badge').textContent = 'أكثر من 10 سنوات خبرة';
      if(toggleBtn) toggleBtn.textContent = 'تبديل اللغة';   
    } else {
      document.documentElement.lang = 'fr';
      document.documentElement.dir = 'ltr';
      document.querySelector('header h1').textContent = 'Atelier Electronique Médenine';
      document.querySelector('.experience-badge').textContent = 'Plus de 10 ans d\'expérience';
      if(toggleBtn) toggleBtn.textContent = 'Changer la langue';
    }

    startNewsRotation();
    updateTime();
    updateVisits();
    initFAQ();
  }

  if(toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      setLanguage(currentLang === 'ar' ? 'fr' : 'ar');
    });
  }

  // ======= Slider drag =======
  if(sliderContainer && sliderItems.length) {
    let isDown = false;
    let startX, scrollLeft;
    sliderContainer.addEventListener('mousedown', e => {
      isDown = true;
      sliderContainer.classList.add('active');
      startX = e.pageX - sliderContainer.offsetLeft;
      scrollLeft = sliderContainer.scrollLeft;
    });
    sliderContainer.addEventListener('mouseleave', () => { isDown = false; sliderContainer.classList.remove('active'); });
    sliderContainer.addEventListener('mouseup', () => { isDown = false; sliderContainer.classList.remove('active'); });
    sliderContainer.addEventListener('mousemove', e => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - sliderContainer.offsetLeft;
      const walk = (x - startX) * 2; //scroll-fast
      sliderContainer.scrollLeft = scrollLeft - walk;
    });
  }

  // ======= Rating stars =======
  if(ratingStars.length){
    ratingStars.forEach(star => {
      star.addEventListener('click', () => {
        ratingStars.forEach(s => s.classList.remove('active'));
        star.classList.add('active');
      });
    });
  }

  // ======= Initialization =======
  setInterval(updateTime, 1000);
  updateTime();
  updateVisits();
  startNewsRotation();
  initFAQ();
  updateEqualizerVisibility();
});
