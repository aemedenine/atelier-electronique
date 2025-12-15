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
  /* ===== Theme Toggle ===== */
  body.light { background:#f5f5f5; color:#000; }
  body.light h2,h3,p { color:#000; }
  #theme-toggle { position: fixed; top: 10px; left: 10px; padding: 5px 10px; cursor: pointer; z-index: 9999; }

  /* ===== FAQ ===== */
  .faq { max-width:800px; margin:50px auto; padding:0 20px; }
  .faq-item { border-bottom:1px solid #444; padding:10px 0; cursor:pointer; }
  .faq-item .answer { display:none; margin-top:5px; }
  .faq-item.open .answer { display:block; }

  /* ===== تقييم النجوم ===== */
  .rating-container { margin:40px auto; text-align:center; color:#fff; }
  .stars-horizontal span { font-size:2.5rem; cursor:pointer; color:#ccc; transition:color 0.2s; margin:0 5px; }
  .stars-horizontal span.hover,
  .stars-horizontal span.selected { color: gold; }
  #rating-value { margin-top:10px; font-size:1.2rem; }
</style>
</head>
<body>

<button id="theme-toggle">🌙</button>

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

<div id="current-time" style="text-align:center; margin-top:20px;"></div>
<div id="visit-count" style="text-align:center; margin-top:10px;"></div>
<div id="live-news" style="text-align:center; margin-top:10px;"></div>

<script>
document.addEventListener('DOMContentLoaded', () => {

  // ===== Theme Toggle =====
  const themeBtn = document.getElementById('theme-toggle');
  if(localStorage.getItem('theme')==='light') document.body.classList.add('light');
  themeBtn.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
  themeBtn.onclick = () => {
    document.body.classList.toggle('light');
    const t = document.body.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', t);
    themeBtn.textContent = t==='light'?'☀️':'🌙';
  };

  // ===== تقييم النجوم =====
  const stars = document.querySelectorAll('.stars-horizontal span');
  const ratingValue = document.getElementById('rating-value');
  let rating = parseInt(localStorage.getItem('workshopRating')) || 0;

  function updateStars(val){
    stars.forEach(s=>{ s.textContent = s.dataset.value<=val?'★':'☆'; s.classList.toggle('selected',s.dataset.value<=val); });
    ratingValue.textContent = `${val}/5`;
  }
  updateStars(rating);

  stars.forEach(s=>{
    const val = parseInt(s.dataset.value);
    s.addEventListener('mouseover',()=>{ stars.forEach(st=>st.classList.remove('hover')); stars.forEach(st=>{ if(st.dataset.value<=val) st.classList.add('hover'); }); });
    s.addEventListener('mouseout',()=>{ stars.forEach(st=>st.classList.remove('hover')); updateStars(rating); });
    s.addEventListener('click',()=>{ rating=val; localStorage.setItem('workshopRating',rating); updateStars(rating); });
  });

  // ===== FAQ =====
  document.querySelectorAll('.faq-item').forEach(item=>{
    item.onclick=()=>{ item.classList.toggle('open'); };
  });

  // ===== Time & Date =====
  const currentLang = document.documentElement.lang.startsWith('ar') ? 'ar' : 'fr';
  function updateTime() {
    const now = new Date();
    const daysAr = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const monthsAr = ['جانفي','فيفري','مارس','أفريل','ماي','جوان','جويلية','أوت','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    const daysFr = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const monthsFr = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

    const day = currentLang==='ar'?daysAr[now.getDay()]:daysFr[now.getDay()];
    const month = currentLang==='ar'?monthsAr[now.getMonth()]:monthsFr[now.getMonth()];
    const dateStr = `${day}, ${now.getDate()} ${month}`;
    const timeStr = now.toLocaleTimeString('ar-EG',{hour12:false});
    document.getElementById('current-time').textContent = `${dateStr} - ${timeStr}`;
  }
  updateTime();
  setInterval(updateTime,1000);

  // ===== Visits =====
  const key='aem-visit-count';
  let count = parseInt(localStorage.getItem(key)) || 0;
  count++;
  localStorage.setItem(key,count);
  document.getElementById('visit-count').textContent = currentLang==='ar'?`عدد زياراتك: ${count}`:`Nombre de visites: ${count}`;

  // ===== News =====
  const newsAr = ["📢 ورشة إلكترونيك الرحماني تفتح أبوابها لجميع الولايات.","🔧 خدمات تصليح الأجهزة الإلكترونية بجودة عالية وبأسعار منافسة.","🌍 التوصيل عبر البريد متوفر لكل أنحاء تونس.","📱 تواصل معنا عبر واتساب لأي استفسار."];
  const newsFr = ["📢 Atelier Electronique Médenine ouvre ses portes pour toutes les régions.","🔧 Services de réparation électronique de haute qualité à prix compétitifs.","🌍 Livraison par courrier disponible dans toute la Tunisie.","📱 Contactez-nous via WhatsApp pour toute question."];
  document.getElementById('live-news').textContent = currentLang==='ar'?newsAr.join(' • '):newsFr.join(' • ');

});
</script>
</body>
</html>
