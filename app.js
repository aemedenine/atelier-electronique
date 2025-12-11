// app.js
document.addEventListener('DOMContentLoaded', () => {
  let currentLang = document.documentElement.lang && document.documentElement.lang.startsWith('ar') ? 'ar' : 'fr';

  // Elements
  const ticker = document.getElementById('live-news');
  const toggleBtn = document.getElementById('toggle-lang-btn');
  const visitEl = document.getElementById('visit-count');
  const timeEl = document.getElementById('current-time');
  const faqContainer = document.querySelector('.faq');
  const radio = document.getElementById('radio-stream');
  const radioBtn = document.getElementById('radio-btn');
  const equalizer = document.getElementById('equalizer');

  // New buttons
  const shopBtn = document.getElementById('shop-btn');
  const downloadBtn = document.getElementById('download-btn');

  /* -------------------- Time -------------------- */
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

    timeEl.textContent = `${dateStr} - ${timeStr}`;
  }

  /* -------------------- Visits -------------------- */
  function updateVisits() {
    const key = 'aem-visit-count';
    let count = parseInt(localStorage.getItem(key)) || 0;
    count++;
    localStorage.setItem(key, count);
    visitEl.textContent = currentLang === 'ar' ? `عدد زياراتك: ${count}` : `Nombre de visites: ${count}`;
  }

  /* -------------------- News -------------------- */
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

  /* -------------------- FAQ -------------------- */
  function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => item.addEventListener('click', () => {
      item.classList.toggle('open');
    }));
  }

  /* -------------------- Equalizer -------------------- */
  function updateEqualizerVisibility() {
    if (!equalizer) return;
    equalizer.style.opacity = radio.paused ? '0.25' : '1';
    equalizer.style.pointerEvents = radio.paused ? 'none' : 'auto';
  }

  /* -------------------- Radio -------------------- */
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
  radio.addEventListener('play', updateEqualizerVisibility);
  radio.addEventListener('pause', updateEqualizerVisibility);

  /* -------------------- Language -------------------- */
  function setLanguage(lang) {
    currentLang = lang;
    if(lang === 'ar') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
      document.querySelector('header h1').textContent = 'Atelier Electronique Médenine';
      document.querySelector('.experience-badge').textContent = '🌼 أكثر من 10 سنوات خبرة';
      toggleBtn.textContent = 'تبديل اللغة';
      document.querySelector('.btn-whatsapp').textContent = 'واتساب';
      document.querySelector('.btn-maps').textContent = 'موقعنا على Google Maps';
      document.querySelector('.btn-gallery').textContent = 'شاهد الصور';
      document.querySelector('.btn-video').textContent = 'شاهد الفيديو';
      document.querySelector('.btn-services').textContent = 'خدمات الورشة';
      radioBtn.textContent = radio.paused ? 'شغّل الراديو' : 'أوقف الراديو';
      faqContainer.innerHTML = `
        <h2>الأسئلة الشائعة</h2>
        <div class="faq-item"><h3>كيف يمكنني إرسال جهاز للإصلاح؟</h3><div class="answer">يمكنك إرسال الجهاز عبر البريد أو التواصل معنا لترتيب الاستلام.</div></div>
        <div class="faq-item"><h3>ما هي مدة التصليح المعتادة؟</h3><div class="answer">غالباً لا تتجاوز 3 أيام عمل.</div></div>
        <div class="faq-item"><h3>هل توفرون قطع غيار أصلية؟</h3><div class="answer">نعم، نوفر قطع غيار أصلية وذات جودة عالية.</div></div>
        <div class="faq-item"><h3>كيف أتابع حالة الإصلاح؟</h3><div class="answer">نرسل صور وفيديوهات للجهاز أثناء مراحل التصليح عبر واتساب.</div></div>
      `;
    } else {
      document.documentElement.lang = 'fr';
      document.documentElement.dir = 'ltr';
      document.querySelector('header h1').textContent = 'Atelier Electronique Médenine';
      document.querySelector('.experience-badge').textContent = '🌼 Plus de 10 ans d\'expérience';
      toggleBtn.textContent = 'Changer la langue';
      document.querySelector('.btn-whatsapp').textContent = 'WhatsApp';
      document.querySelector('.btn-maps').textContent = 'Voir sur Google Maps';
      document.querySelector('.btn-gallery').textContent = 'Voir les photos';
      document.querySelector('.btn-video').textContent = 'Voir les vidéos';
      document.querySelector('.btn-services').textContent = 'Services de l\'atelier';
      radioBtn.textContent = radio.paused ? 'Écouter la radio' : 'Arrêter la radio';
      faqContainer.innerHTML = `
        <h2>FAQ</h2>
        <div class="faq-item"><h3>Comment envoyer un appareil pour réparation ?</h3><div class="answer">Envoyez l'appareil par courrier ou contactez-nous pour la collecte.</div></div>
        <div class="faq-item"><h3>Délai moyen de réparation ?</h3><div class="answer">Généralement pas plus de 3 jours ouvrables.</div></div>
        <div class="faq-item"><h3>Fournissez-vous des pièces d'origine ?</h3><div class="answer">Oui, pièces originales et haute qualité.</div></div>
        <div class="faq-item"><h3>Comment suivre l'état de la réparation ?</h3><div class="answer">Nous envoyons photos et vidéos via WhatsApp.</div></div>
      `;
    }
    startNewsRotation();
    updateTime();
    updateVisits();
    initFAQ();
  }

  toggleBtn.addEventListener('click', () => setLanguage(currentLang === 'ar' ? 'fr' : 'ar'));

  /* -------------------- Buttons: Shop & Download -------------------- */
  if(shopBtn){
    shopBtn.addEventListener('click', () => window.location.href = 'https://yourshoplink.com');
  }
  if(downloadBtn){
    downloadBtn.addEventListener('click', () => window.location.href = 'path/to/your/programs.zip');
  }

  /* -------------------- Initialization -------------------- */
  setInterval(updateTime, 1000);
  updateTime();
  updateVisits();
  startNewsRotation();
  initFAQ();
  updateEqualizerVisibility();
});
