document.addEventListener('DOMContentLoaded', () => {
  let currentLang = document.documentElement.lang.startsWith('ar') ? 'ar' : 'fr';

  const ticker = document.getElementById('live-news');
  const toggleBtn = document.getElementById('toggle-lang-btn');
  const visitEl = document.getElementById('visit-count');
  const timeEl = document.getElementById('current-time');
  const faqContainer = document.querySelector('.faq');
  const radio = document.getElementById('radio-stream');
  const radioBtn = document.getElementById('radio-btn');

  const newsAr = [
    "📢 ورشة إلكترونيك الرحماني تفتح أبوابها لجميع الولايات.",
    "🔧 خدمات تصليح الأجهزة الإلكترونية بجودة عالية وبأسعار منافسة.",
    "🌍 التوصيل عبر البريد متوفر لكل أنحاء تونس.",
    "📱 تواصل معنا عبر واتساب لأي استفسار: +21698192103"
  ];
  const newsFr = [
    "📢 Atelier Electronique Médenine ouvre ses portes pour toutes les régions.",
    "🔧 Services de réparation électronique de haute qualité à prix compétitifs.",
    "🌍 Livraison par courrier disponible dans toute la Tunisie.",
    "📱 Contactez-nous via WhatsApp pour toute question: +21698192103"
  ];

  let newsIndex = 0;
  let newsInterval = null;

  function updateNews() {
    const news = currentLang === 'ar' ? newsAr : newsFr;
    ticker.textContent = news[newsIndex];
    newsIndex = (newsIndex + 1) % news.length;
  }

  function startNewsRotation() {
    if (newsInterval) clearInterval(newsInterval);
    updateNews();
    newsInterval = setInterval(updateNews, 5000);
  }

  function updateTime() {
    const now = new Date();
    const daysAr = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const monthsAr = ['جانفي','فيفري','مارس','أفريل','ماي','جوان','جويلية','أوت','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    const daysFr = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const monthsFr = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

    let day = currentLang==='ar'?daysAr[now.getDay()]:daysFr[now.getDay()];
    let month = currentLang==='ar'?monthsAr[now.getMonth()]:monthsFr[now.getMonth()];

    const dateStr = `${day}, ${now.getDate()} ${month}`;
    const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
    timeEl.textContent = `${dateStr} - ${timeStr}`;
  }

  function updateVisits() {
    const key = 'aem-visit-count';
    let count = parseInt(localStorage.getItem(key))||0;
    count++;
    localStorage.setItem(key,count);
    visitEl.textContent = currentLang==='ar'?`عدد زياراتك: ${count}`:`Nombre de visites: ${count}`;
  }

  function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item=>item.addEventListener('click',()=>item.classList.toggle('open')));
  }

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang==='ar'?'rtl':'ltr';
    toggleBtn.textContent = lang==='ar'?'تبديل اللغة':'Changer la langue';
    startNewsRotation();
    updateTime();
    updateVisits();
    initFAQ();
  }

  toggleBtn.addEventListener('click',()=>setLanguage(currentLang==='ar'?'fr':'ar'));

  setInterval(updateTime,1000);
  updateTime();
  updateVisits();
  startNewsRotation();
  initFAQ();
});
