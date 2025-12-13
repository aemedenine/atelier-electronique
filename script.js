document.addEventListener('DOMContentLoaded', () => {
  let currentLang = document.documentElement.lang.startsWith('ar') ? 'ar' : 'fr';

  const ticker = document.getElementById('live-news');
  const toggleBtn = document.getElementById('toggle-lang-btn');
  const visitEl = document.getElementById('visit-count');
  const timeEl = document.getElementById('current-time');
  const faqContainer = document.querySelector('.faq');
  const radio = document.getElementById('radio-stream');
  const radioBtn = document.getElementById('radio-btn');
  const equalizer = document.getElementById('equalizer');

  const shopBtn = document.querySelector('.btn-store');
  const downloadBtn = document.querySelector('.btn-download');

  // ===== Time =====
  function updateTime() {
    const now = new Date();
    const daysAr = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const monthsAr = ['جانفي','فيفري','مارس','أفريل','ماي','جوان','جويلية','أوت','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    const daysFr = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const monthsFr = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

    let day = currentLang==='ar'?daysAr[now.getDay()]:daysFr[now.getDay()];
    let month = currentLang==='ar'?monthsAr[now.getMonth()]:monthsFr[now.getMonth()];

    let hours = now.getHours().toString().padStart(2,'0');
    let minutes = now.getMinutes().toString().padStart(2,'0');
    let seconds = now.getSeconds().toString().padStart(2,'0');

    timeEl.textContent = `${currentLang==='ar'?`${day}، ${now.getDate()} ${month}`:`${day}, ${now.getDate()} ${month}`} - ${hours}:${minutes}:${seconds}`;
  }

  // ===== Visits =====
  function updateVisits() {
    let key = 'aem-visit-count';
    let count = parseInt(localStorage.getItem(key)) || 0;
    count++;
    localStorage.setItem(key, count);
    visitEl.textContent = currentLang==='ar'?`عدد زياراتك: ${count}`:`Nombre de visites: ${count}`;
  }

  // ===== News =====
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
    const news = currentLang==='ar'?newsAr:newsFr;
    ticker.classList.remove('fade');
    void ticker.offsetWidth;
    ticker.textContent = news[newsIndex];
    ticker.classList.add('fade');
    newsIndex = (newsIndex + 1) % news.length;
  }

  function startNewsRotation() {
    if(newsInterval) clearInterval(newsInterval);
    updateNews();
    newsInterval = setInterval(updateNews, 5000);
  }

  // ===== FAQ =====
  function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item=>item.addEventListener('click',()=>item.classList.toggle('open')));
  }

  // ===== Radio =====
  function updateEqualizerVisibility() {
    if(!equalizer) return;
    equalizer.style.opacity = radio.paused?'0.25':'1';
    equalizer.style.pointerEvents = radio.paused?'none':'auto';
  }

  radioBtn.addEventListener('click', ()=>{
    if(radio.paused){
      radio.play().catch(()=>console.warn('Radio play failed'));
      radioBtn.textContent = currentLang==='ar'?'أوقف الراديو':'Arrêter la radio';
    } else {
      radio.pause();
      radioBtn.textContent = currentLang==='ar'?'شغّل الراديو':'Écouter la radio';
    }
    updateEqualizerVisibility();
  });
  radio.addEventListener('play', updateEqualizerVisibility);
  radio.addEventListener('pause', updateEqualizerVisibility);

  // ===== Language =====
  function setLanguage(lang){
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang==='ar'?'rtl':'ltr';
    startNewsRotation();
    updateTime();
    updateVisits();
    initFAQ();
  }
  toggleBtn.addEventListener('click',()=>setLanguage(currentLang==='ar'?'fr':'ar'));

  // ===== Shop & Download =====
  if(shopBtn) shopBtn.addEventListener('click',()=>window.location.href='store.html');
  if(downloadBtn) downloadBtn.addEventListener('click',()=>window.location.href='download');

  // ===== Workshop Rating =====
  const ratingStars = document.querySelectorAll('#workshop-rating span');
  const averageDisplay = document.getElementById('average-rating');
  const confirmBtn = document.getElementById('confirm-rating-btn');
  let tempRating = 0;
  let savedRating = localStorage.getItem('workshopRating')||0;

  function updateStars(rating){
    ratingStars.forEach((star, idx)=>{
      star.classList.remove('active');
      if(idx<rating) star.classList.add('active');
    });
    averageDisplay.textContent = `تقييمك: ${rating} / 5`;
  }
  updateStars(savedRating);

  ratingStars.forEach((star, idx)=>{
    star.addEventListener('click',()=>{
      tempRating = idx+1;
      updateStars(tempRating);
    });
  });
  confirmBtn.addEventListener('click',()=>{
    savedRating = tempRating;
    localStorage.setItem('workshopRating', savedRating);
    updateStars(savedRating);
    alert('تم حفظ تقييمك! ⭐');
  });

  // ===== Init =====
  setInterval(updateTime, 1000);
  updateTime();
  updateVisits();
  startNewsRotation();
  initFAQ();
  updateEqualizerVisibility();
});
