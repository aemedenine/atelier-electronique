// ===== أخبار متحركة Live News =====
const news = [
  "📢 ورشة إلكترونيك الرحماني تفتح أبوابها لجميع الولايات.",
  "🔧 خدمات تصليح الأجهزة الإلكترونية بجودة عالية وبأسعار منافسة.",
  "🌍 التوصيل عبر البريد متوفر لكل أنحاء تونس.",
  "📱 تواصل معنا عبر واتساب لأي استفسار."
];

let newsIndex = 0;
const liveNewsSpan = document.querySelector('.live-news span');

function showNextNews() {
  liveNewsSpan.textContent = news[newsIndex];
  newsIndex = (newsIndex + 1) % news.length;
}
showNextNews();
setInterval(showNextNews, 5000);

// ===== الراديو + Equalizer =====
const radio = document.getElementById('radio-stream');
const radioBtn = document.getElementById('radio-btn');
const equalizer = document.getElementById('equalizer');

radioBtn.addEventListener('click', () => {
  if (radio.paused) {
    radio.play();
    radioBtn.textContent = 'أوقف الراديو';
  } else {
    radio.pause();
    radioBtn.textContent = 'شغّل الراديو';
  }
  updateEqualizer();
});

function updateEqualizer() {
  equalizer.style.opacity = radio.paused ? '0.2' : '1';
}
radio.addEventListener('play', updateEqualizer);
radio.addEventListener('pause', updateEqualizer);
updateEqualizer();

// ===== FAQ toggle =====
document.querySelectorAll('.faq-item h3').forEach(h3 => {
  h3.addEventListener('click', () => {
    const item = h3.parentElement;
    item.classList.toggle('open');
  });
});

// ===== الوقت الحالي =====
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('ar-TN', { hour12: false });
  document.getElementById('current-time').textContent = timeString;
}
setInterval(updateTime, 1000);
updateTime();

// ===== عدد الزيارات (LocalStorage) =====
const visitCountEl = document.getElementById('visit-count');
let visits = localStorage.getItem('visits') || 0;
visits++;
localStorage.setItem('visits', visits);
visitCountEl.textContent = `عدد زياراتك: ${visits}`;

// ===== تبديل اللغة (مثال بسيط) =====
const toggleLangBtn = document.getElementById('toggle-lang-btn');
toggleLangBtn.addEventListener('click', () => {
  alert('وظيفة تبديل اللغة غير مفعلة بعد.'); 
});
