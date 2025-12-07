/* ===== tiny typing effect ===== */
const typedEl = document.getElementById('typed');
const texts = ['Web Developer', 'UI/UX Designer', 'CSE Student'];
let ti = 0, ci = 0, forward = true;

function tick() {
  const current = texts[ti];
  if(forward){
    ci++;
    typedEl.textContent = current.slice(0,ci);
    if(ci === current.length) { forward = false; setTimeout(tick,900); return; }
  } else {
    ci--;
    typedEl.textContent = current.slice(0,ci);
    if(ci === 0) { forward = true; ti = (ti+1) % texts.length; }
  }
  setTimeout(tick, forward ? 80 : 45);
}
tick();

/* ===== theme toggle (dark/light) ===== */
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('theme-light');
  document.body.classList.toggle('theme-dark');
});

/* Optional: persist theme in localStorage */
(function(){
  const saved = localStorage.getItem('theme');
  if(saved === 'light') document.body.classList.add('theme-light');
  else document.body.classList.add('theme-dark');
})();
themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.contains('theme-light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

/* ===== smooth scroll for internal links ===== */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

/* ===== reveal on scroll (fade-in) ===== */
const io = new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if(en.isIntersecting) en.target.classList.add('visible');
  });
},{threshold:0.15});

document.querySelectorAll('.card, .project, .skill-card, .section-title').forEach(el=>{
  el.classList.add('fade-in');
  io.observe(el);
});

/* ===== contact form (mailto fallback) ===== */
const form = document.getElementById('contactForm');
form.addEventListener('submit', e=>{
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:yourmail@gmail.com?subject=${subject}&body=${body}`;
});

/* ===== helper: replace placeholder links (optional) ===== */
/* After you create GitHub/LinkedIn, update these hrefs */
document.getElementById('githubLink').href = '#'; // add your GitHub URL
document.getElementById('linkedinLink').href = '#'; // add your LinkedIn URL
document.getElementById('p1View').href = '#'; // project 1 repo
document.getElementById('p1Demo').href = '#'; // project 1 demo
document.getElementById('p2View').href = '#'; // project 2 repo
document.getElementById('p2Run').href = '#'; // how-to-run instructions
document.getElementById('ghProfile').href = '#';
document.getElementById('lnkProfile').href = '#';
