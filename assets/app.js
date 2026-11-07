(()=>{
 const firstName=document.getElementById('nameFirst');
 const lastName=document.getElementById('nameLast');
 if(firstName&&lastName){
   const firstText='FERUZBEK',lastText='NORMAMATOV';
   const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   if(reduced){firstName.textContent=firstText;lastName.textContent=lastText;}
   else{
     let firstIndex=0,lastIndex=0;
     const typeLast=()=>{if(lastIndex<lastText.length){lastName.textContent+=lastText[lastIndex++];setTimeout(typeLast,95);}};
     const typeFirst=()=>{if(firstIndex<firstText.length){firstName.textContent+=firstText[firstIndex++];setTimeout(typeFirst,95);}else setTimeout(typeLast,250);};
     setTimeout(typeFirst,350);
   }
 }

 const menu=document.getElementById('menuToggle'),nav=document.getElementById('mainNav');
 if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open?'true':'false');menu.setAttribute('aria-label',open?'Close navigation':'Open navigation')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));document.addEventListener('click',e=>{if(nav.classList.contains('open')&&!nav.contains(e.target)&&!menu.contains(e.target)){nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}})}
 const obs=new IntersectionObserver(items=>items.forEach(it=>{if(it.isIntersecting){it.target.classList.add('show');obs.unobserve(it.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
 const canvas=document.getElementById('matrix');
 if(canvas&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const ctx=canvas.getContext('2d',{alpha:true});let w=0,h=0,dpr=1,pts=[],raf=0,mouse={x:-1000,y:-1000};const mobile=()=>innerWidth<700;function resize(){dpr=Math.min(devicePixelRatio||1,1.5);w=innerWidth;h=innerHeight;canvas.width=Math.floor(w*dpr);canvas.height=Math.floor(h*dpr);canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);const n=mobile()?30:62;pts=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.5+.5}))}function draw(){if(document.hidden){raf=requestAnimationFrame(draw);return}ctx.clearRect(0,0,w,h);for(let i=0;i<pts.length;i++){const p=pts[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;const dx=p.x-mouse.x,dy=p.y-mouse.y,dist=Math.hypot(dx,dy);if(dist>0&&dist<125){p.x+=dx/dist*.16;p.y+=dy/dist*.16}ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(120,255,178,.52)';ctx.fill();for(let j=i+1;j<pts.length;j++){const q=pts[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<(mobile()?82:120)){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(110,205,181,${(1-d/125)*.19})`;ctx.lineWidth=.6;ctx.stroke()}}}raf=requestAnimationFrame(draw)}resize();addEventListener('resize',resize,{passive:true});addEventListener('pointermove',e=>{mouse.x=e.clientX;mouse.y=e.clientY},{passive:true});document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!raf)draw()});draw()}
 function copyText(text,button){if(!navigator.clipboard){button.textContent='COPY MANUALLY';return}navigator.clipboard.writeText(text).then(()=>{const old=button.textContent;button.textContent='COPIED';setTimeout(()=>button.textContent=old,1200)}).catch(()=>{button.textContent='COPY MANUALLY'})}window.copyText=copyText;
 window.filterCards=function(inputId,categoryId,cardSelector){const q=(document.getElementById(inputId)?.value||'').toLowerCase();const cat=document.getElementById(categoryId)?.value||'all';document.querySelectorAll(cardSelector).forEach(card=>{const text=card.innerText.toLowerCase();card.style.display=(cat==='all'||card.dataset.category===cat)&&text.includes(q)?'':'none'})};
 window.subnetCalc=function(){const ip=document.getElementById('ipInput')?.value.trim(),cidr=parseInt(document.getElementById('cidrInput')?.value,10),out=document.getElementById('subnetResult');if(!out)return;const m=ip?.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);if(!m||!Number.isInteger(cidr)||cidr<0||cidr>32||m.slice(1).some(n=>+n>255)){out.textContent='Valid IPv4 address and CIDR (0–32) required.';return}const n=m.slice(1).map(Number).reduce((a,v)=>(a*256+v)>>>0,0)>>>0,mask=cidr===0?0:(0xffffffff<<(32-cidr))>>>0,network=(n&mask)>>>0,broadcast=(network|(~mask>>>0))>>>0,ipstr=x=>[(x>>>24)&255,(x>>>16)&255,(x>>>8)&255,x&255].join('.'),hosts=cidr>=31?(cidr===31?2:1):Math.pow(2,32-cidr)-2,lines=[`Network: ${ipstr(network)}/${cidr}`,`Broadcast: ${ipstr(broadcast)}`,`Subnet mask: ${ipstr(mask)}`,`Total addresses: ${Math.pow(2,32-cidr).toLocaleString()}`,`Usable hosts: ${hosts.toLocaleString()}`];if(cidr<31)lines.push(`Usable range: ${ipstr((network+1)>>>0)} – ${ipstr((broadcast-1)>>>0)}`);out.textContent=lines.join('\n')};
 window.showLayer=function(btn){document.querySelectorAll('.layer').forEach(b=>b.classList.remove('active'));btn.classList.add('active');const o=document.getElementById('layerInfo');if(o)o.textContent=btn.dataset.info};
 window.linuxSim=function(){const i=document.getElementById('linuxCommand'),o=document.getElementById('linuxOutput');if(!i||!o)return;const cmd=i.value.trim(),map={'help':'Available safe demo commands: help, pwd, ls, whoami, hostname, uname -a, date, ip addr, clear','pwd':'/home/feruzbek','ls':'Desktop  Documents  Downloads  labs  projects','whoami':'feruzbek','hostname':'feruzbek-lab','uname -a':'Linux feruzbek-lab 6.8.0-demo x86_64 GNU/Linux','date':new Date().toString(),'ip addr':'lo: 127.0.0.1/8\neth0: 192.168.1.10/24','clear':''};if(cmd==='clear'){o.textContent='';return}o.textContent=(o.textContent+'\n$ '+cmd+'\n'+(map[cmd]||'Command not available in the safe learning simulator. Type help.')).trim()};
 window.gradeQuiz=function(){const qs=[...document.querySelectorAll('#quizQuestions .card')];let score=0,answered=0;qs.forEach(q=>{const pick=q.querySelector('input[type=radio]:checked'),correct=Number(q.querySelector('.correct-answer').value);if(pick){answered++;if(Number(pick.value)===correct)score++}});const out=document.getElementById('quizResult');if(out)out.textContent=`Score: ${score} / ${qs.length} · Answered: ${answered} / ${qs.length}`};
 document.addEventListener('DOMContentLoaded',()=>{const search=document.getElementById('lessonSearch'),filterBtns=[...document.querySelectorAll('[data-filter]')];let active=document.getElementById('articleGrid')?.dataset.initialCategory||'all';filterBtns.forEach(b=>b.classList.toggle('active',b.dataset.filter===active));function runArticles(){const q=(search?.value||'').toLowerCase();document.querySelectorAll('.article-card').forEach(c=>{c.style.display=(active==='all'||c.dataset.category===active)&&c.innerText.toLowerCase().includes(q)?'':'none'})}filterBtns.forEach(b=>b.addEventListener('click',()=>{active=b.dataset.filter;filterBtns.forEach(x=>x.classList.toggle('active',x===b));runArticles()}));search?.addEventListener('input',runArticles);const cs=document.getElementById('cmdSearch'),cbtn=[...document.querySelectorAll('[data-cmd-filter]')];let cf='all';function runCmd(){const q=(cs?.value||'').toLowerCase();document.querySelectorAll('#commandList .command').forEach(c=>c.style.display=(cf==='all'||c.dataset.category===cf)&&c.innerText.toLowerCase().includes(q)?'':'none')}cbtn.forEach(b=>b.addEventListener('click',()=>{cf=b.dataset.cmdFilter;cbtn.forEach(x=>x.classList.toggle('active',x===b));runCmd()}));cs?.addEventListener('input',runCmd);const modal=document.getElementById('certModal');document.querySelectorAll('.zoomable').forEach(img=>img.addEventListener('click',()=>{if(modal){modal.querySelector('img').src=img.src;modal.classList.add('show')}}));modal?.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('show')});const ip=document.getElementById('ipInput');if(ip&&document.getElementById('cidrInput'))window.subnetCalc();});

 // Course checklist progress is stored locally in this browser only.
 const courseRoot=document.querySelector('[data-course-id]');
 if(courseRoot){
   const courseId=courseRoot.dataset.courseId;
   const prefix='feruzbek-dev-course-v1-'+courseId+'-';
   const checks=[...courseRoot.querySelectorAll('.course-check')];
   const percent=document.getElementById('courseProgressText');
   const bar=document.getElementById('courseProgressBar');
   const weeks=[...courseRoot.querySelectorAll('.week-card')];
   const update=()=>{
     let done=0;
     checks.forEach(box=>{if(box.checked)done++;});
     const pct=checks.length?Math.round(done/checks.length*100):0;
     if(percent)percent.textContent=pct+'%';
     if(bar)bar.style.width=pct+'%';
     weeks.forEach(week=>{
       const wchecks=[...week.querySelectorAll('.course-check')];
       const n=wchecks.filter(x=>x.checked).length;
       const counter=week.querySelector('[data-week-count]');
       if(counter)counter.textContent=n+' / '+wchecks.length;
     });
   };
   checks.forEach(box=>{
     const key=prefix+box.dataset.progressKey;
     try{box.checked=localStorage.getItem(key)==='1';}catch(e){}
     box.addEventListener('change',()=>{
       try{localStorage.setItem(key,box.checked?'1':'0');}catch(e){}
       update();
     });
   });
   document.getElementById('resetCourseProgress')?.addEventListener('click',()=>{
     if(!confirm('Reset this course progress on this browser?'))return;
     checks.forEach(box=>{box.checked=false;try{localStorage.removeItem(prefix+box.dataset.progressKey);}catch(e){}});
     update();
   });
   update();
 }
})();
