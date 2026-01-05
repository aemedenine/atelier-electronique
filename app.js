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

 
/* ================= Calcul Résistance ================= */

/* ================= Calcul Résistance ================= */

const colors = [
  { name: "Noir", value: 0, multiplier: 1, tolerance: null },
  { name: "Marron", value: 1, multiplier: 10, tolerance: 1 },
  { name: "Rouge", value: 2, multiplier: 100, tolerance: 2 },
  { name: "Orange", value: 3, multiplier: 1_000, tolerance: null },
  { name: "Jaune", value: 4, multiplier: 10_000, tolerance: null },
  { name: "Vert", value: 5, multiplier: 100_000, tolerance: 0.5 },
  { name: "Bleu", value: 6, multiplier: 1_000_000, tolerance: 0.25 },
  { name: "Violet", value: 7, multiplier: 10_000_000, tolerance: 0.1 },
  { name: "Gris", value: 8, multiplier: null, tolerance: 0.05 },
  { name: "Blanc", value: 9, multiplier: null, tolerance: null },
  { name: "Or", value: null, multiplier: 0.1, tolerance: 5 },
  { name: "Argent", value: null, multiplier: 0.01, tolerance: 10 }
];

const band1 = document.getElementById('band1');
const band2 = document.getElementById('band2');
const band3 = document.getElementById('band3');
const band4 = document.getElementById('band4');
const band5 = document.getElementById('band5');

const typeSelect = document.getElementById('resistance-type-select');
const band3Wrap = document.getElementById('band3-wrapper');
const band5Wrap = document.getElementById('band5-wrapper');

if (typeSelect) {

  function fillSelect(select, filter) {
    select.innerHTML = '';
    colors.filter(filter).forEach(c => {
      const opt = document.createElement('option');
      opt.value = JSON.stringify(c);
      opt.textContent = c.name;
      select.appendChild(opt);
    });
  }

  function updateBands() {
    const type = typeSelect.value;

    fillSelect(band1, c => c.value !== null);
    fillSelect(band2, c => c.value !== null);
    fillSelect(band4, c => c.multiplier !== null);
    fillSelect(band5, c => c.tolerance !== null);

    if (type === '4') {
      band3Wrap.style.display = 'none';
    } else {
      band3Wrap.style.display = 'block';
      fillSelect(band3, c => c.value !== null);
    }
  }

  typeSelect.addEventListener('change', updateBands);
  updateBands();

  document.getElementById('calc-resistance').addEventListener('click', () => {
    const c1 = JSON.parse(band1.value);
    const c2 = JSON.parse(band2.value);
    const mult = JSON.parse(band4.value);
    const tol = JSON.parse(band5.value);

    let value;
    if (typeSelect.value === '4') {
      value = (c1.value * 10 + c2.value) * mult.multiplier;
    } else {
      const c3 = JSON.parse(band3.value);
      value = (c1.value * 100 + c2.value * 10 + c3.value) * mult.multiplier;
    }

    const display =
      value >= 1_000_000 ? (value / 1_000_000) + " MΩ" :
      value >= 1_000 ? (value / 1_000) + " kΩ" :
      value + " Ω";

    document.getElementById('resistance-value').textContent = display;
    document.getElementById('resistance-tolerance').textContent =
      tol.tolerance ? `± ${tol.tolerance}%` : '';
  });
}


  /* ==================== Init ==================== */
  updateTime();
  startNewsRotation();
  initFAQ();
  updateEqualizerVisibility();
  setInterval(updateTime, 1000);

});
