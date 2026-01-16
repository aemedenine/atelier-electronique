// ==========================================================================
// Firebase Configuration & Initialization
// ==========================================================================
const firebaseConfig = {
    apiKey: "AIzaSyCtbEWdm7CAC25ROslGlVeLOvfxdi2exVo",
    authDomain: "atelier-electronique-mednine.firebaseapp.com",
    projectId: "atelier-electronique-mednine",
    storageBucket: "atelier-electronique-mednine.firebasestorage.app",
    messagingSenderId: "547430908384",
    appId: "1:547430908384:web:4caa4cf3869491bd14eb85"
};

firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const auth = firebase.auth();

// Garder la session même après refresh/fermeture
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => console.log("🔒 Session persistente activée"))
    .catch(error => console.error("Erreur persistence:", error));
// app.js
// All client logic: UI, language toggle, news, time, visits, radio, equalizer, FAQ
document.addEventListener('DOMContentLoaded', () => {
  // language initial based on html lang attribute
  let currentLang = document.documentElement.lang && document.documentElement.lang.startsWith('ar') ? 'ar' : 'fr';

  // Elements
  const ticker = document.getElementById('live-news');
  const toggleBtn = document.getElementById('toggle-lang-btn');
  const timeEl = document.getElementById('current-time');
  const faqContainer = document.querySelector('.faq');
  const radio = document.getElementById('radio-stream');
  const radioBtn = document.getElementById('radio-btn');
  const equalizer = document.getElementById('equalizer');

  /* -------------------- Time -------------------- */
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

    timeEl.textContent = `${dateStr} - ${timeStr}`;
  }

  /* -------------------- Visits -------------------- */
  function updateVisits() {
    const key = 'aem-visit-count';
    let count = parseInt(localStorage.getItem(key)) || 0;
    count++;
    localStorage.setItem(key, count);
    visitEl.textContent = currentLang === 'ar' ? `عدد زياراتك: ${count}` : `Nombre de visites: ${count}`;
  }

  /* -------------------- News rotation -------------------- */
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

  function updateNews() {
    const news = currentLang === 'ar' ? newsAr : newsFr;
    // show next with fade animation class
    ticker.classList.remove('fade');
    void ticker.offsetWidth; // force reflow to restart animation
    ticker.textContent = news[newsIndex];
    ticker.classList.add('fade');

    newsIndex = (newsIndex + 1) % news.length;
  }

  function startNewsRotation() {
    if (newsInterval) clearInterval(newsInterval);
    updateNews();
    newsInterval = setInterval(updateNews, 5000);
  }

  /* -------------------- FAQ -------------------- */
  function initFAQ() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('open');
      });
    });
  }

  /* -------------------- Equalizer visibility -------------------- */
  function updateEqualizerVisibility() {
    if (!equalizer) return;
    if (radio.paused) {
      equalizer.style.opacity = '0.25';
      equalizer.style.pointerEvents = 'none';
    } else {
      equalizer.style.opacity = '1';
      equalizer.style.pointerEvents = 'auto';
    }
  }

  /* -------------------- Radio controls -------------------- */
  radioBtn.addEventListener('click', () => {
    if (radio.paused) {
      radio.play().catch(e => {
        // autoplay may be blocked by browser; inform user
        console.warn('Radio play failed:', e);
      });
      radioBtn.textContent = currentLang === 'ar' ? 'أوقف الراديو' : 'Arrêter la radio';
    } else {
      radio.pause();
      radioBtn.textContent = currentLang === 'ar' ? 'شغّل الراديو' : 'Écouter la radio';
    }
    updateEqualizerVisibility();
  });

  radio.addEventListener('play', updateEqualizerVisibility);
  radio.addEventListener('pause', updateEqualizerVisibility);

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
// ==========================================================================
// Variables globales
// ==========================================================================
let currentLanguage = 'ar';

// ==========================================================================
// DOM Ready
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Éléments récurrents
    const loginPopup = document.getElementById('login-popup');
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');
    const btnGoogle = document.getElementById('btn-google');
    const btnClosePopup = document.getElementById('btn-close-popup');
    const btnSignOut = document.getElementById('btn-signout');

    // ── Authentification Google ───────────────────────────────────────
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

    btnGoogle?.addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(result => {
                userName.textContent = result.user.displayName;
                userInfo.style.display = 'block';
                loginPopup.style.display = 'none';
            })
            .catch(console.error);
    });

    btnClosePopup?.addEventListener('click', () => {
        loginPopup.style.display = 'none';
    });

    btnSignOut?.addEventListener('click', () => {
        auth.signOut().then(() => {
            userInfo.style.display = 'none';
            alert('تم تسجيل الخروج بنجاح');
        }).catch(console.error);
    });

    // ── Visitors Counter ──────────────────────────────────────────────
    const db = firebase.database();
    const visitsRef = db.ref('visits');
    
    // Incrémenter le compteur
    visitsRef.transaction(current => (current || 0) + 1);

    // Afficher en temps réel
    visitsRef.on('value', snapshot => {
        const total = snapshot.val() || 0;
        document.getElementById('visit-count').textContent = 
            currentLanguage === 'ar' 
                ? `عدد زوار الموقع: ${total}` 
                : `Nombre de visiteurs : ${total}`;
    });

    // ── Weather API ───────────────────────────────────────────────────
    function updateWeather(lang) {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=33.3549&longitude=10.5055&current_weather=true")
            .then(res => res.json())
            .then(data => {
                const temp = data.current_weather.temperature + "°C";
                const wind = data.current_weather.windspeed + (lang === 'fr' ? " km/h" : " كم/س");

                document.getElementById("weather-temp").textContent = temp;
                document.getElementById("weather-desc").textContent = 
                    lang === 'ar' ? "🌬️ سرعة الرياح: " + wind : "🌬️ Vitesse du vent: " + wind;
            })
            .catch(() => {
                document.getElementById("weather-desc").textContent = "⚠️ لا يمكن تحميل الطقس";
            });
    }

    // ── Prayer Times ──────────────────────────────────────────────────
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
                    <p><span>🌙 العشاء:</span> <span class="time">${times.Isha}</span></p>
                `;
            })
            .catch(err => console.error("Erreur prayer times:", err));
    }

    // ── Language Toggle & Translations ────────────────────────────────
    function updateLanguageTexts(lang) {
        document.querySelector('.services-today h2').textContent = 
            lang === 'ar' ? "خدمات اليوم" : "Services du jour";

        document.querySelector('.videos-today h2').textContent = 
            lang === 'ar' ? "فيديو اليوم" : "Vidéo du jour";

        document.querySelector('#postesSection h2').textContent = 
            lang === 'ar' ? "تصليح ماكينات لحام" : "Réparation postes soudure";

        // Mise à jour titres rating
        document.getElementById('rating-title').textContent = 
            lang === 'ar' ? 'قيم الورشة:' : 'Évaluez l’atelier :';
    }

    document.getElementById('toggle-lang-btn')?.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'ar' ? 'fr' : 'ar';
        updateWeather(currentLanguage);
        updateLanguageTexts(currentLanguage);
        // updateVisitText(currentLanguage, totalVisits); // déjà géré par listener
    });

    // Initialisation
    updateWeather(currentLanguage);
    updatePrayerTimes();
    updateLanguageTexts(currentLanguage);

    // ── Rating Stars ──────────────────────────────────────────────────
    const stars = document.querySelectorAll('.stars-horizontal span');
    const ratingValue = document.getElementById('rating-value');
    let selectedRating = parseInt(localStorage.getItem('workshopRating')) || 0;

    function updateStars(rating) {
        stars.forEach(star => {
            const val = Number(star.dataset.value);
            star.classList.toggle('selected', val <= rating);
            star.textContent = val <= rating ? '★' : '☆';
        });
        ratingValue.textContent = `${rating}/5`;
        ratingValue.style.color = rating > 0 ? '#0a3af0' : '#fff';
    }

    updateStars(selectedRating);

    stars.forEach(star => {
        const val = Number(star.dataset.value);
        star.addEventListener('mouseover', () => {
            stars.forEach(s => {
                s.classList.toggle('hover', Number(s.dataset.value) <= val);
            });
        });
        star.addEventListener('mouseout', () => {
            stars.forEach(s => s.classList.remove('hover'));
            updateStars(selectedRating);
        });
        star.addEventListener('click', () => {
            selectedRating = val;
            localStorage.setItem('workshopRating', selectedRating);
            updateStars(selectedRating);
        });
    });

    // ── PCB Animated Header ───────────────────────────────────────────
    const canvas = document.getElementById('pcbCanvasHeader');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const traces = [];
        for (let i = 0; i < 50; i++) {
            traces.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: 50 + Math.random() * 150,
                speed: 0.5 + Math.random() * 1.5,
                color: 'rgba(0,255,255,0.5)',
                particles: Array.from({length: 5}, () => ({
                    offset: Math.random() * 200,
                    speed: 1 + Math.random() * 2,
                    size: 2 + Math.random() * 2
                }))
            });
        }

        let mouseX = -1000, mouseY = -1000;
        window.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animatePCB() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            traces.forEach(t => {
                const dx = t.x + t.length/2 - mouseX;
                const dy = t.y - mouseY;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const multiplier = dist < 200 ? 3 : 1;

                // Trace principale
                ctx.beginPath();
                ctx.moveTo(t.x, t.y);
                ctx.lineTo(t.x + t.length, t.y);
                ctx.strokeStyle = t.color;
                ctx.lineWidth = 2;
                ctx.shadowColor = '#0a3af0';
                ctx.shadowBlur = 10;
                ctx.stroke();

                // Particules
                t.particles.forEach(p => {
                    const px = t.x + p.offset;
                    const py = t.y;
                    ctx.beginPath();
                    ctx.arc(px, py, p.size, 0, Math.PI*2);
                    ctx.fillStyle = '#0a3af0';
                    ctx.shadowColor = '#0a3af0';
                    ctx.shadowBlur = 10;
                    ctx.fill();
                    p.offset += p.speed * multiplier;
                    if (p.offset > t.length) p.offset = 0;
                });

                t.x += t.speed * multiplier;
                if (t.x > canvas.width) t.x = -t.length;
            });
            requestAnimationFrame(animatePCB);
        }
        animatePCB();
    }

    // ── Horizontal Sliders Drag ───────────────────────────────────────
    function enableDragScroll(sliderId) {
        const slider = document.getElementById(sliderId);
        if (!slider) return;

        let isDown = false;
        let startX, scrollLeft;

        slider.addEventListener('mousedown', e => {
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            slider.style.cursor = 'grabbing';
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mousemove', e => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1.5;
            slider.scrollLeft = scrollLeft - walk;
        });
    }

    enableDragScroll('servicesSlider');
    enableDragScroll('videoSlider');

    // ── Video hover play/pause ────────────────────────────────────────
    document.querySelectorAll('.video-card video').forEach(video => {
        video.addEventListener('mouseenter', () => video.play().catch(() => {}));
        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    // ── Fullscreen Media Viewer ───────────────────────────────────────
    const mediaViewer = document.getElementById('mediaViewer');
    const viewerImg = document.getElementById('viewerImg');
    const viewerVideo = document.getElementById('viewerVideo');
    const closeBtn = mediaViewer?.querySelector('.close-btn');

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

    closeBtn?.addEventListener('click', () => {
        mediaViewer.style.display = 'none';
        viewerVideo.pause();
        viewerVideo.currentTime = 0;
    });

    // ── CMP Cookie Banner ─────────────────────────────────────────────
    const cmpBanner = document.getElementById('cmp-banner');
    const consentAllow = document.getElementById('consent-allow');
    const consentManage = document.getElementById('consent-manage');

    if (!localStorage.getItem('cmpConsent')) {
        cmpBanner.style.display = 'block';
    }

    consentAllow?.addEventListener('click', () => {
        localStorage.setItem('cmpConsent', 'granted');
        cmpBanner.style.display = 'none';
    });

    consentManage?.addEventListener('click', () => {
        alert('يمكنك إدارة تفضيلات الكوكيز هنا.');
    });

    // ── Site Name Animation ───────────────────────────────────────────
    const siteName = document.getElementById('site-name');
    const texts = ["Atelier Electronique Médenine", "إلكترونيك الرحماني"];

    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * texts.length);
        siteName.textContent = texts[randomIndex];
        siteName.style.color = '#ff6b35';
        siteName.style.textShadow = '0 0 10px #e0a800';
        siteName.style.transform = 'scale(1.2)';
        setTimeout(() => {
            siteName.style.color = '';
            siteName.style.textShadow = '';
            siteName.style.transform = '';
        }, 1000);
    }, 4000);

    // ── Radio Button Dance ────────────────────────────────────────────
    const radioBtn = document.getElementById('radio-btn');
    radioBtn?.addEventListener('click', () => {
        radioBtn.classList.toggle('dance');
    });
    // ── Daily Featured Items Rotation ─────────────────────────────────────────────
function initDailyRotation() {
  // حساب رقم اليوم في السنة (يبقى ثابت طول الـ 24 ساعة)
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  // خدمات اليوم
  const serviceCards = document.querySelectorAll('.service-card:not(#daily-service-card)'); // كل الكروت ما عدا المميز
  if (serviceCards.length > 0) {
    const index = dayOfYear % serviceCards.length;
    const selected = serviceCards[index].cloneNode(true); // نسخ الكارد
    const dailyContainer = document.getElementById('daily-service-card');
    if (dailyContainer) {
      dailyContainer.innerHTML = ''; // نظف
      dailyContainer.appendChild(selected);
      // أعد تفعيل click للـ fullscreen viewer إذا موجود
      const media = selected.querySelector('img, video');
      if (media) {
        media.style.cursor = 'pointer';
        media.addEventListener('click', () => {
          if (media.tagName === 'IMG') {
            viewerImg.src = media.src;
            viewerImg.style.display = 'block';
            viewerVideo.style.display = 'none';
          } else {
            viewerVideo.src = media.src;
            viewerVideo.style.display = 'block';
            viewerImg.style.display = 'none';
            viewerVideo.play().catch(() => {});
          }
          mediaViewer.style.display = 'flex';
        });
      }
    }
  }

  // فيديو اليوم
  const videoCards = document.querySelectorAll('.video-card:not(#daily-video-card)');
  if (videoCards.length > 0) {
    const index = dayOfYear % videoCards.length;
    const selected = videoCards[index].cloneNode(true);
    const dailyVideo = document.getElementById('daily-video-card');
    if (dailyVideo) {
      dailyVideo.innerHTML = '';
      dailyVideo.appendChild(selected);
      const videoEl = selected.querySelector('video');
      if (videoEl) {
        videoEl.controls = true;
        videoEl.addEventListener('mouseenter', () => videoEl.play().catch(() => {}));
        videoEl.addEventListener('mouseleave', () => {
          videoEl.pause();
          videoEl.currentTime = 0;
        });
        // fullscreen click
        videoEl.addEventListener('click', () => {
          viewerVideo.src = videoEl.src;
          viewerVideo.style.display = 'block';
          viewerImg.style.display = 'none';
          viewerVideo.play().catch(() => {});
          mediaViewer.style.display = 'flex';
        });
      }
    }
  }

  // تصليح ماكينة اليوم
  const repairCards = document.querySelectorAll('#postesSection .service-card:not(#daily-repair-card)');
  if (repairCards.length > 0) {
    const index = dayOfYear % repairCards.length;
    const selected = repairCards[index].cloneNode(true);
    const dailyRepair = document.getElementById('daily-repair-card');
    if (dailyRepair) {
      dailyRepair.innerHTML = '';
      dailyRepair.appendChild(selected);
      const img = selected.querySelector('img');
      if (img) {
        img.addEventListener('click', () => {
          viewerImg.src = img.src;
          viewerImg.style.display = 'block';
          viewerVideo.style.display = 'none';
          mediaViewer.style.display = 'flex';
        });
      }
    }
  }
}

// شغل الدالة بعد التحميل
initDailyRotation();
});
