document.addEventListener('DOMContentLoaded', () => {

  // ================= Firebase Initialization =================
  const firebaseConfig = {
    apiKey: "AIzaSyCtbEWdm7CAC25ROslGlVeLOvfxdi2exVo",
    authDomain: "atelier-electronique-mednine.firebaseapp.com",
    projectId: "atelier-electronique-mednine",
    storageBucket: "atelier-electronique-mednine.firebasestorage.app",
    messagingSenderId: "547430908384",
    appId: "1:547430908384:web:4caa4cf3869491bd14eb85"
  };
  
  const app = firebase.initializeApp(firebaseConfig);
  const analytics = firebase.analytics(app);
  const auth = firebase.auth();
  const db = firebase.database(); // قاعدة البيانات

  // ======= تسجيل الدخول + persistence =======
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => console.log("🔒 Session persistente activée"))
    .catch(err => console.error("Erreur persistence:", err));

  const loginPopup = document.getElementById('login-popup');
  const btnGoogle = document.getElementById('btn-google');
  const btnClosePopup = document.getElementById('btn-close-popup');
  const userInfo = document.getElementById('user-info');
  const userName = document.getElementById('user-name');
  const btnSignOut = document.getElementById('btn-signout');

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

  btnGoogle.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        userName.textContent = user.displayName;
        userInfo.style.display = 'block';
        loginPopup.style.display = 'none';
      }).catch(console.error);
  });

  btnClosePopup.addEventListener('click', () => loginPopup.style.display = 'none');
  btnSignOut.addEventListener('click', () => {
    auth.signOut().then(() => {
      userInfo.style.display = 'none';
      alert('تم تسجيل الخروج بنجاح');
    });
  });

  // ================= Visits Counter =================
  let totalVisits = 0;
  let currentLanguage = 'ar';
  const visitsRef = db.ref('visits');

  visitsRef.transaction(v => (v || 0) + 1);
  visitsRef.on('value', snap => {
    totalVisits = snap.val() || 0;
    updateVisitText(currentLanguage, totalVisits);
  });

  function updateVisitText(lang, total) {
    const el = document.getElementById('visit-count');
    if (!el) return;
    el.textContent = (lang === 'ar' ? 'عدد زوار الموقع: ' : 'Nombre de visiteurs : ') + total;
  }

  // ================= Fullscreen Media Viewer =================
  const mediaViewer = document.getElementById('mediaViewer');
  const viewerImg = document.getElementById('viewerImg');
  const viewerVideo = document.getElementById('viewerVideo');
  const closeBtn = mediaViewer.querySelector('.close-btn');

  document.querySelectorAll('.service-card img, .service-card video').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      mediaViewer.style.display = 'flex';
      if (el.tagName === 'IMG') {
        viewerImg.src = el.src;
        viewerImg.style.display = 'block';
        viewerVideo.style.display = 'none';
        viewerVideo.pause();
      } else if (el.tagName === 'VIDEO') {
        viewerVideo.src = el.src;
        viewerVideo.style.display = 'block';
        viewerImg.style.display = 'none';
        viewerVideo.play();
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    mediaViewer.style.display = 'none';
    viewerVideo.pause();
    viewerVideo.currentTime = 0;
  });

  // ================= CMP Cookie Banner =================
  const cmpBanner = document.getElementById('cmp-banner');
  const consentAllow = document.getElementById('consent-allow');
  const consentManage = document.getElementById('consent-manage');

  if (!localStorage.getItem('cmpConsent')) cmpBanner.style.display = 'block';

  consentAllow.addEventListener('click', () => {
    localStorage.setItem('cmpConsent', 'granted');
    cmpBanner.style.display = 'none';
  });

  consentManage.addEventListener('click', () => {
    alert('يمكنك إدارة تفضيلات الكوكيز هنا.');
  });

  // ================= Site Name Animation =================
  const siteName = document.getElementById('site-name');
  const texts = ["Atelier Electronique Médenine", " إلكترونيك الرحمـاني"];
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    siteName.textContent = texts[randomIndex];
    siteName.style.color = '#ff6b35';
    siteName.style.textShadow = '0 0 10px #e0a800';
    siteName.style.transform = 'scale(1.2)';
    setTimeout(() => { siteName.style.color = ''; siteName.style.textShadow = ''; siteName.style.transform = ''; }, 1000);
  }, 4000);

  // ================= Weather =================
  function updateWeather(language) {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=33.3549&longitude=10.5055&current_weather=true")
      .then(res => res.json())
      .then(data => {
        const temp = data.current_weather.temperature + "°C";
        const wind = data.current_weather.windspeed + (language === 'fr' ? " km/h" : " كم/س");
        document.getElementById("weather-temp").textContent = temp;
        if (language === 'ar') {
          document.querySelector(".weather-box h3").textContent = "🌦️ حالة الطقس في مدنين";
          document.getElementById("weather-desc").textContent = "🌬️ سرعة الرياح: " + wind;
        } else {
          document.querySelector(".weather-box h3").textContent = "🌦️ Météo à Médenine";
          document.getElementById("weather-desc").textContent = "🌬️ Vitesse du vent: " + wind;
        }
      }).catch(() => {
        document.getElementById("weather-desc").textContent = "⚠️ لا يمكن تحميل الطقس";
      });
  }
  updateWeather(currentLanguage);

  // ================= Prayer Times =================
  function updatePrayerTimes() {
    fetch("https://api.aladhan.com/v1/timingsByCity?city=Medenine&country=Tunisia&method=2")
      .then(res => res.json())
      .then(data => {
        const times = data.data.timings;
        const pt = document.getElementById("prayer-times");
        pt.innerHTML = `
  <p><span>🌅 الفجر:</span> <span class="time">${times.Fajr}</span></p>
  <p><span>🌄 الشروق:</span> <span class="time">${times.Sunrise}</span></p>
  <p><span>☀️ الظهر:</span> <span class="time">${times.Dhuhr}</span></p>
  <p><span>🕰️ العصر:</span> <span class="time">${times.Asr}</span></p>
  <p><span>🌇 المغرب:</span> <span class="time">${times.Maghrib}</span></p>
  <p><span>🌙 العشاء:</span> <span class="time">${times.Isha}</span></p>`;
      }).catch(err => console.error("Erreur prayer times:", err));
  }
  updatePrayerTimes();

  // ================= Language Toggle =================
  const ratingTitle = document.getElementById('rating-title');
  function updateLanguageTexts(lang) {
    ratingTitle.textContent = (lang === 'ar') ? 'قيم الورشة:' : 'Évaluez l’atelier :';
  }

  document.getElementById('toggle-lang-btn').addEventListener('click', () => {
    currentLanguage = (currentLanguage === 'ar') ? 'fr' : 'ar';
    updateWeather(currentLanguage);
    updateLanguageTexts(currentLanguage);
    updateAllCaptions(currentLanguage);
    updateVisitText(currentLanguage, totalVisits);
  });
  updateLanguageTexts(currentLanguage);

  // ================= Ratings =================
  const starsHorizontal = document.querySelectorAll('.stars-horizontal span');
  const ratingValueHorizontal = document.getElementById('rating-value');
  let selectedRatingHorizontal = parseInt(localStorage.getItem('workshopRating')) || 0;

  function updateStars(rating) {
    starsHorizontal.forEach(star => {
      star.classList.remove('selected');
      if (Number(star.dataset.value) <= rating) star.classList.add('selected');
      star.textContent = Number(star.dataset.value) <= rating ? '★' : '☆';
    });
    ratingValueHorizontal.textContent = `${rating}/5`;
    ratingValueHorizontal.style.color = rating > 0 ? 'gold' : '#fff';
    ratingValueHorizontal.style.textShadow = rating > 0 ? '0 0 8px gold' : 'none';
  }
  updateStars(selectedRatingHorizontal);

  starsHorizontal.forEach(star => {
    const val = Number(star.dataset.value);
    star.addEventListener('mouseover', () => {
      starsHorizontal.forEach(s => s.classList.remove('hover'));
      starsHorizontal.forEach(s => { if (Number(s.dataset.value) <= val) s.classList.add('hover'); });
      ratingValueHorizontal.style.color = 'gold';
      ratingValueHorizontal.style.textShadow = '0 0 8px gold';
    });
    star.addEventListener('mouseout', () => {
      starsHorizontal.forEach(s => s.classList.remove('hover'));
      updateStars(selectedRatingHorizontal);
    });
    star.addEventListener('click', () => {
      selectedRatingHorizontal = val;
      localStorage.setItem('workshopRating', selectedRatingHorizontal);
      updateStars(selectedRatingHorizontal);
    });
  });

  // ================= PCB Header =================
  const canvas = document.getElementById('pcbCanvasHeader');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() { canvas.width = canvas.parentElement.offsetWidth; canvas.height = canvas.parentElement.offsetHeight; }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const traces = [];
  for (let i = 0; i < 50; i++) {
    traces.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, length: 50 + Math.random() * 150, speed: 0.5 + Math.random() * 1.5, color: 'rgba(0,255,255,0.5)', particles: [] });
    for (let j = 0; j < 5; j++) traces[i].particles.push({ offset: Math.random() * traces[i].length, speed: 1 + Math.random() * 2, size: 2 + Math.random() * 2 });
  }
  let mouseX = -1000, mouseY = -1000;
  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  function animatePCB() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    traces.forEach(t => {
      const dx = t.x + t.length / 2 - mouseX, dy = t.y - mouseY, dist = Math.sqrt(dx * dx + dy * dy);
      const speedMultiplier = dist < 200 ? 3 : 1;
      ctx.beginPath(); ctx.moveTo(t.x, t.y); ctx.lineTo(t.x + t.length, t.y);
      ctx.strokeStyle = t.color; ctx.lineWidth = 2; ctx.shadowColor = '#0ff'; ctx.shadowBlur = 10; ctx.stroke();
      t.particles.forEach(p => {
        let px = t.x + p.offset, py = t.y; ctx.beginPath(); ctx.arc(px, py, p.size, 0, Math.PI * 2); ctx.fillStyle = '#0ff'; ctx.shadowColor = '#0ff'; ctx.shadowBlur = 10; ctx.fill();
        p.offset += p.speed * speedMultiplier; if (p.offset > t.length) p.offset = 0;
      });
      t.x += t.speed * speedMultiplier; if (t.x > canvas.width) t.x = -t.length;
    });
    requestAnimationFrame(animatePCB);
  }
  animatePCB();

  // ================= Slider Drag =================
  function enableDragScroll(id) {
    const slider = document.getElementById(id);
    if (!slider) return;
    let isDown = false, startX, scrollLeft;
    slider.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft; });
    slider.addEventListener('mouseleave', () => isDown = false);
    slider.addEventListener('mouseup', () => isDown = false);
    slider.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      slider.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });
  }
  enableDragScroll('servicesSlider');
  enableDragScroll('videoSlider');

  // ================= Video Play on Hover =================
  document.querySelectorAll('.video-card video').forEach(video => {
    video.addEventListener('mouseenter', () => video.play());
    video.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
  });

  // ================= Radio Button Dance =================
  const radioBtn = document.getElementById('radio-btn');
  let dancing = false;
  radioBtn.addEventListener('click', () => {
    dancing = !dancing;
    radioBtn.classList.toggle('dance', dancing);
  });

  // ================= Services Captions Translations =================
  const serviceTranslations = {
    ar: { title: "خدمات اليوم", captions: ["تصليح لوحات إلكترونية", "تصليح كارت جهاز المشي", "تصليح كارت ماكينة غسيل", "تصليح كارت تلفاز", "تصليح كارت غسالة ل-ج"] },
    fr: { title: "Services du jour", captions: ["réparation de cartes électroniques", "réparation carte tapis roulant", "réparation carte lave-linge", "réparation carte television", "réparation carte lave-linge LG"] }
  };
  const videoTranslations = {
    ar: { title: "فيديو اليوم", captions: ["تصليح كارت تغذية", "إصلاح لوحة إلكترونية", "فحص بوردة 1", "فحص بوردة 2", "فحص بوردة 3"] },
    fr: { title: "Vidéo du jour", captions: ["réparation carte alimentation", "réparation carte électronique", "inspection carte 1", "inspection carte 2", "inspection carte 3"] }
  };
  const posteSoudureTranslations = {
    ar: { title: "تصليح ماكينات لحام", captions: ["تصليح ماكينة لحام 1", "تصليح ماكينة لحام 2", "تصليح ماكينة لحام 3", "تصليح ماكينة لحام 4", "تصليح ماكينة لحام 5"] },
    fr: { title: "Réparation postes soudure", captions: ["Réparation poste soudure 1", "Réparation poste soudure 2", "Réparation poste soudure 3", "Réparation poste soudure 4", "Réparation poste soudure 5"] }
  };

  function updateAllCaptions(lang) {
    // خدمات اليوم
    document.querySelector('.services-today h2').textContent = serviceTranslations[lang].title;
    document.querySelectorAll('.services-today .service-caption').forEach((cap, idx) => cap.textContent = serviceTranslations[lang].captions[idx]);
    // فيديو اليوم
    document.querySelector('.videos-today h2').textContent = videoTranslations[lang].title;
    document.querySelectorAll('.videos-today .service-caption').forEach((cap, idx) => cap.textContent = videoTranslations[lang].captions[idx]);
    // تصليح ماكينات لحام
    document.querySelector('#postesSection h2').textContent = posteSoudureTranslations[lang].title;
    document.querySelectorAll('#postesSection .service-caption').forEach((cap, idx) => cap.textContent = posteSoudureTranslations[lang].captions[idx]);
  }
  updateAllCaptions(currentLanguage);

});
