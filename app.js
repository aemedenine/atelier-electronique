// ==========================================================================
// Firebase Configuration & Initialization (استخدمنا الـ config الأولى فقط)
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

const db = firebase.database(); // pour le compteur de visites

// ==========================================================================
// Variables globales
// ==========================================================================
let currentLang = document.documentElement.lang?.startsWith('ar') ? 'ar' : 'fr';

// ==========================================================================
// DOM Ready - Tout le code client ici
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // ── Éléments DOM ──────────────────────────────────────────────────────
    const ticker       = document.getElementById('live-news');
    const toggleBtn    = document.getElementById('toggle-lang-btn');
    const timeEl       = document.getElementById('current-time');
    const visitEl      = document.getElementById('visit-count');
    const faqContainer = document.querySelector('.faq');
    const radio        = document.getElementById('radio-stream');
    const radioBtn     = document.getElementById('radio-btn');
    const equalizer    = document.getElementById('equalizer');

    const loginPopup   = document.getElementById('login-popup');
    const userInfo     = document.getElementById('user-info');
    const userName     = document.getElementById('user-name');
    const btnGoogle    = document.getElementById('btn-google');
    const btnClose     = document.getElementById('btn-close-popup');
    const btnSignOut   = document.getElementById('btn-signout');

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

    btnClose?.addEventListener('click', () => {
        loginPopup.style.display = 'none';
    });

    btnSignOut?.addEventListener('click', () => {
        auth.signOut().then(() => {
            userInfo.style.display = 'none';
            alert(currentLang === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'Déconnexion réussie');
        }).catch(console.error);
    });

    // ── Compteur de visites (Firebase Realtime Database) ──────────────────
    if (visitEl) {
        const visitsRef = db.ref('visits');
        visitsRef.transaction(current => (current || 0) + 1);
        visitsRef.on('value', snapshot => {
            const total = snapshot.val() || 0;
            visitEl.textContent = currentLang === 'ar'
                ? `عدد زوار الموقع: ${total}`
                : `Nombre de visiteurs : ${total}`;
        });
    }

    // ── Mise à jour de l'heure ────────────────────────────────────────────
    function updateTime() {
        const now = new Date();
        const daysAr   = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
        const monthsAr = ['جانفي','فيفري','مارس','أفريل','ماي','جوان','جويلية','أوت','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
        const daysFr   = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
        const monthsFr = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

        const day   = currentLang === 'ar' ? daysAr[now.getDay()]   : daysFr[now.getDay()];
        const month = currentLang === 'ar' ? monthsAr[now.getMonth()] : monthsFr[now.getMonth()];
        const date  = now.getDate();
        const h = now.getHours().toString().padStart(2,'0');
        const m = now.getMinutes().toString().padStart(2,'0');
        const s = now.getSeconds().toString().padStart(2,'0');

        timeEl.textContent = currentLang === 'ar'
            ? `${day}، ${date} ${month} - ${h}:${m}:${s}`
            : `${day}, ${date} ${month} - ${h}:${m}:${s}`;
    }

    // ── Ticker d'actualités ───────────────────────────────────────────────
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
        ticker.classList.remove('fade');
        void ticker.offsetWidth; // reflow
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
                radioBtn.textContent = currentLang === 'ar' ? 'أوقف الراديو 📻' : 'Arrêter la radio 📻';
            } else {
                radio.pause();
                radioBtn.textContent = currentLang === 'ar' ? 'شغّل الراديو 📻' : 'Écouter la radio 📻';
            }
            updateEqualizerVisibility();
            radioBtn.classList.toggle('dance');
        });

        radio.addEventListener('play', updateEqualizerVisibility);
        radio.addEventListener('pause', updateEqualizerVisibility);
    }

    // ── Changement de langue ──────────────────────────────────────────────
    function setLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        // Mise à jour des textes principaux
        document.querySelector('header h1').textContent = 'Atelier Electronique Médenine';
        document.querySelector('.experience-badge').textContent = lang === 'ar' ? 'أكثر من 10 سنوات خبرة' : "Plus de 10 ans d'expérience";
        toggleBtn.textContent = lang === 'ar' ? 'تبديل اللغة' : 'Changer la langue';

        // Boutons CTA (vérifier existence pour éviter erreurs)
        const btns = {
            '.btn-download': lang === 'ar' ? 'تحميل البرامج 📥' : 'Télécharger les programmes 📥',
            '.btn-store'   : lang === 'ar' ? 'تَسوّق الآن 🛒' : 'Boutique 🛒',
            '.btn-whatsapp': lang === 'ar' ? 'واتساب 📱' : 'WhatsApp 📱',
            '.btn-maps'    : lang === 'ar' ? 'موقعنا على مابس 📍' : 'Notre emplacement 📍',
            '.btn-gallery' : lang === 'ar' ? 'شاهد الصور 🖼️' : 'Voir les photos 🖼️',
            '.btn-video'   : lang === 'ar' ? 'شاهد الفيديو 🎥' : 'Voir les vidéos 🎥',
            '.btn-services': lang === 'ar' ? 'خدمات الورشة 🛠️' : 'Services de l’atelier 🛠️'
        };
        Object.entries(btns).forEach(([sel, txt]) => {
            const el = document.querySelector(sel);
            if (el) el.textContent = txt;
        });

        // Radio button text
        if (radioBtn) {
            radioBtn.textContent = radio.paused
                ? (lang === 'ar' ? 'شغّل الراديو 📻' : 'Écouter la radio 📻')
                : (lang === 'ar' ? 'أوقف الراديو 📻' : 'Arrêter la radio 📻');
        }

        // Reconstruire FAQ + ré-attacher les events
        if (faqContainer) {
            faqContainer.innerHTML = lang === 'ar' ? `
                <h2>الأسئلة الشائعة</h2>
                <div class="faq-item"><h3>كيف يمكنني إرسال جهاز للإصلاح؟</h3><div class="answer">يمكنك إرسال الجهاز عبر البريد أو التواصل معنا لترتيب الاستلام.</div></div>
                <div class="faq-item"><h3>ما هي مدة التصليح المعتادة؟</h3><div class="answer">تختلف حسب العطل، غالباً لا تتجاوز 3 أيام.</div></div>
                <div class="faq-item"><h3>هل توفرون قطع غيار أصلية؟</h3><div class="answer">نعم، نوفر قطع غيار أصلية وذات جودة عالية.</div></div>
                <div class="faq-item"><h3>كيف أتابع حالة الإصلاح؟</h3><div class="answer">نرسل صور وفيديوهات لحالة الجهاز أثناء التصليح عبر واتساب.</div></div>
            ` : `
                <h2>Questions fréquentes</h2>
                <div class="faq-item"><h3>Comment envoyer un appareil en réparation ?</h3><div class="answer">Vous pouvez l'envoyer par courrier ou nous contacter pour organiser l'enlèvement.</div></div>
                <div class="faq-item"><h3>Quel est le délai habituel de réparation ?</h3><div class="answer">Cela dépend de la panne, généralement pas plus de 3 jours.</div></div>
                <div class="faq-item"><h3>Fournissez-vous des pièces d'origine ?</h3><div class="answer">Oui, nous fournissons des pièces d'origine de haute qualité.</div></div>
                <div class="faq-item"><h3>Comment suivre l'état de la réparation ?</h3><div class="answer">Nous envoyons photos et vidéos via WhatsApp pendant la réparation.</div></div>
            `;
            initFAQ(); // ré-attacher les listeners après reconstruction
        }

        // Rafraîchir les éléments dépendants
        updateTime();
        startNewsRotation();
        updateEqualizerVisibility();
    }

    toggleBtn?.addEventListener('click', () => {
        setLanguage(currentLang === 'ar' ? 'fr' : 'ar');
    });

    // ── Initialisation ────────────────────────────────────────────────────
    setInterval(updateTime, 1000);
    updateTime();
    startNewsRotation();
    initFAQ();
    updateEqualizerVisibility();

    // Les autres fonctionnalités (weather, prayer, canvas, sliders, viewer, rating, cookie, etc.)
    // sont déjà bien placées dans le code original – elles restent inchangées ici pour brevité.
    // Si tu veux que je les intègre aussi dans cette version organisée, dis-le-moi.

    console.log("Atelier Electronique Médenine – app.js chargé avec succès ✓");
});
