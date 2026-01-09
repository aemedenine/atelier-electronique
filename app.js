document.addEventListener('DOMContentLoaded', () => {
  let currentLang = document.documentElement.lang.startsWith('ar') ? 'ar' : 'fr';

  const ticker = document.getElementById('live-news');
  const toggleBtn = document.getElementById('toggle-lang-btn');
  const timeEl = document.getElementById('current-time');
  const faqContainer = document.querySelector('.faq');
  const radio = document.getElementById('radio-stream');
  const radioBtn = document.getElementById('radio-btn');
  const equalizer = document.getElementById('equalizer');
  const mediaViewer = document.getElementById('mediaViewer');
  const viewerImg = document.getElementById('viewerImg');
  const viewerVideo = document.getElementById('viewerVideo');
  const closeBtn = mediaViewer.querySelector('.close-btn');

  /* ---------- Time ---------- */
  function updateTime() {
    const now = new Date();
    const days = currentLang==='ar'?['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت']:['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const months = currentLang==='ar'?['جانفي','فيفري','مارس','أفريل','ماي','جوان','جويلية','أوت','سبتمبر','أكتوبر','نوفمبر','ديسمبر']:['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    const dateStr = `${days[now.getDay()]}${currentLang==='ar'? '، ':', '}${now.getDate()} ${months[now.getMonth()]}`;
    const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
    if(timeEl) timeEl.textContent = `${dateStr} - ${timeStr}`;
  }

  setInterval(updateTime, 1000);
  updateTime();

  /* ---------- News ---------- */
  const newsAr = ["📢 ورشة إلكترونيك الرحماني تفتح أبوابها لجميع الولايات.","🔧 خدمات تصليح الأجهزة الإلكترونية بجودة عالية وبأسعار منافسة.","🌍 التوصيل عبر البريد متوفر لكل أنحاء تونس.","📱 تواصل معنا عبر واتساب لأي استفسار."];
  const newsFr = ["📢 Atelier Electronique Médenine ouvre ses portes pour toutes les régions.","🔧 Services de réparation électronique de haute qualité à prix compétitifs.","🌍 Livraison par courrier disponible dans toute la Tunisie.","📱 Contactez-nous via WhatsApp pour toute question."];
  let newsIndex = 0, newsInterval = null;
  function updateNews() {
    if(!ticker) return;
    const news = currentLang==='ar'? newsAr:newsFr;
    ticker.classList.remove('fade'); void ticker.offsetWidth;
    ticker.textContent = news[newsIndex];
    ticker.classList.add('fade');
    newsIndex=(newsIndex+1)%news.length;
  }
  function startNewsRotation(){ if(newsInterval) clearInterval(newsInterval); updateNews(); newsInterval=setInterval(updateNews,5000); }
  startNewsRotation();

  /* ---------- FAQ ---------- */
  function initFAQ(){ document.querySelectorAll('.faq-item').forEach(item=>item.addEventListener('click',()=>item.classList.toggle('open'))); }
  initFAQ();

  /* ---------- Media Viewer ---------- */
  document.querySelectorAll('.service-card img, .service-card video').forEach(el=>{
    el.style.cursor='pointer';
    el.addEventListener('click',()=>{
      mediaViewer.style.display='flex';
      if(el.tagName==='IMG'){viewerImg.src=el.src; viewerImg.style.display='block'; viewerVideo.style.display='none'; viewerVideo.pause();}
      else{viewerVideo.src=el.src; viewerVideo.style.display='block'; viewerImg.style.display='none'; viewerVideo.play();}
    });
  });
  closeBtn.addEventListener('click',()=>{ mediaViewer.style.display='none'; viewerVideo.pause(); viewerVideo.currentTime=0; });

  /* ---------- Radio ---------- */
  function updateEqualizerVisibility(){ if(!equalizer) return; equalizer.style.opacity=radio.paused?'0.25':'1'; equalizer.style.pointerEvents=radio.paused?'none':'auto'; }
  radioBtn.addEventListener('click',()=>{
    if(radio.paused){ radio.play().catch(()=>{}); radioBtn.textContent=currentLang==='ar'?'أوقف الراديو':'Arrêter la radio'; }
    else { radio.pause(); radioBtn.textContent=currentLang==='ar'?'شغّل الراديو':'Écouter la radio'; }
    updateEqualizerVisibility();
  });
  radio.addEventListener('play',updateEqualizerVisibility);
  radio.addEventListener('pause',updateEqualizerVisibility);
  updateEqualizerVisibility();

  /* ---------- Language Toggle ---------- */
  toggleBtn.addEventListener('click',()=>{ currentLang=currentLang==='ar'?'fr':'ar'; setLanguage(currentLang); });

  function setLanguage(lang){
    currentLang=lang;
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    updateTime(); startNewsRotation(); initFAQ(); updateEqualizerVisibility();
    // هنا ممكن تضيف باقي تحديث النصوص مثل FAQ, أزرار, العناوين ...
  }
});
