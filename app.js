document.addEventListener('DOMContentLoaded', () => {

  /* ===================== Firebase ===================== */
  const firebaseConfig = {
    apiKey: "AIzaSyCtbEWdm7CAC25ROslGlVeLOvfxdi2exVo",
    authDomain: "atelier-electronique-mednine.firebaseapp.com",
    projectId: "atelier-electronique-mednine",
    storageBucket: "atelier-electronique-mednine.firebasestorage.app",
    messagingSenderId: "547430908384",
    appId: "1:547430908384:web:4caa4cf3869491bd14eb85"
  };

  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebase.database();
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

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

  document.getElementById('btn-signout')?.addEventListener('click', () => auth.signOut());

  /* ===================== VISITS ===================== */
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
          (currentLanguage === 'ar' ? 'سرعة الرياح: ' : 'Vitesse du vent: ') + d.current_weather.windspeed;
      });
  }
  updateWeather();

  /* ===================== LANGUAGE TOGGLE ===================== */
  document.getElementById('toggle-lang-btn')?.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'ar' ? 'fr' : 'ar';
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    updateWeather();
    updateVisitText();
    updateNews();
  });

  /* ===================== NEWS ===================== */
  const ticker = document.getElementById('live-news');
  const news = {
    ar: [
      "📢 ورشة إلكترونيك الرحماني تفتح أبوابها.",
      "🔧 تصليح إلكترونيات باحتراف.",
      "📦 توصيل لجميع الولايات."
    ],
    fr: [
      "📢 Atelier Electronique Médenine.",
      "🔧 Réparation électronique professionnelle.",
      "📦 Livraison partout en Tunisie."
    ]
  };
  let newsIndex = 0;

  function updateNews() {
    if (!ticker) return;
    ticker.textContent = news[currentLanguage][newsIndex];
    newsIndex = (newsIndex + 1) % news[currentLanguage].length;
  }
  setInterval(updateNews, 5000);
  updateNews();

  /* ===================== RADIO ===================== */
  const radio = document.getElementById('radio-stream');
  const radioBtn = document.getElementById('radio-btn');

  radioBtn?.addEventListener('click', () => {
    if (radio.paused) {
      radio.play();
      radioBtn.textContent = currentLanguage === 'ar' ? 'إيقاف الراديو' : 'Arrêter la radio';
    } else {
      radio.pause();
      radioBtn.textContent = currentLanguage === 'ar' ? 'تشغيل الراديو' : 'Écouter la radio';
    }
  });

  /* ===================== FAQ ===================== */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => item.classList.toggle('open'));
  });

  /* ===================== MEDIA VIEWER ===================== */
  const mediaViewer = document.getElementById('mediaViewer');
  const viewerImg = document.getElementById('viewerImg');
  const viewerVideo = document.getElementById('viewerVideo');

  document.querySelectorAll('.service-card img, .service-card video').forEach(el => {
    el.addEventListener('click', () => {
      mediaViewer.style.display = 'flex';
      if (el.tagName === 'IMG') {
        viewerImg.src = el.src;
        viewerImg.style.display = 'block';
        viewerVideo.style.display = 'none';
      } else {
        viewerVideo.src = el.src;
        viewerVideo.style.display = 'block';
        viewerImg.style.display = 'none';
        viewerVideo.play();
      }
    });
  });

  mediaViewer?.querySelector('.close-btn')?.addEventListener('click', () => {
    mediaViewer.style.display = 'none';
    viewerVideo.pause();
    viewerVideo.currentTime = 0;
  });

});
