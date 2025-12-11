// app.js
document.addEventListener('DOMContentLoaded', () => {
  // -------------------- Variables --------------------
  let currentLang = document.documentElement.lang.startsWith('ar') ? 'ar' : 'fr';

  const timeEl = document.getElementById('current-time');
  const visitEl = document.getElementById('visit-count');
  const ticker = document.getElementById('live-news');
  const toggleBtn = document.getElementById('toggle-lang-btn');
  const faqContainer = document.querySelector('.faq');
  const radio = document.getElementById('radio-stream');
  const radioBtn = document.getElementById('radio-btn');
  const equalizer = document.getElementById('equalizer');

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

  // -------------------- Time --------------------
  function updateTime() {
    const now = new Date();
    const daysAr = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const monthsAr = ['جانفي','فيفري','مارس','أفريل','ماي','جوان','جويلية','أوت','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    const daysFr = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const monthsFr = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

    const day = currentLang === 'ar' ? daysAr[now.getDay()] : daysFr[now.getDay()];
    const month = currentLang === 'ar' ? monthsAr[now.getMonth()] : monthsFr[now.getMonth()];
    const date = now.getDate();
    const hours = now.getHours().toString().padStart(2,'0');
    const minutes = now.getMinutes().toString().padStart(2,'0');
    const seconds = now.getSeconds().toString().padStart(2,'0');

    const dateStr = currentLang === 'ar' ? `${day}، ${date} ${month}` : `${day}, ${date} ${month}`;
    timeEl.textContent = `${dateStr} - ${hours}:${minutes}:${seconds}`;
  }

  // -------------------- Visits --------------------
  function updateVisits() {
    const key = 'aem-visit-count';
    let count = parseInt(localStorage.getItem(key)) || 0;
    count++;
    localStorage.setItem(key, count);
    visitEl.textContent = currentLang === 'ar' ? `عدد زياراتك: ${count}` : `Nombre de visites: ${count}`;
  }

  // -------------------- News rotation --------------------
  function updateNews() {
    const news = currentLang === 'ar' ? newsAr : newsFr;
    ticker.classList.remove('fade');
    void ticker.offsetWidth; // force reflow
    ticker.textContent = news[newsIndex];
    ticker.classList.add('fade');
    newsIndex = (newsIndex + 1) % news.length;
  }

  function startNewsRotation() {
    if(newsInterval) clearInterval(newsInterval);
    updateNews();
    newsInterval = setInterval(updateNews, 5000);
  }

  // -------------------- FAQ --------------------
  function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
      item.onclick = () => item.classList.toggle('open');
    });
  }

  // -------------------- Equalizer --------------------
  function updateEqualizerVisibility() {
    if (!equalizer) return;
    if (radio.paused) {
      equalizer.style.opacity = '0.25';
      equalizer.style.pointerEvents = 'none';
    } else {
      equalizer.style.opacity = '1';
      equalizer.style.pointerEvents = 'auto';
    }
  }

  // -------------------- Radio controls --------------------
  radioBtn.addEventListener('click', () => {
    if(radio.paused){
      radio.play().catch(e => console.warn('Radio play blocked:', e));
      radioBtn.textContent = currentLang === 'ar' ? 'أوقف الراديو' : 'Arrêter la radio';
    } else {
      radio.pause();
      radioBtn.textContent = currentLang === 'ar' ? 'شغّل الراديو' : 'Écouter la radio';
    }
    updateEqualizerVisibility();
  });
  radio.addEventListener('play', updateEqualizerVisibility);
  radio.addEventListener('pause', updateEqualizerVisibility);

  // -------------------- Language toggle --------------------
  function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'fr' : 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    // Header & badges
    document.querySelector('header h1').textContent = 'Atelier Electronique Médenine';
    document.querySelector('.experience-badge').textContent = currentLang === 'ar' ? '🌼 أكثر من 10 سنوات خبرة' : '🌼 Plus de 10 ans d\'expérience';
    toggleBtn.textContent = currentLang === 'ar' ? 'تبديل اللغة' : 'Changer la langue';
    document.querySelector('.btn-whatsapp').textContent = currentLang === 'ar' ? 'واتساب' : 'WhatsApp';
    document.querySelector('.btn-maps').textContent = currentLang === 'ar' ? 'موقعنا على Google Maps' : 'Voir sur Google Maps';
    document.querySelector('.btn-gallery').textContent = currentLang === 'ar' ? 'شاهد الصور' : 'Voir les photos';
    document.querySelector('.btn-video').textContent = currentLang === 'ar' ? 'شاهد الفيديو' : 'Voir les vidéos';
    document.querySelector('.btn-services').textContent = currentLang === 'ar' ? 'خدمات الورشة' : 'Services de l\'atelier';
    radioBtn.textContent = radio.paused ? (currentLang === 'ar' ? 'شغّل الراديو' : 'Écouter la radio') : (currentLang === 'ar' ? 'أوقف الراديو' : 'Arrêter la radio');

    // FAQ
    faqContainer.innerHTML = currentLang === 'ar' ? `
      <h2>الأسئلة الشائعة</h2>
      <div class="faq-item"><h3>كيف يمكنني إرسال جهاز للإصلاح؟</h3><div class="answer">يمكنك إرسال الجهاز عبر البريد إلى عنوان الورشة أو التواصل معنا لترتيب خدمة الاستلام.</div></div>
      <div class="faq-item"><h3>ما هي مدة التصليح المعتادة؟</h3><div class="answer">مدة التصليح تختلف حسب نوع العطل، لكن غالباً لا تتجاوز 3 أيام عمل.</div></div>
      <div class="faq-item"><h3>هل توفرون قطع غيار أصلية؟</h3><div class="answer">نعم، نوفر قطع غيار أصلية وذات جودة عالية لجميع الأجهزة.</div></div>
      <div class="faq-item"><h3>كيف أتابع حالة الإصلاح؟</h3><div class="answer">نقوم بإرسال صور وفيديوهات لحالة الجهاز أثناء مراحل التصليح عبر واتساب.</div></div>
    ` : `
      <h2>FAQ</h2>
      <div class="faq-item"><h3>Comment puis-je envoyer un appareil pour réparation ?</h3><div class="answer">Vous pouvez envoyer l'appareil par courrier à l'atelier ou nous contacter pour organiser la collecte.</div></div>
      <div class="faq-item"><h3>Quel est le délai moyen de réparation ?</h3><div class="answer">Le délai dépend du type de panne, mais généralement pas plus de 3 jours ouvrables.</div></div>
      <div class="faq-item"><h3>Fournissez-vous des pièces d'origine ?</h3><div class="answer">Oui, nous fournissons des pièces d'origine et de haute qualité pour tous les appareils.</div></div>
      <div class="faq-item"><h3>Comment suivre l'état de la réparation ?</h3><div class="answer">Nous envoyons des photos et vidéos de l'état de l'appareil pendant la réparation via WhatsApp.</div></div>
    `;

    // Restart features
    updateNews();
    updateTime();
    updateVisits();
    initFAQ();
  }

  toggleBtn.addEventListener('click', toggleLanguage);

  // -------------------- Modal Video --------------------
  window.openModal = function(src) {
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    modal.style.display = 'flex';
    modalVideo.src = src;
    modalVideo.play();

    modalVideo.onended = closeModal;
    modal.onclick = (e) => { if(e.target === modal) closeModal(); };
  }

  window.closeModal = function() {
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = "";
  }

  // -------------------- Initialization --------------------
  setInterval(updateTime, 1000);
  updateTime();
  updateVisits();
  startNewsRotation();
  initFAQ();
  updateEqualizerVisibility();
});
