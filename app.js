// app.js
// All client logic: UI, language toggle, news, time, visits, radio, equalizer, FAQ

document.addEventListener('DOMContentLoaded', () => {

  /* ==================== Language ==================== */
  let currentLang =
    document.documentElement.lang &&
    document.documentElement.lang.startsWith('ar')
      ? 'ar'
      : 'fr';

  /* ==================== Elements ==================== */
  const ticker = document.getElementById('live-news');
  const toggleBtn = document.getElementById('toggle-lang-btn');
  const timeEl = document.getElementById('current-time');
  const faqContainer = document.querySelector('.faq');
  const radio = document.getElementById('radio-stream');
  const radioBtn = document.getElementById('radio-btn');
  const equalizer = document.getElementById('equalizer');

  /* ==================== Time ==================== */
  function updateTime() {
    if (!timeEl) return;

    const now = new Date();

    const daysAr = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const monthsAr = ['جانفي','فيفري','مارس','أفريل','ماي','جوان','جويلية','أوت','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

    const daysFr = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const monthsFr = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

    const day =
      currentLang === 'ar'
        ? daysAr[now.getDay()]
        : daysFr[now.getDay()];

    const month =
      currentLang === 'ar'
        ? monthsAr[now.getMonth()]
        : monthsFr[now.getMonth()];

    const date = now.getDate();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');

    const dateStr =
      currentLang === 'ar'
        ? `${day}، ${date} ${month}`
        : `${day}, ${date} ${month}`;

    timeEl.textContent = `${dateStr} - ${h}:${m}:${s}`;
  }

  /* ==================== News ==================== */
  const newsAr = [
    "📢 ورشة إلكترونيك الرحماني تفتح أبوابها لجميع الولايات.",
    "🔧 خدمات تصليح الأجهزة الإلكترونية بجودة عالية وبأسعار منافسة.",
    "🌍 التوصيل عبر البريد متوفر لكل أنحاء تونس.",
    "📱 تواصل معنا عبر واتساب لأي استفسار."
  ];

  const newsFr = [
    "📢 Atelier Electronique Médenine ouvre ses portes pour toutes les régions.",
    "🔧 Services de réparation électronique de haute qualité à prix compétitif.",
    "🌍 Livraison disponible dans toute la Tunisie.",
    "📱 Contactez-nous via WhatsApp."
  ];

  let newsIndex = 0;
  let newsInterval = null;

  function updateNews() {
    if (!ticker) return;

    const list = currentLang === 'ar' ? newsAr : newsFr;
    ticker.classList.remove('fade');
    void ticker.offsetWidth;
    ticker.textContent = list[newsIndex];
    ticker.classList.add('fade');

    newsIndex = (newsIndex + 1) % list.length;
  }

  function startNewsRotation() {
    if (newsInterval) clearInterval(newsInterval);
    updateNews();
    newsInterval = setInterval(updateNews, 5000);
  }

  /* ==================== FAQ ==================== */
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('open');
      });
    });
  }

  /* ==================== Radio ==================== */
  function updateEqualizerVisibility() {
    if (!equalizer || !radio) return;
    equalizer.style.opacity = radio.paused ? '0.3' : '1';
  }

  if (radioBtn && radio) {
    radioBtn.addEventListener('click', () => {
      if (radio.paused) {
        radio.play().catch(()=>{});
        radioBtn.textContent =
          currentLang === 'ar' ? 'أوقف الراديو' : 'Arrêter la radio';
      } else {
        radio.pause();
        radioBtn.textContent =
          currentLang === 'ar' ? 'شغّل الراديو' : 'Écouter la radio';
      }
      updateEqualizerVisibility();
    });

    radio.addEventListener('play', updateEqualizerVisibility);
    radio.addEventListener('pause', updateEqualizerVisibility);
  }

  /* ==================== Language Toggle ==================== */
  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    toggleBtn.textContent =
      lang === 'ar' ? 'تبديل اللغة' : 'Changer la langue';

    startNewsRotation();
    updateTime();
    initFAQ();
    updateEqualizerVisibility();
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      setLanguage(currentLang === 'ar' ? 'fr' : 'ar');
    });
  }

  /* ==================== Resistance Calculator (SAFE) ==================== */
  const typeSelect = document.getElementById('resistance-type-select');
  const calcBtn = document.getElementById('calc-resistance');

  if (typeSelect && calcBtn) {

    const colorValues = {
      noir:0,marron:1,rouge:2,orange:3,jaune:4,
      vert:5,bleu:6,violet:7,gris:8,blanc:9
    };

    const multiplierValues = {
      noir:1,marron:10,rouge:100,orange:1e3,jaune:1e4,
      vert:1e5,bleu:1e6,violet:1e7,gris:1e8,or:0.1,argent:0.01
    };

    const toleranceValues = {
      marron:'±1%',rouge:'±2%',vert:'±0.5%',
      bleu:'±0.25%',violet:'±0.1%',gris:'±0.05%',
      or:'±5%',argent:'±10%'
    };

    const bands = ['band1','band2','band3','band4','band5']
      .map(id => document.getElementById(id));

    typeSelect.addEventListener('change', () => {
      const b5 = document.getElementById('band5-container');
      if (b5) b5.style.display = typeSelect.value === '4' ? 'none' : 'block';
    });

    calcBtn.addEventListener('click', () => {
      let value = 0;
      let tol = '';

      if (typeSelect.value === '4') {
        value =
          (colorValues[bands[0].value] * 10 +
           colorValues[bands[1].value]) *
          multiplierValues[bands[2].value];
        tol = toleranceValues[bands[3].value];
      } else {
        value =
          (colorValues[bands[0].value] * 100 +
           colorValues[bands[1].value] * 10 +
           colorValues[bands[4].value]) *
          multiplierValues[bands[2].value];
        tol = toleranceValues[bands[3].value];
      }

      document.getElementById('resistance-value').textContent = value + ' Ω';
      document.getElementById('resistance-tolerance').textContent = tol;
      document.getElementById('resistance-conversion').textContent =
        value >= 1000 ? value / 1000 + ' kΩ' : value + ' Ω';
    });
  }

  /* ==================== Init ==================== */
  updateTime();
  startNewsRotation();
  initFAQ();
  updateEqualizerVisibility();
  setInterval(updateTime, 1000);

});
