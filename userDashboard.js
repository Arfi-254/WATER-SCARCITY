const currentUser = typeof getSession === 'function' ? getSession() : null;

function setupDashboard() {
  if (!currentUser) return;

  const welcomeHeader = document.getElementById('welcomeText');
  const userCountyBadge = document.getElementById('userCounty');
  const profileCountyText = document.getElementById('profileCounty');
  const userEmailText = document.getElementById('userEmail');
  const countyLabel = document.getElementById('countyName');

  if (welcomeHeader) welcomeHeader.textContent = `Hello, ${currentUser.name.split(' ')[0]}`;
  if (userCountyBadge) userCountyBadge.textContent = currentUser.county;
  if (profileCountyText) profileCountyText.textContent = currentUser.county;
  if (userEmailText) userEmailText.textContent = currentUser.email;
  if (countyLabel) countyLabel.textContent = currentUser.county;

  renderMyReports();
}

function renderMyReports() {
  const allReports = JSON.parse(localStorage.getItem('majiReports') || '[]');
  const myReports = allReports.filter(report => report.reporterName === currentUser.name); 
  const listContainer = document.getElementById('userReportsList');

  if (!listContainer) return;

  if (myReports.length === 0) {
    listContainer.innerHTML = `
      <div class="empty-state">
        <p>You haven't submitted any reports yet.</p>
        <a href="report.html" class="btn btn-outline btn-sm">Report a Water Issue</a>
      </div>`;
    return;
  }

  listContainer.innerHTML = myReports.reverse().map(item => `
    <div class="report-item">
      <div class="report-item-header">
        <span class="report-item-loc">${item.location}</span>
        <span class="report-item-date">${new Date(item.timestamp).toLocaleDateString()}</span>
      </div>
      <div class="report-item-issue">${item.issueType}</div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
        <span class="report-item-sev sev-${item.severity}">${item.severity} Urgency</span>
        <span class="ref-id">${item.id}</span>
      </div>
    </div>
  `).join('');
}

function refreshNav() {
  const navLinksList = document.getElementById('navLinks');
  const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';

  if (currentUser && navLinksList) {
    navLinksList.innerHTML = `
      <li><a href="dashboard.html" class="${currentPath === 'dashboard.html' ? 'active' : ''}">My Dashboard</a></li>
      <li><a href="report.html" class="${currentPath === 'report.html' ? 'active' : ''}">Report Issue</a></li>
      <li><button onclick="logout()" class="btn btn-outline btn-sm" style="margin-left:10px;">Logout</button></li>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  refreshNav();
  setupDashboard();
});