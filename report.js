function getReports(){return JSON.perse(localStorage.getItem('majiReports')||'{}');}

    function saveReports(r){localStorage.setItem('majiReports',JSON.stringify(r));}
    function generateId(){return'RPT-'+Date.now().toString(36).toUpperCase();}
    function renderRecentReports(){
        const container=document.getElementById('recentReports');
        if (!container) return;
        const reports=getReports();
        if(reports.length===0)
            container.innerHTML='<p class="no-reports">No reports yet.Be the first to report an issue.</p>';
        return;



    }


     container.innerHTML = [...reports].reverse().slice(0, 5).map(r => `
    <div class="report-item">
      <div class="report-item-header">
        <span class="report-item-loc">${r.location}, ${r.county}</span>
        <span class="report-item-date">${new Date(r.timestamp).toLocaleDateString()}</span>
      </div>
      <div class="report-item-issue">${r.issueType}</div>
      <span class="report-item-sev sev-${r.severity}">${r.severity} Urgency</span>
    </div>
  `).join('');
     
const RULES = {
  reporterName:  { validate: v => v.trim().length >= 2,                                              msg: 'Enter your name (at least 2 characters).' },
  reporterPhone: { validate: v => /^(\+?254|0)[17]\d{8}$/.test(v.replace(/\s/g,'')),                msg: 'Enter a valid Kenyan phone number (e.g. 0712 345 678).' },
  county:        { validate: v => v !== '',                                                           msg: 'Please select a county.' },
  location:      { validate: v => v.trim().length >= 3,                                              msg: 'Enter the village or sub-location (min. 3 characters).' },
  sourceType:    { validate: v => v !== '',                                                           msg: 'Please select the water source type.' },
  issueType:     { validate: v => v !== '',                                                           msg: 'Please select the type of issue.' },
  severity:      { validate: () => !!document.querySelector('input[name="severity"]:checked'),       msg: 'Please select an urgency level.' },
  description:   { validate: v => v.trim().length >= 20,                                             msg: 'Describe the issue (at least 20 characters).' },
  consent:       { validate: () => document.getElementById('consent')?.checked,                      msg: 'You must confirm the report is accurate.' },
};

function showError(id,msg) {
    const err = document.getElementById('err-' + id);
    const inp = document.getElementById('id')|| (id=== 'severity' ? document.getElementById('severityOptions') : null);
    if(err)err.textContent = msg;
    if(inp)inp.classList.add('error');
}

function clearError(id) {
  const err = document.getElementById('err-' + id);
  const inp = document.getElementById(id) || (id === 'severity' ? document.getElementById('severityOptions') : null);
  if (err) err.textContent = '';
  if (inp) inp.classList.remove('error');
}
function clearAllErrors() { Object.keys(RULES).forEach(clearError); }

function validateForm() {
  let valid = true;
  clearAllErrors();
  Object.entries(RULES).forEach(([field, rule]) => {
    const el = document.getElementById(field);
    if (!rule.validate(el ? el.value : '')) { showError(field, rule.msg); valid = false; }
  });
  return valid;
}


Object.keys(RULES).forEach(field => {
  const el = document.getElementById(field);
  if (!el) return;
  el.addEventListener('blur', () => { if (!RULES[field].validate(el.value)) showError(field, RULES[field].msg); else clearError(field); });
  if (el.type !== 'checkbox') el.addEventListener('input', () => clearError(field));
});

const desc = document.getElementById('description');
const charCount = document.getElementById('charCount');
if (desc && charCount) {
  desc.addEventListener('input', () => {
    const len = desc.value.length;
    charCount.textContent = `${len} / 500 characters`;
    charCount.style.color = len > 480 ? '#c0392b' : '';
    if (len > 500) desc.value = desc.value.slice(0, 500);
  });
}


const getGPSBtn = document.getElementById('getGPS');
const gpsInput  = document.getElementById('gpsCoords');
const gpsStatus = document.getElementById('gpsStatus');
if (getGPSBtn) {
  getGPSBtn.addEventListener('click', () => {
    if (!navigator.geolocation) { gpsStatus.textContent = 'Geolocation not supported.'; return; }
    getGPSBtn.textContent = '⏳ Getting location…';
    getGPSBtn.disabled = true;
    navigator.geolocation.getCurrentPosition(
      pos => {
        gpsInput.value = `${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`;
        gpsStatus.textContent = `📍 Captured (±${Math.round(pos.coords.accuracy)}m)`;
        gpsStatus.style.color = '#16a34a';
        getGPSBtn.textContent = '✅ Location Set';
        getGPSBtn.disabled = false;
      },
      err => {
        gpsStatus.textContent = 'Could not get location. ' + err.message;
        gpsStatus.style.color = '#c0392b';
        getGPSBtn.textContent = '📍 Get My Location';
        getGPSBtn.disabled = false;
      },
      { timeout: 10000 }
    );
  });
}

document.getElementById('reportForm')?.addEventListener('submit', e => {
  e.preventDefault();
  if (!validateForm()) {
    document.querySelector('.error')?.scrollIntoView({ behavior:'smooth', block:'center' });
    return;
  }
  const report = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    reporterName:  document.getElementById('reporterName').value.trim(),
    reporterPhone: document.getElementById('reporterPhone').value.trim(),
    county:        document.getElementById('county').value,
    location:      document.getElementById('location').value.trim(),
    sourceType:    document.getElementById('sourceType').value,
    issueType:     document.getElementById('issueType').value,
    severity:      document.querySelector('input[name="severity"]:checked').value,
    description:   document.getElementById('description').value.trim(),
    gpsCoords:     document.getElementById('gpsCoords').value || 'Not provided',
  };
  const reports = getReports();
  reports.push(report);
  saveReports(reports);
  document.getElementById('reportRefId').textContent = report.id;
  document.getElementById('successModal').style.display = 'flex';
  document.getElementById('reportForm').reset();
  clearAllErrors();
  if (charCount) charCount.textContent = '0 / 500 characters';
  if (gpsInput) gpsInput.value = '';
  if (gpsStatus) { gpsStatus.textContent = ''; }
  if (getGPSBtn) getGPSBtn.textContent = '📍 Get My Location';
  renderRecentReports();
});

function closeModal() { document.getElementById('successModal').style.display = 'none'; }
window.closeModal = closeModal;
document.getElementById('successModal')?.addEventListener('click', function(e) { if (e.target === this) closeModal(); });

document.getElementById('clearReports')?.addEventListener('click', () => {
  if (confirm('Delete all stored reports?')) { localStorage.removeItem('majiReports'); renderRecentReports(); }
});

renderRecentReports();