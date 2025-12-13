document.addEventListener('DOMContentLoaded', () => {
  let currentLang = document.documentElement.lang.startsWith('ar') ? 'ar' : 'fr';

  // تحديث الوقت والتاريخ
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

    const timeElement = document.getElementById('current-time');
    if(timeElement) timeElement.textContent = `${dateStr} - ${timeStr}`;
  }

  // تحديث عداد الزيارات
  function updateVisits() {
    const key = 'aem-visit-count';
    let count = parseInt(localStorage.getItem(key)) || 0;
    count++;
    localStorage.setItem(key, count);
    const visitElement = document.getElementById('visit-count');
    if(visitElement) {
      visitElement.textContent = currentLang === 'ar' ? `عدد زياراتك: ${count}` : `Nombre de visites: ${count}`;
    }
  }

  // تحديث شريط الأخبار
  function updateNews() {
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

    const news = currentLang === 'ar' ? newsAr : newsFr;
    const ticker = document.getElementById('live-news');
    if(ticker) ticker.textContent = news.join(' • ');
  }

  // تفعيل فتح وإغلاق الأسئلة FAQ
  function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
      item.onclick = () => {
        item.classList.toggle('open');
      };
    });
  }

  // تحديث ظهور الإكولايزر
  const radio = document.getElementById('radio-stream');
  const equalizer = document.getElementById('equalizer');
  function updateEqualizerVisibility() {
    if(!radio) return;
    if (radio.paused) {
      equalizer.style.opacity = '0.2';
      equalizer.style.pointerEvents = 'none';
    } else {
      equalizer.style.opacity = '1';
      equalizer.style.pointerEvents = 'auto';
    }
  }

  // تبديل اللغة
  function toggleLanguage() {
    if(currentLang === 'ar'){
      document.documentElement.lang = 'fr';
      document.documentElement.dir = 'ltr';
      currentLang = 'fr';

      document.querySelector('header h1').textContent = 'Atelier Electronique Médenine';
      const expBadge = document.querySelector('.experience-badge');
      if(expBadge) expBadge.textContent = '🌼 Plus de 10 ans d\'expérience';

      const langBtn = document.getElementById('toggle-lang-btn');
      if(langBtn) langBtn.textContent = 'Changer la langue';

      const btns = [
        {selector: '.btn-whatsapp', text: 'WhatsApp'},
        {selector: '.btn-maps', text: 'Voir sur Google Maps'},
        {selector: '.btn-gallery', text: 'Voir les photos'},
        {selector: '.btn-video', text: 'Voir les vidéos'},
        {selector: '.btn-services', text: 'Services de l\'atelier'}
      ];
      btns.forEach(b => {
        const el = document.querySelector(b.selector);
        if(el) el.textContent = b.text;
      });

      if(radioBtn) radioBtn.textContent = radio.paused ? 'Écouter la radio' : 'Arrêter la radio';

      const faqContainer = document.querySelector('.faq');
      if(faqContainer){
        faqContainer.innerHTML = `
          <h2>FAQ</h2>
          <div class="faq-item"><h3>Comment puis-je envoyer un appareil pour réparation ?</h3><div class="answer">Vous pouvez envoyer l'appareil par courrier à l'atelier ou nous contacter pour organiser la collecte.</div></div>
          <div class="faq-item"><h3>Quel est le délai moyen de réparation ?</h3><div class="answer">Le délai dépend du type de panne, mais généralement pas plus de 3 jours ouvrables.</div></div>
          <div class="faq-item"><h3>Fournissez-vous des pièces d'origine ?</h3><div class="answer">Oui, nous fournissons des pièces d'origine et de haute qualité pour tous les appareils.</div></div>
          <div class="faq-item"><h3>Comment suivre l'état de la réparation ?</h3><div class="answer">Nous envoyons des photos et vidéos de l'état de l'appareil pendant la réparation via WhatsApp.</div></div>
        `;
      }
    } else {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
      currentLang = 'ar';

      document.querySelector('header h1').textContent = 'Atelier Electronique Médenine';
      const expBadge = document.querySelector('.experience-badge');
      if(expBadge) expBadge.textContent = '🌼 أكثر من 10 سنوات خبرة';

      const langBtn = document.getElementById('toggle-lang-btn');
      if(langBtn) langBtn.textContent = 'تبديل اللغة';

      const btns = [
        {selector: '.btn-whatsapp', text: 'واتساب'},
        {selector: '.btn-maps', text: 'موقعنا على Google Maps'},
        {selector: '.btn-gallery', text: 'شاهد الصور'},
        {selector: '.btn-video', text: 'شاهد الفيديو'},
        {selector: '.btn-services', text: 'خدمات الورشة'}
      ];
      btns.forEach(b => {
        const el = document.querySelector(b.selector);
        if(el) el.textContent = b.text;
      });

      if(radioBtn) radioBtn.textContent = radio.paused ? 'شغّل الراديو' : 'أوقف الراديو';

      const faqContainer = document.querySelector('.faq');
      if(faqContainer){
        faqContainer.innerHTML = `
          <h2>الأسئلة الشائعة</h2>
          <div class="faq-item"><h3>كيف يمكنني إرسال جهاز للإصلاح؟</h3><div class="answer">يمكنك إرسال الجهاز عبر البريد إلى عنوان الورشة أو التواصل معنا لترتيب خدمة الاستلام.</div></div>
          <div class="faq-item"><h3>ما هي مدة التصليح المعتادة؟</h3><div class="answer">مدة التصليح تختلف حسب نوع العطل، لكن غالباً لا تتجاوز 3 أيام عمل.</div></div>
          <div class="faq-item"><h3>هل توفرون قطع غيار أصلية؟</h3><div class="answer">نعم، نوفر قطع غيار أصلية وذات جودة عالية لجميع الأجهزة.</div></div>
          <div class="faq-item"><h3>كيف أتابع حالة الإصلاح؟</h3><div class="answer">نقوم بإرسال صور وفيديوهات لحالة الجهاز أثناء مراحل التصليح عبر واتساب.</div></div>
        `;
      }
    }
    updateNews();
    updateTime();
    updateVisits();
    initFAQ();
  }

  // تشغيل وإيقاف الراديو
  const radioBtn = document.getElementById('radio-btn');
  if(radioBtn && radio){
    radioBtn.addEventListener('click', () => {
      if(radio.paused){
        radio.play();
        radioBtn.textContent = currentLang === 'ar' ? 'أوقف الراديو' : 'Arrêter la radio';
      } else {
        radio.pause();
        radioBtn.textContent = currentLang === 'ar' ? 'شغّل الراديو' : 'Écouter la radio';
      }
      updateEqualizerVisibility();
    });

    radio.addEventListener('play', updateEqualizerVisibility);
    radio.addEventListener('pause', updateEqualizerVisibility);
  }

  // زر تبديل اللغة
  const langBtn = document.getElementById('toggle-lang-btn');
  if(langBtn) langBtn.addEventListener('click', toggleLanguage);

  // التحديث الدوري للوقت
  setInterval(updateTime, 1000);

  // عند تحميل الصفحة
  updateTime();
  updateVisits();
  updateNews();
  initFAQ();
  updateEqualizerVisibility();
});

// فتح وإغلاق المودال الفيديو
function openModal(src) {
  const modal = document.getElementById('video-modal');
  const modalVideo = document.getElementById('modal-video');
  if(!modal || !modalVideo) return;

  modal.style.display = 'flex';
  modalVideo.src = src;
  modalVideo.play();

  modalVideo.onended = closeModal;

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

function closeModal() {
  const modal = document.getElementById('video-modal');
  const modalVideo = document.getElementById('modal-video');
  if(!modal || !modalVideo) return;

  modal.style.display = 'none';
  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.src = "";
}

// تبديل الفيديو مباشرة
function changeVideo(url) {
  const video = document.getElementById("work-video");
  if(video){
    video.src = url;
    video.play();
  }
}
