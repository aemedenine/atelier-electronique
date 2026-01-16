// ==========================================================================
// Firebase Configuration & Initialization (مرة وحدة فقط)
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
const auth = firebase.auth();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// ==========================================================================
// Global helpers
// ==========================================================================
function autoSlideContinuous(sliderId, speed = 0.5) {
  const slider = document.getElementById(sliderId);
  if (!slider) return;

  let scroll = 0;
  function loop() {
    scroll += speed;
    slider.scrollLeft = scroll;

    if (scroll >= slider.scrollWidth - slider.clientWidth) {
      scroll = 0;
    }
    requestAnimationFrame(loop);
  }
  loop();
}

// ==========================================================================
// DOM READY (واحد برك ❗)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------------------------------------------------
  // Language
  // ------------------------------------------------------------------------
  let currentLang = document.documentElement.lang?.startsWith("ar") ? "ar" : "fr";

  const toggleBtn = document.getElementById("toggle-lang-btn");
  const timeEl = document.getElementById("current-time");
  const ticker = document.getElementById("live-news");
  const faqContainer = document.querySelector(".faq");
  const radio = document.getElementById("radio-stream");
  const radioBtn = document.getElementById("radio-btn");
  const equalizer = document.getElementById("equalizer");

  // ------------------------------------------------------------------------
  // Time
  // ------------------------------------------------------------------------
  function updateTime() {
    const now = new Date();
    const daysAr = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const daysFr = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const monthsAr = ['جانفي','فيفري','مارس','أفريل','ماي','جوان','جويلية','أوت','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    const monthsFr = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

    const d = now.getDate();
    const h = String(now.getHours()).padStart(2,"0");
    const m = String(now.getMinutes()).padStart(2,"0");
    const s = String(now.getSeconds()).padStart(2,"0");

    const day = currentLang === "ar" ? daysAr[now.getDay()] : daysFr[now.getDay()];
    const month = currentLang === "ar" ? monthsAr[now.getMonth()] : monthsFr[now.getMonth()];

    timeEl.textContent =
      currentLang === "ar"
        ? `${day}، ${d} ${month} - ${h}:${m}:${s}`
        : `${day}, ${d} ${month} - ${h}:${m}:${s}`;
  }
  setInterval(updateTime, 1000);
  updateTime();

  // ------------------------------------------------------------------------
  // News ticker
  // ------------------------------------------------------------------------
  const newsAr = [
    "📢 ورشة إلكترونيك الرحماني تفتح أبوابها لجميع الولايات.",
    "🔧 خدمات تصليح الأجهزة الإلكترونية بجودة عالية.",
    "🌍 التوصيل متوفر لكل أنحاء تونس.",
    "📱 تواصل معنا عبر واتساب."
  ];
  const newsFr = [
    "📢 Atelier Electronique Médenine ouvre ses portes.",
    "🔧 Réparation électronique professionnelle.",
    "🌍 Livraison dans toute la Tunisie.",
    "📱 Contact WhatsApp."
  ];

  let newsIndex = 0;
  setInterval(() => {
    const arr = currentLang === "ar" ? newsAr : newsFr;
    ticker.textContent = arr[newsIndex];
    newsIndex = (newsIndex + 1) % arr.length;
  }, 5000);

  // ------------------------------------------------------------------------
  // Radio
  // ------------------------------------------------------------------------
  function updateEq() {
    if (!equalizer) return;
    equalizer.style.opacity = radio.paused ? "0.3" : "1";
  }

  radioBtn?.addEventListener("click", () => {
    if (radio.paused) {
      radio.play();
      radioBtn.textContent = currentLang === "ar" ? "أوقف الراديو" : "Arrêter la radio";
    } else {
      radio.pause();
      radioBtn.textContent = currentLang === "ar" ? "شغّل الراديو" : "Écouter la radio";
    }
    updateEq();
  });

  // ------------------------------------------------------------------------
  // FAQ
  // ------------------------------------------------------------------------
  function initFAQ() {
    document.querySelectorAll(".faq-item").forEach(item => {
      item.onclick = () => item.classList.toggle("open");
    });
  }
  initFAQ();

  // ------------------------------------------------------------------------
  // Auto sliders (المهمّة ❗❗❗)
  // ------------------------------------------------------------------------
  autoSlideContinuous("servicesSlider", 0.5);
  autoSlideContinuous("videoSlider", 0.5);
  autoSlideContinuous("postesSection", 0.5); // نفس الـ ID في HTML

});
