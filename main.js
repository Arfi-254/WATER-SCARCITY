const menuBtn = document.getElementById('hamburger');
const mainNav = document.getElementById('navLinks');

if (menuBtn && mainNav) {
  menuBtn.addEventListener('click', () => mainNav.classList.toggle('open'));
  mainNav.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => mainNav.classList.remove('open'))
  );
}

function loadSiteStats() {
  const reportsCountEl = document.getElementById('reportsCount');
  if (!reportsCountEl) return;
  const storedReports = JSON.parse(localStorage.getItem('majiReports') || '[]');
  reportsCountEl.textContent = storedReports.length;
}

function countUp(element, finalValue, time = 1200) {
  let startTime = 0;
  const progress = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const lap = Math.min((timestamp - startTime) / time, 1);
    element.textContent = Math.floor(lap * finalValue);
    if (lap < 1) requestAnimationFrame(progress);
    else element.textContent = finalValue;
  };
  requestAnimationFrame(progress);
}

const heroStatsContainer = document.querySelector('.hero-stats');
if (heroStatsContainer) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-num').forEach(num => {
          const val = parseInt(num.textContent);
          if (!isNaN(val)) countUp(num, val);
        });
      }
    });
  }, { threshold: 0.3 });
  observer.observe(heroStatsContainer);
}

window.addEventListener('scroll', () => {
  const navigation = document.querySelector('.navbar');
  if (navigation) {
    navigation.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,0.1)' : '';
  }
});

function syncNavigation() {
  const navContainer = document.getElementById('navLinks');
  const heroCtaArea = document.getElementById('heroCta');
  const userSession = typeof getSession === 'function' ? getSession() : null;
  const path = window.location.pathname.split('/').pop() || 'index.html';

  if (userSession) {
    const dashboardLink = userSession.role === 'admin' ? 'admin/index.html' : 'dashboard.html';
    
    if (navContainer) {
      if (userSession.role === 'admin') {
        navContainer.innerHTML = `
          <li><a href="/admin/index.html" class="${window.location.pathname.includes('admin') ? 'active' : ''}">Admin Dashboard</a></li>
          <li><button onclick="logout()" class="btn btn-outline btn-sm" style="margin-left:10px;">Logout</button></li>
        `;
      } else {
        navContainer.innerHTML = `
          <li><a href="dashboard.html" class="${path === 'dashboard.html' ? 'active' : ''}">My Dashboard</a></li>
          <li><a href="report.html" class="${path === 'report.html' ? 'active' : ''}">Report Issue</a></li>
          <li><button onclick="logout()" class="btn btn-outline btn-sm" style="margin-left:10px;">Logout</button></li>
        `;
      }
    }

    if (heroCtaArea) {
      heroCtaArea.innerHTML = `
        <a href="${dashboardLink}" class="btn btn-primary">Go to My Dashboard</a>
      `;
    }
  } else {
    if (navContainer) {
      navContainer.innerHTML = `
        <li><a href="index.html" class="${path === 'index.html' ? 'active' : ''}">Home</a></li>
        <li><a href="source.html" class="${path === 'source.html' ? 'active' : ''}">Water Sources</a></li>
        <li><a href="signup.html" class="${path === 'signup.html' || path === 'login.html' ? 'active' : ''}">Report a Problem</a></li>
        <li style="display: flex; align-items: center; margin-left: 10px;">
          <a href="signup.html" class="btn btn-primary btn-sm" style="color:white;">Join Us</a>
        </li>
      `;
    }
    if (heroCtaArea) {
      heroCtaArea.innerHTML = `
        <a href="source.html" class="btn btn-primary">Find Water Sources</a>
        <a href="signup.html" class="btn btn-outline">Report an Issue</a>
      `;
    }
  }
}

function showDroughtAlert() {
  const alertBox = document.getElementById('droughtAlert');
  if (!alertBox) return;
  
  const counties = ['Garissa', 'Wajir', 'Mandera'];
  const randomCounty = counties[Math.floor(Math.random() * counties.length)];
  const severity = Math.random() > 0.5 ? 'High' : 'Moderate';
  
  alertBox.innerHTML = `
    <div class="alert-content">
      <strong>Alert:</strong> ${severity} drought conditions reported in ${randomCounty} county. Please conserve water.
    </div>
  `;
  alertBox.style.display = 'block';
  if (severity === 'High') {
    alertBox.style.background = '#d32f2f';
    alertBox.style.color = '#fff';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadSiteStats();
  syncNavigation();
  showDroughtAlert();
});