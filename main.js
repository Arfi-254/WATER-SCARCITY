const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

function updateHomeStats() {
  const el = document.getElementById('reportsCount');
  if (!el) return;
  const reports = JSON.parse(localStorage.getItem('majiReports') || '[]');
  el.textContent = reports.length;
}
updateHomeStats();


function animateNumber(el, target, duration = 1200) {
  let start = 0;
  const step = (ts) => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / duration, 1);
    el.textContent = Math.floor(p * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const statsEl = document.querySelector('.hero-stats');
if (statsEl) {
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.stat-num').forEach(n => {
          const v = parseInt(n.textContent);
          if (!isNaN(v)) animateNumber(n, v);
        });
      }
    });
  }, { threshold: 0.3 }).observe(statsEl);
}

window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) nav.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,0.1)' : '';
});