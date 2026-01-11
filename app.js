document.addEventListener('DOMContentLoaded', () => {

// ======= Firebase Init =======
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_PROJECT_ID",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const visitsRef = db.ref('visits');

// زيادة الزوار تلقائياً
visitsRef.transaction(current => (current || 0) + 1);
let totalVisits = 0;
visitsRef.on('value', snapshot => {
  totalVisits = snapshot.val() || 0;
  updateVisitText(currentLanguage,totalVisits);
});
function updateVisitText(lang,total){
  const elem = document.getElementById('visit-count');
  if(lang==='ar') elem.textContent='عدد زوار الموقع: '+total;
  else elem.textContent='Nombre de visiteurs: '+total;
}

// ======= Fullscreen Media Viewer =======
const mediaViewer=document.getElementById('mediaViewer');
const viewerImg=document.getElementById('viewerImg');
const viewerVideo=document.getElementById('viewerVideo');
const closeBtn=mediaViewer.querySelector('.close-btn');

document.querySelectorAll('.service-card img').forEach(el=>{
  el.addEventListener('click',()=>{
    mediaViewer.style.display='flex';
    viewerImg.src=el.src;
    viewerImg.style.display='block';
    viewerVideo.style.display='none';
    viewerVideo.pause();
  });
});
closeBtn.addEventListener('click',()=>{
  mediaViewer.style.display='none';
  viewerVideo.pause();
  viewerVideo.currentTime=0;
});

// ======= Slider Drag =======
function enableDragScroll(id){
  const slider=document.getElementById(id);
  if(!slider) return;
  let isDown=false,startX,scrollLeft;
  slider.addEventListener('mousedown', e=>{
    isDown=true; startX=e.pageX-slider.offsetLeft; scrollLeft=slider.scrollLeft;
  });
  slider.addEventListener('mouseleave',()=>isDown=false);
  slider.addEventListener('mouseup',()=>isDown=false);
  slider.addEventListener('mousemove', e=>{
    if(!isDown) return;
    e.preventDefault();
    const x=e.pageX-slider.offsetLeft;
    slider.scrollLeft=scrollLeft-(x-startX)*1.5;
  });
}
enableDragScroll('servicesSlider');

// ======= PCB Header Animation =======
const canvas=document.getElementById('pcbCanvasHeader'); const ctx=canvas.getContext('2d');
function resizeCanvas(){canvas.width=canvas.parentElement.offsetWidth; canvas.height=canvas.parentElement.offsetHeight;}
window.addEventListener('resize',resizeCanvas); resizeCanvas();
const traces=[]; for(let i=0;i<50;i++){traces.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,length:50+Math.random()*150,speed:0.5+Math.random()*1.5,color:'rgba(0,255,255,0.5)',particles:[]});
for(let j=0;j<5;j++){traces[i].particles.push({offset:Math.random()*traces[i].length,speed:1+Math.random()*2,size:2+Math.random()*2});}}
let mouseX=-1000,mouseY=-1000; window.addEventListener('mousemove', e=>{mouseX=e.clientX; mouseY=e.clientY;});
function animatePCB(){ctx.clearRect(0,0,canvas.width,canvas.height);
traces.forEach(t=>{const dx=t.x+t.length/2-mouseX,dy=t.y-mouseY,dist=Math.sqrt(dx*dx+dy*dy);let speedMultiplier=dist<200?3:1;
ctx.beginPath();ctx.moveTo(t.x,t.y);ctx.lineTo(t.x+t.length,t.y);ctx.strokeStyle=t.color;ctx.lineWidth=2;ctx.shadowColor='#0ff';ctx.shadowBlur=10;ctx.stroke();
t.particles.forEach(p=>{let px=t.x+p.offset,py=t.y;ctx.beginPath();ctx.arc(px,py,p.size,0,Math.PI*2);ctx.fillStyle='#0ff';ctx.shadowColor='#0ff';ctx.shadowBlur=10;ctx.fill(); p.offset+=p.speed*speedMultiplier;if(p.offset>t.length)p.offset=0;});
t.x+=t.speed*speedMultiplier;if(t.x>canvas.width)t.x=-t.length;});
requestAnimationFrame(animatePCB);}
animatePCB();

// ======= Rating =======
const starsHorizontal=document.querySelectorAll('.stars-horizontal span[data-value]');
const ratingValueHorizontal=document.getElementById('rating-value');
let selectedRatingHorizontal=parseInt(localStorage.getItem('workshopRating'))||0;
function updateStars(rating){
  starsHorizontal.forEach(star=>{star.classList.remove('selected');if(Number(star.dataset.value)<=rating) star.classList.add('selected'); star.textContent=Number(star.dataset.value)<=rating?'★':'☆';});
  ratingValueHorizontal.textContent=`${rating}/5`;
  ratingValueHorizontal.style.color=rating>0?'gold':'#fff';
  ratingValueHorizontal.style.textShadow=rating>0?'0 0 8px gold':'none';
}
updateStars(selectedRatingHorizontal);
starsHorizontal.forEach(star=>{
  const val=Number(star.dataset.value);
  star.addEventListener('mouseover',()=>{starsHorizontal.forEach(s=>s.classList.remove('hover')); starsHorizontal.forEach(s=>{if(Number(s.dataset.value)<=val) s.classList.add('hover');}); ratingValueHorizontal.style.color='gold'; ratingValueHorizontal.style.textShadow='0 0 8px gold';});
  star.addEventListener('mouseout',()=>{starsHorizontal.forEach(s=>s.classList.remove('hover')); updateStars(selectedRatingHorizontal);});
  star.addEventListener('click',()=>{selectedRatingHorizontal=val; localStorage.setItem('workshopRating',selectedRatingHorizontal); updateStars(selectedRatingHorizontal);});
});

// ======= CMP =======
const cmpBanner=document.getElementById('cmp-banner');
const consentAllow=document.getElementById('consent-allow');
const consentManage=document.getElementById('consent-manage');
if(!localStorage.getItem('cmpConsent')) cmpBanner.style.display='block';
consentAllow.addEventListener('click',()=>{localStorage.setItem('cmpConsent','granted'); cmpBanner.style.display='none';});
consentManage.addEventListener('click',()=>{alert('يمكنك إدارة تفضيلات الكوكيز هنا.');});

// ======= Weather =======
let currentLanguage='ar';
function updateWeather(language){
  fetch("https://api.open-meteo.com/v1/forecast?latitude=33.3549&longitude=10.5055&current_weather=true")
  .then(res=>res.json())
  .then(data=>{
    const temp=data.current_weather.temperature+"°C";
    const wind=data.current_weather.windspeed+(language==='fr'?" km/h":" كم/س");
    document.getElementById("weather-temp").textContent=temp;
    if(language==='ar'){document.querySelector(".weather-box h3").textContent="🌦️ حالة الطقس في مدنين"; document.getElementById("weather-desc").textContent="🌬️ سرعة الرياح: "+wind;}
    else{document.querySelector(".weather-box h3").textContent="🌦️ Météo à Médenine"; document.getElementById("weather-desc").textContent="🌬️ Vitesse du vent: "+wind;}
  }).catch(()=>{document.getElementById("weather-desc").textContent="⚠️ لا يمكن تحميل الطقس";});
}
updateWeather(currentLanguage);

// ======= Prayer Times =======
function updatePrayerTimes(){
  fetch("https://api.aladhan.com/v1/timingsByCity?city=Medenine&country=Tunisia&method=2")
  .then(res=>res.json())
  .then(data=>{
    const times=data.data.timings;
    const pt=document.getElementById("prayer-times");
    pt.innerHTML=`
      <p>🌅 الفجر: <span>${times.Fajr}</span></p>
      <p>🌄 الشروق: <span>${times.Sunrise}</span></p>
      <p>☀️ الظهر: <span>${times.Dhuhr}</span></p>
      <p>🕰️ العصر: <span>${times.Asr}</span></p>
      <p>🌇 المغرب: <span>${times.Maghrib}</span></p>
      <p>🌙 العشاء: <span>${times.Isha}</span></p>
    `;
  }).catch(err=>console.error(err));
}
updatePrayerTimes();

// ======= Language Toggle =======
document.getElementById('toggle-lang-btn').addEventListener('click',()=>{
  currentLanguage = currentLanguage==='ar'?'fr':'ar';
  updateWeather(currentLanguage);
  updateVisitText(currentLanguage,totalVisits);
});

});
