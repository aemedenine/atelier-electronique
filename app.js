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
// Translations
// ==========================================================================
const translations = {
    ar: {
        site_title: "ورشة إلكترونيك الرحماني",
        site_name: "ورشة إلكترونيك مدنين",
        experience: "أكثر من 10 سنوات خبرة",
        cta_download: "تحميل البرامج 📥",
        cta_store: "تَسوّق الآن 🛒",
        cta_whatsapp: "واتساب 📱",
        cta_maps: "موقعنا على مابس 📍",
        cta_photos: "شاهد الصور 🖼️",
        cta_videos: "شاهد الفيديو 🎥",
        cta_services: "خدمات الورشة 🛠️",
        cta_radio_play: "شغّل الراديو 📻",
        cta_radio_stop: "أوقف الراديو",
        login_title: "تسجيل الدخول",
        login_google: "تسجيل الدخول بـ Google",
        cancel: "إلغاء",
        welcome: "مرحبا",
        user_welcome: "مرحبا {name} 👋",
        sign_out: "تسجيل الخروج",
        news_loading: "تحميل الأخبار...",
        visit_count: "عدد زوار الموقع: {count1}",
        weather_title: "🌦️ حالة الطقس في مدنين",
        weather_loading: "جاري التحميل...",
        prayer_fajr: "🌅 الفجر",
        prayer_sunrise: "🌄 الشروق",
        prayer_dhuhr: "☀️ الظهر",
        prayer_asr: "🕰️ العصر",
        prayer_maghrib: "🌇 المغرب",
        prayer_isha: "🌙 العشاء",
        tip_title: "نصيحة اليوم",
        rating_title: "قيم الورشة",
        rating_average: "متوسط التقييمات: {avg} ★ من {count} صوت",
        rating_votes: "من",
        rating_votes_text: "صوت",
        rating_login: "سجل الدخول عبر Google لتقييم الورشة (مرة واحدة فقط)",
        faq_header: "الأسئلة اللي في بالك",
        faq_close_all: "إخفاء الإجابات",
        faq_q_services: "شنوّا الخدمات اللي عندكم يا خويا؟",
        faq_a_services: "متخصصين في تصليح الكروت الإلكترونية بكل أنواعها:\n• ماكينات لحام (postes de soudure) بكل أشكالها\n• كروت الغسالات (lave-linge) – كل الماركات\n• كروت الكليما (climatiseurs) – inverter وعادي\n• كروت المصانع والمعامل\n• كروت الموازين الإلكترونية (mizan)\n<strong>ما نخدموش في</strong>: الراديو، التلفزيونات، التلفونات.",
        faq_q_location: "وينكم بالضبط؟",
        faq_a_location: "مدنين – نهج ليبيا، بعد كوشة شامخ، في أول طلعة على يمينك. لو ضيّعت الطريق، اتصل!",
        faq_q_call: "نقدر نتصل قبل ما نجي؟",
        faq_a_call: "أكيد يا خويا! أحسن حاجة تتصل قبل (واتساب أو مكالمة) على 98.192.103، أرسل صورة الكارت إذا تحب، نقولك إذا نقدرو نصلحوها والسعر التقريبي والوقت.",
        faq_q_time: "كم ياخذ الوقت باش نصلح الكارت؟",
        faq_a_time: "يعتمد على العطل: تشخيص مجاني في الغالب، تصليح بسيط (تغيير كومبوننت) 1-3 أيام، مشاكل كبيرة (reballing، بورد معقدة...) ممكن 5-7 أيام. نتصل بيك دايما باش نعلمك.",
        faq_q_guarantee: "الضمان كيفاه؟",
        faq_a_guarantee: "كل تصليح عندنا ضمان من شهر لـ 3 أشهر حسب القطعة والعمل. لو رجع نفس العيب، نصلحوه مجانًا إن شاء الله.",
        faq_q_price: "الأسعار معقولة ولا غالية؟",
        faq_a_price: "نحاولو نكونو من الأرخص في الجهة، التشخيص غالبًا ببلاش، والسعر حسب القطعة (أصلية أو بديلة حسب ميزانيتك). نقولك السعر قبل ما نبداو.",
        services_today_title: "خدمات اليوم",
        videos_today_title: "فيديو اليوم",
        postes_title: "تصليح ماكينات لحام",
        arduino_projects_title: "🔧 مشاريع أردوينو",
        arduino_projects_desc: "مجموعة مشاريع أردوينو مفسّرة خطوة بخطوة، مع الكود، الدائرة الإلكترونية، وملف التحميل.",
        smart_light_title: "تشغيل إضاءة ذكية",
        smart_light_desc: "مشروع تشغيل وإطفاء مصباح باستعمال Arduino و Relay.",
        temperature_title: "قياس درجة الحرارة",
        temperature_desc: "قراءة درجة الحرارة وعرضها على شاشة LCD.",
        graduation_projects_title: "🎓 مشاريع التخرّج",
        graduation_projects_desc: "مشاريع تخرّج جاهزة للطلبة (PDF أو Word) للاستئناس والمراجعة.",
        inventory_title: "نظام إدارة المخزون",
        inventory_desc: "مشروع لإدارة المخزون مع تقرير كامل وقاعدة بيانات.",
        smart_home_title: "منزل ذكي (Smart Home)",
        smart_home_desc: "مشروع منزل ذكي باستعمال Arduino و ESP8266.",
        download_project: "📥 تحميل المشروع",
        courses_title: "📚 كورسات إلكترونية",
        courses_desc: "تعلم أساسيات الإلكترونيات خطوة بخطوة مع شروحات عملية وتمارين.",
        resistor_capacitor_title: "أساسيات المقاومة والمكثف",
        resistor_capacitor_desc: "شرح كيفية استخدام المقاومات والمكثفات في الدوائر البسيطة.",
        transistor_diode_title: "الترانزستور والديود",
        transistor_diode_desc: "فهم الترانزستورات والديودات وكيفية ربطها في الدوائر.",
        schematics_title: "💡 شيمات إلكترونية",
        schematics_desc: "مجموعة شيمات حقيقية لكروت الغسالات، الكليما، أجهزة أخرى.",
        schema_samsung_title: "كارت غسالة Samsung",
        schema_samsung_desc: "الشيم الكامل لكارت الغسالات Samsung.",
        schema_lg_title: "كارت كليما LG",
        schema_lg_desc: "الدائرة الكهربائية لكارت الكليما LG.",
        schema_industrial_title: "كروت صناعية",
        schema_industrial_desc: "شيمات لمختلف الكروت الإلكترونية الصناعية.",
        download_lesson: "📥 تحميل الدرس",
        download_schema: "📥 تحميل الشيم",
        footer_location: "📍 مدنين – نخدمو في كامل أنحاء تونس | 📲 WhatsApp: 98192103",
        footer_hours: "⏰ من الإثنين للسبت، 08:00 - 18:00 | الأحد راحة",
        footer_copyright: "© 2026 Atelier Electronique Médenine. Tous droits réservés.<br>Signature: RAHMANI Soufien.",
        color_resistor_title: "🔴🟡🟢حساب المقاومة بالألوان",
        resistor_default: "— Ω",
        smd_resistor_title: "📦 حساب مقاومة SMD",
        smd_default: "— Ω",
        smd_placeholder: "مثال: 103 أو 4R7",
        capacitor_title: "⚡ حساب المكثفات",
        cap_default: "—",
        cap_value_placeholder: "القيمة (µF)",
        cap_voltage_placeholder: "الجهد (V)",
        power_title: "🔌 حساب الطاقة (Watts)",
        power_default: "— وات",
        power_volt_placeholder: "V (فولت)",
        power_resistance_placeholder: "R (أوم)",
        power_current_placeholder: "I (أمبير)",
        color_black: "أسود",
color_brown: "بني",
color_red: "أحمر",
color_orange: "برتقالي",
color_yellow: "أصفر",
color_green: "أخضر",
color_blue: "أزرق",
color_purple: "بنفسجي",
color_gray: "رمادي",
color_white: "أبيض",
multi_1: "×1",
multi_10: "×10",
multi_100: "×100",
multi_1k: "×1K",
multi_10k: "×10K",
multi_100k: "×100K",
multi_1m: "×1M",
tol_1: "±1%",
tol_2: "±2%",
tol_5: "±5%",
tol_10: "±10%",
        cookie_banner_text: "نستخدم الكوكيز لتحسين تجربتك.",
cookie_allow: "أوافق",
cookie_manage: "تغيير الخيارات"
    },
    fr: {
        site_title: "Atelier Électronique Rahmanie",
        site_name: "Atelier Électronique Médenine",
        experience: "Plus de 10 ans d’expérience",
        cta_download: "Télécharger les programmes 📥",
        cta_store: "Boutique 🛒",
        cta_whatsapp: "WhatsApp 📱",
        cta_maps: "Notre localisation 📍",
        cta_photos: "Voir les photos 🖼️",
        cta_videos: "Voir les vidéos 🎥",
        cta_services: "Services de l’atelier 🛠️",
        cta_radio_play: "Écouter la radio 📻",
        cta_radio_stop: "Arrêter la radio",
        login_title: "Connexion",
        login_google: "Se connecter avec Google",
        cancel: "Annuler",
        welcome: "Bienvenue",
        user_welcome: "Bienvenue {name} 👋",
        sign_out: "Déconnexion",
        news_loading: "Chargement des actualités...",
        visit_count: "Nombre de visiteurs : {count1}",
        weather_title: "🌦️ Météo à Médenine",
        weather_loading: "Chargement...",
        prayer_fajr: "Fajr",
        prayer_sunrise: "Lever du soleil",
        prayer_dhuhr: "Dhuhr",
        prayer_asr: "Asr",
        prayer_maghrib: "Maghrib",
        prayer_isha: "Isha",
        tip_title: "Astuce du jour",
        rating_title: "Évaluez l'atelier",
        rating_average: "Note moyenne : {avg} ★ de {count} votes",
        rating_votes: "de",
        rating_votes_text: "votes",
        rating_login: "Connectez-vous via Google pour noter l'atelier (une seule fois)",
        faq_header: "Questions fréquentes",
        faq_close_all: "Masquer les réponses",
        faq_q_services: "Quels sont vos services ?",
        faq_a_services: "Spécialisés dans la réparation de cartes électroniques de tous types :\n• Postes à souder de toutes formes\n• Cartes de machines à laver – toutes marques\n• Cartes de climatiseurs – inverter et conventionnels\n• Cartes industrielles et d'usines\n• Cartes de balances électroniques\n<strong>Nous ne réparons pas :</strong> radios, téléviseurs, téléphones.",
        faq_q_location: "Où êtes-vous exactement ?",
        faq_a_location: "Médenine – Rue de Libye, après le virage Chamakh, première montée à droite. Appelez si vous êtes perdu !",
        faq_q_call: "Puis-je appeler avant de venir ?",
        faq_a_call: "Bien sûr ! Le mieux est d’appeler avant (WhatsApp ou appel) au 98.192.103. Envoyez une photo de la carte si vous voulez, on vous dira si on peut la réparer, le prix approximatif et le délai.",
        faq_q_time: "Combien de temps faut-il pour réparer la carte ?",
        faq_a_time: "Ça dépend de la panne : diagnostic souvent gratuit, réparation simple (changement de composant) 1-3 jours, pannes complexes (reballing, carte très complexe…) 5-7 jours. On vous appelle toujours pour vous tenir informé.",
        faq_q_guarantee: "Quelle est la garantie ?",
        faq_a_guarantee: "Chaque réparation est garantie de 1 à 3 mois selon la pièce et le travail. Si le même défaut revient, on le répare gratuitement inchaAllah.",
        faq_q_price: "Les prix sont-ils raisonnables ?",
        faq_a_price: "On essaie d’être parmi les moins chers de la région, diagnostic souvent gratuit, prix selon la pièce (originale ou compatible selon votre budget). On vous donne le prix avant de commencer.",
        services_today_title: "Services du jour",
        videos_today_title: "Vidéo du jour",
        postes_title: "Réparation des postes à souder",
        arduino_projects_title: "🔧 Projets Arduino",
        arduino_projects_desc: "Ensemble de projets Arduino expliqués étape par étape, avec le code, le schéma électronique et le fichier à télécharger.",
        smart_light_title: "Éclairage intelligent",
        smart_light_desc: "Projet de contrôle d'allumage et d'extinction d'une lampe avec Arduino et Relais.",
        temperature_title: "Mesure de température",
        temperature_desc: "Lecture de la température et affichage sur écran LCD.",
        graduation_projects_title: "🎓 Projets de fin d'études",
        graduation_projects_desc: "Projets de fin d'études prêts pour les étudiants (PDF ou Word) pour inspiration et révision.",
        inventory_title: "Système de gestion de stock",
        inventory_desc: "Projet de gestion de stock avec rapport complet et base de données.",
        smart_home_title: "Maison intelligente (Smart Home)",
        smart_home_desc: "Projet de maison intelligente utilisant Arduino et ESP8266.",
        download_project: "📥 Télécharger le projet",
        courses_title: "📚 Cours d'électronique",
        courses_desc: "Apprenez les bases de l'électronique étape par étape avec explications pratiques et exercices.",
        resistor_capacitor_title: "Bases des résistances et condensateurs",
        resistor_capacitor_desc: "Explication de l'utilisation des résistances et condensateurs dans les circuits simples.",
        transistor_diode_title: "Transistors et diodes",
        transistor_diode_desc: "Comprendre les transistors et diodes et comment les connecter dans les circuits.",
        schematics_title: "💡 Schémas électroniques",
        schematics_desc: "Ensemble de schémas réels pour cartes de machines à laver, climatisateurs et autres appareils.",
        schema_samsung_title: "Carte lave-linge Samsung",
        schema_samsung_desc: "Schéma complet pour la carte des lave-linge Samsung.",
        schema_lg_title: "Carte climatiseur LG",
        schema_lg_desc: "Circuit électrique pour la carte climatiseur LG.",
        schema_industrial_title: "Cartes industrielles",
        schema_industrial_desc: "Schémas pour différentes cartes électroniques industrielles.",
        download_lesson: "📥 Télécharger le cours",
        download_schema: "📥 Télécharger le schéma",
        footer_location: "📍 Médenine – Nous servons dans toute la Tunisie | 📲 WhatsApp : 98192103",
        footer_hours: "⏰ Du lundi au samedi, 08:00 - 18:00 | Dimanche fermé",
        footer_copyright: "© 2026 Atelier Electronique Médenine. Tous droits réservés.<br>Signature : RAHMANI Soufien.",
        color_resistor_title: "🔴🟡🟢Calculateur de résistance par couleur",
        resistor_default: "— Ω",
        smd_resistor_title: "📦 Calculateur de résistance CMS",
        smd_default: "— Ω",
        smd_placeholder: "Exemple : 103 ou 4R7",
        capacitor_title: "⚡ Calculateur de condensateurs",
        cap_default: "—",
        cap_value_placeholder: "Valeur (µF)",
        cap_voltage_placeholder: "Tension (V)",
        power_title: "🔌 Calculateur de puissance (Watts)",
        power_default: "— W",
        power_volt_placeholder: "V (volts)",
        power_resistance_placeholder: "R (ohms)",
        power_current_placeholder: "I (ampères)",
    color_black: "Noir",
color_brown: "Marron",
color_red: "Rouge",
color_orange: "Orange",
color_yellow: "Jaune",
color_green: "Vert",
color_blue: "Bleu",
color_purple: "Violet",
color_gray: "Gris",
color_white: "Blanc",
multi_1: "×1",
multi_10: "×10",
multi_100: "×100",
multi_1k: "×1K",
multi_10k: "×10K",
multi_100k: "×100K",
multi_1m: "×1M",
tol_1: "±1%",
tol_2: "±2%",
tol_5: "±5%",
tol_10: "±10%",
        cookie_banner_text: "Nous utilisons des cookies pour améliorer votre expérience.",
cookie_allow: "J'accepte",
cookie_manage: "Modifier les options"
    },
    en: {
        site_title: "Rahmani Electronics Workshop",
        site_name: "Atelier Electronique Médenine",
        experience: "More than 10 years of experience",
        cta_download: "Download Software 📥",
        cta_store: "Shop Now 🛒",
        cta_whatsapp: "WhatsApp 📱",
        cta_maps: "Our Location 📍",
        cta_photos: "View Photos 🖼️",
        cta_videos: "Watch Videos 🎥",
        cta_services: "Workshop Services 🛠️",
        cta_radio_play: "Play Radio 📻",
        cta_radio_stop: "Stop Radio",
        login_title: "Login",
        login_google: "Sign in with Google",
        cancel: "Cancel",
        welcome: "Welcome",
        user_welcome: "Welcome {name} 👋",
        sign_out: "Sign Out",
        news_loading: "Loading news...",
        visit_count: "Visitors count: {count1}",
        weather_title: "🌦️ Weather in Medenine",
        weather_loading: "Loading...",
        prayer_fajr: "Fajr",
        prayer_sunrise: "Sunrise",
        prayer_dhuhr: "Dhuhr",
        prayer_asr: "Asr",
        prayer_maghrib: "Maghrib",
        prayer_isha: "Isha",
        tip_title: "Tip of the day",
        rating_title: "Rate the workshop",
        rating_average: "Average rating: {avg} ★ from {count} votes",
        rating_votes: "from",
        rating_votes_text: "votes",
        rating_login: "Sign in with Google to rate the workshop (once only)",
        faq_header: "Frequently Asked Questions",
        faq_close_all: "Hide answers",
        faq_q_services: "What services do you offer?",
        faq_a_services: "Specialized in repairing all types of electronic boards...",
        faq_q_location: "Where exactly are you located?",
        faq_a_location: "Médenine – Libya Street...",
        faq_q_call: "Can I call before coming?",
        faq_a_call: "Of course! Best to call first...",
        faq_q_time: "How long does a repair take?",
        faq_a_time: "Depends on the fault...",
        faq_q_guarantee: "What is the warranty?",
        faq_a_guarantee: "Every repair comes with 1 to 3 months warranty...",
        faq_q_price: "Are your prices reasonable?",
        faq_a_price: "We try to be among the cheapest...",
        services_today_title: "Services of the Day",
        videos_today_title: "Video of the Day",
        postes_title: "Welding Machines Repair",
        arduino_projects_title: "🔧 Arduino Projects",
        arduino_projects_desc: "Collection of Arduino projects explained step by step, with code, electronic circuit, and download file.",
        smart_light_title: "Smart Lighting Control",
        smart_light_desc: "Project to turn a lamp on and off using Arduino and Relay.",
        temperature_title: "Temperature Measurement",
        temperature_desc: "Reading temperature and displaying it on LCD screen.",
        graduation_projects_title: "🎓 Graduation Projects",
        graduation_projects_desc: "Ready-to-use graduation projects for students (PDF or Word) for inspiration and review.",
        inventory_title: "Inventory Management System",
        inventory_desc: "Project for inventory management with full report and database.",
        smart_home_title: "Smart Home",
        smart_home_desc: "Smart home project using Arduino and ESP8266.",
        download_project: "📥 Download Project",
        courses_title: "📚 Electronics Courses",
        courses_desc: "Learn the basics of electronics step by step with practical explanations and exercises.",
        resistor_capacitor_title: "Resistor and Capacitor Basics",
        resistor_capacitor_desc: "Explanation of how to use resistors and capacitors in simple circuits.",
        transistor_diode_title: "Transistors and Diodes",
        transistor_diode_desc: "Understanding transistors and diodes and how to connect them in circuits.",
        schematics_title: "💡 Electronic Schematics",
        schematics_desc: "Collection of real schematics for washing machine boards, air conditioner boards, and other devices.",
        schema_samsung_title: "Samsung Washing Machine Board",
        schema_samsung_desc: "Complete schematic for Samsung washing machine board.",
        schema_lg_title: "LG Air Conditioner Board",
        schema_lg_desc: "Electrical circuit for LG air conditioner board.",
        schema_industrial_title: "Industrial Boards",
        schema_industrial_desc: "Schematics for various industrial electronic boards.",
        download_lesson: "📥 Download Lesson",
        download_schema: "📥 Download Schematic",
        footer_location: "📍 Médenine – We serve all over Tunisia | 📲 WhatsApp: 98192103",
        footer_hours: "⏰ Monday to Saturday, 08:00 - 18:00 | Sunday closed",
        footer_copyright: "© 2026 Atelier Electronique Médenine. All rights reserved.<br>Signature: RAHMANI Soufien.",
        color_resistor_title: "🔴🟡🟢Resistor Color Code Calculator",
        resistor_default: "— Ω",
        smd_resistor_title: "📦 SMD Resistor Calculator",
        smd_default: "— Ω",
        smd_placeholder: "Example: 103 or 4R7",
        capacitor_title: "⚡ Capacitor Calculator",
        cap_default: "—",
        cap_value_placeholder: "Value (µF)",
        cap_voltage_placeholder: "Voltage (V)",
        power_title: "🔌 Power Calculator (Watts)",
        power_default: "— W",
        power_volt_placeholder: "V (volts)",
        power_resistance_placeholder: "R (ohms)",
        power_current_placeholder: "I (amps)",
        color_black: "Black",
color_brown: "Brown",
color_red: "Red",
color_orange: "Orange",
color_yellow: "Yellow",
color_green: "Green",
color_blue: "Blue",
color_purple: "Purple",
color_gray: "Gray",
color_white: "White",
multi_1: "×1",
multi_10: "×10",
multi_100: "×100",
multi_1k: "×1K",
multi_10k: "×10K",
multi_100k: "×100K",
multi_1m: "×1M",
tol_1: "±1%",
tol_2: "±2%",
tol_5: "±5%",
tol_10: "±10%",
        cookie_banner_text: "We use cookies to improve your experience.",
cookie_allow: "I agree",
cookie_manage: "Manage options"
    }
};
// ==========================================================================
// Variables globales
// ==========================================================================
let currentLang = localStorage.getItem('lang') || 'ar';
// ==========================================================================
// Functions (نقلت الدوال هنا قبل الـ DOM Ready)
// ==========================================================================
function updateTime() {
    const now = new Date();
    const days = {
        ar: ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],
        fr: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
        en: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    };
    const months = {
        ar: ['جانفي','فيفري','مارس','أفريل','ماي','جوان','جويلية','أوت','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
        fr: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
        en: ['January','February','March','April','May','June','July','August','September','October','November','December']
    };
    const lang = currentLang || 'ar';
    const dayName = days[lang][now.getDay()];
    const monthName = months[lang][now.getMonth()];
    const date = now.getDate().toString().padStart(2,'0');
    const h = now.getHours().toString().padStart(2,'0');
    const m = now.getMinutes().toString().padStart(2,'0');
    const s = now.getSeconds().toString().padStart(2,'0');
    const formatted = `${dayName}، ${date} ${monthName} - ${h}:${m}:${s}`;
    const timeEl = document.getElementById('current-time');
    if (timeEl) timeEl.textContent = formatted;
}
function applyLanguage(lang) {
    if (!translations[lang]) lang = 'ar';
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        let txt = translations[lang][key] || translations.ar[key] || el.textContent || '';
        // معالجة المتغيرات الديناميكية
        txt = txt.replace('{name}', userName?.textContent || '');
        txt = txt.replace('{count}', document.getElementById('vote-count')?.textContent || '0');
        txt = txt.replace('{avg}', document.getElementById('avg-stars')?.textContent || '0.0');
        el.innerHTML = txt; // innerHTML عشان نحافظ على <strong> و <br> إذا موجودين
    });
    // ترجمة placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = translations[lang][key] || translations.ar[key] || el.placeholder;
    });
    // تحديث نص الراديو ديناميكياً
    if (radioBtn) {
        radioBtn.textContent = radio.paused
            ? translations[lang].cta_radio_play
            : translations[lang].cta_radio_stop;
    }
    // Rafraîchir les sections sensibles à la langue
    safeUpdateVisitText();
    updateWeather();
    updatePrayerTimes();
    updateMiniCalendar();
    updateDailyTips();
    loadRatings();
}
function safeUpdateVisitText() {
    if (!visitEl) return;
    if (typeof translations === "undefined") return;
    if (typeof currentLang === "undefined") return;
    const total = visitEl.dataset.value || 0;
    if (!translations[currentLang]?.visit_count) return;
    visitEl.textContent = translations[currentLang]
        .visit_count.replace('{count1}', total);
}
function updateNews() {
    if (!ticker) return;
    ticker.classList.remove('fade');
    void ticker.offsetWidth;
    ticker.textContent = news[currentLang][newsIndex];
    ticker.classList.add('fade');
    newsIndex = (newsIndex + 1) % news[currentLang].length;
}
function startNewsRotation() {
    updateNews();
    setInterval(updateNews, 5000);
}
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            parent.classList.toggle('active');
        });
    });
    const closeAllBtn = document.getElementById('faq-close-all');
    if (closeAllBtn) {
        closeAllBtn.addEventListener('click', () => {
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
        });
    }
}
function updateEqualizerVisibility() {
    if (equalizer) {
        equalizer.style.opacity = radio.paused ? '0.25' : '1';
        equalizer.style.pointerEvents = radio.paused ? 'none' : 'auto';
    }
}
function updateWeather() {
    const url = "https://api.open-meteo.com/v1/forecast?" +
                "latitude=33.3549&longitude=10.5055" +
                "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m" +
                "&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max" +
                "&timezone=Africa%2FTunis" +
                "&forecast_days=2";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (!data.current || !data.daily) throw new Error("No data");
            const now = data.current;
            const temp = Math.round(now.temperature_2m) + "°C";
            const weatherCode = now.weather_code;
            const weatherDesc = getWeatherDescription(weatherCode);
            const windSpeed = Math.round(now.wind_speed_10m) + " كم/س";
            document.getElementById("weather-temp").textContent = temp;
            const weatherEl = document.getElementById("weather-desc");
            const tomorrow = data.daily;
            const dayIndex = 1;
            const tMax = Math.round(tomorrow.temperature_2m_max[dayIndex]) + "°C";
            const tMin = Math.round(tomorrow.temperature_2m_min[dayIndex]) + "°C";
            const windMax = Math.round(tomorrow.wind_speed_10m_max[dayIndex]) + " كم/س";
            const tomorrowDesc = getWeatherDescription(tomorrow.weather_code[dayIndex]);
            const tomorrowText = { ar: "غداً", fr: "Demain", en: "Tomorrow" };
            const windText = { ar: "رياح", fr: "Vent", en: "Wind" };
            weatherEl.innerHTML = `
                ${weatherDesc} • 🌬️ ${windSpeed}
                <br>
                <small>
                    ${tomorrowText[currentLang]}: ${tomorrowDesc} ${tMin}–${tMax} • ${windText[currentLang]} ${windMax}
                </small>`;
        })
        .catch(err => {
            console.error("Weather error:", err);
            document.getElementById("weather-desc").textContent = "⚠️ مشكلة في تحميل الطقس";
        });
}
function getWeatherDescription(code) {
    const desc = {
        ar: { clear: "مشمس ☀️", partly: "غائم جزئياً ⛅", fog: "ضباب 🌫️", rain: "مطر 💧", storm: "عواصف رعدية ⚡", unknown: "غير معروف 🌤️" },
        fr: { clear: "Ensoleillé ☀️", partly: "Partiellement nuageux ⛅", fog: "Brouillard 🌫️", rain: "Pluie 💧", storm: "Orage ⚡", unknown: "Inconnu 🌤️" },
        en: { clear: "Sunny ☀️", partly: "Partly cloudy ⛅", fog: "Fog 🌫️", rain: "Rain 💧", storm: "Thunderstorm ⚡", unknown: "Unknown 🌤️" }
    };
    const t = desc[currentLang] || desc.ar;
    if (code === 0) return t.clear;
    if ([1,2,3].includes(code)) return t.partly;
    if (code >= 45 && code <= 48) return t.fog;
    if (code >= 61 && code <= 82) return t.rain;
    if (code >= 95) return t.storm;
    return t.unknown;
}
function updatePrayerTimes() {
    fetch("https://api.aladhan.com/v1/timingsByCity?city=Medenine&country=Tunisia&method=5")
        .then(res => res.json())
        .then(data => {
            if (data.code !== 200) return console.error("API error:", data.status);
            const times = data.data.timings;
            const pt = document.getElementById("prayer-times");
            if (!pt) return;
            pt.innerHTML = `
                <p><span>${translations[currentLang].prayer_fajr}:</span> <span class="time">${times.Fajr}</span></p>
                <p><span>${translations[currentLang].prayer_sunrise}:</span> <span class="time">${times.Sunrise}</span></p>
                <p><span>${translations[currentLang].prayer_dhuhr}:</span> <span class="time">${times.Dhuhr}</span></p>
                <p><span>${translations[currentLang].prayer_asr}:</span> <span class="time">${times.Asr}</span></p>
                <p><span>${translations[currentLang].prayer_maghrib}:</span> <span class="time">${times.Maghrib}</span></p>
                <p><span>${translations[currentLang].prayer_isha}:</span> <span class="time">${times.Isha}</span></p>
            `;
        })
        .catch(err => {
            console.error("Erreur prayer times:", err);
            const pt = document.getElementById("prayer-times");
            if (pt) pt.innerHTML = '<p style="color:red;">⚠️ خطأ في تحميل أوقات الصلاة</p>';
        });
}
function updateMiniCalendar() {
    const today = new Date();
    const miladiEl = document.getElementById('today-miladi');
    const hijriEl = document.getElementById('today-hijri');
    const miladiOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    miladiEl.textContent = today.toLocaleDateString('ar-TN', miladiOptions);
    miladiEl.classList.toggle('friday', today.getDay() === 5);
    miladiEl.classList.remove('fade');
    hijriEl.classList.remove('fade');
    void miladiEl.offsetWidth;
    miladiEl.classList.add('fade');
    hijriEl.classList.add('fade');
    const cacheKey = `hijri-${today.toDateString()}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) return hijriEl.textContent = cached;
    const d = String(today.getDate()).padStart(2, '0');
    const m = String(today.getMonth() + 1).padStart(2, '0');
    const y = today.getFullYear();
    const dateStr = `${d}-${m}-${y}`;
    fetch(`https://api.aladhan.com/v1/gToH/${dateStr}`)
        .then(res => {
            if (!res.ok) throw new Error("API down");
            return res.json();
        })
        .then(data => {
            const h = data.data.hijri;
            const icon = hijriIcon(h.month.number);
            const text = `${h.day} ${h.month.ar} ${h.year} هـ ${icon}`;
            hijriEl.textContent = text;
            localStorage.setItem(cacheKey, text);
        })
        .catch(() => {
            try {
                const fmt = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', { day: 'numeric', month: 'long', year: 'numeric' });
                const text = `${fmt.format(today)} هـ 🌙 (تقريبي)`;
                hijriEl.textContent = text;
                localStorage.setItem(cacheKey, text);
            } catch {
                hijriEl.textContent = "التاريخ الهجري غير متوفر 🕌";
            }
        });
}
function hijriIcon(month) {
    if (month === 9) return "🌙";
    if (month === 12) return "🕋";
    if (month === 1) return "✨";
    if (month === 8) return "🌾";
    return "🕌";
}
function updateDailyTips() {
    const tips = {
        ar: [
            "نظّف المكثفات من الغبار كل 6 أشهر.",
            "استعمل منظم فولطاج لحماية اللوحة.",
            "غيّر بطاريات الريموت قبل ما تنفجر.",
            "فحص المروحة لو الجهاز يسخن بزاف.",
            "تجنّب اللحام البارد في التصليح.",
            "افصل الكهرباء قبل فتح الجهاز.",
            "فحص الكونكتورات أولاً لو ما يشتغلش.",
            "نظف اللوحات بكحول إيزوبروبيل فقط."
        ],
        fr: [
            "Nettoyez les condensateurs de la poussière tous les 6 mois.",
            "Utilisez un régulateur de tension pour protéger la carte.",
            "Changez les piles de la télécommande avant qu'elles ne fuient.",
            "Vérifiez le ventilateur si l'appareil chauffe trop.",
            "Évitez les soudures froides lors des réparations.",
            "Débranchez l'appareil avant d'ouvrir.",
            "Vérifiez d'abord les connecteurs s'il ne fonctionne pas.",
            "Nettoyez les cartes uniquement avec de l'alcool isopropylique."
        ],
        en: [
            "Clean capacitors from dust every 6 months.",
            "Use a voltage regulator to protect the board.",
            "Replace remote batteries before they leak.",
            "Check the fan if the device overheats.",
            "Avoid cold solder joints during repairs.",
            "Unplug before opening any device.",
            "Check connectors first if it doesn't work.",
            "Clean boards only with isopropyl alcohol."
        ]
    };
    const selected = tips[currentLang] || tips.ar;
    const shuffled = selected.sort(() => 0.5 - Math.random());
    const list = document.getElementById('tips-list');
    if (list) {
        list.innerHTML = '';
        shuffled.slice(0, 3).forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            list.appendChild(li);
        });
    }
}
function showDailyItems() {
    if (dailyServiceEl) {
        const services = [
            { title: "تصليح كارت تلفاز", img: "images/tv-card.jpg" },
            { title: "تصليح كارت غسالة", img: "images/washer-card.jpg" },
            { title: "تصليح كارت جهاز مشي", img: "images/treadmill-card.jpg" },
            { title: "تصليح لوحات إلكترونية", img: "images/electronic-board.jpg" }
        ];
        const item = services[dayOfYear % services.length];
        dailyServiceEl.innerHTML = `<img src="${item.img}" alt="${item.title}" loading="lazy"><p>${item.title}</p>`;
    }
    if (dailyVideoEl) {
        const videos = [
            { title: "فحص بوردة", img: "images/board-test1.jpg" },
            { title: "إصلاح لوحة إلكترونية", img: "images/board-repair.jpg" },
            { title: "فحص تغذية كارت", img: "images/power-test.jpg" }
        ];
        const item = videos[dayOfYear % videos.length];
        dailyVideoEl.innerHTML = `<img src="${item.img}" alt="${item.title}" loading="lazy"><p>${item.title}</p>`;
    }
    if (dailyMachineEl) {
        const machines = [
            { title: "Inverter MMA-300s", img: "images/inverter-mma300.jpg" },
            { title: "OXOUXIANG MMA 185", img: "images/oxouxiang-185.jpg" },
            { title: "Telwin machine", img: "images/telwin.jpg" }
        ];
        const item = machines[dayOfYear % machines.length];
        dailyMachineEl.innerHTML = `<img src="${item.img}" alt="${item.title}" loading="lazy"><p>${item.title}</p>`;
    }
}
function loadRatings() {
    ratingsRef.on('value', snapshot => {
        const data = snapshot.val() || { sum: 0, count: 0, breakdown: {1:0,2:0,3:0,4:0,5:0} };
        const avg = data.count > 0 ? (data.sum / data.count).toFixed(1) : '0.0';
       
        avgStarsEl.textContent = avg;
        voteCountEl.textContent = data.count;
        // تحديث التفصيل (breakdown) مع ترجمة ديناميكية
        let html = '';
        for (let i = 5; i >= 1; i--) {
            const count = data.breakdown?.[i] || 0;
            html += `
                <div>
                    <span class="stars">${'★'.repeat(i)}</span>
                    <span class="count">${count} ${translations[currentLang]?.rating_votes_text || 'صوت'}</span>
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
    if (ratingValue) ratingValue.textContent = `${rating}/5`;
}
function checkUserRating(user) {
    if (!user) {
        updateStars(0);
        if (ratingMessage) {
            ratingMessage.textContent = translations[currentLang]?.rating_login || 'سجل الدخول عبر Google لتقييم الورشة (مرة واحدة فقط)';
            ratingMessage.classList.add('show');
        }
        stars.forEach(s => s.style.pointerEvents = 'none');
        return;
    }
    const uid = user.uid;
    userRatingsRef.child(uid).once('value').then(snap => {
        if (snap.exists()) {
            const data = snap.val();
            currentUserRating = data.rating;
            updateStars(currentUserRating);
            if (ratingMessage) {
                ratingMessage.textContent = `شكراً ${user.displayName || ''}، تقييمك (${currentUserRating} نجوم) محفوظ`;
                ratingMessage.classList.add('show');
                setTimeout(() => ratingMessage.classList.remove('show'), 8000);
            }
            stars.forEach(s => s.style.pointerEvents = 'none');
        } else {
            currentUserRating = 0;
            updateStars(0);
            stars.forEach(s => s.style.pointerEvents = 'auto');
        }
    }).catch(err => console.error("Erreur check rating:", err));
}
function formatResistance(value){
    if(value >= 1e6) return (value/1e6).toFixed(2)+' MΩ';
    if(value >= 1e3) return (value/1e3).toFixed(1)+' KΩ';
    return value+' Ω';
}
function updateResistor() {
    vis1.style.backgroundColor = band1.selectedOptions[0].dataset.color;
    vis2.style.backgroundColor = band2.selectedOptions[0].dataset.color;
    visMult.style.backgroundColor = multiplier.selectedOptions[0].dataset.color;
    visTol.style.backgroundColor = tolerance.selectedOptions[0].dataset.color;
    const val1 = parseInt(band1.value);
    const val2 = parseInt(band2.value);
    const mult = parseInt(multiplier.value);
    const tol = tolerance.value;
    if (isNaN(val1) || isNaN(val2) || isNaN(mult)) {
        result.textContent = "— Ω";
        return;
    }
    const ohm = ((val1 * 10) + val2) * mult;
    result.textContent = `${ohm} Ω ±${tol}%`;
}
function enableHorizontalDrag(sliderId) {
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
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
    slider.addEventListener('touchstart', e => {
        isDown = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('touchend', () => isDown = false);
    slider.addEventListener('touchmove', e => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}
// ==========================================================================
// DOM Ready (دمجت الحدثين في واحد)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // ── Éléments DOM récurrents ───────────────────────────────────────────
    const ticker = document.getElementById('live-news');
    const timeEl = document.getElementById('current-time');
    const visitEl = document.getElementById('visit-count');
    const radio = document.getElementById('radio-stream');
    const radioBtn = document.getElementById('radio-btn');
    const equalizer = document.getElementById('equalizer');
    const loginPopup = document.getElementById('login-popup');
    const userInfo = document.getElementById('user-info');
    const userName = document.getElementById('user-name');
    const btnGoogle = document.getElementById('btn-google');
    const btnClosePopup = document.getElementById('btn-close-popup');
    const btnSignOut = document.getElementById('btn-signout');
    // ── Language Switcher (النسخة المحسنة الكاملة) ────────────────────────
    document.querySelectorAll('.lang-switch img, .lang-btn').forEach(el => {
        el.addEventListener('click', () => {
            applyLanguage(el.dataset.lang);
        });
    });
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
        checkUserRating(user); // تحقق من التقييم بعد تغيير الحالة
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
    // ── Compteur de visites ────────────────────────────────────────────────
    if (visitEl) {
        const db = firebase.database();
        const visitsRef = db.ref('visits');
        const today = new Date().toDateString();
        let hasVisited = localStorage.getItem('hasVisitedToday');
        if (hasVisited !== today) {
            localStorage.setItem('hasVisitedToday', today);
            visitsRef.transaction(current => (current || 0) + 1);
        }
        visitsRef.on('value', snapshot => {
            const totalVisits = snapshot.val() || 0;
            visitEl.dataset.value = totalVisits;
            safeUpdateVisitText();
        });
    }
    // ── Mise à jour de l'heure ─────────────────────────────────────────────
    updateTime();
    setInterval(updateTime, 1000); // واحد بس هنا
    // ── News Ticker متعدد اللغات ──────────────────────────────────────────
    const news = {
        ar: [
            "📢 ورشة إلكترونيك الرحماني تفتح أبوابها لجميع الولايات.",
            "🔧 خدمات تصليح الأجهزة الإلكترونية بجودة عالية وبأسعار منافسة.",
            "🌍 التوصيل عبر البريد متوفر لكل أنحاء تونس.",
            "📱 تواصل معنا عبر واتساب لأي استفسار."
        ],
        fr: [
            "📢 L'atelier Électronique Rahmanie ouvre ses portes à toutes les régions.",
            "🔧 Services de réparation électronique de haute qualité à prix compétitifs.",
            "🌍 Livraison par poste disponible dans toute la Tunisie.",
            "📱 Contactez-nous sur WhatsApp pour toute question."
        ],
        en: [
            "📢 Rahmani Electronics Workshop opens its doors to all regions.",
            "🔧 High-quality electronic repair services at competitive prices.",
            "🌍 Nationwide delivery available across Tunisia.",
            "📱 Contact us on WhatsApp for any inquiry."
        ]
    };
    let newsIndex = 0;
    startNewsRotation();
    // ── FAQ Toggle ─────────────────────────────────────────────────────────
    initFAQ();
    // ── Wave Animation لعنوان FAQ (محسنة) ────────────────────────────────
    const faqHeader = document.querySelector('.faq-header');
    if (faqHeader) {
        const waveContainer = document.createElement('span');
        waveContainer.className = 'wave-text';
        waveContainer.setAttribute('data-i18n', 'faq_header');
        faqHeader.innerHTML = '';
        faqHeader.appendChild(waveContainer);
    }
    // ── Radio controls ─────────────────────────────────────────────────────
    if (radioBtn) {
        radioBtn.addEventListener('click', () => {
            if (radio.paused) {
                radio.play().catch(e => console.warn('Radio play failed:', e));
            } else {
                radio.pause();
            }
            radioBtn.textContent = radio.paused
                ? translations[currentLang].cta_radio_play
                : translations[currentLang].cta_radio_stop;
            updateEqualizerVisibility();
            radioBtn.classList.toggle('dance');
        });
        radio.addEventListener('play', updateEqualizerVisibility);
        radio.addEventListener('pause', updateEqualizerVisibility);
    }
    updateEqualizerVisibility();
    // ── Daily Rotation ─────────────────────────────────────────────────────
    const dailyServiceEl = document.getElementById('daily-service');
    const dailyVideoEl = document.getElementById('daily-video');
    const dailyMachineEl = document.getElementById('daily-machine');
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    showDailyItems();
    // ── Rating System ──────────────────────────────────────────────────────
    const stars = document.querySelectorAll('.stars-horizontal span');
    const ratingValue = document.getElementById('rating-value');
    const ratingMessage = document.getElementById('rating-message');
    const avgStarsEl = document.getElementById('avg-stars');
    const voteCountEl = document.getElementById('vote-count');
    const breakdownEl = document.getElementById('rating-breakdown');
    let currentUserRating = 0;
    const ratingsRef = firebase.database().ref('ratings');
    const userRatingsRef = firebase.database().ref('userRatings');
    loadRatings();
    stars.forEach(star => {
        const val = Number(star.dataset.value);
        // Hover (preview)
        star.addEventListener('mouseover', () => {
            if (auth.currentUser && currentUserRating === 0) {
                stars.forEach(s => {
                    const sVal = Number(s.dataset.value);
                    s.classList.toggle('selected', sVal <= val);
                    s.textContent = sVal <= val ? '★' : '☆';
                });
            }
        });
        // Mouse out → reset
        star.addEventListener('mouseout', () => {
            if (auth.currentUser && currentUserRating === 0) {
                updateStars(0);
            }
        });
        // Click → تسجيل التقييم
        star.addEventListener('click', () => {
            if (!auth.currentUser) {
                alert('سجل الدخول عبر Google لتقييم الورشة مرة واحدة فقط');
                document.getElementById('btn-google')?.click();
                return;
            }
            if (currentUserRating > 0) {
                if (ratingMessage) {
                    ratingMessage.textContent = translations[currentLang]?.rating_login || 'لقد قيّمت الورشة من قبل';
                    ratingMessage.classList.add('show');
                    setTimeout(() => ratingMessage.classList.remove('show'), 6000);
                }
                return;
            }
            const uid = auth.currentUser.uid;
            const name = auth.currentUser.displayName || 'مجهول';
            // حفظ تقييم المستخدم
            userRatingsRef.child(uid).set({
                rating: val,
                name: name,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            });
            // تحديث المجموع الكلي
            ratingsRef.transaction(current => {
                const data = current || { sum: 0, count: 0, breakdown: {1:0,2:0,3:0,4:0,5:0} };
                data.sum += val;
                data.count += 1;
                data.breakdown[val] = (data.breakdown[val] || 0) + 1;
                return data;
            });
            currentUserRating = val;
            updateStars(val);
            // رسالة شكر مترجمة
            const thanksText = {
                ar: `شكراً ${name}، تقييمك (${val} نجوم) تم حفظه نهائياً! 🌟`,
                fr: `Merci ${name}, votre note (${val} étoiles) a été enregistrée 🌟`,
                en: `Thank you ${name}, your rating (${val} stars) has been saved 🌟`
            };
            if (ratingMessage) {
                ratingMessage.textContent = thanksText[currentLang];
                ratingMessage.classList.add('show');
                setTimeout(() => ratingMessage.classList.remove('show'), 8000);
            }
            stars.forEach(s => s.style.pointerEvents = 'none');
        });
    });
    // ── PCB Animated Header Canvas ─────────────────────────────────────────
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
    // ── Fullscreen Viewer ──────────────────────────────────────────────────
    document.querySelectorAll('.service-pro-card, .video-pro-card, .poste-pro-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.dataset.title;
            const desc = card.dataset.desc;
            const price = card.dataset.price || '';
            const media = card.querySelector('img, video');
            const isVideo = media.tagName === 'VIDEO';
            const viewer = document.getElementById('mediaViewer');
            viewer.innerHTML = `
                <span class="viewer-close">×</span>
                <div class="viewer-media">
                    ${isVideo ? `<video src="${media.src}" controls autoplay></video>` : `<img src="${media.src}" alt="${title}">`}
                </div>
                <div class="viewer-info">
                    <h3>${title}</h3>
                    <p>${desc}</p>
                    ${price ? `<p class="price">${price}</p>` : ''}
                </div>
            `;
            viewer.classList.add('active');
            viewer.querySelector('.viewer-close').onclick = () => viewer.classList.remove('active');
            viewer.onclick = e => {
                if (e.target === viewer) viewer.classList.remove('active');
            };
        });
    });
    // ── Drag للسلايدرات الأفقية ───────────────────────────────────────────
    enableHorizontalDrag('servicesSlider');
    enableHorizontalDrag('videoSlider');
    enableHorizontalDrag('postesSlider');
    // ── CMP Cookie Banner – يظهر مرة كل يوم فقط ──────────────────────────────────
    const cmpBanner = document.getElementById('cmp-banner');
    const consentAllow = document.getElementById('consent-allow');
    const consentManage = document.getElementById('consent-manage');
    if (cmpBanner) {
        const today = new Date().toDateString(); // تاريخ اليوم
        const lastShown = localStorage.getItem('cmpLastShown'); // آخر مرة ظهر فيها
        // يظهر إذا ما ظهرش اليوم (أو أول مرة)
        if (!lastShown || lastShown !== today) {
            cmpBanner.style.display = 'block';
            localStorage.setItem('cmpLastShown', today); // نحفظ تاريخ اليوم
        }
        // زر "أوافق" – يخفي البنر ويحفظ القبول (اختياري: يمنع الظهور نهائياً إذا حبيت)
        consentAllow?.addEventListener('click', () => {
            localStorage.setItem('cmpConsent', 'granted'); // قبول نهائي (اختياري)
            cmpBanner.style.display = 'none';
        });
        // زر "تغيير الخيارات" – هنا تضيف الكود اللي يفتح صفحة الإعدادات (أو alert بسيط)
        consentManage?.addEventListener('click', () => {
            alert('يمكنك إدارة تفضيلات الكوكيز هنا. (أضف صفحة إعدادات لاحقاً)');
            // cmpBanner.style.display = 'none'; // أو ما تخفيهوش لو تبي
        });
    }
    // ── Site Name Animation ────────────────────────────────────────────────
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
    // ── Resistor Calculators ───────────────────────────────────────────────
    const band1 = document.getElementById("band1");
    const band2 = document.getElementById("band2");
    const multiplier = document.getElementById("multiplier");
    const tolerance = document.getElementById("tolerance");
    const vis1 = document.getElementById("vis-band1");
    const vis2 = document.getElementById("vis-band2");
    const visMult = document.getElementById("vis-mult");
    const visTol = document.getElementById("vis-tol");
    const result = document.getElementById("resistor-result");
    [band1, band2, multiplier, tolerance].forEach(el => el.addEventListener("change", updateResistor));
    updateResistor();
    document.getElementById("smdCode")?.addEventListener("input", function(){
        const code = this.value.trim().toUpperCase();
        let resultText = "— Ω";
        if(/^\d{3}$/.test(code)){
            const val = parseInt(code.slice(0,2)) * Math.pow(10, parseInt(code[2]));
            resultText = formatResistance(val);
        } else if(/^\dR\d$/.test(code)){
            resultText = code.replace("R",".") + " Ω";
        } else if (/^R\d{1,2}$/.test(code)) {
            resultText = "0." + code.slice(1) + " Ω";
        }
        document.getElementById("smd-result").textContent = resultText;
    });
    // Capacitor Calculator
    const capValue = document.getElementById("cap-value");
    const capVoltage = document.getElementById("cap-voltage");
    const capResult = document.getElementById("cap-result");
    const capFill = document.querySelector(".cap-fill");
    [capValue, capVoltage].forEach(el => el?.addEventListener("input", () => {
        const value = parseFloat(capValue.value);
        const voltage = parseFloat(capVoltage.value);
        if(!value || !voltage){
            capResult.textContent = "—";
            capFill.style.height = "0%";
            return;
        }
        capResult.textContent = `Capacitance: ${value} µF @ ${voltage} V`;
        capFill.style.height = Math.min(100, value) + "%";
    }));
    // Power Calculator
    const volt = document.getElementById("volt");
    const resistance = document.getElementById("resistance");
    const current = document.getElementById("current");
    const powerResult = document.getElementById("power-result");
    const powerFill = document.querySelector(".power-fill");
    [volt, resistance, current].forEach(el => el?.addEventListener("input", () => {
        const V = parseFloat(volt.value);
        const R = parseFloat(resistance.value);
        const I = parseFloat(current.value);
        let P = null;
        if(V && R) P = (V*V)/R;
        else if(I && R) P = I*I*R;
        else if(V && I) P = V*I;
        powerResult.textContent = P ? `${P.toFixed(2)} وات` : "— وات";
        powerFill.style.width = P ? Math.min(100, P) + "%" : "0%";
    }));
    // ── Firebase Download Counter + Progress ───────────────────────────────
    const db = firebase.database();
    document.querySelectorAll('.download-btn').forEach(btn => {
        const id = btn.dataset.id;
        const fileUrl = btn.dataset.file;
        if (!id || !fileUrl) return;
        let counterEl = btn.querySelector('small span');
        if (!counterEl) {
            counterEl = document.createElement('span');
            counterEl.textContent = '0';
            const small = document.createElement('small');
            small.appendChild(counterEl);
            btn.appendChild(small);
        }
        let btnText = btn.querySelector('.label');
        if (!btnText) {
            btnText = document.createElement('span');
            btnText.className = 'label';
            btnText.textContent = '📥 تحميل المشروع';
            btn.prepend(btnText);
        }
        const downloadsRef = db.ref(`downloads/${id}/count`);
        downloadsRef.on('value', snap => {
            counterEl.textContent = snap.val() || 0;
        });
        btn.addEventListener('click', async e => {
            e.preventDefault();
            if (btn.classList.contains('downloading')) return;
            const spamKey = `downloaded-${id}`;
            if (localStorage.getItem(spamKey)) {
                alert('سبق لك تحميل هذا الملف');
                return;
            }
            localStorage.setItem(spamKey, 'true');
            btn.classList.add('downloading');
            btn.disabled = true;
            btnText.textContent = 'جاري التحميل...';
            let progressContainer = btn.querySelector('.progress-container');
            let progressBar = progressContainer?.querySelector('.progress-bar');
            if (!progressContainer) {
                progressContainer = document.createElement('div');
                progressContainer.className = 'progress-container';
                progressBar = document.createElement('div');
                progressBar.className = 'progress-bar';
                progressContainer.appendChild(progressBar);
                btn.appendChild(progressContainer);
            }
            progressBar.style.width = '0%';
            let p = 0;
            const timer = setInterval(() => {
                p = Math.min(90, p + Math.random() * 15);
                progressBar.style.width = p + '%';
            }, 200);
            try {
                await downloadsRef.transaction(v => (v || 0) + 1);
                await new Promise(r => setTimeout(r, 1500));
                clearInterval(timer);
                progressBar.style.width = '100%';
                window.open(fileUrl, '_blank');
            } catch (err) {
                console.error(err);
                btnText.textContent = 'خطأ!';
            } finally {
                setTimeout(() => {
                    btn.classList.remove('downloading');
                    btn.disabled = false;
                    btnText.textContent = '📥 تحميل المشروع';
                    if (progressBar) progressBar.style.width = '0%';
                }, 1200);
            }
        });
    });
    // ── Final Initialization ───────────────────────────────────────────────
    updateWeather();
    updatePrayerTimes();
    updateMiniCalendar();
    updateDailyTips();
    applyLanguage(currentLang);
    console.log("إلكترونيك الرحماني - app.js محمل ومصلح كامل بدون نقصان ✓");
});
// =======================
// 🤖 Robo 3D – clean & smooth (تصليح: أضفت الإعداد الكامل)
// =======================
window.addEventListener('load', () => {
    if (typeof THREE === 'undefined') {
        console.error("THREE.js لم يتحمل – تحقق من الإنترنت أو CDN");
        return;
    }
    const roboContainer = document.getElementById('robo-container'); // نفترض موجود في HTML
    if (roboContainer) {
        const roboScene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, roboContainer.clientWidth / roboContainer.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(roboContainer.clientWidth, roboContainer.clientHeight);
        roboContainer.appendChild(renderer.domElement);
        const loader = new THREE.GLTFLoader();
        loader.load('robo.glb', gltf => {
            let roboModel = gltf.scene;
            // Reset transforms
            roboModel.position.set(0, 0, 0);
            roboModel.rotation.set(0, 0, 0);
            // Auto scale + center
            const box = new THREE.Box3().setFromObject(roboModel);
            const size = box.getSize(new THREE.Vector3()).length();
            const center = box.getCenter(new THREE.Vector3());
            roboModel.position.sub(center);
            const scale = 1.4 / size;
            roboModel.scale.setScalar(scale);
            roboModel.position.y = -0.45;
            roboScene.add(roboModel);
            console.log('🤖 Robo loaded + auto centered');
        }, undefined, error => {
            console.error('خطأ في تحميل robo.glb:', error);
        });
        camera.position.z = 5;
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(roboScene, camera);
        }
        animate();
    }
});
