// ==========================================================================
// app.js - VERSION COMPLÈTE (kamil) - Janvier 2026
// ==========================================================================

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCtbEWdm7CAC25ROslGlVeLOvfxdi2exVo",
    authDomain: "atelier-electronique-mednine.firebaseapp.com",
    projectId: "atelier-electronique-mednine",
    storageBucket: "atelier-electronique-mednine.firebasestorage.app",
    messagingSenderId: "547430908384",
    appId: "1:547430908384:web:4caa4cf3869491bd14eb85"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

// Persistance session
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .catch(err => console.error("Erreur persistence:", err));

// Variables globales
let currentLanguage = document.documentElement.lang?.startsWith('ar') ? 'ar' : 'fr';

// DOM Elements
const elements = {
    toggleBtn: document.getElementById('toggle-lang-btn'),
    timeEl: document.getElementById('current-time'),
    ticker: document.getElementById('live-news'),
    visitCount: document.getElementById('visit-count'),
    faqContainer: document.querySelector('.faq'),
    radio: document.getElementById('radio-stream'),
    radioBtn: document.getElementById('radio-btn'),
    equalizer: document.getElementById('equalizer'),
    loginPopup: document.getElementById('login-popup'),
    userInfo: document.getElementById('user-info'),
    userName: document.getElementById('user-name'),
    btnGoogle: document.getElementById('btn-google'),
    btnClosePopup: document.getElementById('btn-close-popup'),
    btnSignOut: document.getElementById('btn-signout'),
    weatherTemp: document.getElementById('weather-temp'),
    weatherDesc: document.getElementById('weather-desc'),
    prayerTimes: document.getElementById('prayer-times'),
    mediaViewer: document.getElementById('mediaViewer'),
    viewerImg: document.getElementById('viewerImg'),
    viewerVideo: document.getElementById('viewerVideo')
};

// ==========================================================================
// Authentification Google
// ==========================================================================
auth.onAuthStateChanged(user => {
    if (user) {
        elements.userInfo.style.display = 'block';
        elements.loginPopup.style.display = 'none';
        elements.userName.textContent = user.displayName || user.email?.split('@')[0] || "مستخدم";
    } else {
        elements.userInfo.style.display = 'none';
        elements.loginPopup.style.display = 'flex';
    }
});

elements.btnGoogle?.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).catch(console.error);
});

elements.btnClosePopup?.addEventListener('click', () => {
    elements.loginPopup.style.display = 'none';
});

elements.btnSignOut?.addEventListener('click', () => {
    auth.signOut().then(() => {
        alert(currentLanguage === 'ar' ? 'تم تسجيل الخروج' : 'Déconnexion réussie');
    });
});

// ==========================================================================
// Compteur de visites (Firebase)
// ==========================================================================
db.ref('visits').transaction(current => (current || 0) + 1);
db.ref('visits').on('value', snapshot => {
    const total = snapshot.val() || 0;
    elements.visitCount.textContent = currentLanguage === 'ar' 
        ? `عدد زوار الموقع: ${total}` 
        : `Nombre de visiteurs : ${total}`;
});

// ==========================================================================
// Heure actuelle
// ==========================================================================
function updateTime() {
    const now = new Date();
    const options = {
        weekday: 'long', day: 'numeric', month: 'long',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
    };
    elements.timeEl.textContent = now.toLocaleString(currentLanguage === 'ar' ? 'ar-TN' : 'fr-FR', options);
}
setInterval(updateTime, 1000);
updateTime();

// ==========================================================================
// News Ticker
// ==========================================================================
const news = {
    ar: [
        "📢 ورشة إلكترونيك الرحماني تفتح أبوابها لجميع الولايات.",
        "🔧 خدمات تصليح بجودة عالية وبأسعار منافسة.",
        "🌍 التوصيل متوفر لكل أنحاء تونس.",
        "📱 تواصل معنا عبر واتساب!"
    ],
    fr: [
        "📢 Atelier ouvert à toutes les régions.",
        "🔧 Réparation de qualité à prix compétitifs.",
        "🌍 Livraison partout en Tunisie.",
        "📱 Contactez-nous via WhatsApp!"
    ]
};

let newsIndex = 0;
let newsInterval;

function updateNews() {
    const currentNews = news[currentLanguage];
    elements.ticker.textContent = currentNews[newsIndex];
    newsIndex = (newsIndex + 1) % currentNews.length;
}

function startNews() {
    if (newsInterval) clearInterval(newsInterval);
    updateNews();
    newsInterval = setInterval(updateNews, 5000);
}

// ==========================================================================
// Météo + Awaqat Salat
// ==========================================================================
function updateWeather() {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=33.3549&longitude=10.5055&current_weather=true")
        .then(r => r.json())
        .then(d => {
            elements.weatherTemp.textContent = d.current_weather.temperature + "°C";
            elements.weatherDesc.textContent = `سرعة الرياح: ${d.current_weather.windspeed} كم/س`;
        })
        .catch(() => elements.weatherDesc.textContent = "⚠️ خطأ في الطقس");
}

function updatePrayer() {
    fetch("https://api.aladhan.com/v1/timingsByCity?city=Medenine&country=Tunisia&method=2")
        .then(r => r.json())
        .then(d => {
            const t = d.data.timings;
            elements.prayerTimes.innerHTML = `
                الفجر: ${t.Fajr} | الشروق: ${t.Sunrise}<br>
                الظهر: ${t.Dhuhr} | العصر: ${t.Asr}<br>
                المغرب: ${t.Maghrib} | العشاء: ${t.Isha}
            `;
        })
        .catch(console.error);
}

// ==========================================================================
// Radio + Equalizer
// ==========================================================================
function updateEqualizer() {
    if (!elements.equalizer) return;
    elements.equalizer.style.opacity = elements.radio.paused ? '0.4' : '1';
}

elements.radioBtn?.addEventListener('click', () => {
    if (elements.radio.paused) {
        elements.radio.play().catch(e => console.log("Erreur radio:", e));
        elements.radioBtn.textContent = currentLanguage === 'ar' ? 'إيقاف الراديو' : 'Stop Radio';
    } else {
        elements.radio.pause();
        elements.radioBtn.textContent = currentLanguage === 'ar' ? 'تشغيل الراديو' : 'Play Radio';
    }
    updateEqualizer();
});

elements.radio?.addEventListener('play', updateEqualizer);
elements.radio?.addEventListener('pause', updateEqualizer);

// ==========================================================================
// FAQ Accordion
// ==========================================================================
function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => item.classList.toggle('open'));
    });
}

// ==========================================================================
// Rating étoiles
// ==========================================================================
const stars = document.querySelectorAll('.stars-horizontal span');
const ratingValue = document.getElementById('rating-value');
let currentRating = localStorage.getItem('rating') || 0;

function updateRating() {
    stars.forEach(s => {
        s.classList.toggle('selected', Number(s.dataset.value) <= currentRating);
        s.textContent = Number(s.dataset.value) <= currentRating ? '★' : '☆';
    });
    ratingValue.textContent = currentRating + '/5';
}

stars.forEach(s => {
    s.addEventListener('click', () => {
        currentRating = Number(s.dataset.value);
        localStorage.setItem('rating', currentRating);
        updateRating();
    });
});

updateRating();

// ==========================================================================
// Fullscreen Viewer
// ==========================================================================
document.querySelectorAll('.service-card img, .service-card video').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
        elements.mediaViewer.style.display = 'flex';
        if (el.tagName === 'IMG') {
            elements.viewerImg.src = el.src;
            elements.viewerImg.style.display = 'block';
            elements.viewerVideo.style.display = 'none';
        } else {
            elements.viewerVideo.src = el.src;
            elements.viewerVideo.style.display = 'block';
            elements.viewerImg.style.display = 'none';
            elements.viewerVideo.play().catch(() => {});
        }
    });
});

document.querySelector('.close-btn')?.addEventListener('click', () => {
    elements.mediaViewer.style.display = 'none';
    elements.viewerVideo.pause();
});

// ==========================================================================
// Horizontal Sliders Drag
// ==========================================================================
function enableDrag(sliderId) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;
    let isDown = false, startX, scrollLeft;

    slider.addEventListener('mousedown', e => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave mouseup', () => isDown = false);

    slider.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        slider.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });
}

enableDrag('servicesSlider');
// enableDrag('videoSlider'); // décommente si tu as un second slider

// ==========================================================================
// Changement de langue
// ==========================================================================
function setLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Mise à jour textes simples (ajoute d'autres si besoin)
    document.querySelector('.experience-badge').textContent = 
        lang === 'ar' ? 'أكثر من 10 سنوات خبرة' : "Plus de 10 ans d'expérience";

    elements.toggleBtn.textContent = lang === 'ar' ? 'تبديل اللغة' : 'Changer langue';

    elements.radioBtn.textContent = elements.radio.paused 
        ? (lang === 'ar' ? 'تشغيل الراديو' : 'Play Radio')
        : (lang === 'ar' ? 'إيقاف الراديو' : 'Stop Radio');

    startNews();
    updateTime();
    updateEqualizer();
}

elements.toggleBtn?.addEventListener('click', () => {
    setLanguage(currentLanguage === 'ar' ? 'fr' : 'ar');
});

// ==========================================================================
// Initialisation
// ==========================================================================
startNews();
updateWeather();
updatePrayer();
initFAQ();
updateEqualizer();
console.log("Site chargé - app.js complet fonctionne !");
