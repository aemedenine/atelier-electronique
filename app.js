// ================= app.js =================
document.addEventListener('DOMContentLoaded', () => {

  /* ===== FIREBASE ===== */
  const firebaseConfig = {
    apiKey: "AIzaSyCtbEWdm7CAC25ROslGlVeLOvfxdi2exVo",
    authDomain: "atelier-electronique-mednine.firebaseapp.com",
    projectId: "atelier-electronique-mednine",
    storageBucket: "atelier-electronique-mednine.firebasestorage.app",
    messagingSenderId: "547430908384",
    appId: "1:547430908384:web:4caa4cf3869491bd14eb85"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }

  const auth = firebase.auth();
  const db = firebase.database();

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  /* ===== AUTH ===== */
  const loginPopup = document.getElementById('login-popup');
  const userInfo = document.getElementById('user-info');
  const userName = document.getElementById('user-name');

  auth.onAuthStateChanged(user => {
    if (user) {
      userInfo.style.display = 'block';
      loginPopup.style.display = 'none';
      userName.textContent = user.displayName || "مستخدم";
    } else {
      userInfo.style.display = 'none';
      loginPopup.style.display = 'flex';
    }
  });

  document.getElementById('btn-google')?.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  });

  document.getElementById('btn-close-popup')?.addEventListener('click', () => {
    loginPopup.style.display = 'none';
  });

  document.getElementById('btn-signout')?.addEventListener('click', () => {
    auth.signOut();
    userInfo.style.display = 'none';
  });

  /* ===== VISITS (Firebase) ===== */
  let totalVisits = 0;
  let currentLanguage = 'ar';

  const visitsRef = db.ref('visits');
  visitsRef.transaction(v => (v || 0) + 1);

  visitsRef.on('value', snap => {
    totalVisits = snap.val() || 0;
    updateVisitText();
  });

  function updateVisitText() {
    const el = document.getElementById('visit-count');
    if (!el) return;
    el.textContent =
      currentLanguage === 'ar'
        ? 'عدد زوار الموقع: ' + totalVisits
        : 'Nombre de visiteurs : ' + totalVisits;
  }

  /* ===== MEDIA VIEWER (نسخة وحدة) ===== */
  const mediaViewer = document.getElementById('mediaViewer');
  const viewerImg = document.getElementById('viewerImg');
  const viewerVideo = document.getElementById('viewerVideo');
  const closeBtn = mediaViewer?.querySelector('.close-btn');

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

  closeBtn?.addEventListener('click', () => {
    mediaViewer.style.display = 'none';
    viewerVideo.pause();
    viewerVideo.currentTime = 0;
  });

  /* ===== WEATHER ===== */
  function updateWeather() {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=33.3549&longitude=10.5055&current_weather=true")
      .then(r => r.json())
      .then(d => {
        document.getElementById("weather-temp").textContent =
          d.current_weather.temperature + "°C";
        document.getElementById("weather-desc").textContent =
          currentLanguage === 'ar'
            ? "🌬️ سرعة الرياح: " + d.current_weather.windspeed + " كم/س"
            : "🌬️ Vitesse du vent: " + d.current_weather.windspeed + " km/h";
      });
  }

  /* ===== LANGUAGE TOGGLE ===== */
  document.getElementById('toggle-lang-btn')?.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'ar' ? 'fr' : 'ar';
    updateWeather();
    updateVisitText();
  });

  updateWeather();
});
