document.addEventListener('DOMContentLoaded', () => {

  const updateLabel = document.getElementById('lastUpdated');
  if (updateLabel) {
    updateLabel.textContent = new Date().toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' });
  }

  const totalPoints = ALL_WATER_POINTS.length;
  const workingPoints = ALL_WATER_POINTS.filter(item => item.status === 'Working').length;
  const brokenPoints = ALL_WATER_POINTS.filter(item => item.status === 'Not Working').length;
  const repairPoints = ALL_WATER_POINTS.filter(item => item.status === 'Under Repair').length;
  
  const communityReports = JSON.parse(localStorage.getItem('majiReports') || '[]');
  
  const getPercentage = num => Math.round((num / totalPoints) * 100);

  animateValue('kpiWorking', workingPoints);
  animateValue('kpiBroken', brokenPoints);
  animateValue('kpiRepair', repairPoints);
  animateValue('kpiReports', communityReports.length);
  
  updateText('kpiWorkingPct', `${getPercentage(workingPoints)}% of total`);
  updateText('kpiBrokenPct', `${getPercentage(brokenPoints)}% of total`);
  updateText('kpiRepairPct', `${getPercentage(repairPoints)}% of total`);

  const CIRCUMFERENCE = 2 * Math.PI * 50;
  updateText('donutPct', getPercentage(workingPoints) + '%');
  updateText('lgWorking', workingPoints);
  updateText('lgBroken', brokenPoints);
  updateText('lgRepair', repairPoints);

  function drawDonutSegment(id, count, currentOffset) {
    const segment = document.getElementById(id);
    if (!segment) return currentOffset;
    const length = (count / totalPoints) * CIRCUMFERENCE;
    segment.style.strokeDasharray = `${length} ${CIRCUMFERENCE - length}`;
    segment.style.strokeDashoffset = -currentOffset;
    return currentOffset + length;
  }

  setTimeout(() => {
    let offset = 0;
    offset = drawDonutSegment('segWorking', workingPoints, offset);
    offset = drawDonutSegment('segBroken', brokenPoints, offset);
    drawDonutSegment('segRepair', repairPoints, offset);
  }, 200);

  const countyList = ['Garissa', 'Wajir', 'Mandera'];
  const barChartContainer = document.getElementById('barChart');
  if (barChartContainer) {
    barChartContainer.innerHTML = countyList.map(name => {
      const countyPoints = ALL_WATER_POINTS.filter(p => p.county === name);
      const w = countyPoints.filter(p => p.status === 'Working').length;
      const b = countyPoints.filter(p => p.status === 'Not Working').length;
      const r = countyPoints.filter(p => p.status === 'Under Repair').length;
      const total = countyPoints.length;
      return `
        <div class="bar-group">
          <div class="bar-group-label">${name} <span>${total} points</span></div>
          <div class="bar-track">
            <div class="bar-seg bar-working" style="width:${(w/total)*100}%"></div>
            <div class="bar-seg bar-broken"  style="width:${(b/total)*100}%"></div>
            <div class="bar-seg bar-repair"  style="width:${(r/total)*100}%"></div>
          </div>
          <div class="bar-group-sublabels">
            <span class="bar-sublabel"><span class="bar-sublabel-dot" style="background:#16a34a"></span>${w} Working</span>
            <span class="bar-sublabel"><span class="bar-sublabel-dot" style="background:#c0392b"></span>${b} Broken</span>
            <span class="bar-sublabel"><span class="bar-sublabel-dot" style="background:#e67e22"></span>${r} Repair</span>
          </div>
        </div>`;
    }).join('');
  }

  const typeBarContainer = document.getElementById('typeBars');
  if (typeBarContainer) {
    ['Borehole','Hand Pump','Open Well','Water Pan'].forEach(type => {
      const count = ALL_WATER_POINTS.filter(p => p.type === type).length;
      const pct = getPercentage(count);
      typeBarContainer.innerHTML += `
        <div class="type-row">
          <div class="type-row-label">${type}<span>${count} (${pct}%)</span></div>
          <div class="type-track"><div class="type-fill" style="width:${pct}%"></div></div>
        </div>`;
    });
  }

  const gridContainer = document.getElementById('countyDashGrid');
  if (gridContainer) {
    gridContainer.innerHTML = countyList.map((c, i) => {
      const all = ALL_WATER_POINTS.filter(p => p.county === c);
      const w = all.filter(p => p.status === 'Working').length;
      const b = all.filter(p => p.status === 'Not Working').length;
      const r = all.filter(p => p.status === 'Under Repair').length;
      const opPct = Math.round((w / all.length) * 100);
      return `
        <div class="county-dash-card" style="animation-delay:${i*0.1}s">
          <div class="county-dash-top">
            <div class="county-dash-name">${c}</div>
            <div class="county-dash-sub">${all.length} points</div>
          </div>
          <div class="county-dash-stats">
            <div class="cds-item"><span class="cds-num cg">${w}</span><span class="cds-label">Working</span></div>
            <div class="cds-item"><span class="cds-num cr">${b}</span><span class="cds-label">Broken</span></div>
            <div class="cds-item"><span class="cds-num cy">${r}</span><span class="cds-label">Repair</span></div>
          </div>
          <div class="county-dash-bar">
            <div class="cdb-track"><div class="cdb-fill" style="width:${opPct}%"></div></div>
            <span class="cdb-pct">${opPct}% functional</span>
          </div>
        </div>`;
    }).join('');
  }

  renderReportsTable(communityReports);
  
  document.getElementById('clearDashReports')?.addEventListener('click', () => {
    if (confirm('Clear all community reports?')) {
      localStorage.removeItem('majiReports');
      renderReportsTable([]);
    }
  });

  renderSourcesTable(ALL_WATER_POINTS);
  
  document.getElementById('tableSearch')?.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = ALL_WATER_POINTS.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.county.toLowerCase().includes(term) ||
      item.subLocation.toLowerCase().includes(term)
    );
    renderSourcesTable(filtered);
  });

  document.getElementById('exportBtn')?.addEventListener('click', () => {
    const list = JSON.parse(localStorage.getItem('majiReports') || '[]');
    if (!list.length) return alert('Nothing to export');
    
    const headers = ['ID','Date','Reporter','County','Location','Issue','Urgency'];
    const rows = list.map(r => [r.id, new Date(r.timestamp).toLocaleDateString(), r.reporterName, r.county, r.location, r.issueType, r.severity]
      .map(val => `"${val}"`).join(','));
    
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'maji_reports_export.csv';
    link.click();
  });
});

function updateText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function animateValue(id, target, duration = 1000) {
  const element = document.getElementById(id);
  if (!element) return;
  let start = null;
  const frame = (now) => {
    if (!start) start = now;
    const progress = Math.min((now - start) / duration, 1);
    element.textContent = Math.floor(progress * target);
    if (progress < 1) requestAnimationFrame(frame);
    else element.textContent = target;
  };
  requestAnimationFrame(frame);
}

function renderReportsTable(list) {
  const body = document.getElementById('reportsTableBody');
  const emptyView = document.getElementById('emptyTable');
  if (!body) return;
  
  if (list.length === 0) {
    body.innerHTML = '';
    if (emptyView) emptyView.style.display = 'block';
    return;
  }
  
  if (emptyView) emptyView.style.display = 'none';
  body.innerHTML = [...list].reverse().map(r => `
    <tr>
      <td><span class="ref-id">${r.id}</span></td>
      <td>${new Date(r.timestamp).toLocaleDateString()}</td>
      <td>${r.reporterName}</td>
      <td>${r.county}</td>
      <td>${r.location}</td>
      <td>${r.issueType}</td>
      <td><span class="t-badge t-${r.severity.toLowerCase()}">${r.severity}</span></td>
    </tr>`).join('');
}

function renderSourcesTable(points) {
  const body = document.getElementById('sourcesTableBody');
  if (!body) return;
  
  body.innerHTML = points.map((p, idx) => {
    let statusClass = 't-working';
    if (p.status === 'Not Working') statusClass = 't-broken';
    if (p.status === 'Under Repair') statusClass = 't-repair';
    
    return `
    <tr>
      <td style="color:var(--text-muted);font-size:0.8rem">${idx + 1}</td>
      <td><strong style="font-size:0.875rem">${p.name}</strong></td>
      <td>${p.county}</td>
      <td>${p.subLocation}</td>
      <td><span class="t-type">${p.type}</span></td>
      <td><span class="t-badge ${statusClass}">${p.status}</span></td>
      <td style="font-size:0.82rem;color:var(--text-muted)">${p.capacity}</td>
      <td style="font-size:0.82rem;color:var(--text-muted)">${p.lastChecked}</td>
    </tr>`;
  }).join('');
}