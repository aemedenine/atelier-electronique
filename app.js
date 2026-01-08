document.addEventListener('DOMContentLoaded', () => {

  // ===== Firebase Setup =====
  const auth = firebase.auth();
  const db = firebase.database();

  // ===== Session Persistence =====
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  // ===== User Auth =====
  const loginPopup = document.getElementById('login-popup');
  const userInfo = document.getElementById('user-info');
  const userName = document.getElementById('user-name');
  const btnGoogle = document.getElementById('btn-google');
  const btnSignOut = document.getElementById('btn-signout');
  const btnClosePopup = document.getElementById('btn-close-popup');

  auth.onAuthStateChanged(user => {
    if(user){
      userInfo.style.display='block';
      loginPopup.style.display='none';
      userName.textContent = user.displayName || 'مستخدم';
    }else{
      userInfo.style.display='none';
      loginPopup.style.display='flex';
    }
  });

  btnGoogle.addEventListener('click', ()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(res=>{
      const user = res.user;
      userInfo.style.display='block';
      loginPopup.style.display='none';
      userName.textContent = user.displayName;
    });
  });

  btnSignOut.addEventListener('click', ()=>{
    auth.signOut().then(()=> userInfo.style.display='none');
  });

  btnClosePopup.addEventListener('click', ()=> loginPopup.style.display='none');

  // ===== Visits Counter =====
  const visitsRef = db.ref('visits');
  visitsRef.transaction(current => (current||0)+1);
  let totalVisits = 0;
  visitsRef.on('value', snapshot => {
    totalVisits = snapshot.val() || 0;
    updateVisitText(totalVisits);
  });

  function updateVisitText(total){
    const visitCountElem = document.getElementById('visit-count');
    visitCountElem.textContent = 'عدد زوار الموقع: '+total;
  }

  // ===== Weather =====
  function updateWeather() {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=33.3549&longitude=10.5055&current_weather=true")
      .then(res=>res.json())
      .then(data=>{
        document.getElementById('weather-temp').textContent = data.current_weather.temperature+'°C';
        document.getElementById('weather-desc').textContent = '🌬️ سرعة الرياح: '+data.current_weather.windspeed+' كم/س';
      });
  }
  updateWeather();

  // ===== Prayer Times =====
  function updatePrayerTimes() {
    fetch("https://api.aladhan.com/v1/timingsByCity?city=Medenine&country=Tunisia&method=2")
      .then(res=>res.json())
      .then(data=>{
        const t = data.data.timings;
        document.getElementById("prayer-times").innerHTML = `
          <p><span>🌅 الفجر:</span> <span class="time">${t.Fajr}</span></p>
          <p><span>🌄 الشروق:</span> <span class="time">${t.Sunrise}</span></p>
          <p><span>☀️ الظهر:</span> <span class="time">${t.Dhuhr}</span></p>
          <p><span>🕰️ العصر:</span> <span class="time">${t.Asr}</span></p>
          <p><span>🌇 المغرب:</span> <span class="time">${t.Maghrib}</span></p>
          <p><span>🌙 العشاء:</span> <span class="time">${t.Isha}</span></p>
        `;
      });
  }
  updatePrayerTimes();

  // ===== Media Viewer =====
  const mediaViewer = document.getElementById('mediaViewer');
  const viewerImg = document.getElementById('viewerImg');
  const viewerVideo = document.getElementById('viewerVideo');
  const closeBtn = mediaViewer.querySelector('.close-btn');

  document.querySelectorAll('.service-card img, .service-card video').forEach(el=>{
    el.addEventListener('click', ()=>{
      mediaViewer.style.display='flex';
      if(el.tagName==='IMG'){
        viewerImg.src=el.src; viewerImg.style.display='block';
        viewerVideo.style.display='none'; viewerVideo.pause();
      } else {
        viewerVideo.src=el.src; viewerVideo.style.display='block';
        viewerImg.style.display='none'; viewerVideo.play();
      }
    });
  });

  closeBtn.addEventListener('click', ()=>{
    mediaViewer.style.display='none';
    viewerVideo.pause(); viewerVideo.currentTime=0;
  });

  // ===== Slider Drag =====
  function enableDragScroll(id){
    const slider = document.getElementById(id);
    if(!slider) return;
    let isDown=false, startX, scrollLeft;
    slider.addEventListener('mousedown', e=>{
      isDown=true; startX=e.pageX-slider.offsetLeft; scrollLeft=slider.scrollLeft;
    });
    slider.addEventListener('mouseleave',()=>isDown=false);
    slider.addEventListener('mouseup',()=>isDown=false);
    slider.addEventListener('mousemove', e=>{
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      slider.scrollLeft = scrollLeft - (x-startX)*1.5;
    });
  }
  enableDragScroll('servicesSlider');
  enableDragScroll('videoSlider');

});
