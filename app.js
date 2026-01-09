// ========================= app.js =========================
document.addEventListener('DOMContentLoaded', () => {

  // ----------------- 1. Variables & DOM Elements -----------------
  let currentLang = document.documentElement.lang.startsWith('ar') ? 'ar' : 'fr';
  let currentLanguage = currentLang;
  let newsIndex = 0, newsInterval = null;
  let totalVisits = 0;
  let selectedRatingHorizontal = parseInt(localStorage.getItem('workshopRating')) || 0;

  const ticker = document.getElementById('live-news');
  const toggleBtn = document.getElementById('toggle-lang-btn');
  const timeEl = document.getElementById('current-time');
  const faqContainer = document.querySelector('.faq');
  const radio = document.getElementById('radio-stream');
  const radioBtn = document.getElementById('radio-btn');
  const equalizer = document.getElementById('equalizer');

  const loginPopup = document.getElementById('login-popup');
  const btnGoogle = document.getElementById('btn-google');
  const btnClosePopup = document.getElementById('btn-close-popup');
  const userInfo = document.getElementById('user-info');
  const userName = document.getElementById('user-name');
  const btnSignOut = document.getElementById('btn-signout');

  const mediaViewer = document.getElementById('mediaViewer');
  const viewerImg = document.getElementById('viewerImg');
  const viewerVideo = document.getElementById('viewerVideo');
  const closeBtn = mediaViewer.querySelector('.close-btn');

  const ratingTitle = document.getElementById('rating-title');
  const starsHorizontal = document.querySelectorAll('.stars-horizontal span');

  const siteName = document.getElementById('site-name');
  const cmpBanner = document.getElementById('cmp-banner');
  const consentAllow = document.getElementById('consent-allow');
  const consentManage = document.getElementById('consent-manage');

  const serviceTranslations = {
    ar: { title: "خدمات اليوم", captions: ["تصليح لوحات إلكترونية","تصليح كارت جهاز المشي","تصليح كارت ماكينة غسيل","تصليح كارت تلفاز","تصليح كارت غسالة ل-ج"] },
    fr: { title: "Services du jour", captions: ["réparation de cartes électroniques","réparation carte tapis roulant","réparation carte lave-linge","réparation carte television","réparation carte lave-linge LG"] }
  };

  const videoTranslations = {
    ar: { title: "فيديو اليوم", captions: ["تصليح كارت تغذية","إصلاح لوحة إلكترونية","فحص بوردة 1","فحص بوردة 2","فحص بوردة 3"] },
    fr: { title: "Vidéo du jour", captions: ["réparation carte alimentation","réparation carte électronique","inspection carte 1","inspection carte 2","inspection carte 3"] }
  };

  const posteSoudureTranslations = {
    ar: { title: "تصليح ماكينات لحام", captions: ["تصليح ماكينة لحام 1","تصليح ماكينة لحام 2","تصليح ماكينة لحام 3","تصليح ماكينة لحام 4","تصليح ماكينة لحام 5"] },
    fr: { title: "Réparation postes soudure", captions: ["Réparation poste soudure 1","Réparation poste soudure 2","Réparation poste soudure 3","Réparation poste soudure 4","Réparation poste soudure 5"] }
  };

  const newsAr = ["📢 ورشة إلكترونيك الرحماني تفتح أبوابها لجميع الولايات.","🔧 خدمات تصليح الأجهزة الإلكترونية بجودة عالية وبأسعار منافسة.","🌍 التوصيل عبر البريد متوفر لكل أنحاء تونس.","📱 تواصل معنا عبر واتساب لأي استفسار."];
  const newsFr = ["📢 Atelier Electronique Médenine ouvre ses portes pour toutes les régions.","🔧 Services de réparation électronique de haute qualité à prix compétitifs.","🌍 Livraison par courrier disponible dans toute la Tunisie.","📱 Contactez-nous via WhatsApp pour toute question."];

  // ========================= 2. Time & Date =========================
  function updateTime() {
    const now = new Date();
    const daysAr = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const monthsAr = ['جانفي','فيفري','مارس','أفريل','ماي','جوان','جويلية','أوت','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    const daysFr = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const monthsFr = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

    let day = (currentLanguage==='ar') ? daysAr[now.getDay()] : daysFr[now.getDay()];
    let month = (currentLanguage==='ar') ? monthsAr[now.getMonth()] : monthsFr[now.getMonth()];
    const dateStr = `${day}${currentLanguage==='ar'? '، ' : ', '}${now.getDate()} ${month}`;
    const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;

    timeEl.textContent = `${dateStr} - ${timeStr}`;
  }

  setInterval(updateTime, 1000);
  updateTime();

  // ========================= 3. Visits Counter =========================
  function updateVisitsLocal() {
    const key = 'aem-visit-count';
    let count = parseInt(localStorage.getItem(key)) || 0;
    count++; localStorage.setItem(key, count);
    const visitEl = document.getElementById('visit-count');
    if(visitEl) visitEl.textContent = (currentLanguage==='ar'? `عدد زياراتك: ${count}`:`Nombre de visites: ${count}`);
  }
  updateVisitsLocal();

  // Firebase visits
  try {
    const firebaseConfig = {
      apiKey: "AIzaSyCtbEWdm7CAC25ROslGlVeLOvfxdi2exVo",
      authDomain: "atelier-electronique-mednine.firebaseapp.com",
      projectId: "atelier-electronique-mednine",
      storageBucket: "atelier-electronique-mednine.firebasestorage.app",
      messagingSenderId: "547430908384",
      appId: "1:547430908384:web:4caa4cf3869491bd14eb85"
    };
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();
    const visitsRef = db.ref('visits');
    visitsRef.transaction(current => (current || 0)+1);
    visitsRef.on('value', snapshot => {
      totalVisits = snapshot.val() || 0;
      updateVisitText(currentLanguage, totalVisits);
    });
  } catch(e){ console.warn('Firebase visits skipped',e); }

  function updateVisitText(lang, total){
    const visitCountElem = document.getElementById('visit-count');
    if(!visitCountElem) return;
    visitCountElem.textContent = (lang==='ar'? `عدد زوار الموقع: ${total}` : `Nombre de visiteurs : ${total}`);
  }

  // ========================= 4. Firebase Auth =========================
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(()=> console.log("🔒 Session persistente activée"))
    .catch(e=> console.error("Erreur persistence:",e));

  firebase.auth().onAuthStateChanged(user => {
    if(user){
      userInfo.style.display='block'; loginPopup.style.display='none';
      userName.textContent = user.displayName||'مستخدم';
    } else { userInfo.style.display='none'; loginPopup.style.display='flex'; }
  });

  btnGoogle.addEventListener('click', ()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result=>{
      const user=result.user;
      userName.textContent = user.displayName;
      userInfo.style.display='block'; loginPopup.style.display='none';
    }).catch(console.error);
  });

  btnClosePopup.addEventListener('click', ()=> loginPopup.style.display='none');
  btnSignOut.addEventListener('click', ()=>{
    firebase.auth().signOut().then(()=>{ userInfo.style.display='none'; alert('تم تسجيل الخروج بنجاح'); });
  });

  // ========================= 5. Fullscreen Media Viewer =========================
  function initMediaViewer(){
    document.querySelectorAll('.service-card img, .service-card video').forEach(el=>{
      el.style.cursor='pointer';
      el.addEventListener('click', ()=>{
        mediaViewer.style.display='flex';
        if(el.tagName==='IMG'){ viewerImg.src=el.src; viewerImg.style.display='block'; viewerVideo.style.display='none'; viewerVideo.pause(); }
        else{ viewerVideo.src=el.src; viewerVideo.style.display='block'; viewerImg.style.display='none'; viewerVideo.play(); }
      });
    });
    closeBtn.addEventListener('click', ()=>{
      mediaViewer.style.display='none'; viewerVideo.pause(); viewerVideo.currentTime=0;
    });
  }
  initMediaViewer();

  // ========================= 6. Weather =========================
  function updateWeather(language){
    fetch("https://api.open-meteo.com/v1/forecast?latitude=33.3549&longitude=10.5055&current_weather=true")
    .then(res=>res.json())
    .then(data=>{
      const temp = data.current_weather.temperature+"°C";
      const wind = data.current_weather.windspeed + (language==='fr'? " km/h":" كم/س");
      document.getElementById("weather-temp").textContent=temp;
      if(language==='ar'){ document.querySelector(".weather-box h3").textContent="🌦️ حالة الطقس في مدنين"; document.getElementById("weather-desc").textContent="🌬️ سرعة الرياح: "+wind; }
      else{ document.querySelector(".weather-box h3").textContent="🌦️ Météo à Médenine"; document.getElementById("weather-desc").textContent="🌬️ Vitesse du vent: "+wind; }
    })
    .catch(()=>{document.getElementById("weather-desc").textContent="⚠️ لا يمكن تحميل الطقس";});
  }
  updateWeather(currentLanguage);

  // ========================= 7. Rating Stars =========================
  function updateStars(rating){
    starsHorizontal.forEach(star=>{
      star.classList.remove('selected'); 
      if(Number(star.dataset.value)<=rating) star.classList.add('selected'); 
      star.textContent = Number(star.dataset.value)<=rating?'★':'☆';
    });
    const ratingValueHorizontal = document.getElementById('rating-value');
    ratingValueHorizontal.textContent = `${rating}/5`;
    ratingValueHorizontal.style.color = rating>0?'gold':'#fff';
    ratingValueHorizontal.style.textShadow = rating>0?'0 0 8px gold':'none';
  }
  updateStars(selectedRatingHorizontal);

  starsHorizontal.forEach(star=>{
    const val = Number(star.dataset.value);
    star.addEventListener('mouseover',()=>{
      starsHorizontal.forEach(s=>s.classList.remove('hover'));
      starsHorizontal.forEach(s=>{ if(Number(s.dataset.value)<=val) s.classList.add('hover'); });
      document.getElementById('rating-value').style.color='gold';
      document.getElementById('rating-value').style.textShadow='0 0 8px gold';
    });
    star.addEventListener('mouseout',()=>{ starsHorizontal.forEach(s=>s.classList.remove('hover')); updateStars(selectedRatingHorizontal); });
    star.addEventListener('click', ()=>{ selectedRatingHorizontal=val; localStorage.setItem('workshopRating', selectedRatingHorizontal); updateStars(selectedRatingHorizontal); });
  });

