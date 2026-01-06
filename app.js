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

  /* ==================== Firebase INIT ==================== */
  let db = null;

  try {
    const firebaseConfig = {
      apiKey: "AIzaSyD5Hrfk6tU22ITquRR3xt957WmlnvPTw5M",
      authDomain: "aem-site-4e030.firebaseapp.com",
      projectId: "aem-site-4e030",
      storageBucket: "aem-site-4e030.firebasestorage.app",
      messagingSenderId: "241838556898",
      appId: "1:241838556898:web:9eb591e3d05405894800bb",
      measurementId: "G-DTNBCK5H1F"
    };

    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
  } catch (e) {
    console.warn("Firebase init skipped:", e);
  }

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

  /* ==================== Visits ==================== */
  async function trackVisit() {
    if (!db) return;

    const visitsRef = db.collection("siteStats").doc("visits");

    const visitorData = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      visitedAt: new Date()
    };

    try {
      await db.runTransaction(async (transaction) => {
        const doc = await transaction.get(visitsRef);
        if (!doc.exists) {
          transaction.set(visitsRef, {
            total: 1,
            logs: [visitorData]
          });
        } else {
          transaction.update(visitsRef, {
            total: doc.data().total + 1,
            logs: firebase.firestore.FieldValue.arrayUnion(visitorData)
          });
        }
      });
    } catch (e) {
      console.warn("Visit tracking failed:", e);
    }
  }

  function loadVisitsCount() {
    if (!db) return;
    const el = document.getElementById('visit-count');
    if (!el) return;

    db.collection("siteStats")
      .doc("visits")
      .onSnapshot(doc => {
        if (doc.exists) {
          const n = doc.data().total;
          el.textContent =
            currentLang === 'ar'
              ? `عدد الزوار: ${n}`
              : `Nombre de visiteurs : ${n}`;
        }
      });
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

  /* ==================== Init ==================== */
  updateTime();
  startNewsRotation();
  initFAQ();
  updateEqualizerVisibility();
  setInterval(updateTime, 1000);

  /* ✅ VISITS */
  trackVisit();
  loadVisitsCount();

});
