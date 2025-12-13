<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Atelier Electronique Médenine</title>
<style>
  body {
    font-family:'Montserrat','Open Sans',sans-serif;
    background: linear-gradient(135deg,#0b1a27,#122f4a);
    color: #eee;
    margin:0;
    padding:0;
  }

  /* Fixed header: stars left, logo right */
  .fixed-header {
    position: fixed;
    top: 10px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    z-index: 9999;
  }

  .fixed-header .stars span {
    font-size: 3rem; /* حجم قريب من اللوجو */
    cursor: pointer;
    color: #ccc;
    transition: color 0.2s;
    margin-right: 5px;
  }

  .fixed-header .stars span.hover,
  .fixed-header .stars span.selected {
    color: gold;
  }

  .fixed-header .logo img {
    height: 50px; /* حجم اللوجو */
  }

  #rating-value {
    position: fixed;
    top: 70px;
    left: 20px;
    font-size: 1.2rem;
    color: #fff;
    z-index: 9999;
  }
</style>
</head>
<body>

<!-- Fixed header -->
<div class="fixed-header">
  <div class="stars">
    <span data-value="5">☆</span>
    <span data-value="4">☆</span>
    <span data-value="3">☆</span>
    <span data-value="2">☆</span>
    <span data-value="1">☆</span>
  </div>
  <div class="logo">
    <img src="logo.png" alt="Logo">
  </div>
</div>
<p id="rating-value">0/5</p>

<!-- باقي محتوى الموقع هنا -->

<!-- JavaScript -->
<script>
document.addEventListener('DOMContentLoaded', () => {
  let currentLang = document.documentElement.lang.startsWith('ar') ? 'ar' : 'fr';

  // =================== التقييم بالنجوم ===================
  const stars = document.querySelectorAll('.fixed-header .stars span');
  const ratingValue = document.getElementById('rating-value');
  let selectedRating = 0;

  stars.forEach(star => {
    star.addEventListener('mouseover', () => {
      stars.forEach(s => s.classList.remove('hover'));
      let val = Number(star.dataset.value);
      stars.forEach(s => { if(Number(s.dataset.value) <= val) s.classList.add('hover') });
    });
    star.addEventListener('mouseout', () => {
      stars.forEach(s => s.classList.remove('hover'));
    });
    star.addEventListener('click', () => {
      selectedRating = Number(star.dataset.value);
      stars.forEach(s => s.classList.remove('selected'));
      stars.forEach(s => { if(Number(s.dataset.value) <= selectedRating) s.classList.add('selected') });
      ratingValue.textContent = `${selectedRating}/5`;
    });
  });

  // =================== باقي JS متاعك ===================
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

  // تحديث الأخبار
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

  function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
      item.onclick = () => { item.classList.toggle('open'); };
    });
  }

  updateTime();
  updateVisits();
  updateNews();
  initFAQ();
  setInterval(updateTime, 1000);
});
</script>
</body>
</html>
