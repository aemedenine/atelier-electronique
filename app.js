// app.js – Logic for UI, language toggle, news, time, visits, radio, equalizer, FAQ
document.addEventListener('DOMContentLoaded', () => {
  // ----- Variables -----
  let currentLang = document.documentElement.lang?.startsWith('ar') ? 'ar' : 'fr';
  const ticker = document.getElementById('live-news');
  const toggleBtn = document.getElementById('toggle-lang-btn');
  const visitEl = document.getElementById('visit-count');
  const timeEl = document.getElementById('current-time');
  const faqContainer = document.querySelector('.faq');
  const radio = document.getElementById('radio-stream');
  const radioBtn = document.getElementById('radio-btn');
  const equalizer = document.getElementById('equalizer');

  // ----- Time -----
  function updateTime() {
    const now = new Date();
    const daysAr = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const monthsAr = ['جانفي','فيفري','مارس','أفريل','ماي','جوان','جويلية','أوت','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    const daysFr = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const monthsFr = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

    const day = currentLang === 'ar' ? daysAr[now.getDay()] : daysFr[now.getDay()];
    const month = currentLang === 'ar' ? monthsAr[now.getMonth()] : monthsFr[now.getMonth()];
    const dateStr = currentLang === 'ar'
      ? `${day}، ${now.getDate()} ${month}`
      : `${day}, ${now.getDate()} ${month}`;
    const timeStr = now.toLocaleTimeString('ar-TN', { hour12: false });

    timeEl.textContent = `${dateStr} - ${timeStr}`;
  }

  setInterval(updateTime, 1000);
  updateTime();

  // ----- Visits -----
  function updateVisits() {
    const key = 'aem-visit-count';
    let count = parseInt(localStorage.getItem(key)) || 0;
    count++;
    localStorage.setItem(key, count);
    visitEl.textContent = currentLang === 'ar' 
      ? `عدد زياراتك: ${count}`
      : `Nombre de visites: ${count}`;
  }

  updateVisits();

  // ----- News Rotation -----
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
    const newsArr = currentLang === 'ar' ? newsAr : newsFr;
    ticker.classList.remove('fade');
    void ticker.offsetWidth; // force reflow for animation
    ticker.textContent = newsArr[newsIndex];
    ticker.classList.add('fade');
    newsIndex = (newsIndex + 1) % newsArr.length;
  }

  function startNewsRotation() {
    if (newsInterval) clearInterval(newsInterval);
    updateNews();
    newsInterval = setInterval(updateNews, 5000);
  }

  startNewsRotation();

  // ----- FAQ -----
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
      item.addEventListener('click', () => item.classList.toggle('open'));
    });
  }

  initFAQ();

  // ----- Radio + Equalizer -----
  function updateEqualizerVisibility() {
    if (!equalizer || !radio) return;
    equalizer.style.opacity = radio.paused ? '0.25' : '1';
    equalizer.style.pointerEvents = radio.paused ? 'none' : 'auto';
  }

  if (radioBtn) {
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

  radio?.addEventListener('play', updateEqualizerVisibility);
  radio?.addEventListener('pause', updateEqualizerVisibility);
  updateEqualizerVisibility();

  // ----- Language Toggle -----
  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Update UI elements
    document.querySelector('header h1').textContent = 'Atelier Electronique Médenine';
    document.querySelector('.experience-badge').textContent = lang === 'ar' ? '🌼 أكثر من 10 سنوات خبرة' : '🌼 Plus de 10 ans d\'expérience';
    toggleBtn.textContent = lang === 'ar' ? 'تبديل اللغة' : 'Changer la langue';
    radioBtn.textContent = radio.paused 
      ? (lang === 'ar' ? 'شغّل الراديو' : 'Écouter la radio') 
      : (lang === 'ar' ? 'أوقف الراديو' : 'Arrêter la radio');

    // Buttons
    document.querySelector('.btn-whatsapp').textContent = lang === 'ar' ? 'واتساب' : 'WhatsApp';
    document.querySelector('.btn-maps').textContent = lang === 'ar' ? 'موقعنا على Google Maps' : 'Voir sur Google Maps';
    document.querySelector('.btn-gallery').textContent = lang === 'ar' ? 'شاهد الصور' : 'Voir les photos';
    document.querySelector('.btn-video').textContent = lang === 'ar' ? 'شاهد الفيديو' : 'Voir les vidéos';
    document.querySelector('.btn-services').textContent = lang === 'ar' ? 'خدمات الورشة' : 'Services de l\'atelier';

    // FAQ rebuild
    faqContainer.innerHTML = lang === 'ar' 
      ? `<h2>الأسئلة الشائعة</h2>
         <div class="faq-item"><h3>كيف يمكنني إرسال جهاز للإصلاح؟</h3><div class="answer">يمكنك إرسال الجهاز عبر البريد إلى عنوان الورشة أو التواصل معنا لترتيب خدمة الاستلام.</div></div>
         <div class="faq-item"><h3>ما هي مدة التصليح المعتادة؟</h3><div class="answer">مدة التصليح تختلف حسب نوع العطل، لكن غالباً لا تتجاوز 3 أيام عمل.</div></div>
         <div class="faq-item"><h3>هل توفرون قطع غيار أصلية؟</h3><div class="answer">نعم، نوفر قطع غيار أصلية وذات جودة عالية لجميع الأجهزة.</div></div>
         <div class="faq-item"><h3>كيف أتابع حالة الإصلاح؟</h3><div class="answer">نقوم بإرسال صور وفيديوهات لحالة الجهاز أثناء مراحل التصليح عبر واتساب.</div></div>`
      : `<h2>FAQ</h2>
         <div class="faq-item"><h3>Comment puis-je envoyer un appareil pour réparation ?</h3><div class="answer">Vous pouvez envoyer l'appareil par courrier à l'atelier ou nous contacter pour organiser la collecte.</div></div>
         <div class="faq-item"><h3>Quel est le délai moyen de réparation ?</h3><div class="answer">Le délai dépend du type de panne, mais généralement pas plus de 3 jours ouvrables.</div></div>
         <div class="faq-item"><h3>Fournissez-vous des pièces d'origine ?</h3><div class="answer">Oui, nous fournissons des pièces d'origine et de haute qualité pour tous les appareils.</div></div>
         <div class="faq-item"><h3>Comment suivre l'état de la réparation ?</h3><div class="answer">Nous envoyons des photos et vidéos de l'état de l'appareil pendant la réparation via WhatsApp.</div></div>`;

    startNewsRotation();
    initFAQ();
    updateTime();
    updateVisits();
    updateEqualizerVisibility();
  }

  toggleBtn?.addEventListener('click', () => setLanguage(currentLang === 'ar' ? 'fr' : 'ar'));

  // ----- Firebase (optional) -----
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
    const db = firebase.firestore();
    // example for reactions/comments if present
  } catch(e) {
    console.warn('Firebase init skipped:', e);
  }
});
