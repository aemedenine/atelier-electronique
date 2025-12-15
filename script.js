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

  /* ======== التقييم تحت FAQ ======== */
  .rating-container {
    margin: 40px auto;
    text-align: center;
    color: #fff;
  }

  .stars-horizontal span {
    font-size: 2.5rem;
    cursor: pointer;
    color: #ccc;
    transition: color 0.2s;
    margin: 0 5px;
  }

  .stars-horizontal span.hover,
  .stars-horizontal span.selected {
    color: gold;
  }

  #rating-value {
    margin-top: 10px;
    font-size: 1.2rem;
  }
</style>
</head>
<body>

<!-- محتوى الموقع هنا -->
<div class="faq">
  <h2>الأسئلة الشائعة</h2>
  <div class="faq-item">
    <h3>كيف يمكنني إرسال جهاز للإصلاح؟</h3>
    <div class="answer">يمكنك إرسال الجهاز عبر البريد إلى عنوان الورشة أو التواصل معنا لترتيب خدمة الاستلام.</div>
  </div>
  <div class="faq-item">
    <h3>ما هي مدة التصليح المعتادة؟</h3>
    <div class="answer">مدة التصليح تختلف حسب نوع العطل، لكن غالباً لا تتجاوز 3 أيام عمل.</div>
  </div>
  <div class="faq-item">
    <h3>هل توفرون قطع غيار أصلية؟</h3>
    <div class="answer">نعم، نوفر قطع غيار أصلية وذات جودة عالية لجميع الأجهزة.</div>
  </div>
</div>

<!-- ======= تقييم النجوم تحت FAQ ======= -->
<div class="rating-container">
  <p>قيم الورشة:</p>
  <div class="stars-horizontal">
    <span data-value="5">☆</span>
    <span data-value="4">☆</span>
    <span data-value="3">☆</span>
    <span data-value="2">☆</span>
    <span data-value="1">☆</span>
  </div>
  <p id="rating-value">0/5</p>
</div>

<!-- JavaScript -->
<script>
document.addEventListener('DOMContentLoaded', () => {
  let currentLang = document.documentElement.lang.startsWith('ar') ? 'ar' : 'fr';

  // ======= تقييم النجوم تحت FAQ =======
  const starsHorizontal = document.querySelectorAll('.stars-horizontal span');
  const ratingValueHorizontal = document.getElementById('rating-value');
  let selectedRatingHorizontal = 0;

  starsHorizontal.forEach(star => {
    star.addEventListener('mouseover', () => {
      starsHorizontal.forEach(s => s.classList.remove('hover'));
      let val = Number(star.dataset.value);
      starsHorizontal.forEach(s => { if(Number(s.dataset.value) <= val) s.classList.add('hover') });
    });
    star.addEventListener('mouseout', () => {
      starsHorizontal.forEach(s => s.classList.remove('hover'));
    });
    star.addEventListener('click', () => {
      selectedRatingHorizontal = Number(star.dataset.value);
      starsHorizontal.forEach(s => s.classList.remove('selected'));
      starsHorizontal.forEach(s => { if(Number(s.dataset.value) <= selectedRatingHorizontal) s.classList.add('selected') });
      ratingValueHorizontal.textContent = `${selectedRatingHorizontal}/5`;
    });
  });

  // ======= باقي JS متاع الموقع =======
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
