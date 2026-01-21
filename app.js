// Firebase Configuration & Initialization
// ==========================================================================
const firebaseConfig = {
    apiKey: "AIzaSyCtbEWdm7CAC25ROslGlVeLOvfxdi2exVo",
    authDomain: "atelier-electronique-mednine.firebaseapp.com",
    projectId: "atelier-electronique-mednine",
    storageBucket: "atelier-electronique-mednine.firebasestorage.app",
    messagingSenderId: "547430908384",
    appId: "1:547430908384:web:4caa4cf3869491bd14eb85",
    databaseURL: "https://atelier-electronique-mednine-default-rtdb.europe-west1.firebasedatabase.app"
};
firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const auth = firebase.auth();

// Garder la session même après refresh/fermeture
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => console.log("🔒 Session persistente activée"))
    .catch(error => console.error("Erreur persistence:", error));

// ==========================================================================
// Variables globales
// ==========================================================================
// ما عادش نحتاج currentLang، كل شيء عربي ثابت

// ==========================================================================
// DOM Ready
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // ── Éléments DOM récurrents ───────────────────────────────────────────
    const ticker = document.getElementById('live-news');
    const timeEl = document.getElementById('current-time');
    const visitEl = document.getElementById('visit-count');
    const faqContainer = document.querySelector('.faq');
    const radio = document.getElementById('radio-stream');
    const radioBtn = document.getElementById('radio-btn');
    const equalizer = document.getElementById('equalizer');
    const loginPopup = document.getElementById('login-popup');
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');
    const btnGoogle = document.getElementById('btn-google');
    const btnClosePopup = document.getElementById('btn-close-popup');
    const btnSignOut = document.getElementById('btn-signout');

    // ── Authentification Google ───────────────────────────────────────────
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

    // ── Compteur de visites (Firebase Realtime) ───────────────────────────
    if (visitEl) {
        const db = firebase.database();
        const visitsRef = db.ref('visits');
        visitsRef.transaction(current => (current || 0) + 1);
        visitsRef.on('value', snapshot => {
            const total = snapshot.val() || 0;
            visitEl.textContent = `عدد زوار الموقع: ${total}`;
        });
    }

    // ── Mise à jour de l'heure (عربي فقط) ─────────────────────────────────
    function updateTime() {
        const now = new Date();
        const days = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
        const months = ['جانفي','فيفري','مارس','أفريل','ماي','جوان','جويلية','أوت','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
        const day = days[now.getDay()];
        const month = months[now.getMonth()];
        const date = now.getDate();
        const h = now.getHours().toString().padStart(2,'0');
        const m = now.getMinutes().toString().padStart(2,'0');
        const s = now.getSeconds().toString().padStart(2,'0');
        timeEl.textContent = `${day}، ${date} ${month} - ${h}:${m}:${s}`;
    }

    // ── Ticker d'actualités (عربي فقط) ────────────────────────────────────
    const news = [
        "📢 ورشة إلكترونيك الرحماني تفتح أبوابها لجميع الولايات.",
        "🔧 خدمات تصليح الأجهزة الإلكترونية بجودة عالية وبأسعار منافسة.",
        "🌍 التوصيل عبر البريد متوفر لكل أنحاء تونس.",
        "📱 تواصل معنا عبر واتساب لأي استفسار."
    ];
    let newsIndex = 0;
    let newsInterval = null;

    function updateNews() {
        ticker.classList.remove('fade');
        void ticker.offsetWidth; // force reflow
        ticker.textContent = news[newsIndex];
        ticker.classList.add('fade');
        newsIndex = (newsIndex + 1) % news.length;
    }

    function startNewsRotation() {
        if (newsInterval) clearInterval(newsInterval);
        updateNews();
        newsInterval = setInterval(updateNews, 5000);
    }

    // ── FAQ Toggle ────────────────────────────────────────────────────────
    function initFAQ() {
        document.querySelectorAll('.faq-item').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('open');
            });
        });
    }

    // ── Equalizer visibility ──────────────────────────────────────────────
    function updateEqualizerVisibility() {
        if (equalizer) {
            equalizer.style.opacity = radio.paused ? '0.25' : '1';
            equalizer.style.pointerEvents = radio.paused ? 'none' : 'auto';
        }
    }

    // ── Radio controls ────────────────────────────────────────────────────
    if (radioBtn) {
        radioBtn.addEventListener('click', () => {
            if (radio.paused) {
                radio.play().catch(e => console.warn('Radio play failed:', e));
                radioBtn.textContent = 'أوقف الراديو';
            } else {
                radio.pause();
                radioBtn.textContent = 'شغّل الراديو';
            }
            updateEqualizerVisibility();
            radioBtn.classList.toggle('dance');
        });
        radio.addEventListener('play', updateEqualizerVisibility);
        radio.addEventListener('pause', updateEqualizerVisibility);
    }

    // ── Initialisation ────────────────────────────────────────────────────
    setInterval(updateTime, 1000);
    updateTime();
    startNewsRotation();
    initFAQ();
    updateEqualizerVisibility();

    // ── Weather API (عربي فقط) ───────────────────────────────────────────
    function updateWeather() {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=33.3549&longitude=10.5055&current_weather=true")
            .then(res => res.json())
            .then(data => {
                const temp = data.current_weather.temperature + "°C";
                const wind = data.current_weather.windspeed + " كم/س";
                document.getElementById("weather-temp").textContent = temp;
                document.getElementById("weather-desc").textContent = "🌬️ سرعة الرياح: " + wind;
            })
            .catch(() => {
                document.getElementById("weather-desc").textContent = "⚠️ لا يمكن تحميل الطقس";
            });
    }

    // ── Prayer Times ──────────────────────────────────────────────────────
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

    // ── Titres des sections (ثابت عربي) ────────────────────────────────
    document.querySelector('.services-today h2').textContent = "خدمات اليوم";
    document.querySelector('.videos-today h2').textContent = "فيديو اليوم";
    document.querySelector('#postesSection h2').textContent = "تصليح ماكينات لحام";
    document.getElementById('rating-title').textContent = 'قيم الورشة:';

    // ── Daily Rotation (عربي فقط) ────────────────────────────────────────
    const dailyServiceEl = document.getElementById('daily-service');
    const dailyVideoEl   = document.getElementById('daily-video');
    const dailyMachineEl = document.getElementById('daily-machine');

    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));

    function showDailyItems() {
        // خدمات اليوم
        if (dailyServiceEl) {
            const services = [
                { title: "تصليح كارت تلفاز", img: "images/tv-card.jpg" },
                { title: "تصليح كارت غسالة", img: "images/washer-card.jpg" },
                { title: "تصليح كارت جهاز مشي", img: "images/treadmill-card.jpg" },
                { title: "تصليح لوحات إلكترونية", img: "images/electronic-board.jpg" }
            ];
            const item = services[dayOfYear % services.length];
            dailyServiceEl.innerHTML = `
                <img src="${item.img}" alt="${item.title}" loading="lazy">
                <p>${item.title}</p>
            `;
        }

        // فيديو اليوم
        if (dailyVideoEl) {
            const videos = [
                { title: "فحص بوردة", img: "images/board-test1.jpg" },
                { title: "إصلاح لوحة إلكترونية", img: "images/board-repair.jpg" },
                { title: "فحص تغذية كارت", img: "images/power-test.jpg" }
            ];
            const item = videos[dayOfYear % videos.length];
            dailyVideoEl.innerHTML = `
                <img src="${item.img}" alt="${item.title}" loading="lazy">
                <p>${item.title}</p>
            `;
        }

        // تصليح ماكينات لحام
        if (dailyMachineEl) {
            const machines = [
                { title: "Inverter MMA-300s", img: "images/inverter-mma300.jpg" },
                { title: "OXOUXIANG MMA 185", img: "images/oxouxiang-185.jpg" },
                { title: "Telwin machine", img: "images/telwin.jpg" }
            ];
            const item = machines[dayOfYear % machines.length];
            dailyMachineEl.innerHTML = `
                <img src="${item.img}" alt="${item.title}" loading="lazy">
                <p>${item.title}</p>
            `;
        }
    }

    showDailyItems();

    // ── Rating System (عربي فقط) ─────────────────────────────────────────
    const stars = document.querySelectorAll('.stars-horizontal span');
    const ratingValue = document.getElementById('rating-value');
    const ratingMessage = document.getElementById('rating-message');
    const avgStarsEl = document.getElementById('avg-stars');
    const voteCountEl = document.getElementById('vote-count');
    const breakdownEl = document.getElementById('rating-breakdown');
    let currentUserRating = 0;

    const ratingsRef = firebase.database().ref('ratings');
    const userRatingsRef = firebase.database().ref('userRatings');

    function loadRatings() {
        ratingsRef.on('value', snapshot => {
            const data = snapshot.val() || { sum: 0, count: 0, breakdown: {1:0,2:0,3:0,4:0,5:0} };
            const avg = data.count > 0 ? (data.sum / data.count).toFixed(1) : '0.0';
            avgStarsEl.textContent = avg;
            voteCountEl.textContent = data.count;
            let html = '';
            for (let i = 5; i >= 1; i--) {
                const count = data.breakdown?.[i] || 0;
                html += `
                    <div>
                        <span class="stars">${'★'.repeat(i)}</span>
                        <span class="count">${count} صوت</span>
                    </div>
                `;
            }
            breakdownEl.innerHTML = html;
        });
    }

    function updateStars(rating) {
        stars.forEach(star => {
            const val = Number(star.dataset.value);
            star.classList.toggle('selected', val <= rating);
            star.textContent = val <= rating ? '★' : '☆';
        });
        ratingValue.textContent = `${rating}/5`;
    }

    function checkUserRating(user) {
        if (!user) {
            updateStars(0);
            ratingMessage.textContent = 'سجل الدخول عبر Google لتقييم الورشة (مرة واحدة فقط)';
            ratingMessage.classList.add('show');
            stars.forEach(s => s.style.pointerEvents = 'none');
            return;
        }
        const uid = user.uid;
        userRatingsRef.child(uid).once('value').then(snap => {
            if (snap.exists()) {
                const data = snap.val();
                currentUserRating = data.rating;
                updateStars(currentUserRating);
                ratingMessage.textContent = `شكراً ${user.displayName || ''}، تقييمك (${currentUserRating} نجوم) محفوظ`;
                ratingMessage.classList.add('show');
                stars.forEach(s => s.style.pointerEvents = 'none');
            } else {
                currentUserRating = 0;
                updateStars(0);
                stars.forEach(s => s.style.pointerEvents = 'auto');
            }
        });
    }

    auth.onAuthStateChanged(user => {
        checkUserRating(user);
    });

    stars.forEach(star => {
        const val = Number(star.dataset.value);
        star.addEventListener('mouseover', () => {
            if (auth.currentUser && currentUserRating === 0) {
                stars.forEach(s => {
                    const sVal = Number(s.dataset.value);
                    s.classList.toggle('selected', sVal <= val);
                    s.textContent = sVal <= val ? '★' : '☆';
                });
            }
        });
        star.addEventListener('mouseout', () => {
            if (auth.currentUser && currentUserRating === 0) {
                updateStars(0);
            }
        });
        star.addEventListener('click', () => {
            if (!auth.currentUser) {
                alert('سجل الدخول عبر Google لتقييم الورشة مرة واحدة فقط');
                document.getElementById('btn-google')?.click();
                return;
            }
            if (currentUserRating > 0) {
                ratingMessage.textContent = 'لقد قيّمت من قبل، لا يمكن التعديل';
                ratingMessage.classList.add('show');
                return;
            }
            const uid = auth.currentUser.uid;
            const name = auth.currentUser.displayName || 'مجهول';
            userRatingsRef.child(uid).set({
                rating: val,
                name: name,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });
            ratingsRef.transaction(current => {
                const data = current || { sum: 0, count: 0, breakdown: {1:0,2:0,3:0,4:0,5:0} };
                data.sum += val;
                data.count += 1;
                data.breakdown[val] = (data.breakdown[val] || 0) + 1;
                return data;
            });
            currentUserRating = val;
            updateStars(val);
            ratingMessage.textContent = `شكراً ${name}، تقييمك (${val} نجوم) تم حفظه نهائياً! 🌟`;
            ratingMessage.classList.add('show');
            setTimeout(() => ratingMessage.classList.remove('show'), 8000);
            stars.forEach(s => s.style.pointerEvents = 'none');
        });
    });

    loadRatings();


  const rain = document.querySelector('.electronics-rain');
  if (!rain) return;

  const icons = [
    'resistor.svg',
    'ic.svg',
    'capacitor.svg',
    'diode.svg'
  ];

  for (let i = 0; i < 25; i++) {
    const drop = document.createElement('span');
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDuration = (10 + Math.random() * 10) + 's';
    drop.style.backgroundImage =
      `url(images/electronics/${icons[Math.floor(Math.random() * icons.length)]})`;
    rain.appendChild(drop);
  }

});
    // ── PCB Animated Header Canvas ────────────────────────────────────────
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
                ctx.beginPath();
                ctx.moveTo(t.x, t.y);
                ctx.lineTo(t.x + t.length, t.y);
                ctx.strokeStyle = t.color;
                ctx.lineWidth = 2;
                ctx.shadowColor = '#0a3af0';
                ctx.shadowBlur = 10;
                ctx.stroke();
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

    // ── Horizontal Sliders Drag ───────────────────────────────────────────
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

    // ── Video hover play/pause ────────────────────────────────────────────
    document.querySelectorAll('.video-card video').forEach(video => {
        video.addEventListener('mouseenter', () => video.play().catch(() => {}));
        video.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    // ── Fullscreen Media Viewer ───────────────────────────────────────────
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

    // ── CMP Cookie Banner ─────────────────────────────────────────────────
    const cmpBanner = document.getElementById('cmp-banner');
    const consentAllow = document.getElementById('consent-allow');
    const consentManage = document.getElementById('consent-manage');
    if (cmpBanner && !localStorage.getItem('cmpConsent')) {
        cmpBanner.style.display = 'block';
    }
    consentAllow?.addEventListener('click', () => {
        localStorage.setItem('cmpConsent', 'granted');
        cmpBanner.style.display = 'none';
    });
    consentManage?.addEventListener('click', () => {
        alert('يمكنك إدارة تفضيلات الكوكيز هنا.');
    });

    // ── Site Name Animation ───────────────────────────────────────────────
    const siteName = document.getElementById('site-name');
    if (siteName) {
        const texts = ["Atelier Electronique Médenine"];
        setInterval(() => {
            siteName.textContent = texts[0];
            siteName.style.color = '#ff6b35';
            siteName.style.textShadow = '0 0 10px #e0a800';
            siteName.style.transform = 'scale(1.2)';
            setTimeout(() => {
                siteName.style.color = '';
                siteName.style.textShadow = '';
                siteName.style.transform = '';
            }, 1000);
        }, 4000);
    }

    // ── Initial calls ─────────────────────────────────────────────────────
    updateWeather();
    updatePrayerTimes();
    console.log("إلكترونيك الرحماني - app.js محمل ومنظم ✓");
});
