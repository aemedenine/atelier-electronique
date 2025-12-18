document.addEventListener('DOMContentLoaded', () => {
  let currentLang = document.documentElement.lang.startsWith('ar') ? 'ar' : 'fr';

  const ticker = document.getElementById('live-news');
  const toggleBtn = document.getElementById('toggle-lang-btn');
  const visitEl = document.getElementById('visit-count');
  const timeEl = document.getElementById('current-time');
  const faqContainer = document.querySelector('.faq');
  const radioBtn = document.getElementById('radio-btn');

  /* ---------------- Time ---------------- */
  function updateTime() {
    const now = new Date();
    const daysAr = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const monthsAr = ['جانفي','فيفري','مارس','أفريل','ماي','جوان','جويلية','أوت','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    const daysFr = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const monthsFr = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

    const day = currentLang==='ar'? daysAr[now.getDay()] : daysFr[now.getDay()];
    const month = currentLang==='ar'? monthsAr[now.getMonth()] : monthsFr[now.getMonth()];
    const dateStr = currentLang==='ar'? `${day}، ${now.getDate()} ${month}` : `${day}, ${now.getDate()} ${month}`;
    const timeStr = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
    timeEl.textContent = `${dateStr} - ${timeStr}`;
  }
  setInterval(updateTime,1000);
  updateTime();

  /* ---------------- Visits ---------------- */
  function updateVisits() {
    const key = 'aem-visit-count';
    let count = parseInt(localStorage.getItem(key))||0;
    count++;
    localStorage.setItem(key,count);
    visitEl.textContent = currentLang==='ar'? `عدد زياراتك: ${count}` : `Nombre de visites: ${count}`;
  }
  updateVisits();

  /* ---------------- Cookie Banner ---------------- */
  const cookieBanner = document.getElementById('cookie-banner');
  const accepted = localStorage.getItem('cookiesAccepted');
  if(!accepted) cookieBanner.style.display='block';
  document.getElementById('accept-cookies').addEventListener('click',()=>{
    localStorage.setItem('cookiesAccepted','true');
    cookieBanner.style.display='none';
  });

  /* ---------------- PCB Header ---------------- */
  const canvas = document.getElementById('pcbCanvasHeader');
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  function resizeCanvas() {
    const h = canvas.parentElement.offsetHeight;
    canvas.width = window.innerWidth*dpr;
    canvas.height = h*dpr;
    canvas.style.width = window.innerWidth+'px';
    canvas.style.height = h+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  window.addEventListener('resize',resizeCanvas);
  resizeCanvas();

  const traces = [];
  for(let i=0;i<50;i++){
    const length = 50 + Math.random()*150;
    const trace = { x:Math.random()*window.innerWidth, y:Math.random()*canvas.height, length, speed:0.5+Math.random()*1.5, color:'rgba(0,255,255,0.5)', particles:[] };
    for(let j=0;j<5;j++){ trace.particles.push({ offset:Math.random()*length, speed:1+Math.random()*2, size:2+Math.random()*2 }); }
    traces.push(trace);
  }

  let mouseX=-1000, mouseY=-1000;
  window.addEventListener('mousemove', e=>{ mouseX=e.clientX; mouseY=e.clientY; });

  function animatePCB(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    traces.forEach(t=>{
      const dx=t.x+t.length/2-mouseX;
      const dy=t.y-mouseY;
      const dist=Math.sqrt(dx*dx+dy*dy);
      const speedMultiplier = dist<200? 3 : 1;
      ctx.beginPath();
      ctx.moveTo(t.x,t.y);
      ctx.lineTo(t.x+t.length,t.y);
      ctx.strokeStyle=t.color;
      ctx.lineWidth=2;
      ctx.shadowColor='#0ff';
      ctx.shadowBlur=10;
      ctx.stroke();
      t.particles.forEach(p=>{
        const px=t.x+p.offset;
        ctx.beginPath();
        ctx.arc(px,t.y,p.size,0,Math.PI*2);
        ctx.fillStyle='#0ff';
        ctx.fill();
        p.offset+=p.speed*speedMultiplier;
        if(p.offset>t.length)p.offset=0;
      });
      t.x+=t.speed*speedMultiplier;
      if(t.x>window.innerWidth)t.x=-t.length;
    });
    requestAnimationFrame(animatePCB);
  }
  animatePCB();

  /* ---------------- Radio Dance ---------------- */
  let dancing=false;
  radioBtn.addEventListener('click',()=>{
    dancing=!dancing;
    if(dancing){ radioBtn.classList.add('dance'); } 
    else{ radioBtn.classList.remove('dance'); }
  });
});
