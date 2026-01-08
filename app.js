// ======================================================
// app.js (REFERENCE VERSION)
// Firebase + Auth + UI + Weather + Visits + Media + Radio + News + Time + FAQ
// ======================================================


 /* -------------------- Initialization -------------------- */
  // periodic time update
  setInterval(updateTime, 1000);

  // initial calls
  updateTime();
  startNewsRotation();
  initFAQ();
  updateEqualizerVisibility();

/* -------------------- Firebase (reactions/comments) -------------------- */
  // If you use Firebase features, keep these credentials as you provided.
  // NOTE: these keys are visible in client code by design (Firebase config).
  // If you don't use Firebase, you can remove this block.
  try {
    const firebaseConfig = {
      apiKey: "AIzaSyD5Hrfk6tU22ITquRR3xt957WmlnvPTw5M",
      authDomain: "aem-site-4e030.firebaseapp.com",
      projectId: "aem-site-4e030",
      storageBucket: "aem-site-4e030.firebasestorage.app",
      messagingSenderId: "241838556898",
      appId: "1:241838556898:web:9eb591e3d05405894800bb",
      measurementId: "G-DTNBCK5H1F"
    };

    // initialize compat SDK (we included compat scripts in HTML)
    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    // Example: attach listeners to reaction & comment buttons (if present)
    document.querySelectorAll('.react-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const reaction = btn.dataset.reaction;
        const mediaId = btn.closest('.reactions')?.dataset.id;
        if (!mediaId) return;
        db.collection("reactions").add({ mediaId, reaction, timestamp: new Date() });
      });
    });

    document.querySelectorAll('.comment-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const parent = btn.closest('.reactions');
        if (!parent) return;
        const commentInput = parent.querySelector('.comment-input');
        const mediaId = parent.dataset.id;
        const comment = commentInput?.value.trim();
        if (comment) {
          db.collection("comments").add({ mediaId, comment, timestamp: new Date() });
          if (commentInput) commentInput.value = '';
        }
      });
    });

  } catch (e) {
    // if Firebase scripts not loaded or config invalid, don't break the UI
    console.warn('Firebase init skipped or failed:', e);
  }
});
   /* ===================== AUTH ===================== */
  const loginPopup = document.getElementById('login-popup');
  const userInfo = document.getElementById('user-info');
  const userName = document.getElementById('user-name');

  auth.onAuthStateChanged(user => {
    if (user) {
      userInfo.style.display = 'block';
      loginPopup.style.display = 'none';
      userName.textContent = user.displayName || 'مستخدم';
    } else {
      userInfo.style.display = 'none';
      loginPopup.style.display = 'flex';
    }
  });

  document.getElementById('btn-google')?.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(console.error);
  });

  document.getElementById('btn-signout')?.addEventListener('click', () => {
    auth.signOut();
  });

  /* ===================== VISITS (Firebase) ===================== */
  let currentLanguage = 'ar';
  let totalVisits = 0;
  const visitsRef = db.ref('visits');

  visitsRef.transaction(v => (v || 0) + 1);
  visitsRef.on('value', snap => {
    totalVisits = snap.val() || 0;
    updateVisitText();
  });

  function updateVisitText() {
    const el = document.getElementById('visit-count');
    if (!el) return;
    el.textContent = currentLanguage === 'ar'
      ? `عدد زوار الموقع: ${totalVisits}`
      : `Nombre de visiteurs : ${totalVisits}`;
  }

  /* ===================== TIME ===================== */
  const timeEl = document.getElementById('current-time');
  function updateTime() {
    if (!timeEl) return;
    const now = new Date();
    timeEl.textContent = now.toLocaleTimeString();
  }
  setInterval(updateTime, 1000);
  updateTime();

  /* ===================== WEATHER ===================== */
  function updateWeather() {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=33.3549&longitude=10.5055&current_weather=true")
      .then(r => r.json())
      .then(d => {
        document.getElementById('weather-temp').textContent = d.current_weather.temperature + "°C";
        document.getElementById('weather-desc').textContent =
          (currentLanguage === 'ar'
            ? 'سرعة الرياح: '
            : 'Vitesse du vent: ') + d.current_weather.windspeed;
      });
  }
  updateWeather();

/* -------------------- Language toggle -------------------- */
  function setLanguage(lang) {
    currentLang = lang;
    if (lang === 'ar') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
      document.querySelector('header h1').textContent = 'Atelier Electronique Médenine';
      document.querySelector('.experience-badge').textContent = 'أكثر من 10 سنوات خبرة';
      toggleBtn.textContent = 'تبديل اللغة';   
    document.querySelector('.btn-download').textContent = 'تحميل البرامج  📥';
      document.querySelector('.btn-store').textContent = ' َسوّق الآن  🛒';
      document.querySelector('.btn-whatsapp').textContent = 'واتساب  📱';
      document.querySelector('.btn-maps').textContent = 'موقعنا على مابس  📍';
      document.querySelector('.btn-gallery').textContent = 'شاهد الصور  🖼️';
      document.querySelector('.btn-video').textContent = 'شاهد الفيديو  🎥';
      document.querySelector('.btn-services').textContent = 'خدمات الورشة  🛠️';
      radioBtn.textContent = radio.paused ? 'شغّل الراديو' : 'أوقف الراديو  📻';

      // rebuild FAQ in Arabic (keeps markup consistent)
      faqContainer.innerHTML = `
        <h2>الأسئلة الشائعة</h2>
        <div class="faq-item"><h3>كيف يمكنني إرسال جهاز للإصلاح؟</h3><div class="answer">يمكنك إرسال الجهاز عبر البريد إلى عنوان الورشة أو التواصل معنا لترتيب خدمة الاستلام.</div></div>
        <div class="faq-item"><h3>ما هي مدة التصليح المعتادة؟</h3><div class="answer">مدة التصليح تختلف حسب نوع العطل، لكن غالباً لا تتجاوز 3 أيام عمل.</div></div>
        <div class="faq-item"><h3>هل توفرون قطع غيار أصلية؟</h3><div class="answer">نعم، نوفر قطع غيار أصلية وذات جودة عالية لجميع الأجهزة.</div></div>
        <div class="faq-item"><h3>كيف أتابع حالة الإصلاح؟</h3><div class="answer">نقوم بإرسال صور وفيديوهات لحالة الجهاز أثناء مراحل التصليح عبر واتساب.</div></div>
      `;
    } else {
      document.documentElement.lang = 'fr';
      document.documentElement.dir = 'ltr';
      document.querySelector('header h1').textContent = 'Atelier Electronique Médenine';
      document.querySelector('.experience-badge').textContent = 'Plus de 10 ans d\'expérience';
      toggleBtn.textContent = 'Changer la langue';
      document.querySelector('.btn-download').textContent = 'download  📥';
      document.querySelector('.btn-store').textContent = 'store  🛒';
      document.querySelector('.btn-whatsapp').textContent = 'WhatsApp  📱';
      document.querySelector('.btn-maps').textContent = 'Google Maps  📍';
      document.querySelector('.btn-gallery').textContent = 'Voir les photos  🖼️';
      document.querySelector('.btn-video').textContent = 'Voir les vidéos  🎥';
      document.querySelector('.btn-services').textContent = 'Services  🛠️';
      radioBtn.textContent = radio.paused ? 'Écouter la radio' : 'Arrêter la radio  📻';

      faqContainer.innerHTML = `<h2>FAQ</h2>
        <div class="faq-item"><h3>Comment puis-je envoyer un appareil pour réparation ?</h3><div class="answer">Vous pouvez envoyer l'appareil par courrier à l'atelier ou nous contacter pour organiser la collecte.</div></div>
        <div class="faq-item"><h3>Quel est le délai moyen de réparation ?</h3><div class="answer">Le délai dépend du type de panne, mais généralement pas plus de 3 jours ouvrables.</div></div>
        <div class="faq-item"><h3>Fournissez-vous des pièces d'origine ?</h3><div class="answer">Oui, nous fournissons des pièces d'origine et de haute qualité pour tous les appareils.</div></div>
        <div class="faq-item"><h3>Comment suivre l'état de la réparation ?</h3><div class="answer">Nous envoyons des photos et vidéos de l'état de l'appareil pendant la réparation via WhatsApp.</div></div>`;
    }

    // restart related features
    startNewsRotation();
    updateTime();
    initFAQ();
    updateEqualizerVisibility();
  }

  toggleBtn.addEventListener('click', () => {
    setLanguage(currentLang === 'ar' ? 'fr' : 'ar');
  });


document.addEventListener('DOMContentLoaded', () => {
  let currentLang = document.documentElement.lang.startsWith('ar') ? 'ar' : 'fr';
  const ticker = document.getElementById('live-news');
  const toggleBtn = document.getElementById('toggle-lang-btn');
  const timeEl = document.getElementById('current-time');
  const faqContainer = document.getElementById('faqContainer');
  const radio = document.getElementById('radio-stream');
  const radioBtn = document.getElementById('radio-btn');
  const equalizer = document.getElementById('equalizer');
  const visitEl = document.getElementById('visit-count');

  // Time
  const updateTime = () => {
    const now = new Date();
    const daysAr = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const monthsAr = ['جانفي','فيفري','مارس','أفريل','ماي','جوان','جويلية','أوت','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    const daysFr = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const monthsFr = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

    let day = currentLang === 'ar' ? daysAr[now.getDay()] : daysFr[now.getDay()];
    let month = currentLang === 'ar' ? monthsAr[now.getMonth()] : monthsFr[now.getMonth()];

    const date = now.getDate();
    const hours = now.getHours().toString().padStart(2,'0');
    const minutes = now.getMinutes().toString().padStart(2,'0');
    const seconds = now.getSeconds().toString().padStart(2,'0');

    if(timeEl) timeEl.textContent = `${currentLang==='ar'? `${day}، ${date} ${month}`: `${day}, ${date} ${month}`} - ${hours}:${minutes}:${seconds}`;
  };

  // Visits
  const updateVisits = () => {
    if(!visitEl) return;
    const key = 'aem-visit-count';
    let count = parseInt(localStorage.getItem(key)) || 0;
    count++;
    localStorage.setItem(key, count);
    visitEl.textContent = currentLang==='ar'? `عدد زياراتك: ${count}`:`Nombre de visites: ${count}`;
  };

  updateVisits();

  // News
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

  const updateNews = () => {
    if(!ticker) return;
    const news = currentLang==='ar'? newsAr : newsFr;
    ticker.classList.remove('fade');
    void ticker.offsetWidth;
    ticker.textContent = news[newsIndex];
    ticker.classList.add('fade');
    newsIndex = (newsIndex + 1) % news.length;
  };

  const startNewsRotation = () => {
    if(newsInterval) clearInterval(newsInterval);
    updateNews();
    newsInterval = setInterval(updateNews, 5000);
  };

  // FAQ
  const initFAQ = () => {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => item.addEventListener('click', () => item.classList.toggle('open')));
  };

  // Equalizer
  const updateEqualizerVisibility = () => {
    if(!equalizer) return;
    equalizer.style.opacity = radio.paused ? '0.25':'1';
    equalizer.style.pointerEvents = radio.paused ? 'none':'auto';
  };

  // Radio
  if(radioBtn && radio){
    radioBtn.addEventListener('click', () => {
      if(radio.paused){
        radio.play().catch(e=>console.warn('Radio play failed:', e));
        radioBtn.textContent = currentLang==='ar'? 'أوقف الراديو' : 'Arrêter la radio';
      } else {
        radio.pause();
        radioBtn.textContent = currentLang==='ar'? 'شغّل الراديو' : 'Écouter la radio';
      }
      updateEqualizerVisibility();
    });
    radio.addEventListener('play', updateEqualizerVisibility);
    radio.addEventListener('pause', updateEqualizerVisibility);
  }

  // Language toggle
  const setLanguage = (lang) => {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang==='ar'? 'rtl':'ltr';

    const expBadge = document.querySelector('.experience-badge');
    if(expBadge) expBadge.textContent = lang==='ar'? 'أكثر من 10 سنوات خبرة':'Plus de 10 ans d\'expérience';

    if(toggleBtn) toggleBtn.textContent = lang==='ar'? 'تبديل اللغة':'Changer la langue';
    startNewsRotation();
    updateTime();
    initFAQ();
    updateEqualizerVisibility();
  };

  if(toggleBtn) toggleBtn.addEventListener('click', ()=> setLanguage(currentLang==='ar'? 'fr':'ar'));

  setInterval(updateTime,1000);
  updateTime();
  startNewsRotation();
  initFAQ();
  updateEqualizerVisibility();
});
