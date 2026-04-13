document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('lastUpdated').textContent =
    new Date().toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' });

  const total   = WATER_SOURCES.length;
  const working = WATER_SOURCES.filter(s => s.status === 'Working').length;
  const broken  = WATER_SOURCES.filter(s => s.status === 'Not Working').length;
  const repair  = WATER_SOURCES.filter(s => s.status === 'Under Repair').length;
  const reports = JSON.parse(localStorage.getItem('majiReports') || '[]');
  const pct = n => Math.round((n / total) * 100);


  animNum('kpiWorking', working);
  animNum('kpiBroken',  broken);
  animNum('kpiRepair',  repair);
  animNum('kpiReports', reports.length);
  setText('kpiWorkingPct', `${pct(working)}% of all sources`);
  setText('kpiBrokenPct',  `${pct(broken)}% of all sources`);
  setText('kpiRepairPct',  `${pct(repair)}% of all sources`);


  const CIRC = 2 * Math.PI * 50;
  setText('donutPct', pct(working) + '%');
  setText('lgWorking', working);
  setText('lgBroken',  broken);
  setText('lgRepair',  repair);
  function setDonutSeg(id, count, offset) {
    const el = document.getElementById(id);
    if (!el) return offset;
    const len = (count / total) * CIRC;
    el.style.strokeDasharray  = `${len} ${CIRC - len}`;
    el.style.strokeDashoffset = -offset;
    return offset + len;
  }
  setTimeout(() => {
    let off = 0;
    off = setDonutSeg('segWorking', working, off);
    off = setDonutSeg('segBroken',  broken,  off);
          setDonutSeg('segRepair',  repair,  off);
  }, 200);

  const counties = ['Garissa', 'Wajir', 'Mandera'];
  const barChart = document.getElementById('barChart');
  if (barChart) {
    barChart.innerHTML = counties.map(c => {
      const all = WATER_SOURCES.filter(s => s.county === c);
      const w = all.filter(s => s.status === 'Working').length;
      const b = all.filter(s => s.status === 'Not Working').length;
      const r = all.filter(s => s.status === 'Under Repair').length;
      const n = all.length;
      return `
        <div class="bar-group">
          <div class="bar-group-label">${c} <span>${n} sources</span></div>
          <div class="bar-track">
            <div class="bar-seg bar-working" style="width:${(w/n)*100}%"></div>
            <div class="bar-seg bar-broken"  style="width:${(b/n)*100}%"></div>
            <div class="bar-seg bar-repair"  style="width:${(r/n)*100}%"></div>
          </div>
          <div class="bar-group-sublabels">
            <span class="bar-sublabel"><span class="bar-sublabel-dot" style="background:#16a34a"></span>${w} Working</span>
            <span class="bar-sublabel"><span class="bar-sublabel-dot" style="background:#c0392b"></span>${b} Broken</span>
            <span class="bar-sublabel"><span class="bar-sublabel-dot" style="background:#e67e22"></span>${r} Repair</span>
          </div>
        </div>`;
    }).join('');
  }

  const typeBars = document.getElementById('typeBars');
  if (typeBars) {
    ['Borehole','Hand Pump','Open Well','Water Pan'].forEach(t => {
      const count = WATER_SOURCES.filter(s => s.type === t).length;
      const w = pct(count);
      typeBars.innerHTML += `
        <div class="type-row">
          <div class="type-row-label">${t}<span>${count} (${w}%)</span></div>
          <div class="type-track"><div class="type-fill" style="width:${w}%"></div></div>
        </div>`;
    });
  }

  const countyGrid = document.getElementById('countyDashGrid');
  if (countyGrid) {
    countyGrid.innerHTML = counties.map((c, i) => {
      const all = WATER_SOURCES.filter(s => s.county === c);
      const w = all.filter(s => s.status === 'Working').length;
      const b = all.filter(s => s.status === 'Not Working').length;
      const r = all.filter(s => s.status === 'Under Repair').length;
      const wp = Math.round((w / all.length) * 100);
      return `
        <div class="county-dash-card" style="animation-delay:${i*0.1}s">
          <div class="county-dash-top">
            <div class="county-dash-name">${c} County</div>
            <div class="county-dash-sub">${all.length} registered water sources</div>
          </div>
          <div class="county-dash-stats">
            <div class="cds-item"><span class="cds-num cg">${w}</span><span class="cds-label">Working</span></div>
            <div class="cds-item"><span class="cds-num cr">${b}</span><span class="cds-label">Broken</span></div>
            <div class="cds-item"><span class="cds-num cy">${r}</span><span class="cds-label">Repair</span></div>
          </div>
          <div class="county-dash-bar">
            <div class="cdb-track"><div class="cdb-fill" style="width:${wp}%"></div></div>
            <span class="cdb-pct">${wp}% operational</span>
          </div>
        </div>`;
    }).join('');
  }

  renderReportsTable(reports);
  document.getElementById('clearDashReports')?.addEventListener('click', () => {
    if (confirm('Delete all community reports?')) {
      localStorage.removeItem('majiReports');
      renderReportsTable([]);
    }
  });

  renderSourcesTable(WATER_SOURCES);
  document.getElementById('tableSearch')?.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    renderSourcesTable(WATER_SOURCES.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.county.toLowerCase().includes(q) ||
      s.subLocation.toLowerCase().includes(q) ||
      s.type.toLowerCase().includes(q)
    ));
  });

  document.getElementById('exportBtn')?.addEventListener('click', () => {
    const rpts = JSON.parse(localStorage.getItem('majiReports') || '[]');
    if (!rpts.length) { alert('No reports to export.'); return; }
    const headers = ['Ref ID','Date','Reporter','Phone','County','Location','Source Type','Issue','Urgency','GPS'];
    const rows = rpts.map(r => [r.id, new Date(r.timestamp).toLocaleDateString(), r.reporterName, r.reporterPhone, r.county, r.location, r.sourceType, r.issueType, r.severity, r.gpsCoords]
      .map(v => `"${String(v).replace(/"/g,'""')}"`).join(','));
    const csv  = [headers.join(','), ...rows].join('\n');
    const a    = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([csv],{type:'text/csv'})), download: 'maji_safi_reports.csv' });
    a.click();
  });
});

function setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
function animNum(id, target, dur = 900) {
  const el = document.getElementById(id); if (!el) return;
  let start = null;
  const step = ts => { if (!start) start = ts; const p = Math.min((ts-start)/dur,1); el.textContent = Math.floor(p*target); if (p<1) requestAnimationFrame(step); else el.textContent = target; };
  requestAnimationFrame(step);
}
function statusBadgeT(s) {
  const m = {'Working':['t-badge t-working','✅'],'Not Working':['t-badge t-broken','❌'],'Under Repair':['t-badge t-repair','🔧']};
  const [c,i] = m[s]||['t-badge','❓'];
  return `<span class="${c}">${i} ${s}</span>`;
}
function urgencyBadge(s) { return `<span class="t-badge t-${s.toLowerCase()}">${s}</span>`; }
function renderReportsTable(reports) {
  const tbody = document.getElementById('reportsTableBody');
  const empty = document.getElementById('emptyTable');
  if (!tbody) return;
  if (!reports.length) { tbody.innerHTML = ''; if (empty) empty.style.display = 'block'; return; }
  if (empty) empty.style.display = 'none';
  tbody.innerHTML = [...reports].reverse().map(r => `
    <tr>
      <td><span class="ref-id">${r.id}</span></td>
      <td>${new Date(r.timestamp).toLocaleDateString()}</td>
      <td>${r.reporterName}</td>
      <td>${r.county}</td>
      <td>${r.location}</td>
      <td>${r.issueType}</td>
      <td>${urgencyBadge(r.severity)}</td>
    </tr>`).join('');
}
function renderSourcesTable(sources) {
  const tbody = document.getElementById('sourcesTableBody'); if (!tbody) return;
  tbody.innerHTML = sources.map((s,i) => `
    <tr>
      <td style="color:var(--text-muted);font-size:0.8rem">${i+1}</td>
      <td><strong style="font-size:0.875rem">${s.name}</strong></td>
      <td>${s.county}</td>
      <td>${s.subLocation}</td>
      <td><span class="t-type">${s.type}</span></td>
      <td>${statusBadgeT(s.status)}</td>
      <td style="font-size:0.82rem;color:var(--text-muted)">${s.capacity}</td>
      <td style="font-size:0.82rem;color:var(--text-muted)">${s.lastChecked}</td>
    </tr>`).join('');
}