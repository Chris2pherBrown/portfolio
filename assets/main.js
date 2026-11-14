(()=>{
'use strict';
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const meter=$('#scroll-meter');
let scrollPending=false;
function onScroll(){if(scrollPending)return;scrollPending=true;requestAnimationFrame(()=>{if(meter){const max=document.documentElement.scrollHeight-innerHeight;meter.style.width=(max>0?scrollY/max*100:0)+'%';}scrollPending=false;});}
addEventListener('scroll',onScroll,{passive:true});onScroll();
// One observer for all reveal elements, including Selected Work cards.
const reveal=$$('.reveal');
if(reduce||!('IntersectionObserver' in window)) reveal.forEach(el=>el.classList.add('visible'));
else {
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});
  },{threshold:0.08,rootMargin:'0px 0px -12px 0px'});
  reveal.forEach(el=>observer.observe(el));
}
const menu=$('.menu'),nav=$('#nav');
if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});$$('#nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));}
$$('.case-expand').forEach(btn=>btn.addEventListener('click',()=>{const panel=btn.nextElementSibling;if(!panel)return;const expanded=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!expanded));panel.hidden=expanded;const icon=btn.querySelector('span');if(icon)icon.textContent=expanded?'+':'−';}));
const year=$('#year');if(year)year.textContent=new Date().getFullYear();
if(!reduce&&matchMedia('(pointer:fine)').matches){
  const glow=$('#pointer-glow');let x=-1000,y=-1000,tx=x,ty=y;
  if(glow){addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;glow.style.opacity='1';},{passive:true});
    function animate(){x+=(tx-x)*.13;y+=(ty-y)*.13;glow.style.left=x+'px';glow.style.top=y+'px';requestAnimationFrame(animate);}animate();}
  const profile=$('.profile');if(profile){profile.addEventListener('pointermove',e=>{const r=profile.getBoundingClientRect(),dx=(e.clientX-r.left)/r.width-.5,dy=(e.clientY-r.top)/r.height-.5;profile.style.transform=`perspective(700px) rotateY(${dx*9}deg) rotateX(${-dy*9}deg)`;});profile.addEventListener('pointerleave',()=>profile.style.transform='rotate(2deg)');}
}
})();
